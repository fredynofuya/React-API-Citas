# Requirements Document

## Introduction

This feature covers the deployment of MedSoftIA v1 — a React + Vite single-page application for medical appointments management — to Vercel, using its native Git integration. The application communicates with a Spring Boot REST API hosted on Railway over HTTPS (`https://springboot-api-production-6f09feec.up.railway.app`). The deployment must produce a stable, publicly accessible Vercel URL, centralize the backend URL through a single Axios instance, and document the manual configuration steps required in both Vercel and Railway before and after the first deploy.

## Glossary

- **App**: The MedSoftIA React + Vite single-page application located in this repository.
- **Build**: The optimized static asset bundle produced by running `vite build`, outputted to the `dist/` directory.
- **Vercel**: The static hosting platform used to serve the App via its native Git integration.
- **Railway**: The cloud platform hosting the Spring Boot Backend_API.
- **Backend_API**: The Spring Boot REST API at `https://springboot-api-production-6f09feec.up.railway.app`.
- **API_Base_URL**: The environment variable (`VITE_API_BASE_URL`) that specifies the Backend_API root URL consumed by the shared Axios instance.
- **Axios_Instance**: The shared Axios instance defined in `src/services/axiosConfig.js` that sets `baseURL` and attaches the JWT token to every outgoing request.
- **Environment_Variable**: A build-time variable injected by Vite (prefixed with `VITE_`) that configures runtime behavior without hardcoding values.
- **SPA_Fallback**: A Vercel rewrite rule that returns `index.html` for all paths that do not match a static asset, so React Router can handle client-side navigation.
- **Production_Build**: A Build artifact compiled with `NODE_ENV=production`, with minification and tree-shaking enabled.
- **CORS_ORIGINS**: The Railway environment variable on the backend that lists the allowed origins for CORS requests.
- **FRONTEND_URL**: The Railway environment variable on the backend used to construct password-recovery email links.
- **Stable_Origin**: The fixed Vercel production domain (e.g., `https://project-name.vercel.app`), as opposed to the unique URL generated for each individual deployment.

---

## Requirements

### Requirement 1: Environment Configuration

**User Story:** As a developer, I want to configure the production backend URL through a single shared Axios instance, so that the app can be deployed to any environment without modifying individual service files.

#### Acceptance Criteria

1. THE Axios_Instance SHALL set `baseURL` to the value of `VITE_API_BASE_URL` at build time; no service file (`AuthService.js`, `CitasService.js`, `MedicosService.js`, `PacientesService.js`, `UsuariosService.js`) SHALL contain a hardcoded `http://localhost:8080` URL literal or any other absolute URL.
2. IF `VITE_API_BASE_URL` is not set, is empty, does not start with `https://`, or contains `localhost` at the time `vite build` is executed with `mode=production`, THEN THE build process SHALL exit with a non-zero exit code and emit a message that names the missing or invalid variable before producing any output in `dist/`.
3. WHEN running `npm run dev`, THE validation in criterion 2 SHALL NOT apply; developers SHALL configure the local backend URL in a `.env.local` file that is excluded from Git.
4. THE repository SHALL contain a `.env.example` file listing `VITE_API_BASE_URL` with a non-empty placeholder value (e.g., `https://your-api.up.railway.app`) and a one-line description; no `.env.production` file with real or placeholder values SHALL exist in the repository.
5. THE `.gitignore` file SHALL include patterns that prevent committing `.env`, `.env.local`, `.env.production`, and `.env.production.local`; `.env.example` SHALL remain unignored.

---

### Requirement 2: Production Build

**User Story:** As a developer, I want to produce a clean, optimized production build, so that the deployed App loads as fast as possible for end users.

#### Acceptance Criteria

