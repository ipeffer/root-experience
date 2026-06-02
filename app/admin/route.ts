import {
  ADMIN_STATUSES,
  getSubmissionDetail,
  listSubmissions,
  type AdminTable,
  updateSubmission,
} from "../../lib/admin/dashboard";
import { getGiftPageByLeadId } from "../../lib/gift-pages/service";
import {
  buildAdminSessionCookie,
  clearAdminSessionCookie,
  getFallbackPassword,
  isAuthorizedAdminRequest,
} from "../../lib/admin/auth";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toISOString().slice(0, 19).replace("T", " ");
}

function toTable(value: string | null): AdminTable {
  return value === "booking_requests" ? "booking_requests" : "gift_leads";
}

function renderLoginPage(message?: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin Login | ROOT Experience</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 0; background: #f7f7f7; color: #1f1f1f; }
      main { max-width: 420px; margin: 10vh auto; padding: 24px; background: #fff; border: 1px solid #ddd; border-radius: 12px; }
      h1 { margin: 0 0 12px; font-size: 1.4rem; }
      p { margin: 0 0 14px; color: #555; }
      .error { color: #ad1d1d; font-size: 0.92rem; }
      input, button { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cfcfcf; }
      button { margin-top: 12px; border: 0; background: #222; color: #fff; font-weight: 600; cursor: pointer; }
      .hint { margin-top: 12px; font-size: 0.85rem; color: #666; }
    </style>
  </head>
  <body>
    <main>
      <h1>ROOT Admin</h1>
      <p>Enter admin password to view internal dashboard.</p>
      ${message ? `<p class="error">${escapeHtml(message)}</p>` : ""}
      <form method="post" action="/admin">
        <input type="hidden" name="action" value="login" />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" required />
        <button type="submit">Sign in</button>
      </form>
      <p class="hint">Temporary MVP protection. TODO: replace with first-class Supabase Auth admin sign-in flow.</p>
    </main>
  </body>
</html>`;
}

function renderRows(
  table: AdminTable,
  rows: Array<{ id: string; created_at: string; contact_name: string; email: string; status: string }>,
  selectedId: string | null,
  statusFilter: string,
  from: string,
  to: string,
): string {
  if (rows.length === 0) {
    return `<tr><td colspan="5">No results.</td></tr>`;
  }

  return rows
    .map((row) => {
      const detailQuery = new URLSearchParams({
        table,
        selected: row.id,
        status: statusFilter,
        from,
        to,
      });
      const isSelected = row.id === selectedId;
      return `<tr${isSelected ? ` style="background:#fff7d7"` : ""}>
        <td>${safeDate(escapeHtml(row.created_at))}</td>
        <td>${escapeHtml(row.contact_name)}</td>
        <td>${escapeHtml(row.email)}</td>
        <td>${escapeHtml(row.status)}</td>
        <td><a href="/admin?${detailQuery.toString()}">Open</a></td>
      </tr>`;
    })
    .join("");
}

function renderStatusOptions(current: string): string {
  return ADMIN_STATUSES.map((status) => {
    const selected = status === current ? " selected" : "";
    const label = status.slice(0, 1).toUpperCase() + status.slice(1);
    return `<option value="${status}"${selected}>${label}</option>`;
  }).join("");
}

function toCsvCell(value: unknown): string {
  const raw = typeof value === "string" ? value : JSON.stringify(value ?? "");
  const escaped = raw.replaceAll('"', '""');
  return `"${escaped}"`;
}

function toCsv(
  rows: Array<{ table: string; id: string; created_at: string; contact_name: string; email: string; status: string }>,
): string {
  const header = ["table", "id", "created_at", "contact_name", "email", "status"];
  const lines = rows.map((row) =>
    [row.table, row.id, row.created_at, row.contact_name, row.email, row.status].map(toCsvCell).join(","),
  );
  return [header.join(","), ...lines].join("\n");
}

function renderDashboardPage(input: {
  giftRows: Array<{ id: string; created_at: string; contact_name: string; email: string; status: string }>;
  bookingRows: Array<{ id: string; created_at: string; contact_name: string; email: string; status: string }>;
  selectedTable: AdminTable;
  selectedId: string | null;
  statusFilter: string;
  from: string;
  to: string;
  detail: {
    id: string;
    created_at: string;
    contact_name: string;
    email: string;
    phone_or_whatsapp: string | null;
    language: string;
    source: string;
    status: string;
    consent: boolean;
    internal_notes: string | null;
    answers: Record<string, unknown>;
  } | null;
  giftPageUrl?: string | null;
  flashMessage?: string;
}): string {
  const exportQuery = new URLSearchParams({
    format: "csv",
    status: input.statusFilter,
    from: input.from,
    to: input.to,
  });

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin Dashboard | ROOT Experience</title>
    <style>
      body { margin: 0; background: #f7f7f7; color: #202020; font-family: Arial, sans-serif; }
      main { padding: 20px; max-width: 1200px; margin: 0 auto; }
      h1, h2, h3 { margin: 0 0 10px; }
      .card { background: #fff; border: 1px solid #ddd; border-radius: 12px; padding: 14px; margin-bottom: 14px; }
      .grid { display: grid; gap: 14px; grid-template-columns: 1.15fr 1.15fr 1fr; align-items: start; }
      .filters { display: flex; gap: 10px; flex-wrap: wrap; align-items: end; }
      label { display: flex; flex-direction: column; gap: 4px; font-size: 0.9rem; color: #444; }
      input, select, textarea, button { border: 1px solid #cfcfcf; border-radius: 8px; padding: 8px; font: inherit; }
      textarea { width: 100%; min-height: 120px; resize: vertical; }
      table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
      th, td { border-bottom: 1px solid #ececec; text-align: left; padding: 8px 6px; vertical-align: top; }
      th { color: #555; background: #fafafa; }
      .toolbar { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
      .muted { color: #666; font-size: 0.88rem; }
      .flash { color: #146a26; font-size: 0.9rem; }
      .error { color: #a11d1d; font-size: 0.9rem; }
      pre { white-space: pre-wrap; background: #fafafa; border: 1px solid #eee; border-radius: 8px; padding: 10px; max-height: 260px; overflow: auto; }
      @media (max-width: 980px) { .grid { grid-template-columns: 1fr; } }
    </style>
  </head>
  <body>
    <main>
      <div class="toolbar">
        <h1>ROOT Admin Dashboard</h1>
        <form method="post" action="/admin">
          <input type="hidden" name="action" value="logout" />
          <button type="submit">Sign out</button>
        </form>
      </div>
      <div class="card">
        <form method="get" action="/admin" class="filters">
          <label>Status
            <select name="status">
              <option value="all"${input.statusFilter === "all" ? " selected" : ""}>All</option>
              ${ADMIN_STATUSES.map((status) => {
                const label = status.slice(0, 1).toUpperCase() + status.slice(1);
                return `<option value="${status}"${input.statusFilter === status ? " selected" : ""}>${label}</option>`;
              }).join("")}
            </select>
          </label>
          <label>From date
            <input type="date" name="from" value="${escapeHtml(input.from)}" />
          </label>
          <label>To date
            <input type="date" name="to" value="${escapeHtml(input.to)}" />
          </label>
          <button type="submit">Apply filters</button>
          <a href="/admin?${exportQuery.toString()}">Export CSV</a>
        </form>
        <p class="muted">Statuses: New, Contacted, Confirmed, Declined, Completed.</p>
        ${input.flashMessage ? `<p class="flash">${escapeHtml(input.flashMessage)}</p>` : ""}
      </div>

      <section class="grid">
        <div class="card">
          <h2>Gift leads</h2>
          <table>
            <thead><tr><th>Created</th><th>Name</th><th>Email</th><th>Status</th><th></th></tr></thead>
            <tbody>${renderRows(
              "gift_leads",
              input.giftRows,
              input.selectedTable === "gift_leads" ? input.selectedId : null,
              input.statusFilter,
              input.from,
              input.to,
            )}</tbody>
          </table>
        </div>

        <div class="card">
          <h2>Booking requests</h2>
          <table>
            <thead><tr><th>Created</th><th>Name</th><th>Email</th><th>Status</th><th></th></tr></thead>
            <tbody>${renderRows(
              "booking_requests",
              input.bookingRows,
              input.selectedTable === "booking_requests" ? input.selectedId : null,
              input.statusFilter,
              input.from,
              input.to,
            )}</tbody>
          </table>
        </div>

        <div class="card">
          <h2>Detail</h2>
          ${
            input.detail
              ? `<h3>${escapeHtml(input.detail.contact_name)}</h3>
            <p class="muted">${escapeHtml(input.detail.email)}${input.detail.phone_or_whatsapp ? ` / ${escapeHtml(input.detail.phone_or_whatsapp)}` : ""}</p>
            <p class="muted">ID: ${escapeHtml(input.detail.id)}</p>
            <p class="muted">Created: ${safeDate(escapeHtml(input.detail.created_at))}</p>
            <p class="muted">Language: ${escapeHtml(input.detail.language)} | Source: ${escapeHtml(input.detail.source)} | Consent: ${input.detail.consent ? "yes" : "no"}</p>
            ${
              input.giftPageUrl
                ? `<p><a href="${escapeHtml(input.giftPageUrl)}" target="_blank" rel="noopener noreferrer">Open gift page</a></p>`
                : ""
            }
            <form method="post" action="/admin">
              <input type="hidden" name="action" value="update" />
              <input type="hidden" name="table" value="${input.selectedTable}" />
              <input type="hidden" name="id" value="${escapeHtml(input.detail.id)}" />
              <input type="hidden" name="statusFilter" value="${escapeHtml(input.statusFilter)}" />
              <input type="hidden" name="from" value="${escapeHtml(input.from)}" />
              <input type="hidden" name="to" value="${escapeHtml(input.to)}" />
              <label>Status
                <select name="status">${renderStatusOptions(input.detail.status)}</select>
              </label>
              <label>Internal notes
                <textarea name="internalNotes">${escapeHtml(input.detail.internal_notes ?? "")}</textarea>
              </label>
              <button type="submit">Save</button>
            </form>
            <h3 style="margin-top:12px">Answers</h3>
            <pre>${escapeHtml(JSON.stringify(input.detail.answers, null, 2))}</pre>`
              : `<p class="muted">Select a row to open full details.</p>`
          }
        </div>
      </section>
    </main>
  </body>
</html>`;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const isAllowed = await isAuthorizedAdminRequest(request);
  if (!isAllowed) {
    return new Response(renderLoginPage(), {
      status: 401,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  const statusFilter = (url.searchParams.get("status") ?? "all").toLowerCase();
  const from = (url.searchParams.get("from") ?? "").slice(0, 10);
  const to = (url.searchParams.get("to") ?? "").slice(0, 10);
  const selectedId = url.searchParams.get("selected");
  const selectedTable = toTable(url.searchParams.get("table"));
  const flashMessage = url.searchParams.get("saved") ? "Record updated." : undefined;

  const filters = {
    status: statusFilter,
    from,
    to,
  };

  const [giftRows, bookingRows] = await Promise.all([
    listSubmissions("gift_leads", filters),
    listSubmissions("booking_requests", filters),
  ]);

  if (url.searchParams.get("format") === "csv") {
    const rows = [
      ...giftRows.map((row) => ({ table: "gift_leads", ...row })),
      ...bookingRows.map((row) => ({ table: "booking_requests", ...row })),
    ];
    return new Response(toCsv(rows), {
      status: 200,
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="root-admin-export.csv"`,
      },
    });
  }

  const detail = selectedId ? await getSubmissionDetail(selectedTable, selectedId) : null;
  let giftPageUrl: string | null = null;
  if (detail && selectedTable === "gift_leads") {
    const giftPage = await getGiftPageByLeadId(detail.id);
    if (giftPage) {
      giftPageUrl = `/gift/g/${giftPage.slug}?lang=${detail.language}`;
    }
  }

  return new Response(
    renderDashboardPage({
      giftRows,
      bookingRows,
      selectedTable,
      selectedId,
      statusFilter,
      from,
      to,
      detail,
      giftPageUrl,
      flashMessage,
    }),
    { status: 200, headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

export async function POST(request: Request): Promise<Response> {
  const form = await request.formData();
  const action = String(form.get("action") ?? "");

  if (action === "login") {
    const expectedPassword = getFallbackPassword();
    const inputPassword = String(form.get("password") ?? "");
    if (!expectedPassword || inputPassword !== expectedPassword) {
      return new Response(renderLoginPage("Invalid credentials."), {
        status: 401,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    return new Response(null, {
      status: 303,
      headers: {
        location: "/admin",
        "set-cookie": buildAdminSessionCookie(expectedPassword),
      },
    });
  }

  if (action === "logout") {
    return new Response(null, {
      status: 303,
      headers: {
        location: "/admin",
        "set-cookie": clearAdminSessionCookie(),
      },
    });
  }

  const isAllowed = await isAuthorizedAdminRequest(request);
  if (!isAllowed) {
    return new Response(renderLoginPage("Authentication required."), {
      status: 401,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  if (action === "update") {
    const table = toTable(String(form.get("table") ?? ""));
    const id = String(form.get("id") ?? "");
    const status = String(form.get("status") ?? "").toLowerCase();
    const internalNotes = String(form.get("internalNotes") ?? "");

    if (!id) {
      return Response.json({ ok: false, message: "Missing id." }, { status: 400 });
    }

    await updateSubmission(table, id, { status, internalNotes });

    const statusFilter = String(form.get("statusFilter") ?? "all");
    const from = String(form.get("from") ?? "");
    const to = String(form.get("to") ?? "");
    const query = new URLSearchParams({
      table,
      selected: id,
      status: statusFilter,
      from,
      to,
      saved: "1",
    });

    return new Response(null, {
      status: 303,
      headers: {
        location: `/admin?${query.toString()}`,
      },
    });
  }

  return Response.json({ ok: false, message: "Unsupported action." }, { status: 400 });
}
