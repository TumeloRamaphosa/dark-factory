# AGENTS.md

## Cursor Cloud specific instructions

`dark-factory-client` is a single-service, frontend-only marketing site: **Vite 8 + React 19 + TypeScript**, styled with **Tailwind CSS v4** (`@tailwindcss/vite`) and some `three.js` / `@react-three/fiber` usage. There is no backend, database, or environment variables — the only runtime service is the Vite dev server.

Standard commands live in `package.json` (`dev`, `build`, `lint`, `preview`); run them with `npm`:
- Dev server: `npm run dev` → serves on `http://localhost:5173` (Vite default; not overridden in `vite.config.ts`). Has HMR.
- Build: `npm run build` (runs `tsc -b` then `vite build`).
- Lint: `npm run lint` (oxlint; config in `.oxlintrc.json`).
- Preview built output: `npm run preview` → `http://localhost:4173`.

Node 22 is used here and works with Vite 8 (requires Node 20.19+ / 22.12+).

### Non-obvious caveat: page currently renders unstyled
`src/index.css` uses the **Tailwind v3** directives `@tailwind base; @tailwind components; @tailwind utilities;`, but the project is on **Tailwind v4**, where these are no longer supported (v4 expects `@import "tailwindcss";`). As a result most utility classes used throughout `src/App.tsx` (e.g. `px-8`, `text-4xl`, `min-h-screen`, `bg-black`) are not emitted, so the page renders essentially unstyled (tiny text on a black background). The dev server, HMR, TypeScript build, lint, and React rendering/interactions all work — this is a styling-only defect. If you work on the UI, fix `src/index.css` to `@import "tailwindcss";`.
