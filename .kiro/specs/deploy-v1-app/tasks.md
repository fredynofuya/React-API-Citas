# Implementation Plan: Deploy MedSoftIA v1 to Vercel

## Overview

Migrate all five service files to a shared Axios instance with a build-time environment variable, add the required configuration files, and verify the production build. Steps marked **[MANUAL]** cannot be executed by a coding agent and must be performed by the developer in the respective platform dashboards.

## Tasks

- [x] 1. Refactor `axiosConfig.js` to export a shared Axios instance
  - [x] 1.1 Create the shared Axios instance with `baseURL`
    - Replace the current interceptor-only file with an `axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })` instance
    - Re-attach the existing JWT request interceptor and 401 response interceptor to the new instance
    - Change the default export from `axios` to the new named instance `api`
    - _Requirements: 1.1, 6.1, 6.2_

- [x] 2. Migrate service files to use the shared Axios instance
  - [x] 2.1 Migrate `AuthService.js`
    - Replace `import axios from 'axios'` with `import api from './axiosConfig.js'`
    - Remove `const REST_API_BASE_URL = 'http://localhost:8080/auth'`
    - Replace all `axios.*` calls with `api.*` using relative paths (`/auth/login`, `/auth/me`, `/auth/password`, `/auth/recuperar/solicitar`, `/auth/recuperar/validar`, `/auth/recuperar/restablecer`)
    - _Requirements: 1.1_
  - [x] 2.2 Migrate `CitasService.js`
    - Replace `import axios from 'axios'` with `import api from './axiosConfig.js'`
    - Remove `const REST_API_BASE_URL` and `const MEDICO_API_BASE_URL` constants
    - Replace all `axios.*` calls with `api.*` using relative paths (`/cita`, `/cita/estado/:estado`, `/cita/:id`, `/cita/disponibilidad`, `/cita/medico/:id/estado/:estado`, `/medico`)
    - _Requirements: 1.1_
  - [x] 2.3 Migrate `MedicosService.js`
    - Replace `import axios from 'axios'` with `import api from './axiosConfig.js'`
    - Remove `const MEDICO_API_BASE_URL`, `const ESPECIALIDAD_API_BASE_URL`, `const CONSULTORIO_API_BASE_URL` constants
    - Replace all `axios.*` calls with `api.*` using relative paths (`/medico`, `/medico/:id`, `/medico/:id/estado`, `/especialidad`, `/consultorio`)
    - _Requirements: 1.1_
  - [x] 2.4 Migrate `PacientesService.js`
    - Replace `import axios from 'axios'` with `import api from './axiosConfig.js'`
    - Remove `const REST_API_BASE_URL = 'http://localhost:8080/paciente'`
    - Replace all `axios.*` calls with `api.*` using relative paths (`/paciente`, `/paciente/documento/:doc`, `/paciente/:id`)
    - _Requirements: 1.1_
  - [x] 2.5 Migrate `UsuariosService.js`
    - Replace `import axios from 'axios'` with `import api from './axiosConfig.js'`
    - Remove `const USUARIO_API_BASE_URL = 'http://localhost:8080/usuario'`
    - Replace all `axios.*` calls with `api.*` using relative paths (`/usuario`, `/usuario/:id`, `/usuario/:id/estado`)
    - _Requirements: 1.1_

- [x] 3. Checkpoint — Verify no hardcoded localhost URLs remain
  - Run `grep -r "localhost:8080" src/services/` and confirm zero matches before continuing.

- [x] 4. Add build-time environment validation script
  - [x] 4.1 Create `scripts/check-env.js`
    - Create a `scripts/` directory and add `check-env.js`
    - Implement three validation checks in order: variable not set or empty → exit 1; does not start with `https://` → exit 1; contains `localhost` → exit 1
    - On success, log `[check-env] OK — VITE_API_BASE_URL=<value>` and exit 0
    - _Requirements: 1.2, 1.3_
  - [x] 4.2 Wire `check-env.js` to `package.json` as a `prebuild` hook
    - Add `"prebuild": "node scripts/check-env.js"` to the `scripts` section in `package.json`
    - Confirm that `dev`, `build`, `lint`, and `preview` scripts remain unchanged
    - _Requirements: 1.2, 1.3, 2.1_
  - [ ]* 4.3 Write unit tests for `check-env.js` using Vitest
    - Install Vitest as a dev dependency if not already present (`npm install --save-dev vitest`)
    - Write five test cases: valid HTTPS URL exits 0; variable not set exits 1; empty string exits 1; `http://` URL exits 1; `localhost` URL exits 1
    - Add `"test": "vitest --run"` to `package.json` scripts
    - _Requirements: 1.2_

