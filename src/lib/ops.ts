import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";

const STATUSES = [
  "open",
  "waiting_customer",
  "waiting_approval",
  "ai_resolved",
  "approved_held",
  "rejected",
] as const;

const brandSchema = z.object({
  brandId: z.string().min(1).max(64),
});

const listSchema = brandSchema.extend({
  status: z.enum(STATUSES).optional(),
});

const idSchema = z.object({
  id: z.string().min(1).max(64),
});

const replySchema = idSchema.extend({
  body: z.string().trim().min(1).max(2000),
});

const decideSchema = idSchema.extend({
  action: z.enum(["approve", "reject"]),
});

export type BrandRow = {
  id: string;
  name: string;
  segment: string;
  refundCap: number;
};

export type ConversationRow = {
  id: string;
  brandId: string;
  channel: string;
  customerLabel: string;
  subject: string;
  preview: string;
  intent: string;
  status: string;
  priority: string;
  aiHandled: boolean;
  confidence: number;
  amountInr: number | null;
  orderRef: string | null;
  assignee: string;
  updatedAt: string;
};

export type MessageRow = {
  id: number;
  author: string;
  body: string;
  citation: string | null;
  createdAt: string;
};

export type PolicyRow = {
  id: string;
  title: string;
  clause: string;
  body: string;
};

export type AutomationRow = {
  id: string;
  name: string;
  triggerText: string;
  actionText: string;
  enabled: boolean;
  runs7d: number;
};

export type QualityRow = {
  id: string;
  conversationId: string;
  subject: string;
  agentKind: string;
  policyScore: number;
  toneScore: number;
  resolutionScore: number;
  note: string;
};

export type VolumeRow = {
  day: string;
  inbound: number;
  resolvedByAi: number;
};

export type Overview = {
  brand: BrandRow | null;
  open: number;
  aiResolved: number;
  held: number;
  avgConfidence: number;
  intents: { intent: string; n: number }[];
  channels: { channel: string; n: number }[];
  volume: VolumeRow[];
  queue: ConversationRow[];
};

type ConversationSql = {
  id: string;
  brand_id: string;
  channel: string;
  customer_label: string;
  subject: string;
  preview: string;
  intent: string;
  status: string;
  priority: string;
  ai_handled: boolean;
  confidence: number;
  amount_inr: number | null;
  order_ref: string | null;
  assignee: string;
  updated_at: unknown;
};

function asIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value ?? "");
}

function mapConversation(row: ConversationSql): ConversationRow {
  return {
    id: row.id,
    brandId: row.brand_id,
    channel: row.channel,
    customerLabel: row.customer_label,
    subject: row.subject,
    preview: row.preview,
    intent: row.intent,
    status: row.status,
    priority: row.priority,
    aiHandled: Boolean(row.ai_handled),
    confidence: Number(row.confidence),
    amountInr: row.amount_inr == null ? null : Number(row.amount_inr),
    orderRef: row.order_ref,
    assignee: row.assignee,
    updatedAt: asIso(row.updated_at),
  };
}

export const listBrands = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{ id: string; name: string; segment: string; refund_cap: number }>`
    select id, name, segment, refund_cap from archal_tenants order by name desc
  `;
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    segment: row.segment,
    refundCap: Number(row.refund_cap),
  })) satisfies BrandRow[];
});