1. WHEN `npm run build` is executed with `VITE_API_BASE_URL` set to a valid HTTPS URL, THE App SHALL compile all source files into a Production_Build in the `dist/` directory and exit with code 0.
2. WHEN `npm run lint` is executed as a separate step, THE linter SHALL report zero errors; lint failures SHALL block the deploy but SHALL NOT be part of the `build` script.
3. WHEN `npm run preview` is executed against the Production_Build, THE browser console SHALL show zero failed asset requests (HTTP 404 for `.js`, `.css`, or image files).
4. THE compiled JavaScript output in the Production_Build SHALL contain no calls that log JWT tokens, passwords, or personally identifiable information to the console, as confirmed by a string search of all `.js` files in `dist/` for patterns such as `token`, `password`, or `contraseña` inside `console.` calls.

---

### Requirement 3: Vercel Hosting Setup

**User Story:** As a developer, I want to deploy the App to Vercel using its Git integration, so that every push to `main` automatically produces a new live deployment.

#### Acceptance Criteria

1. THE repository SHALL contain a `vercel.json` file at the root that defines a catch-all rewrite rule mapping all unmatched paths to `/index.html`, implementing the SPA_Fallback.
2. WHEN a user sends an HTTP GET request to any client-side route (e.g., `/dashboard/citas`, `/restablecer-contrasena`) on Vercel, THE Vercel deployment SHALL respond with HTTP status 200 and return `index.html`.
3. THE `VITE_API_BASE_URL` environment variable SHALL be configured in the Vercel project dashboard under "Environment Variables" for the **Production** environment (and optionally **Preview**) before the first deploy is triggered. [ACCIÓN MANUAL]
4. WHEN a commit is pushed to the `main` branch, Vercel SHALL trigger a new deployment automatically via its Git integration, without requiring a manual deploy command.
5. WHEN a Vercel deployment completes successfully, Vercel SHALL provide the public URL of the deployed App in the deployment dashboard.
6. THE `vercel.json` configuration SHALL specify the framework preset as `vite` and, if the repository root is not the project root, the `rootDirectory` setting SHALL point to the correct subdirectory.

---

### Requirement 4: Node Version and Build Reproducibility

**User Story:** As a developer, I want the build environment to be reproducible across local machines and Vercel, so that "works on my machine" issues are eliminated.

#### Acceptance Criteria

1. THE repository SHALL contain a `.nvmrc` file specifying a Node.js LTS version compatible with Vite 8 (Node ≥ 18).
2. THE repository SHALL contain exactly one lockfile (`package-lock.json`); no `yarn.lock` or `pnpm-lock.yaml` SHALL be committed.
3. WHEN a developer clones the repository, runs `npm ci`, and then runs `npm run build` with `VITE_API_BASE_URL` set to a valid HTTPS URL, THE build SHALL complete with exit code 0 and produce a `dist/` directory containing `index.html`.

---

### Requirement 5: Routing Compatibility

**User Story:** As a user, I want all application routes to work correctly when accessed directly or on page refresh, so that I can share and bookmark deep links within the app.

#### Acceptance Criteria

1. WHEN a user sends an HTTP GET request to any valid client-side route (e.g., `/signin`, `/servicio`, `/contacto`, `/restablecer-contrasena`) directly on Vercel, THE Vercel deployment SHALL respond with HTTP status 200 and return `index.html`.
2. WHEN the App initializes after a direct URL access to a valid client-side route, THE App SHALL render the page component associated with that route and not display a blank screen or an unhandled error boundary.
3. WHEN a user refreshes the browser on any dashboard sub-route (e.g., `/dashboard/citas`) and the user is authenticated (a valid JWT exists in `localStorage`), THE App SHALL re-render the correct dashboard page without redirecting to `/signin`.
4. WHEN a user refreshes the browser on any dashboard sub-route and the user is not authenticated (no JWT exists in `localStorage`), THE App SHALL redirect the user to `/signin` within one navigation cycle without rendering the protected dashboard content.

**Out of scope (separate spec):** A dedicated 404 page for unmatched routes. Currently no `<Route path="*">` exists; the App renders blank for unknown paths.

---

### Requirement 6: Backend API Connectivity

**User Story:** As a user, I want the deployed App to communicate with the production Backend_API, so that all features function correctly in production.

#### Acceptance Criteria

