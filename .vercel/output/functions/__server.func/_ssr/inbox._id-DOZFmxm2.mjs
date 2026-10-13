import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as postReply, h as whenLabel, i as getConversation, m as useBrand, o as inr, r as decideRefund, s as intentLabel } from "./format-Dn_iidkQ.mjs";
import { a as StatusPill, i as Panel, n as Empty, o as useLoad, r as LoadingLines, t as Button } from "./use-load-CeIlBTVh.mjs";
import { n as Route$1 } from "./router-Bj3PWY6J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox._id-DOZFmxm2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Thread() {
	const { id } = Route$1.useParams();
	const { brandId } = useBrand();
	const { data, error, loading, reload } = useLoad(() => getConversation({ data: { id } }), [id]);
	const [body, setBody] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("");
	const conversation = data?.conversation ?? null;
	const wrongBrand = conversation != null && conversation.brandId !== brandId;
	async function send() {
		const text = body.trim();
		if (!text || busy) return;
		setBusy(true);
		setNote("");
		try {
			const result = await postReply({ data: {
				id,
				body: text
			} });
			if (!result.ok) setNote(result.error);
			else {
				setBody("");
				reload();
			}
		} catch (err) {
			setNote(err instanceof Error ? err.message : "The reply did not send.");
		} finally {
			setBusy(false);
		}
	}
	async function decide(action) {
		setBusy(true);
		setNote("");
		try {
			const result = await decideRefund({ data: {
				id,
				action
			} });
			if (!result.ok) setNote(result.error);
			else reload();
		} catch (err) {
			setNote(err instanceof Error ? err.message : "The decision did not save.");
		} finally {
			setBusy(false);
		}
	}
	if (loading && !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingLines, {});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "This thread did not load.",
		body: error
	});
	if (!conversation) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "This case is not on the desk.",
		body: "It may have been opened on another workspace."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/console/inbox",
			className: "text-sm text-muted hover:text-fg",
			children: "Back to inbox"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl leading-none md:text-4xl",
				children: conversation.subject
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 font-mono text-xs text-muted",
				children: [
					conversation.customerLabel,
					" · ",
					conversation.channel,
					" · ",
					intentLabel(conversation.intent),
					" ·",
					" ",
					whenLabel(conversation.updatedAt)
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: conversation.status })]
		}),
		wrongBrand ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 rounded-md border border-line bg-elev px-3 py-3 text-sm text-muted",
			children: [
				"This thread belongs to ",
				conversation.brandId,
				". Switch the brand in the sidebar if you meant to work there."
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 lg:col-span-2",
				children: [(data?.messages ?? []).map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: message.author === "customer" ? "ml-0 rounded-lg border border-line bg-surface px-4 py-3 md:mr-10" : "rounded-lg border border-line bg-elev px-4 py-3 md:ml-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-muted",
							children: message.author === "archal" ? "Archal" : message.author === "person" ? "Floor" : conversation.customerLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: message.body
						}),
						message.citation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 inline-flex rounded-sm border border-line px-2 py-1 font-mono text-xs text-accent",
							children: message.citation
						}) : null
					]
				}, message.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "rounded-lg border border-line bg-bg p-3",
					onSubmit: (event) => {
						event.preventDefault();
						send();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-mono text-xs text-muted",
							htmlFor: "reply",
							children: "Reply as the floor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "reply",
							value: body,
							onChange: (event) => setBody(event.target.value),
							rows: 3,
							className: "mt-2 w-full resize-y rounded-md border border-line bg-elev px-3 py-2 text-sm",
							placeholder: "Write what the customer should hear. This does not charge a card."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: busy || body.trim().length === 0,
								children: "Send reply"
							}), note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: note
							}) : null]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "h-fit p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm text-muted",
						children: "Case"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Order",
								v: conversation.orderRef ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Amount",
								v: inr(conversation.amountInr)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Assignee",
								v: conversation.assignee
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Confidence",
								v: String(conversation.confidence)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Handled by",
								v: conversation.aiHandled ? "Archal" : "Floor"
							})
						]
					}),
					conversation.status === "waiting_approval" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Above the brand cap. Approving holds the case. It does not call Stripe."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								disabled: busy,
								className: "w-full",
								onClick: () => void decide("approve"),
								children: "Approve hold"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								tone: "ghost",
								disabled: busy,
								className: "w-full",
								onClick: () => void decide("reject"),
								children: "Reject"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-sm text-muted",
						children: conversation.status === "approved_held" ? "Approved and still held. No charge was made." : "No money decision is waiting on this thread."
					})
				]
			})]
		})
	] });
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-mono text-xs",
			children: v
		})]
	});
}
//#endregion
export { Thread as component };
