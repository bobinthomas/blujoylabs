import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Sends site notifications (enquiries, newsletter sign-ups) through Resend's
 * HTTP API (free tier: 3,000 emails a month, 100 a day).
 *
 * Every message goes to one fixed inbox (NOTIFY_TO) — visitor input only ever
 * appears in the body and the Reply-To, never as a recipient — so these public
 * forms cannot be used to send mail to anyone else.
 *
 * Config (Worker settings):
 *   RESEND_API_KEY  secret — `npx wrangler secret put RESEND_API_KEY`
 *   NOTIFY_TO       var    — the team inbox
 *   NOTIFY_FROM     var    — sender; its domain must be verified in Resend
 */

type MailEnv = { RESEND_API_KEY?: string; NOTIFY_TO?: string; NOTIFY_FROM?: string };

export const FALLBACK_CONTACT_EMAIL = "connect@blujoylabs.com";

export type Notification = {
  subject: string;
  /** Label/value rows; empty values are skipped. */
  fields: [label: string, value: string | undefined][];
  replyTo?: { email: string; name?: string };
};

export type SendResult = { ok: true; messageId?: string } | { ok: false; reason: string };

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function readEnv(): MailEnv {
  let cf: MailEnv = {};
  try {
    cf = getCloudflareContext().env as unknown as MailEnv;
  } catch {
    // Plain `next dev` has no Cloudflare context.
  }
  return {
    RESEND_API_KEY: cf.RESEND_API_KEY ?? process.env.RESEND_API_KEY,
    NOTIFY_TO: cf.NOTIFY_TO ?? process.env.NOTIFY_TO,
    NOTIFY_FROM: cf.NOTIFY_FROM ?? process.env.NOTIFY_FROM,
  };
}

export async function sendNotification(n: Notification): Promise<SendResult> {
  const env = readEnv();
  const rows = n.fields.filter(([, v]) => v && v.trim()) as [string, string][];

  if (!env.RESEND_API_KEY) {
    // Local development only: log instead of sending, so the forms stay testable.
    if (process.env.NODE_ENV === "development") {
      console.log(`[mailer] (dev, not sent) ${n.subject}`, Object.fromEntries(rows));
      return { ok: true };
    }
    return { ok: false, reason: "RESEND_API_KEY is not configured" };
  }

  const to = env.NOTIFY_TO || FALLBACK_CONTACT_EMAIL;
  const from = env.NOTIFY_FROM || "website@blujoylabs.com";

  const text = rows.map(([k, v]) => `${k}:\n${v}`).join("\n\n");
  const html =
    `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">` +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="vertical-align:top;color:#5b6b82;white-space:nowrap"><strong>${escapeHtml(k)}</strong></td>` +
          `<td style="white-space:pre-wrap;color:#10233f">${escapeHtml(v)}</td></tr>`
      )
      .join("") +
    `</table>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `BluJoy Labs Website <${from}>`,
        to: [to],
        subject: n.subject,
        text,
        html,
        ...(n.replyTo ? { reply_to: n.replyTo.name ? `${n.replyTo.name} <${n.replyTo.email}>` : n.replyTo.email } : {}),
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { id?: string; name?: string; message?: string };
    if (!res.ok) {
      console.error("[mailer] Resend rejected the send:", res.status, data.name, data.message);
      return { ok: false, reason: data.name || `HTTP ${res.status}` };
    }
    return { ok: true, messageId: data.id };
  } catch (err) {
    console.error("[mailer] send failed:", err instanceof Error ? err.message : err);
    return { ok: false, reason: "network error" };
  }
}
