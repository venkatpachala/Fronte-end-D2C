import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as SiteFrame } from "./frame-3lkK4hYo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enter-Ccb1pksH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Enter() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [brand, setBrand] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("signup");
	const [message, setMessage] = (0, import_react.useState)("");
	const [keys, setKeys] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit(event) {
		event.preventDefault();
		setBusy(true);
		setMessage("");
		const response = await fetch(mode === "signup" ? "/signup" : "/login", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify({
				email,
				password,
				brand
			})
		});
		const body = await response.json();
		setBusy(false);
		if (!response.ok) {
			setKeys(null);
			setMessage(body.detail || "That did not work.");
			return;
		}
		setKeys(body);
		setMessage(mode === "signup" ? "Brand created. Keys are shown once." : "Signed in.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-muted",
				children: "Owner"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl leading-none",
				children: "Open a brand on Archal."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "Signup creates a tenant, a widget test key, and a supervisor test key. The seeded desks stay open without an account."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `h-11 rounded-md px-4 text-sm ${mode === "signup" ? "bg-accent text-ink" : "border border-line"}`,
					onClick: () => setMode("signup"),
					children: "Create brand"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `h-11 rounded-md px-4 text-sm ${mode === "login" ? "bg-accent text-ink" : "border border-line"}`,
					onClick: () => setMode("login"),
					children: "Sign in"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 space-y-3",
				onSubmit: (event) => void submit(event),
				children: [
					mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "h-11 w-full rounded-md border border-line bg-elev px-3",
						placeholder: "Brand name",
						value: brand,
						onChange: (event) => setBrand(event.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "h-11 w-full rounded-md border border-line bg-elev px-3",
						placeholder: "Email",
						type: "email",
						value: email,
						onChange: (event) => setEmail(event.target.value),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "h-11 w-full rounded-md border border-line bg-elev px-3",
						placeholder: "Password",
						type: "password",
						value: password,
						onChange: (event) => setPassword(event.target.value),
						required: true,
						minLength: 8
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy,
						className: "h-11 w-full rounded-md bg-accent font-medium text-ink disabled:opacity-50",
						children: busy ? "Working" : mode === "signup" ? "Create" : "Sign in"
					})
				]
			}),
			message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm",
				children: message
			}),
			keys?.widget_key && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-4 overflow-x-auto rounded-md border border-line bg-elev p-4 font-mono text-xs text-muted",
				children: `tenant ${keys.tenant_id}
widget     ${keys.widget_key}
supervisor ${keys.supervisor_key}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/console",
				className: "mt-6 inline-flex h-11 items-center text-sm underline",
				children: "Use the seeded desk instead"
			})
		]
	}) });
}
//#endregion
export { Enter as component };
