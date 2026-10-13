import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as STATUS_LABEL } from "./format-Dn_iidkQ.mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-load-CeIlBTVh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-6 items-center rounded-sm border px-2 font-mono text-xs whitespace-nowrap", status === "waiting_approval" || status === "open" ? "border-accent text-accent" : "border-line text-muted"),
		children: STATUS_LABEL[status] ?? status
	});
}
function Button({ tone = "accent", className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition-transform duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-50", tone === "accent" ? "bg-accent text-ink" : "border border-line bg-transparent text-fg", className),
		...props,
		children
	});
}
function Panel({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-lg border border-line bg-elev", className),
		children
	});
}
function Empty({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-dashed border-line px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-lg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-md text-sm text-muted",
			children: body
		})]
	});
}
function LoadingLines() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-40 rounded-sm bg-surface" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 rounded-lg border border-line bg-elev" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 rounded-lg border border-line bg-elev" })
		]
	});
}
function useLoad(load, deps) {
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [tick, setTick] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		setLoading(true);
		load().then((value) => {
			if (cancel) return;
			setData(value);
			setError("");
			setLoading(false);
		}).catch((err) => {
			if (cancel) return;
			setError(err instanceof Error ? err.message : "Request failed.");
			setLoading(false);
		});
		return () => {
			cancel = true;
		};
	}, [tick, ...deps]);
	return {
		data,
		error,
		loading,
		reload: () => setTick((n) => n + 1)
	};
}
//#endregion
export { StatusPill as a, Panel as i, Empty as n, useLoad as o, LoadingLines as r, Button as t };
