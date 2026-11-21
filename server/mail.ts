import { mkdir, writeFile } from "node:fs/promises";
import { SITE } from "../src/shared/data/site";

export interface Mail {
  to: string;
  subject: string;
  html: string;
  text: string;
}

const OUT = new URL("../out/", import.meta.url);

/**
 * The one place that sends mail; swap the body to change provider (Mailjet, Maileroo, Resend, SMTP).
 * Brevo's REST API over `fetch`: BREVO_API_KEY and MAIL_FROM (one verified sender address) come from the environment.
 * Without them nothing is sent: the email is written to out/ so a fresh clone still runs.
 * Never log the key or the address.
 */
export async function sendMail(mail: Mail): Promise<"sent" | "saved"> {
  const key = process.env.BREVO_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!key || !from) {
    await mkdir(OUT, { recursive: true });
    await writeFile(new URL("welcome-email.html", OUT), mail.html);
    await writeFile(new URL("welcome-email.txt", OUT), mail.text);
    console.log("mail not configured: wrote the email to out/welcome-email.html");
    return "saved";
  }
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": key, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      sender: { name: SITE.name, email: from },
      to: [{ email: mail.to }],
      subject: mail.subject,
      htmlContent: mail.html,
      textContent: mail.text,
    }),
  });
  if (!response.ok) throw new Error(`mail provider answered ${response.status}`);
  return "sent";
}
