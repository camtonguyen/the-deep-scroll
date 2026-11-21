# Repository guidelines

The Deep Scroll: one React 19 + TypeScript codebase that renders a landing page,
an email, a PDF and a PNG with Hyper Elements (`@hyper-elements/react`).

## Structure

- `src/modules/<output>/`: one folder per output. Its `index.ts` is its only
  public entry. A module may import `@/shared/**` and its own files, never
  another module.
- `src/shared/`: data, lib, theme, art, ui. It never imports a module.
- `src/outputs.tsx`: the registry the dev server and `scripts/render.tsx` share.
- `server/`: the API routes (`routes.ts`: welcome email, certificate, share card, sound). It may import `@/shared/**` and each module's `index.ts`. `api/` and `functions/` are the Vercel entry points; `pnpm build:api` bundles them.
- `docs/preview.gif` is the README's demo; `.claude/ref/` holds the contest rules (README must explain the Hyper Elements use, show a screenshot/GIF, and give run steps).

ESLint enforces these boundaries; `pnpm lint` fails on a wrong import.

## Hyper Elements rules that bite

- Styles go in `style={{ … }}`, never as props. No margins: use the parent's `gap`
  and the box's `padding`.
- Phone styles: `style={{ mobile: { … } }}`. One breakpoint.
- `Svg` holds only `Rect`, `Circle`, `Ellipse`, `Line`, `Polygon`, `Path`; no
  `transform`, no text. `Svg` is not allowed in an `Email`.
- To place something at a depth, use `<Positioned>` inside a `Layer`.
- The PDF and PNG get fonts as TTF bytes (`assets/fonts/`); the Page and Email
  load web fonts from `FONTS` in `src/shared/theme/fonts.ts`.
- Never use `Math.random()` in art: use `seededRandom()` so renders are stable.
- Reference: `node_modules/@hyper-elements/react/REFERENCE.md` and `GUIDE.md`.

## Commands

Use pnpm (version pinned in `package.json` → `packageManager`; run `corepack enable` once). Don't use npm or yarn: there is only a `pnpm-lock.yaml`. Build scripts are allow-listed in `pnpm-workspace.yaml` (`allowBuilds`).

- `pnpm install`: install dependencies

- `pnpm dev`: the landing page at http://localhost:5173 (`?only=<section id>` renders one section; resize for the phone layout)
- `pnpm render`: write every output to `out/`
- `pnpm test`: unit tests (Node test runner via tsx)
- `pnpm check`: typecheck, lint, tests, format check and render. Run before committing.

## Style

TypeScript function components, kebab-case file names, PascalCase components,
double quotes, Prettier (`pnpm format`). Keep content in `src/shared/data`,
not in components. Every colour (hex or rgb) lives in `src/shared/theme/tokens.ts`; a test fails on a stray one. Commit subjects: short and imperative.
