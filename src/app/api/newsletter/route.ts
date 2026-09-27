import { FALLBACK_CONTACT_EMAIL, sendNotification } from "@/lib/mailer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter sign-up: notifies the team inbox of each new subscriber. There is
 * no mailing-list provider yet, so the inbox is the list — the team adds
 * subscribers to whatever newsletter tool they adopt.
 */
export async function POST(request: Request) {
  let body: { email?: string; website?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 400 });
  }

  // Honeypot filled: accept quietly, send nothing.
  if (body.website) return Response.json({ ok: true });

  const email = String(body.email ?? "").trim().slice(0, 254);
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const result = await sendNotification({
    subject: `Newsletter sign-up: ${email}`,
    replyTo: { email },
    fields: [
      ["Email", email],
      ["Signed up from", "Resources page"],
    ],
  });

  if (!result.ok) {
    return Response.json(
      { error: `We couldn't sign you up just now. Please try again, or email ${FALLBACK_CONTACT_EMAIL}.` },
      { status: 502 }
    );
  }
  return Response.json({ ok: true });
}
