import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Page } from "./frame-3lkK4hYo.mjs";
import { t as getPlatformStatus } from "./api-BryYnmPN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-BGsONwjE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StatusPage() {
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		getPlatformStatus().then(setData).catch(() => setError("Status endpoint did not respond."));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		eyebrow: "Status",
		title: "Sandbox is up. Live tools are off.",
		lede: "This page reads the server status function. It does not claim a paid host or a restored database.",
		children: [
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: error
			}),
			!data && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Checking the runtime…"
			}),
			data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-lg border border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 border-b border-line px-4 py-4 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Mode",
							v: data.mode
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Stripe",
							v: data.stripe
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Refund cap",
							v: `₹${data.refundCap}`
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: data.checks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between border-b border-line px-4 py-3 text-sm last:border-b-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-accent",
						children: c.ok ? "ok" : "down"
					})]
				}, c.name)) })]
			})
		]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs text-muted",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 font-mono text-sm",
		children: v
	})] });
}
//#endregion
export { StatusPage as component };
