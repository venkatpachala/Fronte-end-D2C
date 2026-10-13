import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-CxlqdfHh.js
function slug(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 24) || "brand";
}
function prefix(kind) {
	const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
	let out = "";
	for (let i = 0; i < 4; i += 1) out += alphabet[Math.floor(Math.random() * 31)];
	return `archal_${kind}_${out}`;
}
function stamp() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function seedNorthline() {
	return {
		brand: {
			id: "northline",
			name: "Northline",
			widgetPrefix: "archal_test_n4k2",
			supervisorPrefix: "archal_sup_n4k2",
			sandboxPassedAt: null,
			killed: false,
			usedToday: 3,
			dailyCap: 2e3,
			shopifyLast4: "1842",
			stripeLast4: "",
			gmailLast4: "9021"
		},
		docs: [{
			id: "doc_northline_terms",
			tenantId: "northline",
			name: "Northline terms of use.pdf",
			bytes: 24e4,
			pages: 18,
			snapshotId: "snap_northline_v1",
			status: "ready"
		}],
		cases: [{
			id: "case_4410",
			tenantId: "northline",
			customer: "Asha M.",
			intent: "return",
			status: "waiting_customer",
			preview: "Order #12345 arrived damaged.",
			response: "Order 12345 is on file in sandbox. To continue the return, send clear photos of the damage.",
			citations: ["Northline Terms, Page 14, Clause 8.1.2"],
			missingInputs: ["photos"],
			orderId: "12345",
			amount: null,
			tools: { shopify_get_order: {
				status: "success",
				note: "Sandbox lookup."
			} },
			createdAt: stamp(),
			timeline: [{
				id: "t1",
				at: stamp(),
				text: "Customer asked to return a damaged order."
			}, {
				id: "t2",
				at: stamp(),
				text: "Asked for photos. Stripe was not called."
			}]
		}, {
			id: "case_4418",
			tenantId: "northline",
			customer: "Ravi K.",
			intent: "refund",
			status: "waiting_approval",
			preview: "Refund of ₹2500 for order #12345.",
			response: "This refund of ₹2500 is above the ₹2000 cap. A person has to approve it.",
			citations: ["Northline Terms, Page 16, Clause 9.1"],
			missingInputs: ["photos"],
			orderId: "12345",
			amount: 2500,
			tools: {
				shopify_get_order: {
					status: "success",
					note: "Sandbox lookup."
				},
				stripe_refund: {
					status: "skipped",
					note: "Above cap. Stripe was not called."
				}
			},
			createdAt: stamp(),
			timeline: [{
				id: "t3",
				at: stamp(),
				text: "High-value refund held for a person."
			}]
		}]
	};
}
var seeded = seedNorthline();
var useArchal = create()(persist((set, get) => ({
	activeId: seeded.brand.id,
	brands: [seeded.brand],
	cases: seeded.cases,
	docs: seeded.docs,
	hydrated: false,
	setHydrated: (v) => set({ hydrated: v }),
	switchBrand: (id) => set({ activeId: id }),
	addBrand: (name) => {
		const idBase = slug(name);
		const taken = new Set(get().brands.map((b) => b.id));
		let id = idBase;
		let n = 2;
		while (taken.has(id)) {
			id = `${idBase}-${n}`;
			n += 1;
		}
		const brand = {
			id,
			name: name.trim() || "New brand",
			widgetPrefix: prefix("test"),
			supervisorPrefix: prefix("sup"),
			sandboxPassedAt: null,
			killed: false,
			usedToday: 0,
			dailyCap: 2e3,
			shopifyLast4: "",
			stripeLast4: "",
			gmailLast4: ""
		};
		set({
			brands: [...get().brands, brand],
			activeId: id
		});
	},
	addDoc: (file) => {
		const tenantId = get().activeId;
		if (file.bytes > 8388608) {
			const doc = {
				id: `doc_${Date.now()}`,
				tenantId,
				name: file.name,
				bytes: file.bytes,
				pages: 0,
				snapshotId: "",
				status: "error",
				error: "PDF is over 8 MB."
			};
			set({ docs: [doc, ...get().docs] });
			return {
				ok: false,
				error: doc.error
			};
		}
		if (!file.name.toLowerCase().endsWith(".pdf")) return {
			ok: false,
			error: "Only PDF uploads are accepted."
		};
		set({ docs: [{
			id: `doc_${Date.now()}`,
			tenantId,
			name: file.name,
			bytes: file.bytes,
			pages: Math.max(1, Math.round(file.bytes / 14e3)),
			snapshotId: `snap_${tenantId}_${Date.now().toString(36)}`,
			status: "ready"
		}, ...get().docs.filter((d) => !(d.tenantId === tenantId && d.status === "error"))] });
		return { ok: true };
	},
	removeDoc: (id) => set({ docs: get().docs.filter((d) => d.id !== id) }),
	setConnection: (provider, last4) => {
		const clean = last4.replace(/\D/g, "").slice(-4);
		set({ brands: get().brands.map((b) => {
			if (b.id !== get().activeId) return b;
			if (provider === "shopify") return {
				...b,
				shopifyLast4: clean
			};
			if (provider === "stripe") return {
				...b,
				stripeLast4: clean
			};
			return {
				...b,
				gmailLast4: clean
			};
		}) });
	},
	pushCase: (record) => set({ cases: [record, ...get().cases] }),
	patchCase: (id, patch, note) => set({ cases: get().cases.map((c) => c.id === id ? {
		...c,
		...patch,
		timeline: [...c.timeline, {
			id: `tl_${Date.now()}`,
			at: stamp(),
			text: note
		}]
	} : c) }),
	bumpUsage: () => set({ brands: get().brands.map((b) => b.id === get().activeId ? {
		...b,
		usedToday: b.usedToday + 1
	} : b) }),
	markSandbox: () => set({ brands: get().brands.map((b) => b.id === get().activeId ? {
		...b,
		sandboxPassedAt: stamp()
	} : b) }),
	toggleKill: () => set({ brands: get().brands.map((b) => b.id === get().activeId ? {
		...b,
		killed: !b.killed
	} : b) })
}), {
	name: "archal-control-plane",
	skipHydration: true,
	partialize: (s) => ({
		activeId: s.activeId,
		brands: s.brands,
		cases: s.cases,
		docs: s.docs
	})
}));
function activeBrand(state) {
	return state.brands.find((b) => b.id === state.activeId) ?? state.brands[0];
}
function hasReadyPolicy(state, tenantId) {
	return state.docs.some((d) => d.tenantId === tenantId && d.status === "ready");
}
//#endregion
export { hasReadyPolicy as n, useArchal as r, activeBrand as t };
