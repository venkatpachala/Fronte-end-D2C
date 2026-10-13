import { createHash, randomBytes } from "node:crypto";
import { getSql } from "@/lib/db";
import { handleChat, SANDBOX_STEPS, type ChatOk } from "@/lib/runtime";

const CUSTOMER = "archal_customer";
const OWNER = "archal_owner";
const OPS = "archal_ops";

type Principal = { token: string; tenantId: string; role: string; mode: string; killed: boolean };

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function redirect(location: string, status = 303) {
  return new Response(null, { status, headers: { location } });
}

function cookieHeader(name: string, value: string, maxAge = 60 * 60 * 24 * 14) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}

function cookies(request: Request) {
  const out: Record<string, string> = {};
  for (const part of (request.headers.get("cookie") ?? "").split(";")) {
    const [raw, ...rest] = part.trim().split("=");
    if (!raw) continue;
    out[raw] = decodeURIComponent(rest.join("="));
  }
  return out;
}

function bearer(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(\S+)/i);
  return match?.[1] ?? "";
}

function nid(prefix: string) {
  return `${prefix}_${randomBytes(4).toString("hex")}`;
}

function hashPassword(password: string) {
  return createHash("sha256").update(`archal:${password}`).digest("hex");
}

function wantsHtml(request: Request) {
  const accept = request.headers.get("accept") ?? "";
  const type = request.headers.get("content-type") ?? "";
  return accept.includes("text/html") && !type.includes("application/json");
}

async function readBody(request: Request): Promise<Record<string, unknown>> {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    try {
      const body = await request.json();
      return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
    } catch {
      return {};
    }
  }
  if (type.includes("form")) {
    const form = await request.formData();
    const out: Record<string, unknown> = {};
    for (const [key, value] of form.entries()) out[key] = value;
    return out;
  }
  return {};
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function principalOf(token: string): Promise<Principal | null> {
  if (!token) return null;
  const sql = await getSql();
  const rows = await sql<{ token: string; tenant_id: string; role: string; mode: string; killed: boolean }>`
    select k.token, k.tenant_id, k.role, k.mode, t.killed
    from archal_keys k
    join archal_tenants t on t.id = k.tenant_id
    where k.token = ${token}
  `;
  const row = rows[0];
  if (!row) return null;
  return { token: row.token, tenantId: row.tenant_id, role: row.role, mode: row.mode, killed: Boolean(row.killed) };
}

async function sessionOf(id: string) {
  if (!id) return null;
  const sql = await getSql();
  const rows = await sql<{ id: string; tenant_id: string; customer_ref: string }>`
    select id, tenant_id, customer_ref from archal_sessions where id = ${id}
  `;
  return rows[0] ?? null;
}

async function ownerTenant(token: string) {
  if (!token) return "";
  const sql = await getSql();
  const rows = await sql<{ tenant_id: string }>`
    select tenant_id from archal_owner_sessions where token = ${token}
  `;
  return rows[0]?.tenant_id ?? "";
}

function mismatch(bodyTenant: string, tenantId: string) {
  return Boolean(bodyTenant) && bodyTenant !== tenantId;
}

async function tenantRow(id: string) {
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    refund_cap: number;
    killed: boolean;
    daily_cap: number;
    used_today: number;
    webhook_url: string | null;
  }>`
    select id, refund_cap, killed, daily_cap, used_today, webhook_url
    from archal_tenants where id = ${id}
  `;
  return rows[0] ?? null;
}

