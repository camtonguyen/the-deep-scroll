import { renderPdf } from "@hyper-elements/react/pdf";
import DiveCertificate from "@/modules/dive-certificate";
import { MAX_DEPTH } from "@/shared/lib/sea";
import { validateCertificateRequest } from "@/shared/lib/visitor";
import { today, verifyCertificate } from "./certificate-link";
import { loadFonts } from "./fonts";
import { json, onlyGet, tooMany } from "./http";
import { allow, clientIp } from "./rate-limit";

/**
 * GET /api/certificate?name=…&date=…&sig=… → the visitor's certificate as a PDF download.
 * Only links the welcome email carries work: the signature covers the name and the date (see certificate-link.ts).
 */
export async function handleCertificate(request: Request): Promise<Response> {
  const bad = onlyGet(request);
  if (bad) return bad;
  if (!allow(`certificate:${clientIp(request)}`)) return tooMany(true);

  const params = new URL(request.url).searchParams;
  const result = validateCertificateRequest({ name: params.get("name"), date: params.get("date") }, today());
  if (!result.ok) return json({ errors: result.errors }, 400);
  const { name, date } = result.value;
  let valid: boolean;
  try {
    valid = await verifyCertificate(name, date, params.get("sig") ?? "");
  } catch {
    return json({ error: "Something went wrong on our side." }, 500);
  }
  if (!valid) return json({ error: "This certificate link is not valid." }, 403);

  const { pdf } = await renderPdf(<DiveCertificate name={name} depth={MAX_DEPTH} date={date} />, { fonts: await loadFonts() });
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="dive-certificate.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
