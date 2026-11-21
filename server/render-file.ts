import { renderImage } from "@hyper-elements/react/image";
import { renderPdf } from "@hyper-elements/react/pdf";
import type { ReactElement } from "react";
import { loadFonts } from "./fonts";

const FORMATS = {
  Document: { type: "application/pdf", ext: "pdf" },
  Canvas: { type: "image/png", ext: "png" },
} as const;

/** The roots that become a file (the Page and the Email are HTML text). */
export type FileRoot = keyof typeof FORMATS;

/** Draw an output as its file: a Document as a PDF, a Canvas as a PNG, with the fonts from assets/fonts. One place for every route and for `pnpm render`. */
export async function renderFile(element: ReactElement, root: FileRoot) {
  const fonts = await loadFonts();
  const bytes = root === "Document" ? (await renderPdf(element, { fonts })).pdf : (await renderImage(element, { fonts })).image;
  return { bytes: new Uint8Array(bytes), ...FORMATS[root] };
}
