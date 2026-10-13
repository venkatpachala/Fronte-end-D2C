import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Page } from "./frame-3lkK4hYo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/architecture-DEbYQDwR.js
var import_jsx_runtime = require_jsx_runtime();
var LAYERS = [
	{
		n: "Edge",
		d: "Session, widget path, or owner cookie picks the tenant. Body tenant_id is ignored or rejected."
	},
	{
		n: "Runtime",
		d: "Intent, missing inputs, and the refund cap. Tools are skipped when the case must wait."
	},
	{
		n: "Knowledge",
		d: "Retrieval without a tenant filter returns nothing. Another brand’s clauses never appear."
	},
	{
		n: "Tools",
		d: "Credentials come from the brand row. A Stripe key in the chat body is dropped."
	},
	{
		n: "Audit",
		d: "Each turn records tenant, case, tool status, and latency. Logs carry the same ids."
	}
];
function Architecture() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		eyebrow: "Architecture",
		title: "The model does not choose the brand.",
		lede: "Production support systems establish identity once, then force it through retrieval, tools, memory, and cost. Archal’s preview implements that contract.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-3",
			children: LAYERS.map((layer, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid gap-2 rounded-lg border border-line bg-elev p-4 md:grid-cols-12 md:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-sm text-accent md:col-span-1",
						children: ["0", i + 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg md:col-span-3",
						children: layer.n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted md:col-span-8",
						children: layer.d
					})
				]
			}, layer.n))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 max-w-2xl text-sm text-muted",
			children: "This preview keeps brand rows in the browser so you can switch tenants without an account. The chat and approval endpoints still run on the server and refuse a mismatched tenant."
		})]
	});
}
//#endregion
export { Architecture as component };
