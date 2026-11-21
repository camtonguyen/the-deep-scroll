# The Deep Scroll

**How deep does the ocean go? Scroll down to find out.**

A landing page for a fictional ocean nonprofit, The Hadal Society, where
scrolling _is_ the descent: from the sea surface to the bottom of the
Challenger Deep, 10,935 m down. Animals, wrecks and landmarks appear at their
real depths beside a depth ruler, and the sea darkens band by band.

The same React components also render a welcome **email**, a **PDF** dive
certificate and a **PNG** share card, all with
[Hyper Elements](https://github.com/hyper-elements/hyper-elements).

![The Deep Scroll](docs/preview.gif)

## Run it

```bash
corepack enable  # once: uses the pnpm version pinned in package.json
pnpm install
pnpm dev         # the landing page at http://localhost:5173 (?only=surface for one section)
pnpm render      # writes every output to out/
```

Node 20+. No API keys or network needed: fonts are in `assets/fonts/`, and
without mail credentials the welcome email is written to `out/` instead of sent.

## How Hyper Elements is used

| Output           | Root         | Rendered with                  | File                      |
| ---------------- | ------------ | ------------------------------ | ------------------------- |
| Landing page     | `<Page>`     | `render()`                     | `landing-page.html`       |
| Welcome email    | `<Email>`    | `render()` (HTML + plain text) | `welcome-email.html/.txt` |
| Dive certificate | `<Document>` | `renderPdf()` from `/pdf`      | `dive-certificate.pdf`    |
| Share card       | `<Canvas>`   | `renderImage()` from `/image`  | `share-card.png`          |

- **One depth scale drives everything.** `depthToY()` turns metres into pixels.
  Every stop, ruler tick and band is placed from the data files, so changing a
  depth moves it on the page, the certificate and the share card.
- **Absolute positioning without CSS.** A `Layer` stacks its children in one
  cell, and `<Positioned>` places a box at a depth inside it.
- **Drawn, not downloaded.** All art is `Svg` shapes (`Path`, `Circle`, `Rect`…),
  so it is identical in HTML, PDF and PNG. No images, gradients or shadows.
- **One theme** (`defineTheme`) for all four roots.

## Project structure

```
src/
  outputs.tsx     The registry of outputs, shared by the dev server and the render script
  modules/        One folder per output (landing-page, welcome-email, dive-certificate, share-card)
  shared/         data, lib, theme, art, ui: used by every module
server/           API routes (welcome email, certificate, share card), run by Vite in dev and Vercel in production
scripts/          render.tsx
```

Modules never import each other, and `shared/` never imports a module. ESLint
enforces both (`pnpm lint`).

## Change things

| I want to…             | Edit                                                                       |
| ---------------------- | -------------------------------------------------------------------------- |
| Add or move a creature | `src/shared/data/stops.ts`                                                 |
| Draw a new creature    | `src/shared/art/<name>.tsx`, then register it in `src/shared/art/index.ts` |
| Change colours         | `src/shared/theme/tokens.ts`                                               |
| Add a new output       | a folder in `src/modules/` + one line in `src/outputs.tsx`                 |

`pnpm check` runs typecheck, lint, tests, format check and render.

## Optional: sending the welcome email

Set `BREVO_API_KEY`, `MAIL_FROM`, `SITE_URL` and `CERTIFICATE_SECRET` (see
`.env.example`). Mail goes through `sendMail()` in `server/mail.ts`.

## Facts and credits

Every number has a source in [docs/sources.md](docs/sources.md) or is marked
approximate (`~`). The Hadal Society is fictional; the depths are real. Fonts:
Roboto and Roboto Condensed (SIL OFL). Code: MIT.
