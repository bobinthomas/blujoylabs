import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Sends site notifications (enquiries, newsletter sign-ups) through Cloudflare
 * Email Service's `send_email` Worker binding — no API keys involved.
 *
 * The binding is locked in wrangler.jsonc to a single destination
 * (`allowed_destination_addresses`), so these public forms can never be used to
 * relay mail anywhere else. Recipient and sender come from the Worker vars
 * NOTIFY_TO / NOTIFY_FROM; the sender's domain must be onboarded to Cloudflare
 * Email Service (`wrangler email sending enable <domain>`) or sends fail with
 * E_SENDER_NOT_VERIFIED.
 */

type EmailAddress = { email: string; name?: string };
type SendEmailBinding = {
  send(message: {
    to: string | EmailAddress | (string | EmailAddress)[];
    from: string | EmailAddress;
    subject: string;
    text?: string;
    html?: string;
    replyTo?: string | EmailAddress;
  }): Promise<{ messageId: string }>;
};
type MailEnv = { EMAIL?: SendEmailBinding; NOTIFY_TO?: string; NOTIFY_FROM?: string };

export const FALLBACK_CONTACT_EMAIL = "connect@bluejoylabs.com";

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
  try {
    return getCloudflareContext().env as unknown as MailEnv;
  } catch {
    // Plain `next dev` has no Cloudflare context.
    return {};
  }
}

export async function sendNotification(n: Notification): Promise<SendResult> {
  const env = readEnv();
  const rows = n.fields.filter(([, v]) => v && v.trim()) as [string, string][];

  if (!env.EMAIL) {
    // Local development only: log instead of sending, so the forms stay testable.
    if (process.env.NODE_ENV === "development") {
      console.log(`[mailer] (dev, not sent) ${n.subject}`, Object.fromEntries(rows));
      return { ok: true };
    }
    return { ok: false, reason: "EMAIL binding is not configured" };
  }

  const to = env.NOTIFY_TO || FALLBACK_CONTACT_EMAIL;
  const from = env.NOTIFY_FROM || "website@bluejoylabs.com";

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
    const res = await env.EMAIL.send({
      to,
      from: { email: from, name: "BluJoy Labs Website" },
      subject: n.subject,
      text,
      html,
      ...(n.replyTo ? { replyTo: n.replyTo } : {}),
    });
    return { ok: true, messageId: res.messageId };
  } catch (err) {
    const e = err as { code?: string; message?: string };
    console.error("[mailer] send failed:", e.code, e.message);
    return { ok: false, reason: e.code || e.message || "send failed" };
  }
}
