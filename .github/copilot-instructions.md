# Copilot / AI agent instructions for this repository

This file gives focused, actionable knowledge to help an AI coding agent be productive in this React Router template project.

Key points
- Project type: full-stack React Router app using the `react-router` v7 toolchain with Vite for dev and build. Server and client bundles are produced under `build/server` and `build/client`.
- Main commands: `npm run dev` (development with HMR), `npm run build` (produce `build/`), `npm run start` (runs `react-router-serve ./build/server/index.js` to serve production). Use `npm run typecheck` for type generation + `tsc` checks.
- Primary source: `app/` (routes, components, styles). Static assets go in `public/`.

Architecture & important files
- `app/root.tsx` — root layout, top-level `Outlet`, `links()` export for head links, and `ErrorBoundary`. Use `import.meta.env.DEV` guards to show stack traces in dev.
- `app/routes.ts` — route manifest used by the dev/build tooling. Routes are referenced by path strings such as `routes/home.tsx` (see current index route). To add a route: create `app/routes/yourRoute.tsx` and reference it from `app/routes.ts` (or use nested route helpers from `@react-router/dev/routes`).
- `app/routes/*.tsx` — route modules. Each route may export `meta`, `links`, `loader`, `action`, and a default component. Example: `app/routes/home.tsx` exports `meta()` and default `Home` component.
- `app/welcome/welcome.tsx` — example UI component and pattern for client-only UI (imports SVGs, uses Tailwind classes).
- `vite.config.ts` — Vite plugins: `@react-router/dev/vite`, `@tailwindcss/vite`, and `vite-tsconfig-paths`.
- `tsconfig.json` — TypeScript `paths` maps `~/*` -> `./app/*`. Use `~` imports for app-local modules.
- `Dockerfile` — multi-stage build that runs `npm run build` and uses `npm run start` to serve from `build/server`.

Conventions and patterns to follow (discovered from code)
- Route files are colocated in `app/routes/` and referenced in `app/routes.ts`. Follow the same pattern and export `meta`/`links` when appropriate.
- CSS: `app/app.css` is imported once in `app/root.tsx`. Tailwind is used — prefer utility classes for layout as in `app/welcome/welcome.tsx`.
- Type generation: `react-router typegen` is part of `npm run typecheck` — route types are generated under `.react-router/types` and referenced by route modules (e.g. `import type { Route } from "./+types/home";`). Keep `typegen` in mind when adding routes.
- Error handling: use `isRouteErrorResponse` and the `ErrorBoundary` pattern shown in `app/root.tsx`.

Developer workflows & commands
- Install: `npm install` or `npm ci` in CI. The Dockerfile uses `npm ci`.
- Dev: `npm run dev` (Vite + react-router dev integration). App served at `http://localhost:5173` by default.
- Build: `npm run build` -> produces `build/client` and `build/server` artifacts.
- Serve production locally: `npm run start` (runs `react-router-serve ./build/server/index.js`).
- Typecheck: `npm run typecheck` runs `react-router typegen && tsc` — run this before PRs to ensure route types are up-to-date.

Files to inspect when making changes
- `app/routes.ts` — update route manifest
- `app/root.tsx` — layout, head links, error boundary
- `app/*` — route modules and components
- `vite.config.ts` / `package.json` — build & dev hooks
- `Dockerfile` — container build steps and expectations about `build/`

Integration points & dependencies
- `@react-router/dev` and `@react-router/node` provide dev/build/server features — changing routing or build outputs may require updates to how route files are referenced.
- `vite` + plugin `@react-router/dev/vite` — dev server integration. Hot reload and server integration rely on this plugin.
- Tailwind via `@tailwindcss/vite` and `tailwindcss` — CSS pipeline runs in dev/build.
- SVG/image imports inside `app/` are treated as assets by Vite.

Examples and snippets (copyable)
- Add a new route file: `app/routes/about.tsx`
  - export default component and optionally `meta`/`loader`/`action`
- Register it: update `app/routes.ts` to include `index("routes/about.tsx")` or use nested routes from `@react-router/dev/routes`.
- Run dev server: `npm run dev`
- Build + serve: `npm run build` then `npm run start`

Notes for AI agents
- Be concrete and conservative: update `app/routes.ts` and corresponding route module together so `react-router typegen` stays correct.
- Prefer minimal, targeted edits; run `npm run typecheck` after route changes and ensure no missing `+types/*` imports are left behind.
- When adding new assets, put them under `public/` or `app/` and use Vite import semantics.
- If changing build/server behavior, check `package.json` `start` script and `Dockerfile` to keep production serving compatible with `react-router-serve ./build/server/index.js`.

If any section is unclear or you want more examples (e.g., a sample route addition, or how to run typegen locally), tell me which area to expand and I will iterate.
