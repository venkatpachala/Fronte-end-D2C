import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { runChat } from "@/lib/api";
import { caseFromChat } from "@/lib/cases";
import { gradeSandbox, SANDBOX_STEPS } from "@/lib/runtime";
import { activeBrand, hasReadyPolicy, useArchal } from "@/lib/store";

export const Route = createFileRoute("/console/sandbox")({ component: Sandbox });

type Row = { id: string; pass: boolean; notes: string[]; response: string };

function Sandbox() {
  const brand = useArchal((s) => activeBrand(s));
  const hasPolicy = useArchal((s) => hasReadyPolicy(s, s.activeId));
  const pushCase = useArchal((s) => s.pushCase);
  const bumpUsage = useArchal((s) => s.bumpUsage);
  const markSandbox = useArchal((s) => s.markSandbox);
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState(false);
  const [summary, setSummary] = useState("");

  async function runAll() {
    if (!brand) return;
    setBusy(true);
    setSummary("");
    const next: Row[] = [];
    let failed = false;
    for (const step of SANDBOX_STEPS) {
      const result = await runChat({
        data: {
          sessionTenant: brand.id,
          bodyTenant: "someone-else",
          message: step.message,
          hasPolicy,
          usedToday: brand.usedToday,
          dailyCap: brand.dailyCap,
          killed: brand.killed,
          photosAlready: false,
        },
      });
      if (!result.ok) {
        next.push({ id: step.id, pass: false, notes: [result.error], response: result.error });
        failed = true;
        continue;
      }
      if (result.ok && result.tenantId !== brand.id) {
        next.push({ id: step.id, pass: false, notes: ["Tenant switched."], response: result.response });
        failed = true;
        continue;
      }
      const grade = gradeSandbox(result, step.id);
      if (!grade.pass) failed = true;
      next.push({ id: step.id, pass: grade.pass, notes: grade.notes, response: result.response });
      pushCase(caseFromChat(brand.id, step.message, result));
      bumpUsage();
    }
    setRows(next);
    if (!failed && hasPolicy && !brand.killed) {
      markSandbox();
      setSummary("Sandbox passed. Live tools stay off until an admin enables this brand.");
    } else if (!hasPolicy) {
      setSummary("No policy snapshot, so the gate cannot pass. Upload a PDF in Knowledge.");
    } else {
      setSummary("Sandbox did not pass. Read the notes, then run it again.");
    }
    setBusy(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-medium">Sandbox</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Three messages run against the server. Each request sends a forged body tenant. A pass means the session brand still answered, with a citation, a photo ask, and a held refund.
      </p>
      <button
        type="button"
        disabled={busy}
        onClick={runAll}
        className="mt-6 h-11 rounded-md bg-accent px-4 text-sm font-medium text-ink disabled:opacity-50"
      >
        {busy ? "Running…" : "Run three messages"}
      </button>
      {brand?.sandboxPassedAt && (
        <p className="mt-3 font-mono text-xs text-muted">Last pass {brand.sandboxPassedAt.slice(0, 19).replace("T", " ")}</p>
      )}
      <ul className="mt-6 space-y-3">
        {SANDBOX_STEPS.map((step) => {
          const row = rows.find((r) => r.id === step.id);
          return (
            <li key={step.id} className="rounded-lg border border-line p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{step.label}</p>
                <span className="font-mono text-xs text-muted">{row ? (row.pass ? "pass" : "fail") : step.id}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{step.message}</p>
              <p className="mt-1 text-xs text-faint">{step.expect}</p>
              {row && <p className="mt-3 text-sm">{row.response}</p>}
              {row && row.notes.length > 0 && (
                <ul className="mt-2 text-sm text-muted">
                  {row.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      {summary && <p className="mt-4 text-sm">{summary}</p>}
    </div>
  );
}
