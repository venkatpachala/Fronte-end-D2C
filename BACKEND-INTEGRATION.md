# Python support backend integration

The support product uses the Python API as the data authority. Configure the
server-only `D2C_API_ORIGIN` to the API origin. Never expose supervisor keys
or database credentials through browser variables. Keep `VITE_AUTH_ENABLED=false`
for Python owner authentication. Run `npm ci --ignore-scripts`, `npm run typecheck`,
`npm test` and `npm run build`. Run locally with `npm run dev` on port 8080.

Backend: https://github.com/venkatpachala/AI-Customer-Support-
The matching `web/` snapshot there provides a combined browser CI journey with
an explicit fake model. The widget and operator desk both use the real Python
routes; local mock data is not their authority. Customer session headers cannot
access operator routes. Operator replies are stored as operator messages.

Production requires HTTPS frontend/API, PostgreSQL, migrations and a background
worker. Follow the backend docs/production-launch.md release gates. Payments
remain disabled until merchant sandbox/reconciliation verification. No public
production deployment or live-provider validation is claimed by this change.
