import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page } from "@/components/site/frame";
import { getPlatformStatus } from "@/lib/api";

export const Route = createFileRoute("/status")({ component: StatusPage });

type Status = Awaited<ReturnType<typeof getPlatformStatus>>;

function StatusPage() {
  const [data, setData] = useState<Status | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getPlatformStatus()
      .then(setData)
      .catch(() => setError("Status endpoint did not respond."));
  }, []);

  return (
    <Page
      eyebrow="Status"
      title="Sandbox is up. Live tools are off."
      lede="This page reads the server status function. It does not claim a paid host or a restored database."
    >
      {error && <p className="text-sm text-muted">{error}</p>}
      {!data && !error && <p className="text-sm text-muted">Checking the runtime…</p>}
      {data && (
        <div className="overflow-hidden rounded-lg border border-line">
          <div className="grid gap-2 border-b border-line px-4 py-4 md:grid-cols-3">
            <Stat k="Mode" v={data.mode} />
            <Stat k="Stripe" v={data.stripe} />
            <Stat k="Refund cap" v={`₹${data.refundCap}`} />
          </div>
          <ul>
            {data.checks.map((c) => (
              <li key={c.name} className="flex items-center justify-between border-b border-line px-4 py-3 text-sm last:border-b-0">
                <span>{c.name}</span>
                <span className="font-mono text-xs text-accent">{c.ok ? "ok" : "down"}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Page>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="text-xs text-muted">{k}</p>
      <p className="mt-1 font-mono text-sm">{v}</p>
    </div>
  );
}