export const getOverview = createServerFn({ method: "GET" })
  .validator(brandSchema)
  .handler(async ({ data }): Promise<Overview> => {
    const sql = await getSql();
    const brands = await sql<{ id: string; name: string; segment: string; refund_cap: number }>`
      select id, name, segment, refund_cap from archal_tenants where id = ${data.brandId}
    `;
    const brand = brands[0]
      ? {
          id: brands[0].id,
          name: brands[0].name,
          segment: brands[0].segment,
          refundCap: Number(brands[0].refund_cap),
        }
      : null;
    const counts = await sql<{
      open_count: number;
      ai_resolved: number;
      held: number;
      avg_confidence: number;
    }>`
      select
        count(*) filter (where status in ('open', 'waiting_customer', 'waiting_approval')) as open_count,
        count(*) filter (where status = 'ai_resolved') as ai_resolved,
        count(*) filter (where status = 'waiting_approval') as held,
        coalesce(round(avg(confidence)), 0) as avg_confidence
      from archal_cases
      where brand_id = ${data.brandId}
    `;
    const intents = await sql<{ intent: string; n: number }>`
      select intent, count(*) as n
      from archal_cases
      where brand_id = ${data.brandId}
      group by intent
      order by n desc
    `;
    const channels = await sql<{ channel: string; n: number }>`
      select channel, count(*) as n
      from archal_cases
      where brand_id = ${data.brandId}
      group by channel
      order by n desc
    `;
    const volume = await sql<{ day: string; inbound: number; resolved_by_ai: number }>`
      select day, inbound, resolved_by_ai
      from volume_days
      where brand_id = ${data.brandId}
      order by day
    `;
    const queue = await sql<ConversationSql>`
      select id, brand_id, channel, customer_label, subject, preview, intent, status, priority,
             ai_handled, confidence, amount_inr, order_ref, assignee, updated_at
      from archal_cases
      where brand_id = ${data.brandId}
        and status in ('waiting_approval', 'open', 'waiting_customer')
      order by case status
        when 'waiting_approval' then 0
        when 'open' then 1
        else 2
      end, updated_at desc
      limit 5
    `;
    const tally = counts[0];
    return {
      brand,
      open: Number(tally?.open_count ?? 0),
      aiResolved: Number(tally?.ai_resolved ?? 0),
      held: Number(tally?.held ?? 0),
      avgConfidence: Number(tally?.avg_confidence ?? 0),
      intents: intents.map((row) => ({ intent: row.intent, n: Number(row.n) })),
      channels: channels.map((row) => ({ channel: row.channel, n: Number(row.n) })),
      volume: volume.map((row) => ({
        day: String(row.day).slice(0, 10),
        inbound: Number(row.inbound),
        resolvedByAi: Number(row.resolved_by_ai),
      })),
      queue: queue.map(mapConversation),
    };
  });

export const listConversations = createServerFn({ method: "GET" })
  .validator(listSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const status = data.status ?? null;
    const rows = await sql<ConversationSql>`
      select id, brand_id, channel, customer_label, subject, preview, intent, status, priority,
             ai_handled, confidence, amount_inr, order_ref, assignee, updated_at
      from archal_cases
      where brand_id = ${data.brandId}
        and (${status}::text is null or status = ${status})
      order by updated_at desc
    `;
    return rows.map(mapConversation);
  });

export const getConversation = createServerFn({ method: "GET" })
  .validator(idSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<ConversationSql>`
      select id, brand_id, channel, customer_label, subject, preview, intent, status, priority,
             ai_handled, confidence, amount_inr, order_ref, assignee, updated_at
      from archal_cases
      where id = ${data.id}
    `;
    const conversation = rows[0] ? mapConversation(rows[0]) : null;
    if (!conversation) return { conversation: null, messages: [] as MessageRow[] };
    const messages = await sql<{
      id: number;
      author: string;
      body: string;
      citation: string | null;
      created_at: unknown;
    }>`
      select id, author, body, citation, created_at
      from archal_messages
      where conversation_id = ${data.id}
      order by id
    `;
    return {
      conversation,
      messages: messages.map((row) => ({
        id: Number(row.id),
        author: row.author,
        body: row.body,
        citation: row.citation,
        createdAt: asIso(row.created_at),
      })),
    };
  });

