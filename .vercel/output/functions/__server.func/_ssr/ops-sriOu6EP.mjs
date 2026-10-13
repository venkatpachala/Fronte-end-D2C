import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { a as object, o as string, t as _enum } from "../_libs/zod.mjs";
import { t as getSql } from "./db-Y0lnj7HL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ops-sriOu6EP.js
var STATUSES = [
	"open",
	"waiting_customer",
	"waiting_approval",
	"ai_resolved",
	"approved_held",
	"rejected"
];
var brandSchema = object({ brandId: string().min(1).max(64) });
var listSchema = brandSchema.extend({ status: _enum(STATUSES).optional() });
var idSchema = object({ id: string().min(1).max(64) });
var replySchema = idSchema.extend({ body: string().trim().min(1).max(2e3) });
var decideSchema = idSchema.extend({ action: _enum(["approve", "reject"]) });
function asIso(value) {
	if (value instanceof Date) return value.toISOString();
	return String(value ?? "");
}
function mapConversation(row) {
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
		updatedAt: asIso(row.updated_at)
	};
}
var listBrands_createServerFn_handler = createServerRpc({
	id: "2844d3a0bc31558f33b43e62e24a5b7dd6656f4e2613a08faa94592c77639c4b",
	name: "listBrands",
	filename: "src/lib/ops.ts"
}, (opts) => listBrands.__executeServer(opts));
var listBrands = createServerFn({ method: "GET" }).handler(listBrands_createServerFn_handler, async () => {
	return (await (await getSql())`
    select id, name, segment, refund_cap from archal_tenants order by name desc
  `).map((row) => ({
		id: row.id,
		name: row.name,
		segment: row.segment,
		refundCap: Number(row.refund_cap)
	}));
});
var getOverview_createServerFn_handler = createServerRpc({
	id: "b8d26b83dbe6944003d797ac76a3be5983410c83c18a28b36ca1a27b66e26f1d",
	name: "getOverview",
	filename: "src/lib/ops.ts"
}, (opts) => getOverview.__executeServer(opts));
var getOverview = createServerFn({ method: "GET" }).validator(brandSchema).handler(getOverview_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const brands = await sql`
      select id, name, segment, refund_cap from archal_tenants where id = ${data.brandId}
    `;
	const brand = brands[0] ? {
		id: brands[0].id,
		name: brands[0].name,
		segment: brands[0].segment,
		refundCap: Number(brands[0].refund_cap)
	} : null;
	const counts = await sql`
      select
        count(*) filter (where status in ('open', 'waiting_customer', 'waiting_approval')) as open_count,
        count(*) filter (where status = 'ai_resolved') as ai_resolved,
        count(*) filter (where status = 'waiting_approval') as held,
        coalesce(round(avg(confidence)), 0) as avg_confidence
      from archal_cases
      where brand_id = ${data.brandId}
    `;
	const intents = await sql`
      select intent, count(*) as n
      from archal_cases
      where brand_id = ${data.brandId}
      group by intent
      order by n desc
    `;
	const channels = await sql`
      select channel, count(*) as n
      from archal_cases
      where brand_id = ${data.brandId}
      group by channel
      order by n desc
    `;
	const volume = await sql`
      select day, inbound, resolved_by_ai
      from volume_days
      where brand_id = ${data.brandId}
      order by day
    `;
	const queue = await sql`
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
		intents: intents.map((row) => ({
			intent: row.intent,
			n: Number(row.n)
		})),
		channels: channels.map((row) => ({
			channel: row.channel,
			n: Number(row.n)
		})),
		volume: volume.map((row) => ({
			day: String(row.day).slice(0, 10),
			inbound: Number(row.inbound),
			resolvedByAi: Number(row.resolved_by_ai)
		})),
		queue: queue.map(mapConversation)
	};
});
var listConversations_createServerFn_handler = createServerRpc({
	id: "f06b2cdb552826f4ccb39c8c5e0820b57d68dbc36873a62ad51984d72c7c4e3e",
	name: "listConversations",
	filename: "src/lib/ops.ts"
}, (opts) => listConversations.__executeServer(opts));
var listConversations = createServerFn({ method: "GET" }).validator(listSchema).handler(listConversations_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const status = data.status ?? null;
	return (await sql`
      select id, brand_id, channel, customer_label, subject, preview, intent, status, priority,
             ai_handled, confidence, amount_inr, order_ref, assignee, updated_at
      from archal_cases
      where brand_id = ${data.brandId}
        and (${status}::text is null or status = ${status})
      order by updated_at desc
    `).map(mapConversation);
});
var getConversation_createServerFn_handler = createServerRpc({
	id: "5627202ab3d8235cd6be7eecbbc3f3e247e596c19f703414e1b950e98e00ff38",
	name: "getConversation",
	filename: "src/lib/ops.ts"
}, (opts) => getConversation.__executeServer(opts));
var getConversation = createServerFn({ method: "GET" }).validator(idSchema).handler(getConversation_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const rows = await sql`
      select id, brand_id, channel, customer_label, subject, preview, intent, status, priority,
             ai_handled, confidence, amount_inr, order_ref, assignee, updated_at
      from archal_cases
      where id = ${data.id}
    `;
	const conversation = rows[0] ? mapConversation(rows[0]) : null;
	if (!conversation) return {
		conversation: null,
		messages: []
	};
	return {
		conversation,
		messages: (await sql`
      select id, author, body, citation, created_at
      from archal_messages
      where conversation_id = ${data.id}
      order by id
    `).map((row) => ({
			id: Number(row.id),
			author: row.author,
			body: row.body,
			citation: row.citation,
			createdAt: asIso(row.created_at)
		}))
	};
});
var postReply_createServerFn_handler = createServerRpc({
	id: "d3eef7b055ecd35925efd7453b3c025e369744f982f5f92d2caa1f6b24476d95",
	name: "postReply",
	filename: "src/lib/ops.ts"
}, (opts) => postReply.__executeServer(opts));
var postReply = createServerFn({ method: "POST" }).validator(replySchema).handler(postReply_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const existing = await sql`
      select id, status from archal_cases where id = ${data.id}
    `;
	if (!existing[0]) return {
		ok: false,
		error: "That case is not on this desk."
	};
	const next = existing[0].status === "waiting_approval" || existing[0].status === "approved_held" ? existing[0].status : "waiting_customer";
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
	return {
		ok: true,
		status: next
	};
});
var decideRefund_createServerFn_handler = createServerRpc({
	id: "b8a989d775e630a3a2f744876b4c63f21e23505fd1e6f1db2cd655f85542ffbe",
	name: "decideRefund",
	filename: "src/lib/ops.ts"
}, (opts) => decideRefund.__executeServer(opts));
var decideRefund = createServerFn({ method: "POST" }).validator(decideSchema).handler(decideRefund_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const row = (await sql`
      select id, status, amount_inr from archal_cases where id = ${data.id}
    `)[0];
	if (!row) return {
		ok: false,
		error: "That case is not on this desk."
	};
	if (row.status !== "waiting_approval") return {
		ok: false,
		error: "Already decided. Stripe was not called."
	};
	const next = data.action === "approve" ? "approved_held" : "rejected";
	const note = data.action === "approve" ? "A person approved the hold. The refund is not sent. Stripe was not called." : "A person rejected this. The customer should be told it will not proceed. Stripe was not called.";
	if (!(await sql`
      update archal_cases
      set status = ${next}, updated_at = now(), assignee = 'Floor'
      where id = ${data.id} and status = 'waiting_approval'
      returning id
    `)[0]) return {
		ok: false,
		error: "Already decided. Stripe was not called."
	};
	await sql`
      update archal_tasks
      set status = ${data.action === "approve" ? "approved" : "rejected"}, note = ${note}
      where case_id = ${data.id} and status = 'pending'
    `;
	await sql`
      insert into archal_messages (conversation_id, author, body, citation)
      values (${data.id}, 'archal', ${note}, ${"Clause 9.1"})
    `;
	return {
		ok: true,
		status: next
	};
});
var listPolicies_createServerFn_handler = createServerRpc({
	id: "475fa3927352ff8807c927bf8210e7f2dee7744c07cb6c326340219f880db5cd",
	name: "listPolicies",
	filename: "src/lib/ops.ts"
}, (opts) => listPolicies.__executeServer(opts));
var listPolicies = createServerFn({ method: "GET" }).validator(brandSchema).handler(listPolicies_createServerFn_handler, async ({ data }) => {
	return await (await getSql())`
      select id, title, clause, body
      from policies
      where brand_id = ${data.brandId}
      order by clause
    `;
});
var listAutomations_createServerFn_handler = createServerRpc({
	id: "9d13a9b330e9369c043bd9b6c611ae9d8645e1c631d1503b9c8d659740843465",
	name: "listAutomations",
	filename: "src/lib/ops.ts"
}, (opts) => listAutomations.__executeServer(opts));
var listAutomations = createServerFn({ method: "GET" }).validator(brandSchema).handler(listAutomations_createServerFn_handler, async ({ data }) => {
	return (await (await getSql())`
      select id, name, trigger_text, action_text, enabled, runs_7d
      from automations
      where brand_id = ${data.brandId}
      order by name
    `).map((row) => ({
		id: row.id,
		name: row.name,
		triggerText: row.trigger_text,
		actionText: row.action_text,
		enabled: Boolean(row.enabled),
		runs7d: Number(row.runs_7d)
	}));
});
var toggleAutomation_createServerFn_handler = createServerRpc({
	id: "4be2452a00a537096ce3616f144171a97bf54ad656e82d963b91c0e738a9330d",
	name: "toggleAutomation",
	filename: "src/lib/ops.ts"
}, (opts) => toggleAutomation.__executeServer(opts));
var toggleAutomation = createServerFn({ method: "POST" }).validator(idSchema).handler(toggleAutomation_createServerFn_handler, async ({ data }) => {
	const rows = await (await getSql())`
      update automations
      set enabled = not enabled
      where id = ${data.id}
      returning id, enabled
    `;
	if (!rows[0]) return {
		ok: false,
		error: "That automation is not on this brand."
	};
	return {
		ok: true,
		enabled: Boolean(rows[0].enabled)
	};
});
var listQuality_createServerFn_handler = createServerRpc({
	id: "e44e50a84d695cc4cfbc88156b723d586ae50b215de506f891005536d74590d6",
	name: "listQuality",
	filename: "src/lib/ops.ts"
}, (opts) => listQuality.__executeServer(opts));
var listQuality = createServerFn({ method: "GET" }).validator(brandSchema).handler(listQuality_createServerFn_handler, async ({ data }) => {
	return (await (await getSql())`
      select q.id, q.conversation_id, c.subject, q.agent_kind,
             q.policy_score, q.tone_score, q.resolution_score, q.note
      from quality_scores q
      join conversations c on c.id = q.conversation_id
      where q.brand_id = ${data.brandId}
      order by q.id
    `).map((row) => ({
		id: row.id,
		conversationId: row.conversation_id,
		subject: row.subject,
		agentKind: row.agent_kind,
		policyScore: Number(row.policy_score),
		toneScore: Number(row.tone_score),
		resolutionScore: Number(row.resolution_score),
		note: row.note
	}));
});
//#endregion
export { decideRefund_createServerFn_handler, getConversation_createServerFn_handler, getOverview_createServerFn_handler, listAutomations_createServerFn_handler, listBrands_createServerFn_handler, listConversations_createServerFn_handler, listPolicies_createServerFn_handler, listQuality_createServerFn_handler, postReply_createServerFn_handler, toggleAutomation_createServerFn_handler };
