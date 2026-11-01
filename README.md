# ABTECH — Personal Engineering Portfolio

Editorial, dark-mode personal portfolio for Lateef Abiodun, showcasing full-stack engineering, intelligent systems, product work, and educational impact.

## Stack

- React + TypeScript + Vite
- Tailwind CSS 4 plus scoped `iconic-portfolio.css` design system
- Supabase Auth, database, and content management
- Motion, Lucide, react-helmet-async

## Run locally

1. Install dependencies: `npm ci`
2. Copy `.env.example` to `.env.local` and set the **public** Supabase URL, anon key and **VITE_PORTFOLIO_OWNER_ID** (the existing owner UUID from Supabase Auth > Users).
3. Start the Vite dev server: `npm run dev`
4. Build the production bundle: `npm run build`

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Public portfolio |
| `/teaching` | Teaching and tutoring |
| `/work/:slug` | Detailed engineering case studies |
| `/admin` | Supabase-authenticated content studio |

Client-side navigation falls back to `index.html` using `vercel.json`.

## Public portfolio

The homepage is implemented in `src/app/components/modern/IconicPortfolio.tsx` and styled in `src/styles/iconic-portfolio.css`. It features curated, editorially written case studies of real initiatives, category filtering, current portfolio projects from Supabase, capability areas, experience (when supplied by the content studio), and a working contact submission flow via the existing `sendMessage` backend.

The four featured projects include dedicated case study pages describing the challenge, approach, conceptual system architecture, engineering considerations and verified project stage. See `CaseStudyPage.tsx` and `caseStudies.ts`.

Update dynamic portfolio content in the admin studio. The curated case-study text lives in `CASE_STUDIES` and can be updated in source. Screens without database records should never invent testimonials, project metrics, or analytics.

## Security

**Important:** A Supabase service-role key was previously committed in `.env.example`. Removing its value from the current branch does **not** revoke it or erase it from Git history. **Rotate/revoke the compromised key in Supabase, inspect access logs, and assess whether any unauthorized data access occurred.** If this project uses JWT-based legacy keys, rotate following the Supabase guidance for the credential type.

Never place service-role, secret, or server-only credentials in variables prefixed with `VITE_`; they are compiled into client bundles. Use a secure server environment for privileged operations. Only public Supabase project URL and anon/publishable key belong in the Vite app.

## Owner authorization and portfolio data

The owner UUID is public configuration, **not a password or API key**. The application scopes its public queries to this owner and permits only that owner to enter the admin UI. Missing or malformed owner UUID disables the database-powered inbox and authenticated studio, while curated projects and direct contact methods remain available. Supabase RLS must **also** enforce authorization server-side; browser checks alone do not provide a security boundary.

See `RELEASE_READINESS.md` for all known production release blockers.

## Deployment checks

- Configure Supabase URL, browser-safe anon/publishable key **and VITE_PORTFOLIO_OWNER_ID** on the deployment platform.
- Ensure database RLS policies allow only intended reads/writes.
- Verify /, /teaching and /admin on desktop and mobile.
- Test contact submission and admin login against the intended Supabase instance.
- Replace contact, social, and portfolio links through the admin studio when needed.

## Scope

This redesign changes the public-facing design and content architecture. The authenticated admin dashboard and teaching experience remain in place pending separate QA and design work.
