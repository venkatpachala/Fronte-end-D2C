import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { activeBrand, useArchal } from "@/lib/store";

export const Route = createFileRoute("/console/connections")({ component: Connections });

function Connections() {
  const brand = useArchal((s) => activeBrand(s));
  const setConnection = useArchal((s) => s.setConnection);

  return (
    <div>
      <h1 className="text-2xl font-medium">Connections</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Only the last four digits are kept. A full token is not shown again and is not sent to chat. WhatsApp cannot be saved.
      </p>
      <div className="mt-6 grid gap-4">
        <Conn
          name="Shopify"
          last4={brand?.shopifyLast4 ?? ""}
          onSave={(v) => setConnection("shopify", v)}
        />
        <Conn
          name="Stripe"
          last4={brand?.stripeLast4 ?? ""}
          onSave={(v) => setConnection("stripe", v)}
        />
        <Conn
          name="Gmail"
          last4={brand?.gmailLast4 ?? ""}
          onSave={(v) => setConnection("gmail", v)}
        />
        <div className="rounded-lg border border-line p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg">WhatsApp</h2>
            <span className="font-mono text-xs text-muted">unavailable</span>
          </div>
          <p className="mt-2 text-sm text-muted">No save button. This channel is not part of the sandbox.</p>
        </div>
      </div>
    </div>
  );
}

function Conn({ name, last4, onSave }: { name: string; last4: string; onSave: (v: string) => void }) {
  const [value, setValue] = useState("");
  const [note, setNote] = useState("");

  return (
    <form
      className="rounded-lg border border-line p-4"
      onSubmit={(e) => {
        e.preventDefault();
        const digits = value.replace(/\D/g, "");
        if (digits.length < 4) {
          setNote("Enter at least four digits. The rest is discarded.");
          return;
        }
        onSave(digits);
        setValue("");
        setNote("Stored last four only.");
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg">{name}</h2>
        <span className="font-mono text-xs text-muted">{last4 ? `···· ${last4}` : "not connected"}</span>
      </div>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Token or key — only last 4 kept"
          className="h-11 flex-1 rounded-md border border-line bg-elev px-3 text-sm"
          autoComplete="off"
        />
        <button type="submit" className="h-11 rounded-md bg-accent px-4 text-sm font-medium text-ink">
          Save last four
        </button>
      </div>
      {note && <p className="mt-2 text-xs text-muted">{note}</p>}
    </form>
  );
}
