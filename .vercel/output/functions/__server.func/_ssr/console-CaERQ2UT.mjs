import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getOverview, m as useBrand, o as inr, s as intentLabel } from "./format-Dn_iidkQ.mjs";
import { a as StatusPill, i as Panel, n as Empty, o as useLoad, r as LoadingLines } from "./use-load-CeIlBTVh.mjs";
import { a as Tooltip, i as ResponsiveContainer, n as XAxis, r as Bar, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/console-CaERQ2UT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Overview() {
	const { brandId, brand } = useBrand();
	const { data, error, loading } = useLoad(() => getOverview({ data: { brandId } }), [brandId]);
	const [chartReady, setChartReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setChartReady(true), []);
	if (loading && !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingLines, {});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "The overview did not load.",
		body: error
	});
	if (!data) return null;
	const maxIntent = Math.max(1, ...data.intents.map((row) => row.n));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-muted",
					children: "Today"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl leading-none",
					children: brand?.name ?? "Desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-sm text-muted",
					children: "What is open, what Archal already closed, and what is waiting because it moves money."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/console/inbox",
				className: "inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-ink",
				children: "Open inbox"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Needs a person",
					v: String(data.open),
					d: "Open, waiting, or held"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Resolved by Archal",
					v: String(data.aiResolved),
					d: "Closed from policy, no charge"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Above the cap",
					v: String(data.held),
					d: brand ? `Hold line ${inr(brand.refundCap)}` : "Held"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Mean confidence",
					v: `${data.avgConfidence}`,
					d: "Across this brand’s cases"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "p-4 lg:col-span-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg",
							children: "Fourteen days"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-muted",
							children: "Inbound and resolved by Archal"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-44",
						children: chartReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: data.volume,
								barGap: 2,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										hide: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										cursor: { fill: "var(--color-surface)" },
										contentStyle: {
											background: "var(--color-elev)",
											border: "1px solid var(--color-line)",
											borderRadius: 8,
											color: "var(--color-fg)",
											fontSize: 12
										},
										labelFormatter: (label) => String(label).slice(5)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "inbound",
										fill: "var(--color-line)",
										radius: [
											2,
											2,
											0,
											0
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "resolvedByAi",
										fill: "var(--color-accent)",
										radius: [
											2,
											2,
											0,
											0
										]
									})
								]
							})
						}) : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex gap-4 font-mono text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "inline-block h-2 w-2 bg-line" }), " Inbound"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "inline-block h-2 w-2 bg-accent" }), " Resolved by Archal"]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "p-4 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: "By intent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3",
					children: [data.intents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-muted",
						children: "No cases for this brand."
					}) : null, data.intents.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "capitalize",
							children: intentLabel(row.intent)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-muted tabular-nums",
							children: row.n
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 h-1.5 rounded-sm bg-surface",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 rounded-sm bg-accent",
							style: { width: `${Math.round(row.n / maxIntent * 100)}%` }
						})
					})] }, row.intent))]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: "Queue"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/console/approvals",
					className: "text-sm text-muted hover:text-fg",
					children: "Approvals"
				})]
			}), data.queue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					title: "Nothing is waiting.",
					body: "Archal has no open, held, or customer-blocked cases for this brand."
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-line overflow-hidden rounded-lg border border-line",
				children: data.queue.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/console/inbox/$id",
					params: { id: row.id },
					className: "flex flex-col gap-2 px-4 py-4 hover:bg-elev sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate",
							children: row.subject
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-xs text-muted",
							children: [
								row.customerLabel,
								" · ",
								row.channel,
								" · ",
								row.orderRef ?? "no order"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: row.status })]
				}) }, row.id))
			})]
		})
	] });
}
function Stat({ k, v, d }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-elev px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-muted",
				children: k
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-4xl leading-none tabular-nums",
				children: v
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: d
			})
		]
	});
}
//#endregion
export { Overview as component };
