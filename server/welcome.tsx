import { render, validate } from "@hyper-elements/react";
import WelcomeEmail, { firstName } from "@/modules/welcome-email";
import { MAIL } from "@/shared/data/site";
import { MAX_DEPTH } from "@/shared/lib/sea";
import { validateCertificateRequest } from "@/shared/lib/visitor";
import { sendMail } from "./mail";
import { allow, clientIp } from "./rate-limit";

const MAX_BODY = 2000;

const json = (body: unknown, status: number, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers } });

/**
 * POST /api/welcome  { name, email } → sends the welcome email (or saves it to out/ without mail credentials).
 * Limits, counted in this process's memory (see rate-limit.ts for the upgrade path): 10 a minute per IP, 2 a minute per address.
 */
export async function handleWelcome(request: Request): Promise<Response> {
  if (request.method !== "POST") return json({ error: "Use POST." }, 405, { Allow: "POST" });
  if (!allow(`welcome:${clientIp(request)}`))
    return json({ error: "Too many requests. Try again in a minute." }, 429, { "Retry-After": "60" });

  const text = await request.text();
  if (text.length > MAX_BODY) return json({ error: "That request is too big." }, 413);
  let input: unknown;
  try {
    input = JSON.parse(text);
  } catch {
    return json({ error: "Send the form as JSON." }, 400);
  }

  // Same rules as the certificate form (the date is not used here).
  const result = validateCertificateRequest(input, "");
  if (!result.ok) return json({ errors: result.errors }, 400);
  const { name, email } = result.value;
  if (!email) return json({ errors: { email: "Please type an email address." } }, 400);
  if (!allow(`mail:${email.toLowerCase()}`, Date.now(), 2))
    return json({ error: "That address just got an email. Try again in a minute." }, 429, { "Retry-After": "60" });

  // The renderer escapes the name; no HTML is built from visitor text here.
  const design = <WelcomeEmail name={name} depth={MAX_DEPTH} />;
  const checked = validate(design);
  if (!checked.valid) return json({ error: "Something went wrong on our side." }, 500);
  const { html, text: plain } = await render(design);

  try {
    const outcome = await sendMail({ to: email, subject: MAIL.subject(firstName(name)), html, text: plain });
    return json(
      {
        message: outcome === "sent" ? "Welcome email sent. Check your inbox." : "Mail is not set up on this server, so no email was sent.",
      },
      200,
    );
  } catch {
    return json({ error: "The welcome email could not be sent. Try again later." }, 502);
  }
}
