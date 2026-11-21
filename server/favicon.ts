import { colors, sea } from "../src/shared/theme/tokens";

/** The Hadal Society logo (same drawing as src/shared/art/logo.tsx) as a tab icon: an SVG inlined as a data URI, so there is no file to serve. */
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="${sea.shallow}" stroke="${colors.navy}" stroke-width="2.5"/><path d="M5 15q4-3 8 0t8 0 8 0 6 0" fill="none" stroke="${colors.navy}" stroke-width="2.5"/><path d="M18 15v14" stroke="${colors.navy}" stroke-width="2.5"/><circle cx="18" cy="29" r="3" fill="${colors.navy}"/></svg>`;

export const FAVICON_LINK = `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,${encodeURIComponent(SVG)}">`;
