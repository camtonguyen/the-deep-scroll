import { renderPdf } from "@hyper-elements/react/pdf";
import DiveCertificate from "@/modules/dive-certificate";
import { MAX_DEPTH } from "@/shared/lib/sea";
import { validateCertificateRequest } from "@/shared/lib/visitor";
import { loadFonts } from "./fonts";
import { allow, clientIp } from "./rate-limit";

/** Plenty for three short fields; anything bigger is not the form. */
const MAX_BODY = 2000;

const json = (body: unknown, status: number, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers } });

const today = () => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** POST /api/certificate  { name, email?, date? } → the visitor's certificate as a PDF download. */
export async function handleCertificate(request: Request): Promise<Response> {
  if (request.method !== "POST") return json({ error: "Use POST." }, 405, { Allow: "POST" });
  if (!allow(clientIp(request))) return json({ error: "Too many requests. Try again in a minute." }, 429, { "Retry-After": "60" });

  const text = await request.text();
  if (text.length > MAX_BODY) return json({ error: "That request is too big." }, 413);
  let input: unknown;
  try {
    input = JSON.parse(text);
  } catch {
    return json({ error: "Send the form as JSON." }, 400);
  }

  const result = validateCertificateRequest(input, today());
  if (!result.ok) return json({ errors: result.errors }, 400);

  // The email address is only validated here; the page then asks /api/welcome to send the email.
  const { name, date } = result.value;
  const { pdf } = await renderPdf(<DiveCertificate name={name} depth={MAX_DEPTH} date={date} />, { fonts: await loadFonts() });
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="dive-certificate.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
