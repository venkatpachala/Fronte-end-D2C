import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useArchal } from "@/lib/store";

export const Route = createFileRoute("/console/knowledge")({ component: Knowledge });

function Knowledge() {
  const activeId = useArchal((s) => s.activeId);
  const docs = useArchal((s) => s.docs.filter((d) => d.tenantId === s.activeId));
  const addDoc = useArchal((s) => s.addDoc);
  const removeDoc = useArchal((s) => s.removeDoc);
  const [error, setError] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-medium">Knowledge</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        PDF only, 8 MB max. A ready file creates a snapshot id for this brand. The sample Northline pack is not copied to a new brand.
      </p>
      <label className="mt-6 inline-flex h-11 cursor-pointer items-center rounded-md bg-accent px-4 text-sm font-medium text-ink">
        Upload PDF
        <input
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            const result = addDoc({ name: file.name, bytes: file.size });
            setError(result.ok ? "" : result.error || "Upload failed.");
          }}
        />
      </label>
      {error && <p className="mt-3 text-sm text-muted">{error}</p>}
      <ul className="mt-6 divide-y divide-line rounded-lg border border-line">
        {docs.length === 0 && <li className="px-4 py-6 text-sm text-muted">No snapshot for {activeId}.</li>}
        {docs.map((d) => (
          <li key={d.id} className="flex flex-col gap-2 px-4 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p>{d.name}</p>
              <p className="mt-1 font-mono text-xs text-muted">
                {d.status === "ready" ? `${d.snapshotId} · ${d.pages} pages` : d.error}
              </p>
            </div>
            <button type="button" className="h-11 rounded-md border border-line px-3 text-sm" onClick={() => removeDoc(d.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
