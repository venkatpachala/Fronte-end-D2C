//#region node_modules/.nitro/vite/services/ssr/assets/db-Y0lnj7HL.js
var _0002_kivo_ops_default = "-- Kivo operations workspace. Rows are the shared demo desk, not personal accounts.\n\ncreate table if not exists brands (\n  id text primary key,\n  name text not null,\n  segment text not null,\n  refund_cap integer not null\n);\n\ncreate table if not exists conversations (\n  id text primary key,\n  brand_id text not null references brands (id),\n  channel text not null,\n  customer_label text not null,\n  subject text not null,\n  preview text not null,\n  intent text not null,\n  status text not null,\n  priority text not null,\n  ai_handled boolean not null default false,\n  confidence integer not null default 0,\n  amount_inr integer,\n  order_ref text,\n  assignee text not null,\n  opened_at timestamptz not null default now(),\n  updated_at timestamptz not null default now()\n);\n\ncreate index if not exists conversations_brand_idx on conversations (brand_id, updated_at desc);\n\ncreate table if not exists messages (\n  id serial primary key,\n  conversation_id text not null references conversations (id),\n  author text not null,\n  body text not null,\n  citation text,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists messages_conversation_idx on messages (conversation_id, id);\n\ncreate table if not exists policies (\n  id text primary key,\n  brand_id text not null references brands (id),\n  title text not null,\n  clause text not null,\n  body text not null\n);\n\ncreate table if not exists automations (\n  id text primary key,\n  brand_id text not null references brands (id),\n  name text not null,\n  trigger_text text not null,\n  action_text text not null,\n  enabled boolean not null default true,\n  runs_7d integer not null default 0\n);\n\ncreate table if not exists quality_scores (\n  id text primary key,\n  brand_id text not null references brands (id),\n  conversation_id text not null references conversations (id),\n  agent_kind text not null,\n  policy_score integer not null,\n  tone_score integer not null,\n  resolution_score integer not null,\n  note text not null\n);\n\ncreate table if not exists volume_days (\n  brand_id text not null references brands (id),\n  day date not null,\n  inbound integer not null,\n  resolved_by_ai integer not null,\n  primary key (brand_id, day)\n);\n\ninsert into brands (id, name, segment, refund_cap) values\n  ('northline', 'Northline', 'Apparel', 2000),\n  ('mira', 'Mira Pantry', 'Quick commerce', 500)\non conflict (id) do nothing;\n\ninsert into conversations (\n  id, brand_id, channel, customer_label, subject, preview, intent, status, priority,\n  ai_handled, confidence, amount_inr, order_ref, assignee, opened_at, updated_at\n) values\n  ('c_nl_18420', 'northline', 'whatsapp', 'Meera S.', 'Damaged tee, NL-18420',\n   'The black tee arrived with a tear along the seam.', 'return', 'waiting_customer', 'high',\n   true, 86, null, 'NL-18420', 'Kivo', now() - interval '3 hours', now() - interval '40 minutes'),\n  ('c_nl_18455', 'northline', 'email', 'Arun P.', 'Refund ₹2,500 for a stained jacket',\n   'Please refund ₹2,500. The jacket was stained on arrival.', 'refund', 'waiting_approval', 'high',\n   true, 91, 2500, 'NL-18455', 'Floor', now() - interval '5 hours', now() - interval '18 minutes'),\n  ('c_nl_18302', 'northline', 'chat', 'Leela N.', 'Where is NL-18302',\n   'Has NL-18302 shipped?', 'wismo', 'ai_resolved', 'normal',\n   true, 94, null, 'NL-18302', 'Kivo', now() - interval '8 hours', now() - interval '7 hours'),\n  ('c_nl_18390', 'northline', 'voice', 'Kabir D.', 'Size exchange, tee runs small',\n   'Can I exchange the tee for a larger size?', 'exchange', 'open', 'normal',\n   false, 62, null, 'NL-18390', 'Floor', now() - interval '70 minutes', now() - interval '12 minutes'),\n  ('c_nl_18211', 'northline', 'whatsapp', 'Anika R.', 'Cancel NL-18211 before it ships',\n   'Please cancel, it has not shipped.', 'cancel', 'ai_resolved', 'normal',\n   true, 97, null, 'NL-18211', 'Kivo', now() - interval '1 day', now() - interval '22 hours'),\n  ('c_nl_18501', 'northline', 'email', 'Sana Q.', 'Refund ₹900, wrong colour',\n   'The tee is navy. I ordered stone.', 'refund', 'ai_resolved', 'low',\n   true, 93, 900, 'NL-18501', 'Kivo', now() - interval '6 hours', now() - interval '5 hours'),\n  ('c_nl_18100', 'northline', 'chat', 'Guest', 'Cash on delivery in Hyderabad?',\n   'Is COD available in Hyderabad?', 'policy', 'ai_resolved', 'low',\n   true, 99, null, null, 'Kivo', now() - interval '2 days', now() - interval '2 days'),\n  ('c_mp_9021', 'mira', 'whatsapp', 'Ishan V.', 'Milk and bread missing, MP-9021',\n   'Two items were not in the bag.', 'missing_item', 'waiting_approval', 'high',\n   true, 88, 640, 'MP-9021', 'Floor', now() - interval '50 minutes', now() - interval '9 minutes'),\n  ('c_mp_9044', 'mira', 'chat', 'Riya K.', 'MP-9044 arrived 40 minutes late',\n   'The 8 pm slot showed up at 9:38.', 'late', 'ai_resolved', 'normal',\n   true, 90, 40, 'MP-9044', 'Kivo', now() - interval '14 hours', now() - interval '13 hours'),\n  ('c_mp_8990', 'mira', 'voice', 'Dev P.', 'Received oats instead of muesli',\n   'The pack in the bag is the wrong SKU.', 'wrong_item', 'open', 'high',\n   false, 58, null, 'MP-8990', 'Floor', now() - interval '35 minutes', now() - interval '6 minutes'),\n  ('c_mp_9102', 'mira', 'email', 'Nila T.', 'Spoiled yogurt, MP-9102',\n   'The yogurt was warm when the bag arrived.', 'refund', 'ai_resolved', 'normal',\n   true, 92, 180, 'MP-9102', 'Kivo', now() - interval '9 hours', now() - interval '8 hours'),\n  ('c_mp_9077', 'mira', 'whatsapp', 'Farhan A.', 'Cancel the 9 pm slot',\n   'Stop MP-9077, I will not be home.', 'cancel', 'waiting_customer', 'normal',\n   true, 84, null, 'MP-9077', 'Kivo', now() - interval '2 hours', now() - interval '25 minutes')\non conflict (id) do nothing;\n\ninsert into messages (conversation_id, author, body, citation) values\n  ('c_nl_18420', 'customer', $$The black tee from order NL-18420 arrived with a tear along the seam.$$, null),\n  ('c_nl_18420', 'kivo', $$Order NL-18420 is on file. Damage at delivery can be returned when you send photos of the tear and the pack. I have not started a refund.$$, $$Clause 8.1.2$$),\n  ('c_nl_18420', 'kivo', $$Send two photos: the seam, and the outer pack. A person clears the return only after those arrive.$$, null),\n  ('c_nl_18455', 'customer', $$Please refund ₹2,500. The jacket in NL-18455 was stained on arrival.$$, null),\n  ('c_nl_18455', 'kivo', $$This refund is ₹2,500, above the ₹2,000 cap. I have held it for a person. Stripe was not called.$$, $$Clause 9.1$$),\n  ('c_nl_18302', 'customer', $$Has NL-18302 shipped?$$, null),\n  ('c_nl_18302', 'kivo', $$NL-18302 was handed to the delivery partner this morning. The window is today, 2–6 pm. No refund is open.$$, null),\n  ('c_nl_18390', 'customer', $$The tee is smaller than the size chart. I want a larger one.$$, null),\n  ('c_nl_18390', 'kivo', $$A size exchange is allowed within 7 days if the item is unworn. The voice call asked for a courier pickup, so the floor has this.$$, $$Clause 4.3$$),\n  ('c_nl_18390', 'person', $$Pickup is booked for tomorrow between 10 and 1. Keep the tags on.$$, null),\n  ('c_nl_18211', 'customer', $$Please cancel NL-18211. It has not shipped.$$, null),\n  ('c_nl_18211', 'kivo', $$NL-18211 is still in the warehouse. It can be cancelled before handoff. I have cancelled it. No charge will settle.$$, $$Clause 8.2$$),\n  ('c_nl_18501', 'customer', $$The tee is navy. I ordered stone. Please refund ₹900.$$, null),\n  ('c_nl_18501', 'kivo', $$Wrong colour is covered. ₹900 is under the cap, so the refund is queued to the original payment method. Stripe is not called in this workspace. The case is resolved by policy.$$, $$Clause 9.1$$),\n  ('c_nl_18100', 'customer', $$Is cash on delivery available in Hyderabad?$$, null),\n  ('c_nl_18100', 'kivo', $$Northline does not offer cash on delivery. Checkout is UPI, card, and netbanking. I do not have a session to change.$$, $$Clause 3.1$$),\n  ('c_mp_9021', 'customer', $$Milk and bread were not in the bag for MP-9021.$$, null),\n  ('c_mp_9021', 'kivo', $$Two items are missing on MP-9021. Replacement value is ₹640, above the ₹500 cap. Held for a person. No payment call.$$, $$Clause M.4$$),\n  ('c_mp_9044', 'customer', $$The 8 pm slot showed up at 9:38.$$, null),\n  ('c_mp_9044', 'kivo', $$The slot was 8–9 pm and the drop was 9:38. A ₹40 late-slot credit applies on the next order. The basket is not refunded.$$, $$Clause M.6$$),\n  ('c_mp_8990', 'customer', $$I ordered muesli and received oats.$$, null),\n  ('c_mp_8990', 'kivo', $$Wrong SKU on a voice call needs a photo of the pack before a credit. The floor is on this.$$, $$Clause M.3$$),\n  ('c_mp_9102', 'customer', $$The yogurt in MP-9102 was warm.$$, null),\n  ('c_mp_9102', 'kivo', $$The photo matches a warm perishable. ₹180 is under the cap. Marked for refund to the original method. Stripe stays off in this workspace.$$, $$Clause M.5$$),\n  ('c_mp_9077', 'customer', $$Stop MP-9077. I will not be home.$$, null),\n  ('c_mp_9077', 'kivo', $$MP-9077 is already with the rider, so it cannot be cancelled. I can convert it to a return when it arrives. Say if you want that.$$, $$Clause M.2$$);\n\ninsert into policies (id, brand_id, title, clause, body) values\n  ('p_nl_812', 'northline', 'Damage at delivery', 'Clause 8.1.2',\n   $$Items substantially damaged at delivery may be returned when the customer sends images of the damage and the pack, and starts the request on the platform.$$),\n  ('p_nl_82', 'northline', 'Cancel before handoff', 'Clause 8.2',\n   $$An order may be cancelled before it is handed to the delivery partner. After dispatch, cancellation follows the return path.$$),\n  ('p_nl_91', 'northline', 'Refunds and the cap', 'Clause 9.1',\n   $$Refunds go to the original payment method. Above ₹2,000 a person must approve. The assistant must not say a refund is complete, and must not call Stripe.$$),\n  ('p_nl_43', 'northline', 'Size exchange', 'Clause 4.3',\n   $$A size exchange is allowed within 7 days if the item is unworn and tags are attached.$$),\n  ('p_nl_31', 'northline', 'How you can pay', 'Clause 3.1',\n   $$Checkout is UPI, card, and netbanking. Cash on delivery is not offered.$$),\n  ('p_mp_m2', 'mira', 'Cancel after the rider has it', 'Clause M.2',\n   $$Once an order is with the rider it cannot be cancelled. It can be refused at the door and returned.$$),\n  ('p_mp_m3', 'mira', 'Wrong item', 'Clause M.3',\n   $$A wrong SKU is credited after a photo of the pack. Voice calls are handed to the floor until the photo arrives.$$),\n  ('p_mp_m4', 'mira', 'Missing item and the cap', 'Clause M.4',\n   $$Missing items are replaced or refunded at shelf value. Above ₹500 a person approves. No payment call until then.$$),\n  ('p_mp_m5', 'mira', 'Perishables', 'Clause M.5',\n   $$Warm or spoiled perishables are refunded to the original method when a photo matches, and the amount is under the cap.$$),\n  ('p_mp_m6', 'mira', 'Late slot', 'Clause M.6',\n   $$A drop more than 30 minutes after the slot earns a ₹40 credit on the next order. The basket is not refunded for lateness alone.$$)\non conflict (id) do nothing;\n\ninsert into automations (id, brand_id, name, trigger_text, action_text, enabled, runs_7d) values\n  ('a_nl_photos', 'northline', 'Ask before a damaged return', 'Return for damage, no photos on the thread', 'Ask for seam and pack photos. Do not refund.', true, 128),\n  ('a_nl_cap', 'northline', 'Hold refunds above the cap', 'Refund amount over ₹2,000', 'Set waiting approval. Skip Stripe.', true, 17),\n  ('a_nl_cancel', 'northline', 'Cancel in the warehouse', 'Cancel request and order not yet handed off', 'Cancel the order and resolve.', true, 46),\n  ('a_nl_block', 'northline', 'Block off-policy asks', 'Prompt injection or a request outside support', 'Refuse and do not call a tool.', true, 9),\n  ('a_mp_cap', 'mira', 'Hold credits above ₹500', 'Missing item or refund over ₹500', 'Set waiting approval. Skip payment.', true, 22),\n  ('a_mp_late', 'mira', 'Late slot credit', 'Drop more than 30 minutes after the slot', 'Apply ₹40 next-order credit. Resolve.', true, 61),\n  ('a_mp_rider', 'mira', 'No cancel once riding', 'Cancel after rider assignment', 'Explain Clause M.2 and offer a door refusal.', true, 33),\n  ('a_mp_photo', 'mira', 'Photo before wrong-SKU credit', 'Wrong item on voice or chat, no photo', 'Ask for the pack photo and hand to the floor.', true, 19)\non conflict (id) do nothing;\n\ninsert into quality_scores (id, brand_id, conversation_id, agent_kind, policy_score, tone_score, resolution_score, note) values\n  ('q1', 'northline', 'c_nl_18455', 'ai', 98, 84, 90, 'Cited 9.1, named the cap, and did not imply the refund was sent.'),\n  ('q2', 'northline', 'c_nl_18302', 'ai', 92, 88, 96, 'Gave the window without inventing a tracking link.'),\n  ('q3', 'northline', 'c_nl_18390', 'human', 80, 90, 74, 'Pickup was booked. The tags reminder should have been in the first reply.'),\n  ('q4', 'northline', 'c_nl_18501', 'ai', 96, 86, 94, 'Under-cap refund queued without telling the customer the money had moved.'),\n  ('q5', 'mira', 'c_mp_9021', 'ai', 97, 82, 88, 'Held ₹640 correctly. Tone is a little clipped for a missing staple.'),\n  ('q6', 'mira', 'c_mp_9044', 'ai', 94, 91, 93, 'Credit, not a basket refund. Matches M.6.'),\n  ('q7', 'mira', 'c_mp_8990', 'human', 70, 86, 60, 'Still waiting on the pack photo. The floor has not sent the ask in the customer''s words.'),\n  ('q8', 'northline', 'c_nl_18100', 'ai', 99, 80, 95, 'Correct refusal of COD. Could name the three methods more plainly.')\non conflict (id) do nothing;\n\ninsert into volume_days (brand_id, day, inbound, resolved_by_ai) values\n  ('northline', current_date - 13, 38, 24),\n  ('northline', current_date - 12, 44, 29),\n  ('northline', current_date - 11, 41, 27),\n  ('northline', current_date - 10, 52, 36),\n  ('northline', current_date - 9, 47, 31),\n  ('northline', current_date - 8, 36, 22),\n  ('northline', current_date - 7, 33, 21),\n  ('northline', current_date - 6, 49, 34),\n  ('northline', current_date - 5, 55, 39),\n  ('northline', current_date - 4, 46, 32),\n  ('northline', current_date - 3, 51, 37),\n  ('northline', current_date - 2, 43, 30),\n  ('northline', current_date - 1, 48, 35),\n  ('northline', current_date, 22, 14),\n  ('mira', current_date - 13, 80, 61),\n  ('mira', current_date - 12, 92, 70),\n  ('mira', current_date - 11, 88, 66),\n  ('mira', current_date - 10, 101, 79),\n  ('mira', current_date - 9, 96, 74),\n  ('mira', current_date - 8, 74, 55),\n  ('mira', current_date - 7, 69, 50),\n  ('mira', current_date - 6, 94, 73),\n  ('mira', current_date - 5, 110, 86),\n  ('mira', current_date - 4, 99, 77),\n  ('mira', current_date - 3, 105, 82),\n  ('mira', current_date - 2, 91, 68),\n  ('mira', current_date - 1, 97, 75),\n  ('mira', current_date, 41, 30)\non conflict (brand_id, day) do nothing;\n";
var _0003_archal_default = "-- Archal product API. Same rows the desk already shows, plus keys, sessions, and workflow records.\n\ncreate table if not exists archal_tenants (\n  id text primary key,\n  name text not null,\n  segment text not null,\n  refund_cap integer not null,\n  killed boolean not null default false,\n  live_enabled boolean not null default false,\n  sandbox_passed_at timestamptz,\n  daily_cap integer not null default 2000,\n  used_today integer not null default 0,\n  webhook_url text\n);\n\ninsert into archal_tenants (id, name, segment, refund_cap, used_today)\nselect id, name, segment, refund_cap, 0 from brands\non conflict (id) do nothing;\n\ncreate table if not exists archal_keys (\n  token text primary key,\n  tenant_id text not null references archal_tenants (id),\n  role text not null,\n  mode text not null default 'test'\n);\n\ninsert into archal_keys (token, tenant_id, role, mode) values\n  ('archal_test_n4k2', 'northline', 'widget', 'test'),\n  ('archal_sup_n4k2', 'northline', 'supervisor', 'test'),\n  ('archal_test_m8p1', 'mira', 'widget', 'test'),\n  ('archal_sup_m8p1', 'mira', 'supervisor', 'test')\non conflict (token) do nothing;\n\ncreate table if not exists archal_sessions (\n  id text primary key,\n  tenant_id text not null,\n  customer_ref text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists archal_cases (\n  id text primary key,\n  brand_id text not null,\n  channel text not null,\n  customer_label text not null,\n  customer_ref text not null,\n  subject text not null,\n  preview text not null,\n  intent text not null,\n  status text not null,\n  priority text not null,\n  ai_handled boolean not null default true,\n  confidence integer not null default 80,\n  amount_inr integer,\n  order_ref text,\n  assignee text not null default 'Archal',\n  escalated boolean not null default false,\n  missing_inputs text not null default '',\n  citations text not null default '',\n  opened_at timestamptz not null default now(),\n  updated_at timestamptz not null default now()\n);\n\ninsert into archal_cases (\n  id, brand_id, channel, customer_label, customer_ref, subject, preview, intent, status, priority,\n  ai_handled, confidence, amount_inr, order_ref, assignee, opened_at, updated_at\n)\nselect\n  id, brand_id, channel, customer_label, customer_label, subject, preview, intent, status, priority,\n  ai_handled, confidence, amount_inr, order_ref, assignee, opened_at, updated_at\nfrom conversations\non conflict (id) do nothing;\n\ncreate table if not exists archal_messages (\n  id serial primary key,\n  conversation_id text not null,\n  author text not null,\n  body text not null,\n  citation text,\n  created_at timestamptz not null default now()\n);\n\ninsert into archal_messages (conversation_id, author, body, citation, created_at)\nselect conversation_id, case when author = 'kivo' then 'archal' else author end, body, citation, created_at\nfrom messages;\n\ncreate table if not exists archal_tasks (\n  id text primary key,\n  tenant_id text not null,\n  case_id text not null,\n  task_type text not null,\n  status text not null,\n  amount integer,\n  order_ref text,\n  note text\n);\n\ninsert into archal_tasks (id, tenant_id, case_id, task_type, status, amount, order_ref)\nselect 'task_' || id, brand_id, id, 'refund_approval', 'pending', amount_inr, order_ref\nfrom archal_cases\nwhere status = 'waiting_approval'\non conflict (id) do nothing;\n\ncreate table if not exists archal_runs (\n  id text primary key,\n  tenant_id text not null,\n  case_id text not null,\n  workflow_name text not null,\n  status text not null,\n  current_step text,\n  error text,\n  output_json text not null default '{}'\n);\n\ninsert into archal_runs (id, tenant_id, case_id, workflow_name, status, current_step)\nselect 'run_' || id, brand_id, id, 'support.turn', status, 'reply'\nfrom archal_cases\non conflict (id) do nothing;\n\ncreate table if not exists archal_steps (\n  id serial primary key,\n  run_id text not null,\n  step_index integer not null,\n  step_name text not null,\n  status text not null,\n  attempt integer not null default 1,\n  error text\n);\n\ninsert into archal_steps (run_id, step_index, step_name, status)\nselect 'run_' || id, 1, 'policy', 'succeeded' from archal_cases;\n\ninsert into archal_steps (run_id, step_index, step_name, status)\nselect 'run_' || id, 2, 'tools', case when status = 'waiting_approval' then 'skipped' else 'succeeded' end\nfrom archal_cases;\n\ncreate table if not exists archal_interactions (\n  id text primary key,\n  tenant_id text not null,\n  case_id text,\n  customer_ref text,\n  intent text,\n  outcome text,\n  escalated boolean not null default false,\n  created_at timestamptz not null default now()\n);\n\ninsert into archal_interactions (id, tenant_id, case_id, customer_ref, intent, outcome, escalated, created_at)\nselect 'int_' || id, brand_id, id, customer_label, intent, status, false, updated_at\nfrom archal_cases\non conflict (id) do nothing;\n\ncreate table if not exists archal_docs (\n  id text primary key,\n  tenant_id text not null,\n  name text not null,\n  bytes integer not null,\n  status text not null,\n  error text\n);\n\ninsert into archal_docs (id, tenant_id, name, bytes, status) values\n  ('snap_northline_v1', 'northline', 'Northline terms of use.pdf', 240000, 'ready'),\n  ('snap_mira_v1', 'mira', 'Mira pantry policy.pdf', 180000, 'ready')\non conflict (id) do nothing;\n\ncreate table if not exists archal_accounts (\n  email text primary key,\n  password_hash text not null,\n  tenant_id text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists archal_owner_sessions (\n  token text primary key,\n  tenant_id text not null,\n  created_at timestamptz not null default now()\n);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({
			"/migrations/0002_kivo_ops.sql": _0002_kivo_ops_default,
			"/migrations/0003_archal.sql": _0003_archal_default
		});
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
//#endregion
export { getSql as t };
