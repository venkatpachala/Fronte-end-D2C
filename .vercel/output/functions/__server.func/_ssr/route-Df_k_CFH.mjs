import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link, g as Outlet, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useArchal } from "./store-CxlqdfHh.mjs";
import { m as useBrand, o as inr, t as BrandProvider } from "./format-Dn_iidkQ.mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
import { t as Mark } from "./frame-3lkK4hYo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-Df_k_CFH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useHydrateArchal() {
	const setHydrated = useArchal((s) => s.setHydrated);
	(0, import_react.useEffect)(() => {
		useArchal.persist.rehydrate();
		setHydrated(true);
	}, [setHydrated]);
}
var WORK = [
	{
		to: "/console",
		label: "Overview",
		exact: true
	},
	{
		to: "/console/inbox",
		label: "Inbox",
		exact: false
	},
	{
		to: "/console/approvals",
		label: "Approvals",
		exact: false
	},
	{
		to: "/console/quality",
		label: "Quality",
		exact: false
	},
	{
		to: "/console/policies",
		label: "Policies",
		exact: false
	},
	{
		to: "/console/automations",
		label: "Automations",
		exact: false
	}
];
var SETUP = [
	{
		to: "/console/sandbox",
		label: "Sandbox",
		exact: false
	},
	{
		to: "/console/knowledge",
		label: "Knowledge",
		exact: false
	},
	{
		to: "/console/connections",
		label: "Connections",
		exact: false
	},
	{
		to: "/console/install",
		label: "Install",
		exact: false
	}
];
function ConsoleFrame({ children }) {
	useHydrateArchal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsoleChrome, { children }) });
}
function NavLink({ to, label, exact, path }) {
	const on = exact ? path === to : path.startsWith(to);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: cn("flex h-11 shrink-0 items-center rounded-md px-3 text-sm text-muted", on && "bg-surface text-fg"),
		children: label
	});
}
function ConsoleChrome({ children }) {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const { brand, brands, brandId, setBrandId, error } = useBrand();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col md:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "border-b border-line md:w-56 md:shrink-0 md:border-b-0 md:border-r",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-muted",
							children: "Desk"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted",
							htmlFor: "brand",
							children: "Brand"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "brand",
							className: "mt-1 h-11 w-full rounded-md border border-line bg-elev px-2 text-sm",
							value: brands.some((row) => row.id === brandId) ? brandId : brand?.id ?? "northline",
							onChange: (event) => setBrandId(event.target.value),
							children: [brands.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "northline",
								children: "Northline"
							}) : null, brands.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: row.id,
								children: row.name
							}, row.id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible",
						children: [
							WORK.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								...item,
								path
							}, item.to)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hidden px-3 pt-4 pb-1 font-mono text-xs uppercase tracking-widest text-faint md:block",
								children: "Setup"
							}),
							SETUP.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								...item,
								path
							}, item.to))
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-12 items-center justify-between gap-3 border-b border-line px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-mono text-xs text-muted",
						children: brand ? `${brand.name} · ${brand.segment} · cap ${inr(brand.refundCap)}` : "Loading the desk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shrink-0 font-mono text-xs text-muted",
						children: "Charges off"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 md:p-6",
					children: [error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-sm text-accent",
						children: error
					}) : null, children]
				})]
			})]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsoleFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
//#endregion
export { SplitComponent as component };
