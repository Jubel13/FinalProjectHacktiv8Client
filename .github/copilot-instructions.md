# Copilot instructions for FinalProjectHacktiv8Client

Purpose: provide concise, repo-specific guidance for Copilot-powered agents and future Copilot sessions.

---

## Build, test, and lint commands

Top-level (workspace) contains small helper files and two main front-end apps: `client/` and `admin-cms/`.

- Install dependencies (root workspace does not contain main app code):
  - npm install  (run in repo root to install root deps)
  - cd client && npm install
  - cd admin-cms && npm install

- client (Create React App)
  - Start dev server: cd client && npm start
  - Run tests (interactive): cd client && npm test
  - Build production bundle: cd client && npm run build
  - Run a single test file: cd client && npm test -- <path-to-test-file>

- admin-cms (Create React App)
  - Start dev server: cd admin-cms && npm start
  - Run tests (interactive): cd admin-cms && npm test
  - Build production bundle: cd admin-cms && npm run build
  - Run a single test file: cd admin-cms && npm test -- <path-to-test-file>

- root: no automated lint/test scripts defined. Use each sub-app's scripts.

---

## High-level architecture

- Repository contains two separate React front-ends:
  - client/: public client app (Create React App + Tailwind)
  - admin-cms/: admin dashboard (Create React App + React-Bootstrap)
- Both front-ends are independent apps with their own package.json and build scripts.
- Shared/infra files at repo root:
  - API/midtrans.js: example Midtrans integration using midtrans-client for payments (server keys present in file; treat as credentials placeholder).
  - .env.example files exist under client/ and repo root to show expected env keys.
- Deployment targets in README: hosted previews on Firebase (firebase.json present in subapps). Each app contains Firebase config files (.firebaserc, firebase.json).
- Typical local workflow: run the desired app's dev server (client or admin-cms) and point it at the backend server: https://final-project-hacktiv8-server.vercel.app/

---

## Key conventions and repository-specific notes

- Two-app layout: Treat client/ and admin-cms/ as independent projects. When making changes, run/install/validate inside the corresponding folder.
- Environment variables: Each front-end uses .env or .env.example. Follow Create React App env var naming (REACT_APP_*) when adding new keys so they are embedded in the build.
- Firebase: Each app includes Firebase config files for hosting. Use firebase CLI when deploying (firebase deploy --only hosting).
- Payment integration: API/midtrans.js contains hard-coded sandbox keys. Do NOT treat these as production secrets — rotate and move to secure env files before production.
- Tests: Both apps use Create React App test runner (react-scripts test). Tests run in watch mode by default. To run a single test file, pass its path after `npm test --`.
- Styling: client uses Tailwind (tailwind.config.js + daisyUI). admin-cms uses react-bootstrap.
- Build outputs: Each app builds to its own `build/` directory. CI should build only the app being deployed.

---

## Files to consult for more context

- README.md (root) — project overview and links to deployed previews
- client/README.md — Create React App guidance for client
- client/package.json and admin-cms/package.json — scripts and dependencies
- API/midtrans.js — payment integration example (sandbox keys present)
- firebase.json and .firebaserc in subapps — hosting configuration

---

If this file already exists, merge the above sections into it; prefer preserving any additional manual notes already present.

---

Would you like me to configure MCP servers relevant to this repo (for example, a Playwright or web-preview MCP server for the client app)?