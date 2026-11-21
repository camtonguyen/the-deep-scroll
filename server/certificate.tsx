import DiveCertificate from "@/modules/dive-certificate";
import { MAX_DEPTH } from "@/shared/lib/sea";
import { validateCertificateRequest } from "@/shared/lib/visitor-form";
import { today, verifyCertificate } from "./certificate-link";
import { json } from "./http";
import { renderFile } from "./render-file";
import { route } from "./route";

/**
 * GET /api/certificate?name=…&date=…&sig=… → the visitor's certificate as a PDF download.
 * Only links the welcome email carries work: the signature covers the name and the date (see certificate-link.ts).
 */
export const handleCertificate = route({ method: "GET", bucket: "certificate", plain: true }, async ({ url }) => {
  const params = url.searchParams;
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

  const { bytes, type } = await renderFile(<DiveCertificate name={name} depth={MAX_DEPTH} date={date} />, "Document");
  return new Response(bytes, {
    headers: { "Content-Type": type, "Content-Disposition": 'attachment; filename="dive-certificate.pdf"', "Cache-Control": "no-store" },
  });
});
