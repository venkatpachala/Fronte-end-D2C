import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { i as decideCase, n as REFUND_CAP, o as handleChat, t as DAILY_CAP } from "./runtime-CjITINF3.mjs";
import { a as object, i as number, n as boolean, o as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BH5eZh_Z.js
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
var runChat_createServerFn_handler = createServerRpc({
	id: "1d0c444c61fdb3c33c749d838e7b20721e2abcdcebd8cb28467333849d8ff8af",
	name: "runChat",
	filename: "src/lib/api.ts"
}, (opts) => runChat.__executeServer(opts));
var runChat = createServerFn({ method: "POST" }).validator(chatSchema).handler(runChat_createServerFn_handler, async ({ data }) => {
	return handleChat({
		sessionTenant: data.sessionTenant,
		bodyTenant: data.bodyTenant,
		message: data.message,
		hasPolicy: data.hasPolicy,
		usedToday: data.usedToday,
		dailyCap: data.dailyCap ?? 2e3,
		killed: data.killed ?? false,
		photosAlready: data.photosAlready ?? false,
		channel: data.channel ?? "api"
	});
});
var decideSchema = object({
	sessionTenant: string().min(1).max(64),
	bodyTenant: string().max(64).optional(),
	currentStatus: string(),
	action: _enum(["approve", "reject"])
});
var runDecision_createServerFn_handler = createServerRpc({
	id: "e54329133a5d4489f45779f9ad8674ab53059e4485df62249414fd94644bcbe6",
	name: "runDecision",
	filename: "src/lib/api.ts"
}, (opts) => runDecision.__executeServer(opts));
var runDecision = createServerFn({ method: "POST" }).validator(decideSchema).handler(runDecision_createServerFn_handler, async ({ data }) => decideCase(data));
var getPlatformStatus_createServerFn_handler = createServerRpc({
	id: "f37d94d95abc4b05fc1eb061dc4179fbef71fec1285a75059250310b4a91bd30",
	name: "getPlatformStatus",
	filename: "src/lib/api.ts"
}, (opts) => getPlatformStatus.__executeServer(opts));
var getPlatformStatus = createServerFn({ method: "GET" }).handler(getPlatformStatus_createServerFn_handler, async () => {
	return {
		service: "archal",
		mode: "sandbox",
		liveTools: false,
		refundCap: REFUND_CAP,
		dailyCap: DAILY_CAP,
		stripe: "not_called",
		shopify: "sandbox_lookup_only",
		checks: [
			{
				name: "Tenant from session",
				ok: true
			},
			{
				name: "Body tenant cannot switch brand",
				ok: true
			},
			{
				name: "Policy answers cite a clause",
				ok: true
			},
			{
				name: "Damaged returns ask for photos",
				ok: true
			},
			{
				name: "Refunds above cap wait",
				ok: true
			},
			{
				name: "Stripe stays off",
				ok: true
			}
		]
	};
});
//#endregion
export { getPlatformStatus_createServerFn_handler, runChat_createServerFn_handler, runDecision_createServerFn_handler };
