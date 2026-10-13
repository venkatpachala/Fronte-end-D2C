import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as gradeSandbox, r as SANDBOX_STEPS } from "./runtime-CjITINF3.mjs";
import { n as hasReadyPolicy, r as useArchal, t as activeBrand } from "./store-CxlqdfHh.mjs";
import { n as runChat } from "./api-BryYnmPN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sandbox-BsluGou4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function caseFromChat(tenantId, message, result) {
	const id = `case_${Date.now().toString(36)}`;
	const at = (/* @__PURE__ */ new Date()).toISOString();
	return {
		id,
		tenantId,
		customer: "Preview customer",
		intent: result.intent,
		status: result.workflowStatus,
		preview: message,
		response: result.response,
		citations: result.citations,
		missingInputs: result.missingInputs,
		orderId: result.orderId,
		amount: result.amount,
		tools: result.tools,
		createdAt: at,
		timeline: [{
			id: `tl_${id}`,
			at,
			text: result.response
		}]
	};
}
function Sandbox() {
	const brand = useArchal((s) => activeBrand(s));
	const hasPolicy = useArchal((s) => hasReadyPolicy(s, s.activeId));
	const pushCase = useArchal((s) => s.pushCase);
	const bumpUsage = useArchal((s) => s.bumpUsage);
	const markSandbox = useArchal((s) => s.markSandbox);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [summary, setSummary] = (0, import_react.useState)("");
	async function runAll() {
		if (!brand) return;
		setBusy(true);
		setSummary("");
		const next = [];
		let failed = false;
		for (const step of SANDBOX_STEPS) {
			const result = await runChat({ data: {
				sessionTenant: brand.id,
				bodyTenant: "someone-else",
				message: step.message,
				hasPolicy,
				usedToday: brand.usedToday,
				dailyCap: brand.dailyCap,
				killed: brand.killed,
				photosAlready: false
			} });
			if (!result.ok) {
				next.push({
					id: step.id,
					pass: false,
					notes: [result.error],
					response: result.error
				});
				failed = true;
				continue;
			}
			if (result.ok && result.tenantId !== brand.id) {
				next.push({
					id: step.id,
					pass: false,
					notes: ["Tenant switched."],
					response: result.response
				});
				failed = true;
				continue;
			}
			const grade = gradeSandbox(result, step.id);
			if (!grade.pass) failed = true;
			next.push({
				id: step.id,
				pass: grade.pass,
				notes: grade.notes,
				response: result.response
			});
			pushCase(caseFromChat(brand.id, step.message, result));
			bumpUsage();
		}
		setRows(next);
		if (!failed && hasPolicy && !brand.killed) {
			markSandbox();
			setSummary("Sandbox passed. Live tools stay off until an admin enables this brand.");
		} else if (!hasPolicy) setSummary("No policy snapshot, so the gate cannot pass. Upload a PDF in Knowledge.");
		else setSummary("Sandbox did not pass. Read the notes, then run it again.");
		setBusy(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-medium",
			children: "Sandbox"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-2xl text-sm text-muted",
			children: "Three messages run against the server. Each request sends a forged body tenant. A pass means the session brand still answered, with a citation, a photo ask, and a held refund."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled: busy,
			onClick: runAll,
			className: "mt-6 h-11 rounded-md bg-accent px-4 text-sm font-medium text-ink disabled:opacity-50",
			children: busy ? "Running…" : "Run three messages"
		}),
		brand?.sandboxPassedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 font-mono text-xs text-muted",
			children: ["Last pass ", brand.sandboxPassedAt.slice(0, 19).replace("T", " ")]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-3",
			children: SANDBOX_STEPS.map((step) => {
				const row = rows.find((r) => r.id === step.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-line p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: step.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted",
								children: row ? row.pass ? "pass" : "fail" : step.id
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: step.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-faint",
							children: step.expect
						}),
						row && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							children: row.response
						}),
						row && row.notes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 text-sm text-muted",
							children: row.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: n }, n))
						})
					]
				}, step.id);
			})
		}),
		summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm",
			children: summary
		})
	] });
}
//#endregion
export { Sandbox as component };
