import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/site/frame";

export const Route = createFileRoute("/product")({ component: Product });

function Product() {
  return (
    <SiteFrame>
      <main>
        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Product</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl leading-none md:text-6xl">
              A helpdesk that knows when to stop.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              Gorgias-shaped inbox. Fin-shaped resolution. Observe-shaped scoring. The difference is the hold: Archal will not tell a customer a refund is finished, and it will not call Stripe, until a person clears the amount.
            </p>
          </div>
        </section>

        <Band
          eyebrow="Desk"
          title="Every channel is a case. The brand is the wall."
          body="WhatsApp, email, storefront chat, and voice land in one queue. Filters are the states operators use: open, waiting on the customer, waiting on approval, resolved by Archal. Switch from Northline to Mira Pantry and the queue changes. There is no blended inbox."
          cta="Open the inbox"
          to="/console/inbox"
          aside={
            <ul className="divide-y divide-line border-y border-line text-sm">
              <li className="flex justify-between py-3"><span>NL-18420 · damaged tee</span><span className="text-muted">Waiting</span></li>
              <li className="flex justify-between py-3"><span>NL-18455 · ₹2,500</span><span className="text-accent">Approval</span></li>
              <li className="flex justify-between py-3"><span>NL-18302 · where is it</span><span className="text-muted">Resolved</span></li>
              <li className="flex justify-between py-3"><span>NL-18390 · size exchange</span><span className="text-accent">Open</span></li>
            </ul>
          }
        />

        <Band
          flip
          eyebrow="Agent"
          title="The reply names the clause, or it asks for what is missing."
          body="Published policy is the only source. A damaged return without photos stays with the customer. A cancel still in the warehouse is cancelled. A question the snapshot does not cover is refused, not invented. Automations are those paths, and you can turn one off without deleting the week’s runs."
          cta="Read policies"
          to="/console/policies"
          aside={
            <div className="rounded-lg border border-line bg-bg p-4 text-sm">
              <p className="font-mono text-xs text-accent">Clause 8.1.2</p>
              <p className="mt-3">Damage at delivery can be returned when the customer sends images of the tear and the pack. No photos, no refund path.</p>
              <p className="mt-4 font-mono text-xs text-muted">Northline · published snapshot</p>
            </div>
          }
        />

        <Band
          eyebrow="Hold"
          title="Money has a line. The model does not cross it."
          body="Northline holds at ₹2,000. Mira Pantry holds at ₹500. Under the line, Archal can queue a refund to the original method and still not call Stripe in this workspace. Over the line, the case sits in Approvals until a person approves the hold or rejects it. A second decision is refused."
          cta="Open approvals"
          to="/console/approvals"
          aside={
            <div className="rounded-lg border border-line p-4">
              <p className="font-mono text-xs text-muted">Decision</p>
              <p className="mt-3 text-2xl">₹2,500 held</p>
              <p className="mt-2 text-sm text-muted">Approve does not charge. Reject does not charge. Both write a line on the thread.</p>
            </div>
          }
        />

        <Band
          flip
          eyebrow="Listen"
          title="Score the agent the way a QA lead would."
          body="Policy, tone, resolution. Archal and the floor are scored apart, so a polite wrong answer cannot hide inside a high average. Threads under 75 stay marked. This is the conversation-intelligence layer, pointed at your own agent before it is pointed at a coaching program."
          cta="Open quality"
          to="/console/quality"
          aside={
            <div className="grid grid-cols-3 gap-2">
              {[
                ["Policy", "96"],
                ["Tone", "86"],
                ["Close", "93"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-line px-3 py-4">
                  <p className="font-mono text-xs text-muted">{k}</p>
                  <p className="mt-2 font-display text-3xl leading-none">{v}</p>
                </div>
              ))}
            </div>
          }
        />

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="font-display text-4xl leading-none">Then the control plane</h2>
            <p className="mt-4 max-w-2xl text-muted">
              Sandbox, knowledge upload, connection last-fours, and the widget install stay behind the desk. They are how a brand is allowed to go live. They are not the morning an operator spends in the queue.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/console" className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-ink">
                Open the console
              </Link>
              <Link to="/security" className="inline-flex h-11 items-center justify-center rounded-md border border-line px-4 text-sm">
                Read the isolation notes
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

function Band({
  eyebrow,
  title,
  body,
  cta,
  to,
  aside,
  flip,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  to: "/console/inbox" | "/console/policies" | "/console/approvals" | "/console/quality";
  aside: ReactNode;
  flip?: boolean;
}) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div className={flip ? "md:order-2" : undefined}>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl leading-none">{title}</h2>
          <p className="mt-4 text-muted">{body}</p>
          <Link to={to} className="mt-6 inline-flex h-11 items-center text-sm underline decoration-line underline-offset-4">
            {cta}
          </Link>
        </div>
        <div>{aside}</div>
      </div>
    </section>
  );
}
