import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/site/frame";

export const Route = createFileRoute("/pricing")({ component: Pricing });

const TIERS = [
  {
    name: "Desk",
    price: "₹18,000",
    period: "per brand / month",
    lead: "The queue, without the agent.",
    points: ["WhatsApp, email, and chat", "3 seats", "Cases, assignment, replies", "No policy agent"],
    cta: "Open the desk",
    to: "/console/inbox" as const,
    hot: false,
  },
  {
    name: "Resolve",
    price: "₹48,000",
    period: "per brand / month",
    lead: "The agent, the hold, and the score.",
    points: ["Everything in Desk", "Policy-cited replies", "Refund cap and approvals", "Quality on every scored thread", "Voice on the same case"],
    cta: "Use Resolve",
    to: "/console" as const,
    hot: true,
  },
  {
    name: "Platform",
    price: "Talk",
    period: "multi-brand",
    lead: "For a group that needs the gate.",
    points: ["More than one brand", "Sandbox before anything live", "Daily cap and kill switch", "A person on the rollout"],
    cta: "Read security",
    to: "/security" as const,
    hot: false,
  },
];

function Pricing() {
  return (
    <SiteFrame>
      <main className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Pricing</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-none">Priced per brand. The preview does not bill.</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          These are the live plans. This workspace is the product with card charges off, so you can run the desk before a contract.
        </p>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <article
              key={tier.name}
              className={tier.hot ? "rounded-lg border border-accent bg-elev p-6" : "rounded-lg border border-line p-6"}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-muted">{tier.name}</p>
              <p className="mt-4 font-display text-5xl leading-none">{tier.price}</p>
              <p className="mt-2 text-sm text-muted">{tier.period}</p>
              <p className="mt-4">{tier.lead}</p>
              <ul className="mt-6 space-y-2 text-sm text-muted">
                {tier.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link
                to={tier.to}
                className={
                  tier.hot
                    ? "mt-8 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-ink"
                    : "mt-8 inline-flex h-11 items-center rounded-md border border-line px-4 text-sm"
                }
              >
                {tier.cta}
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm text-muted">
          Shopify and Stripe credentials are not stored here. A connection, when you add one in setup, keeps a last four. WhatsApp in the install screen is still marked unavailable until a brand is enabled.
        </p>
      </main>
    </SiteFrame>
  );
}
