import { mkdir, writeFile } from "node:fs/promises";
import { SITE } from "../src/shared/data/site";

export interface Mail {
  to: string;
  subject: string;
  html: string;
  text: string;
}

const OUT = new URL("../out/", import.meta.url);

/** Sends one email: "sent" when a provider took it, "saved" when it was only kept (nothing was delivered). */
export type Mailer = (mail: Mail) => Promise<"sent" | "saved">;

/** Dev adapter: write the email to out/, so a fresh clone runs without a mail account. */
export const fileMailer: Mailer = async (mail) => {
  await mkdir(OUT, { recursive: true });
  await writeFile(new URL("welcome-email.html", OUT), mail.html);
  await writeFile(new URL("welcome-email.txt", OUT), mail.text);
  console.log("mail not configured: wrote the email to out/welcome-email.html");
  return "saved";
};

/** Brevo's REST API over `fetch`; swap the body to change provider (Mailjet, Maileroo, Resend, SMTP). Never log the key or the address. */
export const brevoMailer =
  (key: string, from: string): Mailer =>
  async (mail) => {
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
  };

/** Brevo when BREVO_API_KEY and MAIL_FROM (one verified sender address) are set, else the file adapter. Read per call, so tests can change the environment. */
export const defaultMailer: Mailer = (mail) => {
  const key = process.env.BREVO_API_KEY;
  const from = process.env.MAIL_FROM;
  return (key && from ? brevoMailer(key, from) : fileMailer)(mail);
};
