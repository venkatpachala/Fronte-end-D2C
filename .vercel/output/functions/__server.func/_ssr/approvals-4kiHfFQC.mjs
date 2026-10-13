import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as listConversations, m as useBrand, o as inr, r as decideRefund } from "./format-Dn_iidkQ.mjs";
import { n as Empty, o as useLoad, r as LoadingLines, t as Button } from "./use-load-CeIlBTVh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/approvals-4kiHfFQC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Approvals() {
	const { brandId, brand } = useBrand();
	const { data, error, loading, reload } = useLoad(() => listConversations({ data: {
		brandId,
		status: "waiting_approval"
	} }), [brandId]);
	const [busyId, setBusyId] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	async function decide(id, action) {
		setBusyId(id);
		setNote("");
		try {
			const result = await decideRefund({ data: {
				id,
				action
			} });
			if (!result.ok) setNote(result.error);
			else reload();
		} catch (err) {
			setNote(err instanceof Error ? err.message : "The decision did not save.");
		} finally {
			setBusyId("");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl leading-none",
			children: "Approvals"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm text-muted",
			children: brand ? `Anything over ${inr(brand.refundCap)} waits here. Approve holds the case. Stripe is not called.` : "Refunds above the cap wait here."
		}),
		note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: note
		}) : null,
		loading && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingLines, {})
		}) : null,
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "Approvals did not load.",
				body: error
			})
		}) : null,
		!loading && !error && (data?.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "Nothing is held.",
				body: "When a refund crosses the cap, it lands here instead of on a card."
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-3",
			children: (data ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "rounded-lg border border-line bg-elev p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/console/inbox/$id",
							params: { id: row.id },
							className: "text-lg hover:underline",
							children: row.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: row.preview
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-mono text-xs text-muted",
							children: [
								row.customerLabel,
								" · ",
								row.orderRef ?? "no order",
								" · ",
								inr(row.amountInr)
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							disabled: busyId === row.id,
							onClick: () => void decide(row.id, "approve"),
							children: "Approve hold"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							tone: "ghost",
							disabled: busyId === row.id,
							onClick: () => void decide(row.id, "reject"),
							children: "Reject"
						})]
					})]
				})
			}, row.id))
		})
	] });
}
//#endregion
export { Approvals as component };
