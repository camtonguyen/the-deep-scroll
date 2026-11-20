/**
 * Renders every output to out/:
 *   landing-page.html, welcome-email.html (+ .txt),
 *   dive-certificate.html + .pdf, share-card.html + .png
 * Run: pnpm render
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { ElementsError, formatDiagnostics, render } from "@hyper-elements/react";
import { renderImage } from "@hyper-elements/react/image";
import { renderPdf } from "@hyper-elements/react/pdf";
import { OUTPUTS } from "../src/outputs";

const OUT = new URL("../out/", import.meta.url);
const FONTS_DIR = new URL("../assets/fonts/", import.meta.url);

/** PDF and PNG are drawn offline, so they get the font files as bytes (TTF). */
const FONT_FILES = [
  { family: "Bricolage Grotesque", weight: 400, file: "BricolageGrotesque-Regular.ttf" },
  { family: "Bricolage Grotesque", weight: 800, file: "BricolageGrotesque-ExtraBold.ttf" },
  { family: "IBM Plex Mono", weight: 400, file: "IBMPlexMono-Regular.ttf" },
  { family: "IBM Plex Mono", weight: 600, file: "IBMPlexMono-SemiBold.ttf" },
] as const;

function loadFonts() {
  return Promise.all(
    FONT_FILES.map(async ({ family, weight, file }) => ({ family, weight, src: await readFile(new URL(file, FONTS_DIR)) })),
  );
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const fonts = await loadFonts();

  for (const output of OUTPUTS) {
    const element = output.element();
    const { html, text, diagnostics } = await render(element);
    await writeFile(new URL(`${output.id}.html`, OUT), html);
    if (output.root === "Email") await writeFile(new URL(`${output.id}.txt`, OUT), text);

    if (output.root === "Document") {
      const { pdf } = await renderPdf(element, { fonts });
      await writeFile(new URL(`${output.id}.pdf`, OUT), pdf);
    }
    if (output.root === "Canvas") {
      const { image } = await renderImage(element, { fonts });
      await writeFile(new URL(`${output.id}.png`, OUT), image);
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
