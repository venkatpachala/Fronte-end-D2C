import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as listAutomations, m as useBrand, p as toggleAutomation } from "./format-Dn_iidkQ.mjs";
import { n as Empty, o as useLoad, r as LoadingLines } from "./use-load-CeIlBTVh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/automations-DUZdNfbN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Automations() {
	const { brandId } = useBrand();
	const { data, error, loading, reload } = useLoad(() => listAutomations({ data: { brandId } }), [brandId]);
	const [busyId, setBusyId] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	async function toggle(id) {
		setBusyId(id);
		setNote("");
		try {
			const result = await toggleAutomation({ data: { id } });
			if (!result.ok) setNote(result.error);
			else reload();
		} catch (err) {
			setNote(err instanceof Error ? err.message : "The switch did not save.");
		} finally {
			setBusyId("");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl leading-none",
			children: "Automations"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm text-muted",
			children: "Rules the agent is allowed to run. Turning one off stops that path. It does not delete the history."
		}),
		note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: note
		}) : null,
		loading && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingLines, {})
		}) : null,
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "Automations did not load.",
				body: error
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-line overflow-hidden rounded-lg border border-line",
			children: (data ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg",
								children: row.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-muted tabular-nums",
								children: [row.runs7d, " runs / 7d"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								"When ",
								row.triggerText.toLowerCase(),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: row.actionText
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "switch",
					"aria-checked": row.enabled,
					disabled: busyId === row.id,
					onClick: () => void toggle(row.id),
					className: row.enabled ? "h-11 shrink-0 rounded-md bg-accent px-4 text-sm font-medium text-ink" : "h-11 shrink-0 rounded-md border border-line px-4 text-sm text-muted",
					children: row.enabled ? "On" : "Off"
				})]
			}, row.id))
		}),
		!loading && !error && (data?.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "No rules for this brand.",
				body: "Automations are published per brand, with the policy."
			})
		}) : null
	] });
}
//#endregion
export { Automations as component };
