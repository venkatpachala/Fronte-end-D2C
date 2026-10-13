import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as SiteFrame } from "./frame-3lkK4hYo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-DvOwjadv.js
var import_jsx_runtime = require_jsx_runtime();
var TIERS = [
	{
		name: "Desk",
		price: "₹18,000",
		period: "per brand / month",
		lead: "The queue, without the agent.",
		points: [
			"WhatsApp, email, and chat",
			"3 seats",
			"Cases, assignment, replies",
			"No policy agent"
		],
		cta: "Open the desk",
		to: "/console/inbox",
		hot: false
	},
	{
		name: "Resolve",
		price: "₹48,000",
		period: "per brand / month",
		lead: "The agent, the hold, and the score.",
		points: [
			"Everything in Desk",
			"Policy-cited replies",
			"Refund cap and approvals",
			"Quality on every scored thread",
			"Voice on the same case"
		],
		cta: "Use Resolve",
		to: "/console",
		hot: true
	},
	{
		name: "Platform",
		price: "Talk",
		period: "multi-brand",
		lead: "For a group that needs the gate.",
		points: [
			"More than one brand",
			"Sandbox before anything live",
			"Daily cap and kill switch",
			"A person on the rollout"
		],
		cta: "Read security",
		to: "/security",
		hot: false
	}
];
function Pricing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-16 md:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-muted",
				children: "Pricing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 max-w-3xl font-display text-5xl leading-none",
				children: "Priced per brand. The preview does not bill."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-2xl text-lg text-muted",
				children: "These are the live plans. This workspace is the product with card charges off, so you can run the desk before a contract."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-4 lg:grid-cols-3",
				children: TIERS.map((tier) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: tier.hot ? "rounded-lg border border-accent bg-elev p-6" : "rounded-lg border border-line p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-widest text-muted",
							children: tier.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-display text-5xl leading-none",
							children: tier.price
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: tier.period
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4",
							children: tier.lead
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-2 text-sm text-muted",
							children: tier.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: point }, point))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: tier.to,
							className: tier.hot ? "mt-8 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-ink" : "mt-8 inline-flex h-11 items-center rounded-md border border-line px-4 text-sm",
							children: tier.cta
						})
					]
				}, tier.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 max-w-2xl text-sm text-muted",
				children: "Shopify and Stripe credentials are not stored here. A connection, when you add one in setup, keeps a last four. WhatsApp in the install screen is still marked unavailable until a brand is enabled."
			})
		]
	}) });
}
//#endregion
export { Pricing as component };
