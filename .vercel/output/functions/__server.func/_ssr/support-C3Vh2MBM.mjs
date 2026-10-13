import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useArchal } from "./store-CxlqdfHh.mjs";
import { n as Page } from "./frame-3lkK4hYo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support-C3Vh2MBM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Support() {
	const [note, setNote] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)("");
	function submit(kind) {
		const text = note.trim();
		if (!text && kind === "stuck") {
			setSaved("Describe the stuck case first.");
			return;
		}
		const key = "archal-support-notes";
		const prev = JSON.parse(localStorage.getItem(key) || "[]");
		prev.unshift({
			kind,
			text: text || "Delete local workspace",
			at: (/* @__PURE__ */ new Date()).toISOString()
		});
		localStorage.setItem(key, JSON.stringify(prev.slice(0, 20)));
		if (kind === "delete") {
			useArchal.persist.clearStorage();
			setSaved("Deletion noted. Reload the console to start from the Northline sample. Stripe was not called.");
		} else setSaved("Stuck-case note stored on this device. It does not call Stripe.");
		setNote("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		eyebrow: "Support",
		title: "Tell us a case is stuck, or wipe this browser.",
		lede: "Notes stay on this device. Neither action calls Stripe or a live shop.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "max-w-xl space-y-3",
			onSubmit: (e) => {
				e.preventDefault();
				submit("stuck");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "block text-sm",
					htmlFor: "note",
					children: "What happened"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "note",
					value: note,
					onChange: (e) => setNote(e.target.value),
					rows: 5,
					className: "w-full rounded-md border border-line bg-elev px-3 py-2 text-sm text-fg outline-none",
					placeholder: "Order, brand, and what the console did."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-11 rounded-md bg-accent px-4 text-sm font-medium text-ink",
						children: "Save note"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-md border border-line px-4 text-sm",
						onClick: () => submit("delete"),
						children: "Request local deletion"
					})]
				}),
				saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: saved
				})
			]
		})
	});
}
//#endregion
export { Support as component };
