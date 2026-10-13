import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as useBrand, u as listPolicies } from "./format-Dn_iidkQ.mjs";
import { n as Empty, o as useLoad, r as LoadingLines } from "./use-load-CeIlBTVh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/policies-BqLwgKYw.js
var import_jsx_runtime = require_jsx_runtime();
function Policies() {
	const { brandId, brand } = useBrand();
	const { data, error, loading } = useLoad(() => listPolicies({ data: { brandId } }), [brandId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl leading-none",
				children: "Policies"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 max-w-xl text-sm text-muted",
				children: [brand ? `${brand.name} answers from these clauses.` : "Published clauses.", " If a clause is missing, Archal says it does not know."]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/console/knowledge",
				className: "text-sm text-muted hover:text-fg",
				children: "Upload a snapshot"
			})]
		}),
		loading && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingLines, {})
		}) : null,
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "Policies did not load.",
				body: error
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 divide-y divide-line overflow-hidden rounded-lg border border-line",
			children: (data ?? []).map((policy) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "grid gap-2 px-4 py-5 md:grid-cols-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-accent",
					children: policy.clause
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-lg",
					children: policy.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted md:col-span-3",
					children: policy.body
				})]
			}, policy.id))
		}),
		!loading && !error && (data?.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "No published clauses.",
				body: "This brand has nothing for Archal to cite."
			})
		}) : null
	] });
}
//#endregion
export { Policies as component };
