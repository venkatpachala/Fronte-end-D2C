import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mark } from "@/components/site/frame";

export const Route = createFileRoute("/w/$tenant")({ component: Widget });

type Turn = { role: "user" | "assistant"; text: string; meta?: string };

function Widget() {
  const { tenant } = Route.useParams();
  const slug = tenant.toLowerCase();
  const [message, setMessage] = useState("");
  const [bodyTenant, setBodyTenant] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  async function ensureSession() {
    if (sessionReady) return true;
    const response = await fetch(`/w/${slug}/session`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        customer_ref: "widget",
        tenant_id: bodyTenant.trim() || undefined,
      }),
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => ({}))) as { detail?: string };
      setTurns((current) => [...current, { role: "assistant", text: body.detail || "Session was refused.", meta: String(response.status) }]);
      return false;
    }
    setSessionReady(true);
    return true;
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    setTurns((current) => [...current, { role: "user", text: trimmed }]);
    setMessage("");
    const ok = await ensureSession();
    if (!ok) {
      setBusy(false);
      return;
    }
    const response = await fetch("/chat", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ message: trimmed, tenant_id: bodyTenant.trim() || undefined }),
    });
    const body = (await response.json().catch(() => ({}))) as {
      detail?: string;
      response?: string;
      workflow_status?: string;
      citations?: string[];
    };
    if (!response.ok) {
      setTurns((current) => [...current, { role: "assistant", text: body.detail || "The chat endpoint failed.", meta: String(response.status) }]);
    } else {
      setTurns((current) => [
        ...current,
        {
          role: "assistant",
          text: body.response || "No reply.",
          meta: [body.workflow_status, body.citations?.[0]].filter(Boolean).join(" · "),
        },
      ]);
    }
    setBusy(false);
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="flex h-14 items-center justify-between border-b border-line px-4">
        <Link to="/">
          <Mark />
        </Link>
        <span className="font-mono text-xs text-muted">{slug}</span>
      </header>
      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-lg flex-col px-4 py-6">
        <p className="text-sm text-muted">
          Opens a session on this brand, then posts to /chat. A forged tenant in the body is rejected. Nothing here marks you verified, and Stripe is not called.
        </p>
        <div className="mt-4 flex-1 space-y-3">
          {turns.length === 0 && (
            <div className="rounded-lg border border-dashed border-line p-4 text-sm text-muted">
              Ask about a damaged return, or try a refund of 2500.
            </div>
          )}
          {turns.map((turn, i) => (
            <div key={`${turn.role}-${i}`} className={turn.role === "user" ? "ml-8" : "mr-8"}>
              <div className={turn.role === "user" ? "rounded-lg bg-surface px-3 py-2 text-sm" : "rounded-lg border border-line px-3 py-2 text-sm"}>
                {turn.text}
              </div>
              {turn.meta && <p className="mt-1 font-mono text-xs text-faint">{turn.meta}</p>}
            </div>
          ))}
        </div>
        <form
          className="mt-4 space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            void send(message);
          }}
        >
          <label className="block text-xs text-muted" htmlFor="forge">
            Optional forged tenant (widget rejects a mismatch)
          </label>
          <input
            id="forge"
            value={bodyTenant}
            onChange={(e) => setBodyTenant(e.target.value)}
            placeholder="leave empty"
            className="h-11 w-full rounded-md border border-line bg-elev px-3 text-sm"
          />
          <div className="flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="h-11 min-w-0 flex-1 rounded-md border border-line bg-elev px-3 text-sm"
            />
            <button type="submit" disabled={busy} className="h-11 rounded-md bg-accent px-4 text-sm font-medium text-ink disabled:opacity-50">
              Send
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
