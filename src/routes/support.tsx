import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/site/frame";
import { useArchal } from "@/lib/store";

export const Route = createFileRoute("/support")({
  component: Support,
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { dispatchArchal } = await import("@/lib/archal/http");
        return dispatchArchal(request);
      },
    },
  },
});

function Support() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState("");

  function submit(kind: "stuck" | "delete") {
    const text = note.trim();
    if (!text && kind === "stuck") {
      setSaved("Describe the stuck case first.");
      return;
    }
    const key = "archal-support-notes";
    const prev = JSON.parse(localStorage.getItem(key) || "[]") as { kind: string; text: string; at: string }[];
    prev.unshift({ kind, text: text || "Delete local workspace", at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(prev.slice(0, 20)));
    if (kind === "delete") {
      useArchal.persist.clearStorage();
      setSaved("Deletion noted. Reload the console to start from the Northline sample. Stripe was not called.");
    } else {
      setSaved("Stuck-case note stored on this device. It does not call Stripe.");
    }
    setNote("");
  }

  return (
    <Page
      eyebrow="Support"
      title="Tell us a case is stuck, or wipe this browser."
      lede="Notes stay on this device. Neither action calls Stripe or a live shop."
    >
      <form
        className="max-w-xl space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          submit("stuck");
        }}
      >
        <label className="block text-sm" htmlFor="note">
          What happened
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={5}
          className="w-full rounded-md border border-line bg-elev px-3 py-2 text-sm text-fg outline-none"
          placeholder="Order, brand, and what the console did."
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="submit" className="h-11 rounded-md bg-accent px-4 text-sm font-medium text-ink">
            Save note
          </button>
          <button
            type="button"
            className="h-11 rounded-md border border-line px-4 text-sm"
            onClick={() => submit("delete")}
          >
            Request local deletion
          </button>
        </div>
        {saved && <p className="text-sm text-muted">{saved}</p>}
      </form>
    </Page>
  );
}
