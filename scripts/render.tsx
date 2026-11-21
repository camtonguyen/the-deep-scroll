/**
 * Renders every output to out/:
 *   landing-page.html, welcome-email.html (+ .txt),
 *   dive-certificate.html + .pdf, share-card.html + .png
 * Run: pnpm render
 */
import { mkdir, writeFile } from "node:fs/promises";
import { ElementsError, formatDiagnostics, render } from "@hyper-elements/react";
import { renderFile } from "../server/render-file";
import { withShareMeta } from "../server/share-meta";
import { OUTPUTS } from "../src/outputs";
import { SITE } from "../src/shared/data/site";

const OUT = new URL("../out/", import.meta.url);

async function main() {
  await mkdir(OUT, { recursive: true });

  for (const output of OUTPUTS) {
    const element = output.element();
    const { html, text, diagnostics } = await render(element);
    await writeFile(new URL(`${output.id}.html`, OUT), output.root === "Page" ? withShareMeta(html, new URL(SITE.url)) : html);
    if (output.root === "Email") await writeFile(new URL(`${output.id}.txt`, OUT), text);

    if (output.root === "Document" || output.root === "Canvas") {
      const { bytes, ext } = await renderFile(element, output.root);
      await writeFile(new URL(`${output.id}.${ext}`, OUT), bytes);
    }

    console.log(`✓ ${output.id}`);
    const notes = formatDiagnostics(diagnostics.filter((d) => d.code !== "email/more-checks"));
    if (notes) console.log(notes);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof ElementsError ? formatDiagnostics(error.diagnostics) : error);
  process.exitCode = 1;
});
