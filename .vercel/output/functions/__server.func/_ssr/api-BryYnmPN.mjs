import { t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, n as boolean, o as string, t as _enum } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BryYnmPN.js
var chatSchema = object({
	sessionTenant: string().min(1).max(64),
	bodyTenant: string().max(64).optional(),
	message: string().max(2e3),
	hasPolicy: boolean(),
	usedToday: number().int().min(0),
	dailyCap: number().int().min(1).max(1e5).optional(),
	killed: boolean().optional(),
	photosAlready: boolean().optional(),
	channel: _enum(["api", "widget"]).optional()
});
var runChat = createServerFn({ method: "POST" }).validator(chatSchema).handler(createSsrRpc("1d0c444c61fdb3c33c749d838e7b20721e2abcdcebd8cb28467333849d8ff8af"));
var decideSchema = object({
	sessionTenant: string().min(1).max(64),
	bodyTenant: string().max(64).optional(),
	currentStatus: string(),
	action: _enum(["approve", "reject"])
});
var runDecision = createServerFn({ method: "POST" }).validator(decideSchema).handler(createSsrRpc("e54329133a5d4489f45779f9ad8674ab53059e4485df62249414fd94644bcbe6"));
var getPlatformStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("f37d94d95abc4b05fc1eb061dc4179fbef71fec1285a75059250310b4a91bd30"));
//#endregion
export { runChat as n, runDecision as r, getPlatformStatus as t };
