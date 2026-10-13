import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as listQuality, m as useBrand } from "./format-Dn_iidkQ.mjs";
import { i as Panel, n as Empty, o as useLoad, r as LoadingLines } from "./use-load-CeIlBTVh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quality-BWqTPUKg.js
var import_jsx_runtime = require_jsx_runtime();
function mean(values) {
	if (values.length === 0) return 0;
	return Math.round(values.reduce((sum, n) => sum + n, 0) / values.length);
}
function Quality() {
	const { brandId } = useBrand();
	const { data, error, loading } = useLoad(() => listQuality({ data: { brandId } }), [brandId]);
	const rows = data ?? [];
	const ai = rows.filter((row) => row.agentKind === "ai");
	const human = rows.filter((row) => row.agentKind === "human");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl leading-none",
			children: "Quality"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm text-muted",
			children: "Every scored thread is graded on policy, tone, and whether the case actually closed. Low scores stay visible."
		}),
		loading && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingLines, {})
		}) : null,
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "Scores did not load.",
				body: error
			})
		}) : null,
		rows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Score, {
					k: "Policy",
					ai: mean(ai.map((r) => r.policyScore)),
					human: mean(human.map((r) => r.policyScore))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Score, {
					k: "Tone",
					ai: mean(ai.map((r) => r.toneScore)),
					human: mean(human.map((r) => r.toneScore))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Score, {
					k: "Resolution",
					ai: mean(ai.map((r) => r.resolutionScore)),
					human: mean(human.map((r) => r.resolutionScore))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-line overflow-hidden rounded-lg border border-line",
			children: rows.map((row) => {
				const low = Math.min(row.policyScore, row.toneScore, row.resolutionScore) < 75;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "px-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/console/inbox/$id",
								params: { id: row.conversationId },
								className: "hover:underline",
								children: row.subject
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted",
								children: row.agentKind === "ai" ? "Archal" : "Floor"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: row.note
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `mt-3 font-mono text-xs tabular-nums ${low ? "text-accent" : "text-muted"}`,
							children: [
								"Policy ",
								row.policyScore,
								" · Tone ",
								row.toneScore,
								" · Resolution ",
								row.resolutionScore
							]
						})
					]
				}, row.id);
			})
		})] }) : null,
		!loading && !error && rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "No scores for this brand yet.",
				body: "Scored threads show up after a case is reviewed."
			})
		}) : null
	] });
}
function Score({ k, ai, human }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-muted",
				children: k
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-4xl leading-none tabular-nums",
				children: ai
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: ["Archal · floor ", human || "—"]
			})
		]
	});
}
//#endregion
export { Quality as component };
