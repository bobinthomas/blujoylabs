type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  service: string;
  engagement?: string;
  message: string;
  deadline?: string;
};

const REQUIRED_FIELDS: (keyof ContactPayload)[] = ["name", "company", "email", "service", "message"];

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !body[field] || !String(body[field]).trim());
  if (missing.length > 0) {
    return Response.json({ error: `Missing required field(s): ${missing.join(", ")}.` }, { status: 400 });
  }

  // TODO(launch blocker): no real recipient or delivery provider is configured yet.
  // Wire this to the owner-approved notification channel (e.g. Resend, SES, or a
  // ticketing webhook) once the production enquiry recipient is confirmed — see
  // the relaunch plan's "Open items" list. Until then this only validates and logs.
  console.log("[contact] enquiry received:", { ...body, message: body.message?.slice(0, 200) });

  return Response.json({ ok: true });
}
