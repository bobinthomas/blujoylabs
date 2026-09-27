import { FALLBACK_CONTACT_EMAIL, sendNotification } from "@/lib/mailer";

type ContactPayload = {
  name: string;
  /** Optional — individuals and early-stage founders must not be blocked from enquiring. */
  company?: string;
  email: string;
  service: string;
  message: string;
  /** Date-only (YYYY-MM-DD), collected for GovCon pursuits only. */
  deadline?: string;
  /** Honeypot: hidden from people, filled in by naive bots. */
  website?: string;
};

const REQUIRED_FIELDS: (keyof ContactPayload)[] = ["name", "email", "service", "message"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVICE_LABELS: Record<string, string> = {
  govcon: "GovCon Support",
  "ai-consulting": "AI Consulting",
  "design-engineering": "Design & Engineering",
  "multiple-unsure": "Multiple services / Not sure yet",
};

const clip = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "We couldn't read your enquiry. Please try again." }, { status: 400 });
  }

  // Bot filled the invisible field: accept quietly and send nothing.
  if (body.website) return Response.json({ ok: true });

  const missing = REQUIRED_FIELDS.filter((field) => !body[field] || !String(body[field]).trim());
  if (missing.length > 0) {
    return Response.json(
      { error: "Please complete the required fields: name, email, service interest and your message." },
      { status: 400 }
    );
  }

  const email = clip(body.email, 254);
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const name = clip(body.name, 200);
  const service = SERVICE_LABELS[clip(body.service, 50)] ?? clip(body.service, 50);

  const result = await sendNotification({
    subject: `New enquiry: ${service} — ${name}`,
    replyTo: { email, name },
    fields: [
      ["Name", name],
      ["Email", email],
      ["Company / Organisation", clip(body.company, 200)],
      ["Service interest", service],
      ["Submission deadline", clip(body.deadline, 20)],
      ["Message", clip(body.message, 5000)],
    ],
  });

  // Success is only reported once the email has actually been handed off —
  // never a "received" message for an enquiry that went nowhere.
  if (!result.ok) {
    return Response.json(
      {
        error: `We couldn't send your enquiry just now. Please try again, or email us directly at ${FALLBACK_CONTACT_EMAIL}.`,
      },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
