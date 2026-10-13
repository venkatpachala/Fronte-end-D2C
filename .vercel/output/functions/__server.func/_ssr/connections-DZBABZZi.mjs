import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useArchal, t as activeBrand } from "./store-CxlqdfHh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/connections-DZBABZZi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Connections() {
	const brand = useArchal((s) => activeBrand(s));
	const setConnection = useArchal((s) => s.setConnection);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-medium",
			children: "Connections"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-2xl text-sm text-muted",
			children: "Only the last four digits are kept. A full token is not shown again and is not sent to chat. WhatsApp cannot be saved."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Conn, {
					name: "Shopify",
					last4: brand?.shopifyLast4 ?? "",
					onSave: (v) => setConnection("shopify", v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Conn, {
					name: "Stripe",
					last4: brand?.stripeLast4 ?? "",
					onSave: (v) => setConnection("stripe", v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Conn, {
					name: "Gmail",
					last4: brand?.gmailLast4 ?? "",
					onSave: (v) => setConnection("gmail", v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-line p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg",
							children: "WhatsApp"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-muted",
							children: "unavailable"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "No save button. This channel is not part of the sandbox."
					})]
				})
			]
		})
	] });
}
function Conn({ name, last4, onSave }) {
	const [value, setValue] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "rounded-lg border border-line p-4",
		onSubmit: (e) => {
			e.preventDefault();
			const digits = value.replace(/\D/g, "");
			if (digits.length < 4) {
				setNote("Enter at least four digits. The rest is discarded.");
				return;
			}
			onSave(digits);
			setValue("");
			setNote("Stored last four only.");
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-muted",
					children: last4 ? `···· ${last4}` : "not connected"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value,
					onChange: (e) => setValue(e.target.value),
					placeholder: "Token or key — only last 4 kept",
					className: "h-11 flex-1 rounded-md border border-line bg-elev px-3 text-sm",
					autoComplete: "off"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "h-11 rounded-md bg-accent px-4 text-sm font-medium text-ink",
					children: "Save last four"
				})]
			}),
			note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: note
			})
		]
	});
}
//#endregion
export { Connections as component };
