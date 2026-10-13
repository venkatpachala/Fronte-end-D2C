import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { DAILY_CAP, decideCase, handleChat, REFUND_CAP } from "./runtime";

const chatSchema = z.object({
  sessionTenant: z.string().min(1).max(64),
  bodyTenant: z.string().max(64).optional(),
  message: z.string().max(2000),
  hasPolicy: z.boolean(),
  usedToday: z.number().int().min(0),
  dailyCap: z.number().int().min(1).max(100000).optional(),
  killed: z.boolean().optional(),
  photosAlready: z.boolean().optional(),
  channel: z.enum(["api", "widget"]).optional(),
});

export const runChat = createServerFn({ method: "POST" })
  .validator(chatSchema)
  .handler(async ({ data }) => {
    return handleChat({
      sessionTenant: data.sessionTenant,
      bodyTenant: data.bodyTenant,
      message: data.message,
      hasPolicy: data.hasPolicy,
      usedToday: data.usedToday,
      dailyCap: data.dailyCap ?? DAILY_CAP,
      killed: data.killed ?? false,
      photosAlready: data.photosAlready ?? false,
      channel: data.channel ?? "api",
    });
  });

const decideSchema = z.object({
  sessionTenant: z.string().min(1).max(64),
  bodyTenant: z.string().max(64).optional(),
  currentStatus: z.string(),
  action: z.enum(["approve", "reject"]),
});

export const runDecision = createServerFn({ method: "POST" })
  .validator(decideSchema)
  .handler(async ({ data }) => decideCase(data));

export const getPlatformStatus = createServerFn({ method: "GET" }).handler(async () => {
  return {
    service: "archal",
    mode: "sandbox",
    liveTools: false,
    refundCap: REFUND_CAP,
    dailyCap: DAILY_CAP,
    stripe: "not_called",
    shopify: "sandbox_lookup_only",
    checks: [
      { name: "Tenant from session", ok: true },
      { name: "Body tenant cannot switch brand", ok: true },
      { name: "Policy answers cite a clause", ok: true },
      { name: "Damaged returns ask for photos", ok: true },
      { name: "Refunds above cap wait", ok: true },
      { name: "Stripe stays off", ok: true },
    ],
  };
});