- [x] 5. Add configuration files
  - [x] 5.1 Create `vercel.json`
    - Add a catch-all rewrite rule mapping any path without a dot to `/index.html` (SPA fallback)
    - Set `"framework": "vite"`
    - _Requirements: 3.1, 3.2, 3.6, 5.1_
  - [x] 5.2 Create `.nvmrc`
    - Write `20` (Node 20 LTS, compatible with Vite 8 / Node ≥ 18)
    - _Requirements: 4.1_
  - [x] 5.3 Create `.env.example`
    - Add `VITE_API_BASE_URL=https://your-api.up.railway.app` with a one-line Spanish comment explaining its purpose
    - Do NOT create `.env.production`
    - _Requirements: 1.4_
  - [x] 5.4 Update `.gitignore`
    - Under the existing `# ===== ENV =====` block, add `.env.local`, `.env.production`, and `.env.production.local`
    - Confirm `.env.example` is not listed (must remain tracked)
    - _Requirements: 1.5_

- [x] 6. Checkpoint — Verify build passes locally
  - Run `npm run build` without `VITE_API_BASE_URL` set and confirm it exits with a non-zero code and a descriptive error message.
  - Run `VITE_API_BASE_URL=https://springboot-api-production-6f09feec.up.railway.app npm run build` and confirm it exits 0 and produces a `dist/` directory with `index.html`.
  - Run `npm run lint` and confirm zero errors.
  - _Requirements: 1.2, 2.1, 2.2, 4.3_

- [x] 7. [MANUAL] Configure Vercel project and trigger first deploy
  - **This task cannot be executed by a coding agent. Perform these steps manually:**
  - Connect the GitHub repository to a new Vercel project via the Vercel dashboard Git integration
  - In Vercel → Settings → Environment Variables, add `VITE_API_BASE_URL=https://springboot-api-production-6f09feec.up.railway.app` for the **Production** environment
  - Push the final branch to `main` to trigger the first automatic deployment (or trigger a manual redeploy after adding the variable)
  - Copy the Stable_Origin URL from the Vercel deployment dashboard (e.g., `https://project-name.vercel.app`)
  - _Requirements: 3.3, 3.4, 3.5_

- [ ] 8. [MANUAL] Configure Railway backend variables
  - **This task cannot be executed by a coding agent. Perform these steps manually:**
  - In the Railway backend service environment settings, set `CORS_ORIGINS` to include the Stable_Origin obtained in task 7 (must NOT be `*`)
  - Set `FRONTEND_URL` to the Stable_Origin so password-recovery emails link to `https://<stable-origin>/restablecer-contrasena?token=...`
  - Redeploy the backend on Railway after updating both variables
  - _Requirements: 6.3, 6.4_

- [ ] 9. Final checkpoint — Post-deploy verification
  - Ensure all automated tests pass, then verify the following manually using the Post-Deploy Checklist in `requirements.md`:
    - Login from the Vercel URL succeeds and routes correctly by role
    - Network tab shows zero requests to `localhost:8080`
    - No CORS errors in browser console
    - Refreshing `/dashboard/citas` returns 200 (not 404)
    - Unauthenticated refresh on a protected route redirects to `/signin`
    - Password recovery email link opens the correct Vercel domain
  - Ask the user if any issues arise.

## Notes

- Tasks marked `[MANUAL]` (tasks 7 and 8) require developer action in Vercel and Railway dashboards; they cannot be automated.
- Tasks 7 and 8 depend on each other in sequence: Vercel domain must be known before Railway variables can be set.
- Sub-tasks marked with `*` (task 4.3) are optional and can be skipped for a faster path to deployment.
- The design has no Correctness Properties section — property-based tests are not applicable for this feature.
- Keep `.env.example` committed; never commit `.env.local` or `.env.production`.
- The `prebuild` hook runs `check-env.js` automatically before every `npm run build` — `npm run dev` is not affected.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5"] },
    { "id": 2, "tasks": ["4.1"] },
    { "id": 3, "tasks": ["4.2", "5.1", "5.2", "5.3", "5.4"] },
    { "id": 4, "tasks": ["4.3"] }
  ]
}
```
