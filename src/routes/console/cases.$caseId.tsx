import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { runDecision } from "@/lib/api";
import { activeBrand, useArchal } from "@/lib/store";

export const Route = createFileRoute("/console/cases/$caseId")({
  component: CasePage,
});

function CasePage() {
  const { caseId } = Route.useParams();
  const record = useArchal((s) => s.cases.find((c) => c.id === caseId && c.tenantId === s.activeId));
  const brand = useArchal((s) => activeBrand(s));
  const patchCase = useArchal((s) => s.patchCase);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function decide(action: "approve" | "reject") {
    if (!record || !brand) return;
    setBusy(true);
    setError("");
    try {
      const result = await runDecision({
        data: {
          sessionTenant: brand.id,
          bodyTenant: brand.id,
          currentStatus: record.status,
          action,
        },
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      patchCase(record.id, { status: result.next }, result.message);
    } catch {
      setError("Decision endpoint failed.");
    } finally {
      setBusy(false);
    }
  }

  if (!record) {
    return (
      <div>
        <h1 className="text-2xl font-medium">Case not in this brand</h1>
        <p className="mt-2 text-sm text-muted">Either it belongs to another tenant or the id is wrong.</p>
        <Link to="/console" className="mt-4 inline-flex text-sm text-fg">
          Back to inbox
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <p className="font-mono text-xs text-muted">{record.id}</p>
        <h1 className="mt-2 text-2xl font-medium">{record.preview}</h1>
        <p className="mt-4 rounded-lg border border-line bg-elev p-4 text-sm">{record.response}</p>
        <h2 className="mt-8 text-sm text-muted">Timeline</h2>
        <ol className="mt-3 space-y-3">
          {record.timeline.map((ev) => (
            <li key={ev.id} className="border-l border-line pl-3 text-sm">
              <p>{ev.text}</p>
              <p className="mt-1 font-mono text-xs text-faint">{ev.at.slice(0, 19).replace("T", " ")}</p>
            </li>
          ))}
        </ol>
      </div>
      <aside className="space-y-4 lg:col-span-2">
        <div className="rounded-lg border border-line p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Status</p>
          <p className="mt-2 text-lg">{record.status}</p>
          <dl className="mt-4 space-y-2 text-sm">
            <Row k="Intent" v={record.intent} />
            <Row k="Order" v={record.orderId ? `#${record.orderId}` : "—"} />
            <Row k="Amount" v={record.amount ? `₹${record.amount}` : "—"} />
            <Row k="Missing" v={record.missingInputs.join(", ") || "none"} />
          </dl>
        </div>
        <div className="rounded-lg border border-line p-4">
          <p className="text-sm text-muted">Citations</p>
          {record.citations.length === 0 ? (
            <p className="mt-2 text-sm">None.</p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm">
              {record.citations.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-lg border border-line p-4">
          <p className="text-sm text-muted">Tools</p>
          {Object.keys(record.tools).length === 0 && <p className="mt-2 text-sm">None ran.</p>}
          <ul className="mt-2 space-y-2 text-sm">
            {Object.entries(record.tools).map(([name, tool]) => (
              <li key={name}>
                <span className="font-mono text-xs">{name}</span>
                <span className="text-muted"> · {tool.status}</span>
                <p className="text-muted">{tool.note}</p>
              </li>
            ))}
          </ul>
        </div>
        {record.status === "waiting_approval" && (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => decide("approve")}
              className="h-11 rounded-md bg-accent text-sm font-medium text-ink disabled:opacity-50"
            >
              Approve
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => decide("reject")}
              className="h-11 rounded-md border border-line text-sm disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        )}
        {error && <p className="text-sm text-muted">{error}</p>}
      </aside>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}