async function persistTurn(input: {
  tenantId: string;
  customerRef: string;
  message: string;
  channel: "api" | "widget";
}) {
  const tenant = await tenantRow(input.tenantId);
  if (!tenant) return json({ detail: "Unknown tenant." }, 400);
  if (tenant.killed) return json({ detail: "tenant chat is disabled" }, 403);
  if (Number(tenant.used_today) >= Number(tenant.daily_cap)) {
    return json({ detail: "daily request cap reached" }, 429);
  }
  const sql = await getSql();
  const docs = await sql<{ id: string }>`
    select id from archal_docs where tenant_id = ${input.tenantId} and status = 'ready' limit 1
  `;
  const result = handleChat({
    sessionTenant: input.tenantId,
    message: input.message,
    hasPolicy: docs.length > 0,
    usedToday: Number(tenant.used_today),
    dailyCap: Number(tenant.daily_cap),
    killed: false,
    photosAlready: /uploaded the photo|here are the photo|photos uploaded/i.test(input.message),
    channel: input.channel,
    refundCap: Number(tenant.refund_cap),
  });
  if (!result.ok) return json({ detail: result.error }, result.status);

  const caseId = nid("case");
  const runId = nid("run");
  const deskStatus = result.workflowStatus === "answered" ? "ai_resolved" : result.workflowStatus;
  const subject = input.message.slice(0, 80);
  await sql`
    insert into archal_cases (
      id, brand_id, channel, customer_label, customer_ref, subject, preview, intent, status, priority,
      ai_handled, confidence, amount_inr, order_ref, assignee, escalated, missing_inputs, citations
    ) values (
      ${caseId}, ${input.tenantId}, ${input.channel}, ${input.customerRef}, ${input.customerRef},
      ${subject}, ${subject}, ${result.intent}, ${deskStatus}, ${result.workflowStatus === "waiting_approval" ? "high" : "normal"},
      true, 88, ${result.amount}, ${result.orderId}, 'Archal', ${result.escalated},
      ${result.missingInputs.join(",")}, ${result.citations.join(" | ")}
    )
  `;
  await sql`
    insert into archal_messages (conversation_id, author, body) values (${caseId}, 'customer', ${input.message})
  `;
  await sql`
    insert into archal_messages (conversation_id, author, body, citation)
    values (${caseId}, 'archal', ${result.response}, ${result.citations[0] ?? null})
  `;
  await sql`
    insert into archal_runs (id, tenant_id, case_id, workflow_name, status, current_step, output_json)
    values (${runId}, ${input.tenantId}, ${caseId}, 'support.turn', ${result.workflowStatus}, 'reply', ${JSON.stringify({ tools: result.tools })})
  `;
  await sql`
    insert into archal_steps (run_id, step_index, step_name, status) values
    (${runId}, 1, 'policy', 'succeeded'),
    (${runId}, 2, 'tools', ${result.workflowStatus === "waiting_approval" ? "skipped" : "succeeded"})
  `;
  let taskId: string | null = null;
  if (result.workflowStatus === "waiting_approval") {
    taskId = nid("task");
    await sql`
      insert into archal_tasks (id, tenant_id, case_id, task_type, status, amount, order_ref)
      values (${taskId}, ${input.tenantId}, ${caseId}, 'refund_approval', 'pending', ${result.amount}, ${result.orderId})
    `;
  }
  await sql`
    insert into archal_interactions (id, tenant_id, case_id, customer_ref, intent, outcome, escalated)
    values (${nid("int")}, ${input.tenantId}, ${caseId}, ${input.customerRef}, ${result.intent}, ${deskStatus}, ${result.escalated})
  `;
  await sql`update archal_tenants set used_today = used_today + 1 where id = ${input.tenantId}`;
  return json({
    response: result.response,
    citations: result.citations,
    workflow_status: result.workflowStatus,
    missing_inputs: result.missingInputs,
    intent: result.intent,
    escalated: result.escalated,
    blocked: result.blocked,
    tools: result.tools,
    order_id: result.orderId,
    amount: result.amount,
    case_id: caseId,
    workflow_run_id: runId,
    pending_approval_task_id: taskId,
    tenant_id: input.tenantId,
    stripe: "not_called",
  });
}

async function decide(taskId: string, tenantId: string, action: "approve" | "reject", note: string) {
  const sql = await getSql();
  const tasks = await sql<{ id: string; case_id: string; status: string }>`
    select id, case_id, status from archal_tasks
    where tenant_id = ${tenantId} and (id = ${taskId} or case_id = ${taskId})
    order by case when status = 'pending' then 0 else 1 end
    limit 1
  `;
  const task = tasks[0];
  if (!task) return json({ detail: "approval not found" }, 404);
  if (task.status !== "pending") return json({ detail: "Already decided. Stripe was not called again." }, 409);
  if (action === "reject" && !note) return json({ detail: "reject note is required" }, 400);
  const next = action === "approve" ? "approved" : "rejected";
  const desk = action === "approve" ? "approved_held" : "rejected";
  const message =
    action === "approve"
      ? "Approved by a person. The refund is held. Stripe was not called."
      : `Rejected. ${note} Stripe was not called.`;
  await sql`update archal_tasks set status = ${next}, note = ${note || message} where id = ${task.id}`;
  await sql`
    update archal_cases set status = ${desk}, assignee = 'Floor', updated_at = now()
    where id = ${task.case_id} and brand_id = ${tenantId}
  `;
  await sql`
    insert into archal_messages (conversation_id, author, body, citation)
    values (${task.case_id}, 'archal', ${message}, 'Clause 9.1')
  `;
  return json({ ok: true, status: desk, task_id: task.id, case_id: task.case_id, stripe: "not_called" });
}

