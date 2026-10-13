import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as whenLabel, l as listConversations, m as useBrand, o as inr, s as intentLabel } from "./format-Dn_iidkQ.mjs";
import { a as StatusPill, n as Empty, o as useLoad, r as LoadingLines } from "./use-load-CeIlBTVh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox.index-BALf1_tQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "open",
		label: "Open"
	},
	{
		id: "waiting_customer",
		label: "Waiting"
	},
	{
		id: "waiting_approval",
		label: "Approval"
	},
	{
		id: "ai_resolved",
		label: "Resolved"
	}
];
function Inbox() {
	const { brandId } = useBrand();
	const { data, error, loading } = useLoad(() => listConversations({ data: { brandId } }), [brandId]);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const rows = (data ?? []).filter((row) => filter === "all" ? true : row.status === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl leading-none",
			children: "Inbox"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm text-muted",
			children: "Chat, WhatsApp, email, and voice for this brand. Another brand’s threads stay on their own desk."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex gap-2 overflow-x-auto pb-1",
			children: FILTERS.map((item) => {
				const on = filter === item.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": on,
					onClick: () => setFilter(item.id),
					className: on ? "h-11 shrink-0 rounded-md bg-accent px-3 text-sm font-medium text-ink" : "h-11 shrink-0 rounded-md border border-line px-3 text-sm text-muted",
					children: item.label
				}, item.id);
			})
		}),
		loading && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingLines, {})
		}) : null,
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "The inbox did not load.",
				body: error
			})
		}) : null,
		!loading && !error && rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "No threads in this view.",
				body: "Switch the filter, or change the brand. The other brand’s cases are not here."
			})
		}) : null,
		rows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-line overflow-hidden rounded-lg border border-line",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/console/inbox/$id",
				params: { id: row.id },
				className: "grid gap-2 px-4 py-4 hover:bg-elev md:grid-cols-12 md:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 md:col-span-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate",
							children: row.subject
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 truncate text-sm text-muted",
							children: row.preview
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-muted md:col-span-3",
						children: [
							row.customerLabel,
							" · ",
							row.channel,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden md:inline",
								children: [" · ", intentLabel(row.intent)]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-faint md:col-span-2",
						children: row.amountInr != null ? inr(row.amountInr) : whenLabel(row.updatedAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:col-span-1 md:justify-self-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: row.status })
					})
				]
			}) }, row.id))
		}) : null
	] });
}
//#endregion
export { Inbox as component };
