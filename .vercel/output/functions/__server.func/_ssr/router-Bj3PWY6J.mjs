import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as object, i as number, o as string, r as literal, s as union } from "../_libs/zod.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bj3PWY6J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-D26VmxGe.css";
var APP_NAME = "Archal";
var Route$39 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: `${APP_NAME} — Customer operations for D2C` },
			{
				name: "description",
				content: "Archal is the desk, the policy-cited agent, and the refund hold for D2C brands. Chat, WhatsApp, email, and voice. Money waits for a person."
			},
			{
				name: "theme-color",
				content: "#090a0b"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$25 = () => import("./routes-xwbZXtKO.mjs");
var Route$38 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./architecture-DEbYQDwR.mjs");
var Route$37 = createFileRoute("/architecture")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var handle$12 = async ({ request }) => {
	const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
	return dispatchArchal(request);
};
var Route$36 = createFileRoute("/chat")({ server: { handlers: { POST: handle$12 } } });
var $$splitComponentImporter$23 = () => import("./route-Df_k_CFH.mjs");
var Route$35 = createFileRoute("/console")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
var $$splitComponentImporter$22 = () => import("./docs-lf2csBvc.mjs");
var Route$34 = createFileRoute("/docs")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./enter-Ccb1pksH.mjs");
var Route$33 = createFileRoute("/enter")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var handle$11 = async ({ request }) => {
	const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
	return dispatchArchal(request);
};
var Route$32 = createFileRoute("/health")({ server: { handlers: { GET: handle$11 } } });
var handle$10 = async ({ request }) => {
	const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
	return dispatchArchal(request);
};
var Route$31 = createFileRoute("/login")({ server: { handlers: {
	GET: handle$10,
	POST: handle$10
} } });
var handle$9 = async ({ request }) => {
	const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
	return dispatchArchal(request);
};
var Route$30 = createFileRoute("/logout")({ server: { handlers: { POST: handle$9 } } });
var handle$8 = async ({ request }) => {
	const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
	return dispatchArchal(request);
};
var Route$29 = createFileRoute("/metrics")({ server: { handlers: { GET: handle$8 } } });
var handle$7 = async ({ request }) => {
	const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
	return dispatchArchal(request);
};
var Route$28 = createFileRoute("/ops")({ server: { handlers: { GET: handle$7 } } });
var $$splitComponentImporter$20 = () => import("./pricing-DvOwjadv.mjs");
var Route$27 = createFileRoute("/pricing")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./privacy-bmXzkS5-.mjs");
var Route$26 = createFileRoute("/privacy")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./product-D7k0fPuE.mjs");
var Route$25 = createFileRoute("/product")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./security-DkKgac6f.mjs");
var Route$24 = createFileRoute("/security")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var handle$6 = async ({ request }) => {
	const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
	return dispatchArchal(request);
};
var Route$23 = createFileRoute("/signup")({ server: { handlers: {
	GET: handle$6,
	POST: handle$6
} } });
var $$splitComponentImporter$16 = () => import("./status-BGsONwjE.mjs");
var Route$22 = createFileRoute("/status")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./support-C3Vh2MBM.mjs");
var Route$21 = createFileRoute("/support")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	server: { handlers: { POST: async ({ request }) => {
		const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
		return dispatchArchal(request);
	} } }
});
var $$splitComponentImporter$14 = () => import("./terms-Ck7Agf0q.mjs");
var Route$20 = createFileRoute("/terms")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var handle$5 = async ({ request }) => {
	const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
	return dispatchArchal(request);
};
var Route$19 = createFileRoute("/widget.js")({ server: { handlers: { GET: handle$5 } } });
var handle$4 = async ({ request }) => {
	const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
	return dispatchArchal(request);
};
var Route$18 = createFileRoute("/app/$")({ server: { handlers: {
	GET: handle$4,
	POST: handle$4
} } });
var $$splitComponentImporter$13 = () => import("./console-CaERQ2UT.mjs");
var Route$17 = createFileRoute("/console/")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./approvals-4kiHfFQC.mjs");
var Route$16 = createFileRoute("/console/approvals")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./automations-DUZdNfbN.mjs");
var Route$15 = createFileRoute("/console/automations")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./connections-DZBABZZi.mjs");
var Route$14 = createFileRoute("/console/connections")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./inbox-BBQtJD1n.mjs");
var Route$13 = createFileRoute("/console/inbox")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./install-D9SRppRM.mjs");
var Route$12 = createFileRoute("/console/install")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./knowledge-CoMKB4jQ.mjs");
var Route$11 = createFileRoute("/console/knowledge")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./policies-BqLwgKYw.mjs");
var Route$10 = createFileRoute("/console/policies")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./quality-BWqTPUKg.mjs");
var Route$9 = createFileRoute("/console/quality")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./sandbox-BsluGou4.mjs");
var Route$8 = createFileRoute("/console/sandbox")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var handle$3 = async ({ request }) => {
	const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
	return dispatchArchal(request);
};
var Route$7 = createFileRoute("/interactions/$")({ server: { handlers: { GET: handle$3 } } });
var handle$2 = async ({ request }) => {
	const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
	return dispatchArchal(request);
};
var Route$6 = createFileRoute("/privacy_/delete")({ server: { handlers: { POST: handle$2 } } });
var handle$1 = async ({ request }) => {
	const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
	try {
		return await dispatchArchal(request);
	} catch (error) {
		const detail = error instanceof Error ? error.message : "request failed";
		return Response.json({ detail }, { status: 500 });
	}
};
var Route$5 = createFileRoute("/v1/$")({ server: { handlers: {
	GET: handle$1,
	POST: handle$1
} } });
var $$splitComponentImporter$3 = () => import("./w._tenant-S9qGVgVr.mjs");
var Route$4 = createFileRoute("/w/$tenant")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./cases._caseId-DUSbuqX0.mjs");
var Route$3 = createFileRoute("/console/cases/$caseId")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./inbox.index-BALf1_tQ.mjs");
var Route$2 = createFileRoute("/console/inbox/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./inbox._id-DOZFmxm2.mjs");
var Route$1 = createFileRoute("/console/inbox/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var handle = async ({ request }) => {
	const { dispatchArchal } = await import("./http-CZwm0Puu.mjs");
	return dispatchArchal(request);
};
var Route = createFileRoute("/w/$tenant/session")({ server: { handlers: { POST: handle } } });
var IndexRoute = Route$38.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$39
});
var ArchitectureRoute = Route$37.update({
	id: "/architecture",
	path: "/architecture",
	getParentRoute: () => Route$39
});
var ChatRoute = Route$36.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => Route$39
});
var ConsoleRouteRoute = Route$35.update({
	id: "/console",
	path: "/console",
	getParentRoute: () => Route$39
});
var DocsRoute = Route$34.update({
	id: "/docs",
	path: "/docs",
	getParentRoute: () => Route$39
});
var EnterRoute = Route$33.update({
	id: "/enter",
	path: "/enter",
	getParentRoute: () => Route$39
});
var HealthRoute = Route$32.update({
	id: "/health",
	path: "/health",
	getParentRoute: () => Route$39
});
var LoginRoute = Route$31.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$39
});
var LogoutRoute = Route$30.update({
	id: "/logout",
	path: "/logout",
	getParentRoute: () => Route$39
});
var MetricsRoute = Route$29.update({
	id: "/metrics",
	path: "/metrics",
	getParentRoute: () => Route$39
});
var OpsRoute = Route$28.update({
	id: "/ops",
	path: "/ops",
	getParentRoute: () => Route$39
});
var PricingRoute = Route$27.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$39
});
var PrivacyRoute = Route$26.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$39
});
var ProductRoute = Route$25.update({
	id: "/product",
	path: "/product",
	getParentRoute: () => Route$39
});
var SecurityRoute = Route$24.update({
	id: "/security",
	path: "/security",
	getParentRoute: () => Route$39
});
var SignupRoute = Route$23.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$39
});
var StatusRoute = Route$22.update({
	id: "/status",
	path: "/status",
	getParentRoute: () => Route$39
});
var SupportRoute = Route$21.update({
	id: "/support",
	path: "/support",
	getParentRoute: () => Route$39
});
var TermsRoute = Route$20.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$39
});
var WidgetDotjsRoute = Route$19.update({
	id: "/widget.js",
	path: "/widget.js",
	getParentRoute: () => Route$39
});
var AppSplatRoute = Route$18.update({
	id: "/app/$",
	path: "/app/$",
	getParentRoute: () => Route$39
});
var ConsoleIndexRoute = Route$17.update({
	id: "/",
	path: "/",
	getParentRoute: () => ConsoleRouteRoute
});
var ConsoleApprovalsRoute = Route$16.update({
	id: "/approvals",
	path: "/approvals",
	getParentRoute: () => ConsoleRouteRoute
});
var ConsoleAutomationsRoute = Route$15.update({
	id: "/automations",
	path: "/automations",
	getParentRoute: () => ConsoleRouteRoute
});
var ConsoleConnectionsRoute = Route$14.update({
	id: "/connections",
	path: "/connections",
	getParentRoute: () => ConsoleRouteRoute
});
var ConsoleInboxRoute = Route$13.update({
	id: "/inbox",
	path: "/inbox",
	getParentRoute: () => ConsoleRouteRoute
});
var ConsoleInstallRoute = Route$12.update({
	id: "/install",
	path: "/install",
	getParentRoute: () => ConsoleRouteRoute
});
var ConsoleKnowledgeRoute = Route$11.update({
	id: "/knowledge",
	path: "/knowledge",
	getParentRoute: () => ConsoleRouteRoute
});
var ConsolePoliciesRoute = Route$10.update({
	id: "/policies",
	path: "/policies",
	getParentRoute: () => ConsoleRouteRoute
});
var ConsoleQualityRoute = Route$9.update({
	id: "/quality",
	path: "/quality",
	getParentRoute: () => ConsoleRouteRoute
});
var ConsoleSandboxRoute = Route$8.update({
	id: "/sandbox",
	path: "/sandbox",
	getParentRoute: () => ConsoleRouteRoute
});
var InteractionsSplatRoute = Route$7.update({
	id: "/interactions/$",
	path: "/interactions/$",
	getParentRoute: () => Route$39
});
var PrivacyDeleteRoute = Route$6.update({
	id: "/privacy_/delete",
	path: "/privacy/delete",
	getParentRoute: () => Route$39
});
var V1SplatRoute = Route$5.update({
	id: "/v1/$",
	path: "/v1/$",
	getParentRoute: () => Route$39
});
var WTenantRoute = Route$4.update({
	id: "/w/$tenant",
	path: "/w/$tenant",
	getParentRoute: () => Route$39
});
var ConsoleCasesCaseIdRoute = Route$3.update({
	id: "/cases/$caseId",
	path: "/cases/$caseId",
	getParentRoute: () => ConsoleRouteRoute
});
var ConsoleInboxIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => ConsoleInboxRoute
});
var ConsoleInboxIdRoute = Route$1.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => ConsoleInboxRoute
});
var WTenantSessionRoute = Route.update({
	id: "/session",
	path: "/session",
	getParentRoute: () => WTenantRoute
});
var ConsoleInboxRouteChildren = {
	ConsoleInboxIdRoute,
	ConsoleInboxIndexRoute
};
var ConsoleRouteRouteChildren = {
	ConsoleApprovalsRoute,
	ConsoleAutomationsRoute,
	ConsoleConnectionsRoute,
	ConsoleInboxRoute: ConsoleInboxRoute._addFileChildren(ConsoleInboxRouteChildren),
	ConsoleInstallRoute,
	ConsoleKnowledgeRoute,
	ConsolePoliciesRoute,
	ConsoleQualityRoute,
	ConsoleSandboxRoute,
	ConsoleIndexRoute,
	ConsoleCasesCaseIdRoute
};
var ConsoleRouteRouteWithChildren = ConsoleRouteRoute._addFileChildren(ConsoleRouteRouteChildren);
var WTenantRouteChildren = { WTenantSessionRoute };
var rootRouteChildren = {
	IndexRoute,
	ConsoleRouteRoute: ConsoleRouteRouteWithChildren,
	ArchitectureRoute,
	ChatRoute,
	DocsRoute,
	EnterRoute,
	HealthRoute,
	LoginRoute,
	LogoutRoute,
	MetricsRoute,
	OpsRoute,
	PricingRoute,
	PrivacyRoute,
	ProductRoute,
	SecurityRoute,
	SignupRoute,
	StatusRoute,
	SupportRoute,
	TermsRoute,
	WidgetDotjsRoute,
	AppSplatRoute,
	InteractionsSplatRoute,
	PrivacyDeleteRoute,
	V1SplatRoute,
	WTenantRoute: WTenantRoute._addFileChildren(WTenantRouteChildren)
};
var routeTree = Route$39._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route$4 as i, Route$1 as n, Route$3 as r, router_exports as t };