1. WHEN the deployed App is loaded in a browser, THE Axios_Instance SHALL send all API requests to the URL specified by `VITE_API_BASE_URL` (i.e., `https://springboot-api-production-6f09feec.up.railway.app`), and no request SHALL be sent to `http://localhost:8080`.
2. WHEN the Backend_API returns a 401 response to any request other than `POST /auth/login`, THE App SHALL remove the stored JWT token and user object from `localStorage`, and redirect the user to `/signin` without rendering the previously protected content.
3. THE Backend_API's `CORS_ORIGINS` variable on Railway SHALL include the Stable_Origin of the Vercel production deployment (e.g., `https://project-name.vercel.app`); it SHALL NOT be set to `*`. Preview deployment URLs will have different origins and will be blocked by CORS — this is expected behavior. [ACCIÓN MANUAL — after obtaining the Vercel domain]
4. THE Backend_API's `FRONTEND_URL` variable on Railway SHALL be set to the Stable_Origin of the Vercel production deployment so that password-recovery emails contain a link to `https://<stable-origin>/restablecer-contrasena?token=...`. [ACCIÓN MANUAL — after obtaining the Vercel domain]

**Out of scope (separate spec):** Global Axios request timeout. Currently no `timeout` is set in `axiosConfig.js`; individual components show error messages on failure but there is no network-level timeout.

---

## Deployment Order

The following is the required sequence for a successful first deployment. Steps marked [ACCIÓN MANUAL] can only be performed by the developer in the respective platform dashboards.

1. **Build local:** Run `npm run build` locally with `VITE_API_BASE_URL` set in `.env.local` to confirm the build passes before pushing.
2. **Push to `main`:** Push the final code (including `vercel.json`, `.nvmrc`, updated `axiosConfig.js`, `.env.example`) to the `main` branch on GitHub.
3. **Configure variables in Vercel:** In the Vercel project dashboard → Settings → Environment Variables, add `VITE_API_BASE_URL=https://springboot-api-production-6f09feec.up.railway.app` for the Production environment. [ACCIÓN MANUAL]
4. **Trigger first deploy:** Vercel will deploy automatically on the push, or trigger a redeploy manually from the dashboard after adding the variable.
5. **Obtain Vercel domain:** Copy the Stable_Origin from the Vercel dashboard (e.g., `https://project-name.vercel.app`).
6. **Update Railway — CORS_ORIGINS:** In the Railway backend service, set `CORS_ORIGINS` to include the Stable_Origin. Redeploy the backend. [ACCIÓN MANUAL]
7. **Update Railway — FRONTEND_URL:** In the Railway backend service, set `FRONTEND_URL=https://<stable-origin>`. Redeploy the backend. [ACCIÓN MANUAL]
8. **Verify:** Execute the post-deploy checklist below.

---

## Post-Deploy Checklist

- [ ] Login from the Vercel URL succeeds and redirects to the correct dashboard route for the user's role.
- [ ] All API calls go to `https://springboot-api-production-6f09feec.up.railway.app` (verify in browser DevTools → Network tab; zero requests to `localhost`).
- [ ] No CORS errors in the browser console, including preflight (`OPTIONS`) requests.
- [ ] Refreshing any internal route (e.g., `/dashboard/citas`) does not return a 404 from Vercel.
- [ ] Requesting a password recovery email and clicking the link opens `/restablecer-contrasena?token=...` on the Vercel domain and the form renders correctly.
- [ ] Rolling back to a previous deployment via the Vercel dashboard (Deployments → select a prior deployment → Promote to Production) restores the previous version without data loss.

---

## Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Backend returns 403 (not 401) for expired tokens | Session not cleared; user stays on dashboard with broken API calls | Verify Spring Security config; if 403 is used, update `axiosConfig.js` to also intercept 403 |
| JWT stored in `localStorage` is accessible to JavaScript (XSS risk) | Token theft if a malicious script runs on the page | Out of scope for v1; document for v2 security review |
| Vercel preview deployments have unique per-deployment URLs | CORS blocked on preview URLs since they are not in `CORS_ORIGINS` | Expected and accepted; production URL is the only authorized origin |
