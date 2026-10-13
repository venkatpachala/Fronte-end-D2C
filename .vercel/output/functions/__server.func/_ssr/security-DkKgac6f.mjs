import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Page } from "./frame-3lkK4hYo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/security-DkKgac6f.js
var import_jsx_runtime = require_jsx_runtime();
var ROWS = [
	["Tenant source", "Session, path, or cookie. Never the model, never an unverified JSON field."],
	["Mismatch", "403 on chat and case reads when the body names another brand."],
	["Empty filter", "Retrieval with no tenant returns no chunks."],
	["Keys", "The console shows prefixes. Raw secrets are not rendered back."],
	["Money", "Above ₹2,000 the case waits. Approve does not call Stripe."],
	["Kill switch", "A disabled brand gets 403 on the next chat."],
	["Cap", "Default 2,000 chats a day. Past that, 429."],
	["WhatsApp", "Shown as unavailable. There is no save button."]
];
function Security() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		eyebrow: "Security",
		title: "Isolation is a test, not a slogan.",
		lede: "The preview enforces the same refusals the production control plane is built around. It does not store real shop tokens.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-lg border border-line",
			children: ROWS.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1 border-b border-line px-4 py-4 last:border-b-0 md:grid-cols-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm",
					children: k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted md:col-span-3",
					children: v
				})]
			}, k))
		})
	});
}
//#endregion
export { Security as component };
