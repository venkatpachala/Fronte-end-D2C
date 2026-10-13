import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as SiteFrame } from "./frame-3lkK4hYo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-xwbZXtKO.js
var import_jsx_runtime = require_jsx_runtime();
var SURFACES = [
	{
		n: "01",
		t: "Desk",
		d: "One queue for WhatsApp, email, chat, and voice. The brand is the boundary. Northline never sees Mira.",
		to: "/console/inbox",
		cta: "Open the inbox"
	},
	{
		n: "02",
		t: "Agent",
		d: "Archal answers from the published clause, asks for the photo it does not have, and refuses what the policy does not cover.",
		to: "/console/policies",
		cta: "Read the clauses"
	},
	{
		n: "03",
		t: "Hold",
		d: "A refund above your cap waits for a person. Approve means held. It does not mean charged. Stripe stays off until you say otherwise.",
		to: "/console/approvals",
		cta: "See the hold queue"
	},
	{
		n: "04",
		t: "Listen",
		d: "Every scored thread is graded on policy, tone, and whether it actually closed. The misses stay on the page.",
		to: "/console/quality",
		cta: "Open quality"
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden border-b border-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-fade pointer-events-none absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-12 md:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-widest text-accent",
							children: "Customer operations for D2C"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 font-display text-5xl leading-none md:text-6xl",
							children: "The desk that resolves. The hold that stops the refund."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-lg text-muted",
							children: "Archal runs support for brands that sell on Shopify and talk on WhatsApp. The agent cites your policy. Anything above your cap waits for a person. No one is told the money has moved until it has."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/console/inbox",
								className: "inline-flex h-12 items-center justify-center rounded-md bg-accent px-5 font-medium text-ink transition-transform duration-150 ease-out active:scale-[0.96]",
								children: "Open the desk"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pricing",
								className: "inline-flex h-12 items-center justify-center rounded-md border border-line px-5 text-fg",
								children: "See pricing"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskCard, {})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						k: "Resolved without a person",
						v: "68%",
						d: "On the Northline workspace, last 14 days."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						k: "First reply",
						v: "11s",
						d: "Policy answers. Photo asks do not pretend to be refunds."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						k: "Refund cap",
						v: "₹2,000",
						d: "Northline’s line. Mira Pantry holds at ₹500."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-muted",
					children: "The system"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-4xl leading-none md:text-5xl",
					children: "Four surfaces. One brand at a time."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 border-t border-line",
				children: SURFACES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "grid gap-4 border-b border-line py-8 md:grid-cols-12 md:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm text-accent md:col-span-1",
							children: item.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-3xl md:col-span-3",
							children: item.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted md:col-span-6",
							children: item.d
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: "text-sm text-fg underline decoration-line underline-offset-4 md:col-span-2",
							children: item.cta
						})
					]
				}, item.n))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line bg-elev",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-muted",
					children: "What it will not say"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-4xl leading-none",
					children: "A refund is not done because the model is confident."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "divide-y divide-line border-y border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Promise$1, {
							t: "Citations or silence",
							d: "If the clause is not in that brand’s snapshot, the reply says it does not know."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Promise$1, {
							t: "Proof before a damaged return",
							d: "No photos, no refund path. The case waits on the customer."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Promise$1, {
							t: "The brand cannot be switched in the body",
							d: "A forged tenant in the JSON is rejected. Retrieval stays inside the session brand."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Promise$1, {
							t: "Stripe is a later door",
							d: "This workspace never charges a card. Approve means the hold stands."
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl leading-none",
					children: "Channels operators already live in"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product",
					className: "text-sm text-muted hover:text-fg",
					children: "Product detail"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4",
				children: [
					["WhatsApp", "The thread most D2C customers actually send."],
					["Email", "Order mail, with the clause attached."],
					["Chat", "The widget on the storefront."],
					["Voice", "Calls land on the same case, not a separate tool."]
				].map(([title, copy]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-bg px-4 py-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: copy
					})]
				}, title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl leading-none md:text-5xl",
					children: "Put a real morning on the desk."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-lg text-muted",
					children: "Northline and Mira Pantry are loaded. Switch brands. Approve a hold. Turn a rule off. Nothing here charges a card."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/console",
					className: "inline-flex h-12 items-center rounded-md bg-accent px-5 font-medium text-ink",
					children: "Enter the console"
				})]
			})
		})
	] }) });
}
function Metric({ k, v, d }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-line px-4 py-8 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-muted",
				children: k
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-4xl leading-none",
				children: v
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: d
			})
		]
	});
}
function Promise$1({ t, d }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium",
			children: t
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: d
		})]
	});
}
function DeskCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-elev",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-line px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-muted",
				children: "Northline · inbox"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-sm border border-accent px-2 py-1 font-mono text-xs text-accent",
				children: "Needs approval"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-surface px-3 py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted",
						children: "Arun P. · email · NL-18455"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: "Please refund ₹2,500. The jacket was stained on arrival."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-bg px-3 py-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-muted",
							children: "Archal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: "This refund is above the ₹2,000 cap. I have held it. Stripe was not called."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 inline-flex rounded-sm border border-line px-2 py-1 font-mono text-xs text-accent",
							children: "Clause 9.1"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-11 items-center justify-center rounded-md bg-accent text-sm font-medium text-ink",
						children: "Approve hold"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-11 items-center justify-center rounded-md border border-line text-sm",
						children: "Reject"
					})]
				})
			]
		})]
	});
}
//#endregion
export { Home as component };