function judge(turns: ChatOk[]) {
  const steps = SANDBOX_STEPS.map((step, index) => {
    const turn = turns[index];
    let ok = false;
    if (!turn) ok = false;
    else if (step.id === "S1") ok = turn.citations.length > 0 && !turn.blocked;
    else if (step.id === "S2") ok = turn.workflowStatus === "waiting_customer";
    else if (step.id === "S3") ok = turn.workflowStatus === "waiting_approval";
    return { id: step.id, label: step.label, ok };
  });
  return { passed: steps.every((step) => step.ok), steps };
}

export async function dispatchArchal(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const method = request.method.toUpperCase();
  const sql = await getSql();

  if (method === "GET" && path === "/health") {
    let db = "ok";
    try {
      await sql`select 1 as ok`;
    } catch {
      db = "error";
    }
    return json({
      status: db === "ok" ? "ok" : "degraded",
      service: "archal",
      tools_mode: "mock",
      db,
      stripe: "not_called",
    });
  }

  if (method === "GET" && path === "/metrics") {
    const rows = await sql<{ n: number }>`select count(*) as n from archal_interactions`;
    return new Response(`archal_interactions ${rows[0]?.n ?? 0}\n`, {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  if (method === "GET" && path === "/widget.js") {
    const tenant = (url.searchParams.get("tenant") ?? "northline").replace(/[^a-z0-9_-]/gi, "") || "northline";
    const script = `(function(){var t=${JSON.stringify(tenant)};var f=document.createElement("iframe");f.src="/w/"+t;f.title="Archal";f.style.cssText="position:fixed;right:16px;bottom:16px;width:380px;height:560px;border:1px solid #2c3136;border-radius:12px;background:#090a0b;z-index:9999";document.body.appendChild(f);})();`;
    return new Response(script, { headers: { "content-type": "application/javascript; charset=utf-8" } });
  }

  if (method === "GET" && path === "/ops") return redirect("/console/approvals");
  if (method === "GET" && (path === "/login" || path === "/signup")) return redirect("/enter");
  if (method === "GET" && path === "/app") return redirect("/console");

  const appRedirects: Record<string, string> = {
    "/app/inbox": "/console/inbox",
    "/app/approvals": "/console/approvals",
    "/app/sandbox": "/console/sandbox",
    "/app/knowledge": "/console/knowledge",
    "/app/connections": "/console/connections",
    "/app/install": "/console/install",
  };
  if (method === "GET" && appRedirects[path]) return redirect(appRedirects[path]);
  const casePage = path.match(/^\/app\/cases\/([^/]+)$/);
  if (method === "GET" && casePage) return redirect(`/console/inbox/${casePage[1]}`);

  if (method === "POST" && path === "/logout") {
    const response = wantsHtml(request) ? redirect("/") : json({ ok: true });
    response.headers.append("set-cookie", cookieHeader(OWNER, "", 0));
    return response;
  }

  if (method === "POST" && (path === "/signup" || path === "/login" || path === "/v1/ops/login")) {
    const body = await readBody(request);
    if (path === "/v1/ops/login") {
      const username = text(body.username);
      const password = text(body.password);
      if (username === "ops" && password === "ops") {
        const response = json({ role: "supervisor" });
        response.headers.append("set-cookie", cookieHeader(OPS, "supervisor"));
        return response;
      }
      return json({ detail: "invalid credentials" }, 401);
    }
    const email = text(body.email).toLowerCase();
    const password = text(body.password);
    const brand = text(body.brand) || text(body.brand_name) || "New brand";
    if (!email.includes("@") || password.length < 8) {
      return json({ detail: "Email and a password of 8 characters are required." }, 400);
    }
    if (path === "/signup") {
      const existing = await sql<{ email: string }>`select email from archal_accounts where email = ${email}`;
      if (existing[0]) return json({ detail: "An account with that email already exists." }, 400);
      const tenantId = brand.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 24) || nid("brand");
      const taken = await sql<{ id: string }>`select id from archal_tenants where id = ${tenantId}`;
      const id = taken[0] ? `${tenantId}-${nid("b").slice(-4)}` : tenantId;
      const widget = `archal_test_${nid("k").slice(-4)}`;
      const supervisor = `archal_sup_${nid("k").slice(-4)}`;
      await sql`
        insert into archal_tenants (id, name, segment, refund_cap) values (${id}, ${brand}, 'D2C', 2000)
      `;
      await sql`
        insert into archal_keys (token, tenant_id, role, mode) values
        (${widget}, ${id}, 'widget', 'test'),
        (${supervisor}, ${id}, 'supervisor', 'test')
      `;
      await sql`
        insert into archal_accounts (email, password_hash, tenant_id) values (${email}, ${hashPassword(password)}, ${id})
      `;
      const session = nid("own");
      await sql`insert into archal_owner_sessions (token, tenant_id) values (${session}, ${id})`;
      const response = json({ tenant_id: id, widget_key: widget, supervisor_key: supervisor });
      response.headers.append("set-cookie", cookieHeader(OWNER, session));
      return response;
    }
    const accounts = await sql<{ password_hash: string; tenant_id: string }>`
      select password_hash, tenant_id from archal_accounts where email = ${email}
    `;
    const account = accounts[0];
    if (!account || account.password_hash !== hashPassword(password)) {
      return json({ detail: "invalid credentials" }, 401);
    }
    const session = nid("own");
    await sql`insert into archal_owner_sessions (token, tenant_id) values (${session}, ${account.tenant_id})`;
    const response = wantsHtml(request) ? redirect("/console") : json({ ok: true, tenant_id: account.tenant_id });
    response.headers.append("set-cookie", cookieHeader(OWNER, session));
    return response;
  }

  const widgetSession = path.match(/^\/w\/([^/]+)\/session$/);
  if (method === "POST" && widgetSession) {
    const tenantId = widgetSession[1].toLowerCase();
    const body = await readBody(request);
    const bodyTenant = text(body.tenant_id);
    if (mismatch(bodyTenant, tenantId)) return json({ detail: "Body tenant does not match the widget path." }, 400);
    const tenant = await tenantRow(tenantId);
    if (!tenant) return json({ detail: "Unknown tenant." }, 400);
    if (tenant.killed) return json({ detail: "tenant chat is disabled" }, 403);
    const customer = text(body.customer_ref) || "widget";
    const id = nid("sess");
    await sql`insert into archal_sessions (id, tenant_id, customer_ref) values (${id}, ${tenantId}, ${customer})`;
    const response = json({ session_id: id, tenant_id: tenantId });
    response.headers.append("set-cookie", cookieHeader(CUSTOMER, id));
    return response;
  }

  if (method === "POST" && path === "/v1/sessions") {
    const key = await principalOf(bearer(request));
    if (!key) return json({ detail: "api key required" }, 401);
    if (key.killed) return json({ detail: "tenant chat is disabled" }, 403);
    const body = await readBody(request);
    if (mismatch(text(body.tenant_id), key.tenantId)) return json({ detail: "tenant mismatch" }, 400);
    const customer = text(body.customer_ref);
    if (!customer) return json({ detail: "customer_ref is required" }, 400);
    const id = nid("sess");
    await sql`insert into archal_sessions (id, tenant_id, customer_ref) values (${id}, ${key.tenantId}, ${customer})`;
    const response = json({ session_id: id, tenant_id: key.tenantId });
    response.headers.append("set-cookie", cookieHeader(CUSTOMER, id));
    return response;
  }

  if (method === "POST" && path === "/v1/chat") {
    const body = await readBody(request);
    const key = await principalOf(bearer(request));
    let tenantId = "";
    let customer = "widget";
    if (key) {
      if (key.killed) return json({ detail: "tenant chat is disabled" }, 403);
      tenantId = key.tenantId;
      customer = text(body.customer_ref) || "widget";
    } else {
      const session = await sessionOf(cookies(request)[CUSTOMER] ?? "");
      if (!session) return json({ detail: "api key required" }, 401);
      tenantId = session.tenant_id;
      customer = session.customer_ref;
    }
    if (mismatch(text(body.tenant_id), tenantId)) return json({ detail: "tenant mismatch" }, 400);
    const message = text(body.message);
    if (!message) return json({ detail: "json body required" }, 400);
    return persistTurn({ tenantId, customerRef: customer, message, channel: "api" });
  }

  if (method === "POST" && path === "/chat") {
    const body = await readBody(request);
    for (const field of ["auth_level", "verified", "verified_order_ids", "verified_customer"]) {
      if (field in body) delete body[field];
    }
    const session = await sessionOf(cookies(request)[CUSTOMER] ?? "");
    if (!session) return json({ detail: "session required" }, 401);
    if (mismatch(text(body.tenant_id), session.tenant_id)) return json({ detail: "tenant mismatch" }, 403);
    const message = text(body.message);
    if (!message) return json({ detail: "json body required" }, 400);
    return persistTurn({
      tenantId: session.tenant_id,
      customerRef: session.customer_ref,
      message,
      channel: "widget",
    });
  }

  if (method === "POST" && path === "/v1/sandbox/run") {
    const key = await principalOf(bearer(request));
    if (!key) return json({ detail: "api key required" }, 401);
    if (key.mode !== "test") return json({ detail: "sandbox runs on a test key" }, 403);
    if (key.killed) return json({ detail: "tenant chat is disabled" }, 403);
    const tenant = await tenantRow(key.tenantId);
    const turns: ChatOk[] = [];
    for (const step of SANDBOX_STEPS) {
      const result = handleChat({
        sessionTenant: key.tenantId,
        message: step.message,
        hasPolicy: true,
        usedToday: 0,
        dailyCap: 2000,
        killed: false,
        photosAlready: false,
        channel: "api",
        refundCap: Number(tenant?.refund_cap ?? 2000),
      });
      if (result.ok) turns.push(result);
    }
    const report = judge(turns);
    if (report.passed) {
      await sql`update archal_tenants set sandbox_passed_at = now() where id = ${key.tenantId}`;
    }
    return json({
      ...report,
      tenant_id: key.tenantId,
      turns: turns.map((turn, index) => ({
        message: SANDBOX_STEPS[index]?.message,
        workflow_status: turn.workflowStatus,
        citations: turn.citations,
        missing_inputs: turn.missingInputs,
      })),
    });
  }

  if (path === "/v1/knowledge" && method === "GET") {
    const key = await principalOf(bearer(request));
    if (!key) return json({ detail: "api key required" }, 401);
    const docs = await sql<{ id: string; name: string; bytes: number; status: string; error: string | null }>`
      select id, name, bytes, status, error from archal_docs where tenant_id = ${key.tenantId} order by name
    `;
    return json({ documents: docs, uploads_open: true });
  }

  if (path === "/v1/knowledge" && method === "POST") {
    const key = await principalOf(bearer(request));
    if (!key) return json({ detail: "api key required" }, 401);
    if (key.role !== "supervisor") return json({ detail: "supervisor key required" }, 403);
    const form = await request.formData().catch(() => null);
    const file = form?.get("file");
    if (!(file instanceof File)) return json({ detail: "PDF file is required." }, 400);
    if (!file.name.toLowerCase().endsWith(".pdf")) return json({ detail: "Only PDF uploads are accepted." }, 400);
    if (file.size > 8 * 1024 * 1024) return json({ detail: "PDF is over 8 MB." }, 400);
    const id = nid("snap");
    await sql`
      insert into archal_docs (id, tenant_id, name, bytes, status) values (${id}, ${key.tenantId}, ${file.name}, ${file.size}, 'ready')
    `;
    return json({ id, name: file.name, bytes: file.size, status: "ready", tenant_id: key.tenantId });
  }

  if (path === "/v1/webhooks" && method === "GET") {
    const key = await principalOf(bearer(request));
    if (!key) return json({ detail: "api key required" }, 401);
    const tenant = await tenantRow(key.tenantId);
    return json({ webhook: tenant?.webhook_url ? { url: tenant.webhook_url } : null });
  }

  if (path === "/v1/webhooks" && method === "POST") {
    const key = await principalOf(bearer(request));
    if (!key) return json({ detail: "api key required" }, 401);
    if (key.role !== "supervisor") return json({ detail: "supervisor key required" }, 403);
    const body = await readBody(request);
    const hook = text(body.url);
    if (!hook.startsWith("https://")) return json({ detail: "Webhook URL must start with https://" }, 400);
    await sql`update archal_tenants set webhook_url = ${hook} where id = ${key.tenantId}`;
    return json({ url: hook, tenant_id: key.tenantId });
  }

  if (method === "POST" && (path === "/v1/tenant/kill" || path === "/v1/tenant/restore")) {
    const key = await principalOf(bearer(request));
    if (!key) return json({ detail: "api key required" }, 401);
    if (key.role !== "supervisor") return json({ detail: "supervisor key required" }, 403);
    const killed = path.endsWith("/kill");
    await sql`update archal_tenants set killed = ${killed} where id = ${key.tenantId}`;
    return json({ killed, tenant_id: key.tenantId });
  }

  if (method === "GET" && path === "/v1/approvals") {
    const key = await principalOf(bearer(request));
    const owner = await ownerTenant(cookies(request)[OWNER] ?? "");
    const ops = cookies(request)[OPS] === "supervisor";
    const tenantId = key?.tenantId || owner;
    if (!tenantId) return json({ detail: "api key required" }, 401);
    if (key && key.role !== "supervisor" && !ops) return json({ detail: "widget key cannot approve" }, 403);
    const status = url.searchParams.get("status") || "pending";
    const tasks = await sql<{
      id: string;
      case_id: string;
      status: string;
      amount: number | null;
      order_ref: string | null;
      note: string | null;
      subject: string;
    }>`
      select t.id, t.case_id, t.status, t.amount, t.order_ref, t.note, c.subject
      from archal_tasks t
      join archal_cases c on c.id = t.case_id
      where t.tenant_id = ${tenantId} and t.status = ${status}
      order by t.id desc
      limit 50
    `;
    return json({
      approvals: tasks.map((task) => ({
        id: task.id,
        case_id: task.case_id,
        type: "refund_approval",
        status: task.status,
        amount: task.amount,
        order_id: task.order_ref,
        note: task.note,
        subject: task.subject,
      })),
    });
  }

  const approval = path.match(/^\/v1\/approvals\/([^/]+)\/(approve|reject)$/);
  if (method === "POST" && approval) {
    const key = await principalOf(bearer(request));
    const owner = await ownerTenant(cookies(request)[OWNER] ?? "");
    const tenantId = key?.tenantId || owner;
    if (!tenantId) return json({ detail: "api key required" }, 401);
    if (key && key.role !== "supervisor") return json({ detail: "widget key cannot approve" }, 403);
    const body = await readBody(request);
    return decide(decodeURIComponent(approval[1]), tenantId, approval[2] as "approve" | "reject", text(body.note));
  }

  const appApproval = path.match(/^\/app\/approvals\/([^/]+)\/(approve|reject)$/);
  if (method === "POST" && appApproval) {
    const owner = await ownerTenant(cookies(request)[OWNER] ?? "");
    if (!owner) return json({ detail: "owner session required" }, 401);
    const body = await readBody(request);
    return decide(decodeURIComponent(appApproval[1]), owner, appApproval[2] as "approve" | "reject", text(body.note));
  }

  if (method === "GET" && path === "/v1/interactions") {
    const key = await principalOf(bearer(request));
    const headerTenant = request.headers.get("x-tenant-id") ?? "";
    const tenantId = key?.tenantId || headerTenant;
    if (!tenantId) return json({ detail: "X-Tenant-Id is required" }, 400);
    const intent = url.searchParams.get("intent");
    const outcome = url.searchParams.get("outcome");
    const rows = await sql<{
      id: string;
      case_id: string | null;
      customer_ref: string | null;
      intent: string | null;
      outcome: string | null;
      escalated: boolean;
      created_at: string;
    }>`
      select id, case_id, customer_ref, intent, outcome, escalated, created_at::text
      from archal_interactions
      where tenant_id = ${tenantId}
      order by created_at desc
      limit 50
    `;
    const items = rows.filter((row) => {
      if (intent && row.intent !== intent) return false;
      if (outcome && row.outcome !== outcome) return false;
      return true;
    });
    return json({ items, count: items.length, order: "newest_first" });
  }

  if (method === "GET" && path === "/interactions/recent") {
    const limit = Math.min(200, Math.max(1, Number(url.searchParams.get("limit") ?? 20)));
    const tenant = url.searchParams.get("tenant_id");
    const rows = await sql<{ id: string; tenant_id: string; case_id: string | null; intent: string | null; outcome: string | null }>`
      select id, tenant_id, case_id, intent, outcome from archal_interactions
      order by created_at desc
      limit ${limit}
    `;
    const items = tenant ? rows.filter((row) => row.tenant_id === tenant) : rows;
    return json({ count: items.length, items });
  }

  const legacyConversation = path.match(/^\/interactions\/conversation\/([^/]+)$/);
  if (method === "GET" && legacyConversation) {
    const id = decodeURIComponent(legacyConversation[1]);
    const rows = await sql<{ id: string; author: string; body: string }>`
      select id::text, author, body from archal_messages where conversation_id = ${id} order by id
    `;
    return json({ conversation_id: id, count: rows.length, items: rows });
  }

  if (method === "GET" && path === "/v1/analytics/intents") {
    const key = await principalOf(bearer(request));
    const tenantId = key?.tenantId || request.headers.get("x-tenant-id") || "";
    if (!tenantId) return json({ detail: "X-Tenant-Id is required" }, 400);
    const rows = await sql<{ intent: string; n: number }>`
      select intent, count(*) as n from archal_interactions
      where tenant_id = ${tenantId}
      group by intent
      order by n desc
    `;
    return json({ tenant_id: tenantId, window: "all", intents: rows });
  }

  const timeline = path.match(/^\/v1\/cases\/([^/]+)\/timeline$/);
  if (method === "GET" && timeline) {
    const caseId = decodeURIComponent(timeline[1]);
    const key = await principalOf(bearer(request));
    const tenantId = key?.tenantId || request.headers.get("x-tenant-id") || "";
    if (!tenantId) return json({ detail: "X-Tenant-Id is required" }, 400);
    const found = await sql<{ id: string }>`
      select id from archal_cases where id = ${caseId} and brand_id = ${tenantId}
    `;
    if (!found[0]) return json({ detail: "case not found" }, 404);
    const messages = await sql<{ author: string; body: string }>`
      select author, body from archal_messages where conversation_id = ${caseId} order by id
    `;
    const tasks = await sql<{ id: string; status: string }>`
      select id, status from archal_tasks where case_id = ${caseId}
    `;
    return json({
      case_id: caseId,
      items: [
        ...messages.map((row) => ({ kind: "message", data: { text: row.body, author: row.author } })),
        ...tasks.map((row) => ({ kind: "approval", ref: row.id, data: { status: row.status } })),
      ],
    });
  }

  const copilot = path.match(/^\/v1\/cases\/([^/]+)\/copilot$/);
  if (method === "GET" && copilot) {
    const caseId = decodeURIComponent(copilot[1]);
    const tenantId = (await principalOf(bearer(request)))?.tenantId || request.headers.get("x-tenant-id") || "";
    if (!tenantId) return json({ detail: "X-Tenant-Id is required" }, 400);
    const cases = await sql<{ missing_inputs: string; citations: string; status: string }>`
      select missing_inputs, citations, status from archal_cases where id = ${caseId} and brand_id = ${tenantId}
    `;
    const row = cases[0];
    if (!row) return json({ detail: "case not found" }, 404);
    const messages = await sql<{ body: string }>`
      select body from archal_messages where conversation_id = ${caseId} order by id
    `;
    const pending = await sql<{ id: string }>`
      select id from archal_tasks where case_id = ${caseId} and status = 'pending' limit 1
    `;
    return json({
      case_id: caseId,
      tenant_id: tenantId,
      summary: messages.slice(-6).map((item) => item.body.slice(0, 240)),
      policy: { outcome: row.status, workflow_status: row.status },
      missing_inputs: row.missing_inputs ? row.missing_inputs.split(",").filter(Boolean) : [],
      pending_approval: Boolean(pending[0]),
      approval_task_id: pending[0]?.id ?? null,
      citations: row.citations ? row.citations.split(" | ").filter(Boolean) : [],
    });
  }

  const oneCase = path.match(/^\/v1\/cases\/([^/]+)$/);
  if (method === "GET" && oneCase) {
    const caseId = decodeURIComponent(oneCase[1]);
    const key = await principalOf(bearer(request));
    const tenantId = key?.tenantId || request.headers.get("x-tenant-id") || "";
    if (!tenantId) return json({ detail: "X-Tenant-Id is required" }, 400);
    const role = request.headers.get("x-actor-role");
    if (role && !["supervisor", "admin"].includes(role.toLowerCase())) {
      return json({ detail: "supervisor role required" }, 403);
    }
    const cases = await sql<{
      id: string;
      brand_id: string;
      customer_ref: string;
      status: string;
      order_ref: string | null;
      escalated: boolean;
    }>`
      select id, brand_id, customer_ref, status, order_ref, escalated
      from archal_cases where id = ${caseId} and brand_id = ${tenantId}
    `;
    const row = cases[0];
    if (!row) return json({ detail: "case not found" }, 404);
    const run = await sql<{ id: string; status: string }>`
      select id, status from archal_runs where case_id = ${caseId} order by id desc limit 1
    `;
    const tasks = await sql<{ id: string; task_type: string; status: string; amount: number | null; order_ref: string | null }>`
      select id, task_type, status, amount, order_ref from archal_tasks
      where case_id = ${caseId} and status = 'pending'
    `;
    return json({
      case_id: row.id,
      tenant_id: row.brand_id,
      customer_id: row.customer_ref,
      status: row.status,
      order_id: row.order_ref,
      escalated: Boolean(row.escalated),
      workflow_run_id: run[0]?.id ?? null,
      workflow_status: run[0]?.status ?? null,
      pending_tasks: tasks.map((task) => ({
        id: task.id,
        type: task.task_type,
        amount: task.amount,
        order_id: task.order_ref,
      })),
    });
  }

  const workflow = path.match(/^\/v1\/workflows\/([^/]+)$/);
  if (method === "GET" && workflow) {
    const runId = decodeURIComponent(workflow[1]);
    const tenantId = (await principalOf(bearer(request)))?.tenantId || request.headers.get("x-tenant-id") || "";
    if (!tenantId) return json({ detail: "X-Tenant-Id is required" }, 400);
    const runs = await sql<{
      id: string;
      tenant_id: string;
      case_id: string;
      workflow_name: string;
      status: string;
      current_step: string | null;
      error: string | null;
      output_json: string;
    }>`
      select id, tenant_id, case_id, workflow_name, status, current_step, error, output_json
      from archal_runs where id = ${runId} and tenant_id = ${tenantId}
    `;
    const run = runs[0];
    if (!run) return json({ detail: "workflow run not found" }, 404);
    const steps = await sql<{ step_name: string; status: string; attempt: number; error: string | null }>`
      select step_name, status, attempt, error from archal_steps where run_id = ${runId} order by step_index
    `;
    return json({
      run_id: run.id,
      tenant_id: run.tenant_id,
      case_id: run.case_id,
      workflow_name: run.workflow_name,
      status: run.status,
      current_step: run.current_step,
      error: run.error,
      output: JSON.parse(run.output_json || "{}"),
      steps: steps.map((step) => ({
        name: step.step_name,
        status: step.status,
        attempt: step.attempt,
        error: step.error,
      })),
    });
  }

  if (method === "POST" && path === "/app/sandbox/run") {
    const owner = await ownerTenant(cookies(request)[OWNER] ?? "");
    if (!owner) return json({ detail: "owner session required" }, 401);
    return json({ ok: true, detail: "Use POST /v1/sandbox/run with the test key." });
  }

  if (method === "POST" && path === "/app/install/kill") {
    const owner = await ownerTenant(cookies(request)[OWNER] ?? "");
    if (!owner) return json({ detail: "owner session required" }, 401);
    const rows = await sql<{ killed: boolean }>`select killed from archal_tenants where id = ${owner}`;
    const killed = !rows[0]?.killed;
    await sql`update archal_tenants set killed = ${killed} where id = ${owner}`;
    return wantsHtml(request) ? redirect("/console/install") : json({ killed, tenant_id: owner });
  }

  if (method === "POST" && path === "/support") {
    const body = await readBody(request);
    const note = text(body.message) || text(body.note);
    if (!note) return json({ detail: "message is required" }, 400);
    return json({ ok: true, received: note.slice(0, 500) });
  }

  if (method === "POST" && path === "/privacy/delete") {
    const owner = await ownerTenant(cookies(request)[OWNER] ?? "");
    if (!owner) return json({ detail: "owner session required" }, 401);
    await sql`delete from archal_owner_sessions where tenant_id = ${owner}`;
    await sql`delete from archal_accounts where tenant_id = ${owner}`;
    const response = json({ ok: true, tenant_id: owner, deleted: "account" });
    response.headers.append("set-cookie", cookieHeader(OWNER, "", 0));
    return response;
  }

  const connection = path.match(/^\/app\/connections\/([^/]+)(\/test)?$/);
  if (method === "POST" && connection) {
    const provider = connection[1];
    if (!["shopify", "stripe", "gmail"].includes(provider)) return json({ detail: "unknown provider" }, 400);
    return json({
      ok: true,
      provider,
      tested: Boolean(connection[2]),
      live: false,
      detail: "Sandbox connection only. The token is not stored. Stripe is not called.",
    });
  }

  return json({ detail: "not found", path, method }, 404);
}
