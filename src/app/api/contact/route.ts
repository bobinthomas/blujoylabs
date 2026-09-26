type ContactPayload = {
  name: string;
  /** Optional — individuals and early-stage founders must not be blocked from enquiring. */
  company?: string;
  email: string;
  service: string;
  message: string;
  /** Date-only (YYYY-MM-DD), collected for GovCon pursuits only. */
  deadline?: string;
};

const REQUIRED_FIELDS: (keyof ContactPayload)[] = ["name", "email", "service", "message"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "We couldn't read your enquiry. Please try again." }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !body[field] || !String(body[field]).trim());
  if (missing.length > 0) {
    return Response.json(
      { error: "Please complete the required fields: name, email, service interest and your message." },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(String(body.email).trim())) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // TODO(launch blocker): no real recipient or delivery provider is configured yet.
  // Wire this to the owner-approved notification channel (e.g. Resend, SES, or a
  // ticketing webhook) once the production enquiry recipient is confirmed. Until
  // then this only validates and logs — the Home handoff's "check that submissions
  // reach the designated inbox" cannot be satisfied without that recipient.
  console.log("[contact] enquiry received:", { ...body, message: body.message?.slice(0, 200) });

  return Response.json({ ok: true });
}
