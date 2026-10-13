import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useArchal, t as activeBrand } from "./store-CxlqdfHh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/install-D9SRppRM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Install() {
	const brand = useArchal((s) => activeBrand(s));
	const addBrand = useArchal((s) => s.addBrand);
	const toggleKill = useArchal((s) => s.toggleKill);
	const [name, setName] = (0, import_react.useState)("");
	const [liveNote, setLiveNote] = (0, import_react.useState)("");
	if (!brand) return null;
	const snippet = `<script src="/widget.js" data-brand="${brand.id}"><\/script>`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium",
				children: "Install"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Key prefixes only. The live switch refuses without a host password, which this preview does not accept."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6 space-y-3 rounded-lg border border-line p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Widget key"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "font-mono",
							children: [brand.widgetPrefix, "····"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Supervisor key"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "font-mono",
							children: [brand.supervisorPrefix, "····"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Sandbox"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: brand.sandboxPassedAt ? "passed" : "not passed" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 text-lg",
				children: "Widget snippet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-2 overflow-x-auto rounded-lg border border-line bg-elev p-4 font-mono text-xs text-muted",
				children: snippet
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Open the sample at the widget path for this brand. The chat box has no verified field."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 text-lg",
				children: "New brand"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-2 flex flex-col gap-2 sm:flex-row",
				onSubmit: (e) => {
					e.preventDefault();
					if (!name.trim()) return;
					addBrand(name.trim());
					setName("");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: name,
					onChange: (e) => setName(e.target.value),
					placeholder: "Brand name",
					className: "h-11 flex-1 rounded-md border border-line bg-elev px-3 text-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "h-11 rounded-md border border-line px-4 text-sm",
					children: "Create empty brand"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 text-lg",
				children: "Controls"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-md border border-line px-4 text-sm",
					onClick: toggleKill,
					children: brand.killed ? "Enable brand" : "Disable brand"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-md border border-line px-4 text-sm",
					onClick: () => setLiveNote("Live tools stay off. This preview does not accept a host password."),
					children: "Enable live tools"
				})]
			}),
			liveNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: liveNote
			})
		]
	});
}
//#endregion
export { Install as component };
