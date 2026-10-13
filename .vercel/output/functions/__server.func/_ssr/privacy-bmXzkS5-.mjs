import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Page } from "./frame-3lkK4hYo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-bmXzkS5-.js
var import_jsx_runtime = require_jsx_runtime();
function Privacy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		eyebrow: "Privacy",
		title: "Brand data in this preview stays in your browser.",
		lede: "Cases, uploads, and last-four connection digits are stored locally on this device. The chat endpoint receives the message and the session tenant, not a shop token.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl space-y-4 text-sm text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Do not paste real customer data, card numbers, or live API secrets. The connection form keeps only four digits." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A deletion note in Support clears the local workspace. It does not call Stripe." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Server logs for this preview are the status and chat handlers. They are not a production audit store." })
			]
		})
	});
}
//#endregion
export { Privacy as component };
