import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Mark } from "./frame-3lkK4hYo.mjs";
import { i as Route$4 } from "./router-Bj3PWY6J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/w._tenant-S9qGVgVr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Widget() {
	const { tenant } = Route$4.useParams();
	const slug = tenant.toLowerCase();
	const [message, setMessage] = (0, import_react.useState)("");
	const [bodyTenant, setBodyTenant] = (0, import_react.useState)("");
	const [turns, setTurns] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [sessionReady, setSessionReady] = (0, import_react.useState)(false);
	async function ensureSession() {
		if (sessionReady) return true;
		const response = await fetch(`/w/${slug}/session`, {
			method: "POST",
			credentials: "include",
			headers: {
				"content-type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify({
				customer_ref: "widget",
				tenant_id: bodyTenant.trim() || void 0
			})
		});
		if (!response.ok) {
			const body = await response.json().catch(() => ({}));
			setTurns((current) => [...current, {
				role: "assistant",
				text: body.detail || "Session was refused.",
				meta: String(response.status)
			}]);
			return false;
		}
		setSessionReady(true);
		return true;
	}
	async function send(text) {
		const trimmed = text.trim();
		if (!trimmed || busy) return;
		setBusy(true);
		setTurns((current) => [...current, {
			role: "user",
			text: trimmed
		}]);
		setMessage("");
		if (!await ensureSession()) {
			setBusy(false);
			return;
		}
		const response = await fetch("/chat", {
			method: "POST",
			credentials: "include",
			headers: {
				"content-type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify({
				message: trimmed,
				tenant_id: bodyTenant.trim() || void 0
			})
		});
		const body = await response.json().catch(() => ({}));
		if (!response.ok) setTurns((current) => [...current, {
			role: "assistant",
			text: body.detail || "The chat endpoint failed.",
			meta: String(response.status)
		}]);
		else setTurns((current) => [...current, {
			role: "assistant",
			text: body.response || "No reply.",
			meta: [body.workflow_status, body.citations?.[0]].filter(Boolean).join(" · ")
		}]);
		setBusy(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex h-14 items-center justify-between border-b border-line px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-muted",
				children: slug
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-lg flex-col px-4 py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Opens a session on this brand, then posts to /chat. A forged tenant in the body is rejected. Nothing here marks you verified, and Stripe is not called."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex-1 space-y-3",
					children: [turns.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border border-dashed border-line p-4 text-sm text-muted",
						children: "Ask about a damaged return, or try a refund of 2500."
					}), turns.map((turn, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: turn.role === "user" ? "ml-8" : "mr-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: turn.role === "user" ? "rounded-lg bg-surface px-3 py-2 text-sm" : "rounded-lg border border-line px-3 py-2 text-sm",
							children: turn.text
						}), turn.meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-xs text-faint",
							children: turn.meta
						})]
					}, `${turn.role}-${i}`))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 space-y-2",
					onSubmit: (e) => {
						e.preventDefault();
						send(message);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs text-muted",
							htmlFor: "forge",
							children: "Optional forged tenant (widget rejects a mismatch)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "forge",
							value: bodyTenant,
							onChange: (e) => setBodyTenant(e.target.value),
							placeholder: "leave empty",
							className: "h-11 w-full rounded-md border border-line bg-elev px-3 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: message,
								onChange: (e) => setMessage(e.target.value),
								placeholder: "Message",
								className: "h-11 min-w-0 flex-1 rounded-md border border-line bg-elev px-3 text-sm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: busy,
								className: "h-11 rounded-md bg-accent px-4 text-sm font-medium text-ink disabled:opacity-50",
								children: "Send"
							})]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { Widget as component };
