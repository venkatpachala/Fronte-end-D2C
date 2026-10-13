import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { activeBrand, useArchal } from "@/lib/store";

export const Route = createFileRoute("/console/install")({ component: Install });

function Install() {
  const brand = useArchal((s) => activeBrand(s));
  const addBrand = useArchal((s) => s.addBrand);
  const toggleKill = useArchal((s) => s.toggleKill);
  const [name, setName] = useState("");
  const [liveNote, setLiveNote] = useState("");

  if (!brand) return null;

  const snippet = `<script src="/widget.js" data-brand="${brand.id}"></script>`;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-medium">Install</h1>
      <p className="mt-1 text-sm text-muted">Key prefixes only. The live switch refuses without a host password, which this preview does not accept.</p>

      <dl className="mt-6 space-y-3 rounded-lg border border-line p-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Widget key</dt>
          <dd className="font-mono">{brand.widgetPrefix}····</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Supervisor key</dt>
          <dd className="font-mono">{brand.supervisorPrefix}····</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Sandbox</dt>
          <dd>{brand.sandboxPassedAt ? "passed" : "not passed"}</dd>
        </div>
      </dl>

      <h2 className="mt-8 text-lg">Widget snippet</h2>
      <pre className="mt-2 overflow-x-auto rounded-lg border border-line bg-elev p-4 font-mono text-xs text-muted">{snippet}</pre>
      <p className="mt-2 text-sm text-muted">
        Open the sample at the widget path for this brand. The chat box has no verified field.
      </p>

      <h2 className="mt-8 text-lg">New brand</h2>
      <form
        className="mt-2 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          addBrand(name.trim());
          setName("");
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Brand name"
          className="h-11 flex-1 rounded-md border border-line bg-elev px-3 text-sm"
        />
        <button type="submit" className="h-11 rounded-md border border-line px-4 text-sm">
          Create empty brand
        </button>
      </form>

      <h2 className="mt-8 text-lg">Controls</h2>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <button type="button" className="h-11 rounded-md border border-line px-4 text-sm" onClick={toggleKill}>
          {brand.killed ? "Enable brand" : "Disable brand"}
        </button>
        <button
          type="button"
          className="h-11 rounded-md border border-line px-4 text-sm"
          onClick={() => setLiveNote("Live tools stay off. This preview does not accept a host password.")}
        >
          Enable live tools
        </button>
      </div>
      {liveNote && <p className="mt-3 text-sm text-muted">{liveNote}</p>}
    </div>
  );
}
