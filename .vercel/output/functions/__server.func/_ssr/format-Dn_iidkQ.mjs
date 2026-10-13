import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as object, o as string, t as _enum } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { r as useArchal } from "./store-CxlqdfHh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-Dn_iidkQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"open",
	"waiting_customer",
	"waiting_approval",
	"ai_resolved",
	"approved_held",
	"rejected"
];
var brandSchema = object({ brandId: string().min(1).max(64) });
var listSchema = brandSchema.extend({ status: _enum(STATUSES).optional() });
var idSchema = object({ id: string().min(1).max(64) });
var replySchema = idSchema.extend({ body: string().trim().min(1).max(2e3) });
var decideSchema = idSchema.extend({ action: _enum(["approve", "reject"]) });
var listBrands = createServerFn({ method: "GET" }).handler(createSsrRpc("2844d3a0bc31558f33b43e62e24a5b7dd6656f4e2613a08faa94592c77639c4b"));
var getOverview = createServerFn({ method: "GET" }).validator(brandSchema).handler(createSsrRpc("b8d26b83dbe6944003d797ac76a3be5983410c83c18a28b36ca1a27b66e26f1d"));
var listConversations = createServerFn({ method: "GET" }).validator(listSchema).handler(createSsrRpc("f06b2cdb552826f4ccb39c8c5e0820b57d68dbc36873a62ad51984d72c7c4e3e"));
var getConversation = createServerFn({ method: "GET" }).validator(idSchema).handler(createSsrRpc("5627202ab3d8235cd6be7eecbbc3f3e247e596c19f703414e1b950e98e00ff38"));
var postReply = createServerFn({ method: "POST" }).validator(replySchema).handler(createSsrRpc("d3eef7b055ecd35925efd7453b3c025e369744f982f5f92d2caa1f6b24476d95"));
var decideRefund = createServerFn({ method: "POST" }).validator(decideSchema).handler(createSsrRpc("b8a989d775e630a3a2f744876b4c63f21e23505fd1e6f1db2cd655f85542ffbe"));
var listPolicies = createServerFn({ method: "GET" }).validator(brandSchema).handler(createSsrRpc("475fa3927352ff8807c927bf8210e7f2dee7744c07cb6c326340219f880db5cd"));
var listAutomations = createServerFn({ method: "GET" }).validator(brandSchema).handler(createSsrRpc("9d13a9b330e9369c043bd9b6c611ae9d8645e1c631d1503b9c8d659740843465"));
var toggleAutomation = createServerFn({ method: "POST" }).validator(idSchema).handler(createSsrRpc("4be2452a00a537096ce3616f144171a97bf54ad656e82d963b91c0e738a9330d"));
var listQuality = createServerFn({ method: "GET" }).validator(brandSchema).handler(createSsrRpc("e44e50a84d695cc4cfbc88156b723d586ae50b215de506f891005536d74590d6"));
var BrandContext = (0, import_react.createContext)(null);
function BrandProvider({ children }) {
	const [brands, setBrands] = (0, import_react.useState)([]);
	const [brandId, setBrandIdState] = (0, import_react.useState)("northline");
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const saved = window.localStorage.getItem("archal-active-brand");
		if (saved) setBrandIdState(saved);
		listBrands().then((rows) => {
			setBrands(rows);
			setError("");
		}).catch((err) => {
			setError(err instanceof Error ? err.message : "The desk could not load.");
		});
	}, []);
	function setBrandId(id) {
		setBrandIdState(id);
		window.localStorage.setItem("archal-active-brand", id);
		const state = useArchal.getState();
		if (state.brands.some((brand) => brand.id === id)) state.switchBrand(id);
	}
	const brand = brands.find((row) => row.id === brandId) ?? brands[0] ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandContext.Provider, {
		value: {
			brandId: brand?.id ?? brandId,
			brand,
			brands,
			setBrandId,
			error
		},
		children
	});
}
function useBrand() {
	const value = (0, import_react.useContext)(BrandContext);
	if (!value) throw new Error("useBrand must be used in the console");
	return value;
}
var STATUS_LABEL = {
	open: "Open",
	waiting_customer: "Waiting on customer",
	waiting_approval: "Needs approval",
	ai_resolved: "Resolved by Archal",
	approved_held: "Approved, held",
	rejected: "Rejected"
};
function inr(value) {
	if (value == null) return "—";
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(value);
}
function whenLabel(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;
	return new Intl.DateTimeFormat("en-IN", {
		day: "2-digit",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZone: "Asia/Kolkata"
	}).format(date);
}
function intentLabel(intent) {
	return intent.replaceAll("_", " ");
}
//#endregion
export { getOverview as a, listAutomations as c, listQuality as d, postReply as f, whenLabel as h, getConversation as i, listConversations as l, useBrand as m, STATUS_LABEL as n, inr as o, toggleAutomation as p, decideRefund as r, intentLabel as s, BrandProvider as t, listPolicies as u };
