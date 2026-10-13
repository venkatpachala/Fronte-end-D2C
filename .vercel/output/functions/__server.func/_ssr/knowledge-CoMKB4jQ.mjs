import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useArchal } from "./store-CxlqdfHh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/knowledge-CoMKB4jQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Knowledge() {
	const activeId = useArchal((s) => s.activeId);
	const docs = useArchal((s) => s.docs.filter((d) => d.tenantId === s.activeId));
	const addDoc = useArchal((s) => s.addDoc);
	const removeDoc = useArchal((s) => s.removeDoc);
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-medium",
			children: "Knowledge"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-2xl text-sm text-muted",
			children: "PDF only, 8 MB max. A ready file creates a snapshot id for this brand. The sample Northline pack is not copied to a new brand."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "mt-6 inline-flex h-11 cursor-pointer items-center rounded-md bg-accent px-4 text-sm font-medium text-ink",
			children: ["Upload PDF", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: "application/pdf,.pdf",
				className: "sr-only",
				onChange: (e) => {
					const file = e.target.files?.[0];
					e.target.value = "";
					if (!file) return;
					const result = addDoc({
						name: file.name,
						bytes: file.size
					});
					setError(result.ok ? "" : result.error || "Upload failed.");
				}
			})]
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: error
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-6 divide-y divide-line rounded-lg border border-line",
			children: [docs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "px-4 py-6 text-sm text-muted",
				children: [
					"No snapshot for ",
					activeId,
					"."
				]
			}), docs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-col gap-2 px-4 py-4 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: d.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-xs text-muted",
					children: d.status === "ready" ? `${d.snapshotId} · ${d.pages} pages` : d.error
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-md border border-line px-3 text-sm",
					onClick: () => removeDoc(d.id),
					children: "Delete"
				})]
			}, d.id))]
		})
	] });
}
//#endregion
export { Knowledge as component };