export const postReply = createServerFn({ method: "POST" })
  .validator(replySchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const existing = await sql<{ id: string; status: string }>`
      select id, status from archal_cases where id = ${data.id}
    `;
    if (!existing[0]) return { ok: false as const, error: "That case is not on this desk." };
    const next =
      existing[0].status === "waiting_approval" || existing[0].status === "approved_held"
        ? existing[0].status
        : "waiting_customer";
    await sql`
      insert into archal_messages (conversation_id, author, body)
      values (${data.id}, 'person', ${data.body})
    `;
    await sql`
      update archal_cases
      set status = ${next},
          assignee = 'Floor',
          preview = ${data.body},
          updated_at = now()
      where id = ${data.id}
    `;
    return { ok: true as const, status: next };
  });

export const decideRefund = createServerFn({ method: "POST" })
  .validator(decideSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const existing = await sql<{ id: string; status: string; amount_inr: number | null }>`
      select id, status, amount_inr from archal_cases where id = ${data.id}
    `;
    const row = existing[0];
    if (!row) return { ok: false as const, error: "That case is not on this desk." };
    if (row.status !== "waiting_approval") {
      return { ok: false as const, error: "Already decided. Stripe was not called." };
    }
    const next = data.action === "approve" ? "approved_held" : "rejected";
    const note =
      data.action === "approve"
        ? "A person approved the hold. The refund is not sent. Stripe was not called."
        : "A person rejected this. The customer should be told it will not proceed. Stripe was not called.";
    const updated = await sql<{ id: string }>`
      update archal_cases
      set status = ${next}, updated_at = now(), assignee = 'Floor'
      where id = ${data.id} and status = 'waiting_approval'
      returning id
    `;
    if (!updated[0]) return { ok: false as const, error: "Already decided. Stripe was not called." };
    await sql`
      update archal_tasks
      set status = ${data.action === "approve" ? "approved" : "rejected"}, note = ${note}
      where case_id = ${data.id} and status = 'pending'
    `;
    await sql`
      insert into archal_messages (conversation_id, author, body, citation)
      values (${data.id}, 'archal', ${note}, ${"Clause 9.1"})
    `;
    return { ok: true as const, status: next };
  });

export const listPolicies = createServerFn({ method: "GET" })
  .validator(brandSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<PolicyRow>`
      select id, title, clause, body
      from policies
      where brand_id = ${data.brandId}
      order by clause
    `;
    return rows;
  });

export const listAutomations = createServerFn({ method: "GET" })
  .validator(brandSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      name: string;
      trigger_text: string;
      action_text: string;
      enabled: boolean;
      runs_7d: number;
    }>`
      select id, name, trigger_text, action_text, enabled, runs_7d
      from automations
      where brand_id = ${data.brandId}
      order by name
    `;
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      triggerText: row.trigger_text,
      actionText: row.action_text,
      enabled: Boolean(row.enabled),
      runs7d: Number(row.runs_7d),
    })) satisfies AutomationRow[];
  });

export const toggleAutomation = createServerFn({ method: "POST" })
  .validator(idSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{ id: string; enabled: boolean }>`
      update automations
      set enabled = not enabled
      where id = ${data.id}
      returning id, enabled
    `;
    if (!rows[0]) return { ok: false as const, error: "That automation is not on this brand." };
    return { ok: true as const, enabled: Boolean(rows[0].enabled) };
  });

export const listQuality = createServerFn({ method: "GET" })
  .validator(brandSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      conversation_id: string;
      subject: string;
      agent_kind: string;
      policy_score: number;
      tone_score: number;
      resolution_score: number;
      note: string;
    }>`
      select q.id, q.conversation_id, c.subject, q.agent_kind,
             q.policy_score, q.tone_score, q.resolution_score, q.note
      from quality_scores q
      join conversations c on c.id = q.conversation_id
      where q.brand_id = ${data.brandId}
      order by q.id
    `;
    return rows.map((row) => ({
      id: row.id,
      conversationId: row.conversation_id,
      subject: row.subject,
      agentKind: row.agent_kind,
      policyScore: Number(row.policy_score),
      toneScore: Number(row.tone_score),
      resolutionScore: Number(row.resolution_score),
      note: row.note,
    })) satisfies QualityRow[];
  });
