import { render, validate } from "@hyper-elements/react";
import WelcomeEmail, { firstName } from "@/modules/welcome-email";
import { MAIL } from "@/shared/data/site";
import { MAX_DEPTH } from "@/shared/lib/sea";
import { validateCertificateRequest, type VisitorFields } from "@/shared/lib/visitor-form";
import { certificateLink, siteOrigin, today } from "./certificate-link";
import { json } from "./http";
import { defaultMailer, type Mail, type Mailer } from "./mail";
import { allow } from "./rate-limit";
import { route } from "./route";

/**
 * The welcome email for this visitor, with their signed certificate link. Throws if the site address or the signing
 * secret is missing in production, or if the design is invalid. The renderer escapes the name; no HTML is built from visitor text here.
 */
export async function welcomeMail({ name, email, date }: VisitorFields, origin: string): Promise<Mail> {
  const certificateUrl = await certificateLink(origin, name, date);
  const design = <WelcomeEmail name={name} depth={MAX_DEPTH} certificateUrl={certificateUrl} origin={origin} />;
  if (!validate(design).valid) throw new Error("the welcome email design is not valid");
  const { html, text } = await render(design);
  return { to: email, subject: MAIL.subject(firstName(name)), html, text };
}

/**
 * POST /api/welcome  { name, email } → sends the welcome email (or saves it to out/ without mail credentials).
 * Limits, counted in this process's memory (see rate-limit.ts for the upgrade path): 10 a minute per IP, 2 a minute per address.
 * `mailer` is the seam: Brevo or the out/ file in the app, a capture in tests.
 */
export const createWelcomeHandler = (mailer: Mailer) =>
  route({ method: "POST", bucket: "welcome" }, async ({ request, body }) => {
    // Same rules as the certificate, and the email is required. The date is always today (a date from the client is ignored), fixed in the signed link.
    const fields = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
    const result = validateCertificateRequest({ name: fields.name, email: fields.email }, today(), true);
    if (!result.ok) return json({ errors: result.errors }, 400);
    const visitor = result.value;
    if (!allow(`mail:${visitor.email.toLowerCase()}`, Date.now(), 2))
      return json({ error: "That address just got an email. Try again in a minute." }, 429, { "Retry-After": "60" });

    let mail: Mail;
    try {
      mail = await welcomeMail(visitor, siteOrigin(request));
    } catch {
      return json({ error: "Something went wrong on our side." }, 500);
    }
    try {
      const outcome = await mailer(mail);
      return json(
        {
          sent: outcome === "sent",
          message:
            outcome === "sent" ? "Welcome email sent. Check your inbox." : "Mail is not set up on this server, so no email was sent.",
        },
        200,
      );
    } catch {
      return json({ error: "The welcome email could not be sent. Try again later." }, 502);
    }
  });

export const handleWelcome = createWelcomeHandler((mail) => defaultMailer(mail));
