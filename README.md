# ABTECH — Personal Engineering Portfolio

Editorial, dark-mode personal portfolio for Lateef Abiodun, showcasing full-stack engineering, intelligent systems, product work, and educational impact.

## Stack

- React + TypeScript + Vite
- Tailwind CSS 4 plus scoped `iconic-portfolio.css` design system
- Supabase Auth, database, and content management
- Motion, Lucide, react-helmet-async

## Run locally

1. Install dependencies: `npm ci`
2. Copy `.env.example` to `.env.local` and set **public** Supabase environment variables.
3. Start the Vite dev server: `npm run dev`
4. Build the production bundle: `npm run build`

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Public portfolio |
| `/teaching` | Teaching and tutoring |
| `/admin` | Supabase-authenticated content studio |

Client-side navigation falls back to `index.html` using `vercel.json`.

## Public portfolio

The homepage is implemented in `src/app/components/modern/IconicPortfolio.tsx` and styled in `src/styles/iconic-portfolio.css`. It features curated, editorially written case studies of real initiatives, category filtering, current portfolio projects from Supabase, capability areas, experience (when supplied by the content studio), and a working contact submission flow via the existing `sendMessage` backend.

Update dynamic portfolio content in the admin studio. The curated case-study text lives in `CASE_STUDIES` and can be updated in source. Screens without database records should never invent testimonials, project metrics, or analytics.

## Security

**Important:** A Supabase service-role key was previously committed in `.env.example`. Removing its value from the current branch does **not** revoke it or erase it from Git history. **Rotate/revoke the compromised key in Supabase, inspect access logs, and assess whether any unauthorized data access occurred.** If this project uses JWT-based legacy keys, rotate following the Supabase guidance for the credential type.

Never place service-role, secret, or server-only credentials in variables prefixed with `VITE_`; they are compiled into client bundles. Use a secure server environment for privileged operations. Only public Supabase project URL and anon/publishable key belong in the Vite app.

## Deployment checks

- Configure public Supabase URL/key on the deployment platform.
- Ensure database RLS policies allow only intended reads/writes.
- Verify /, /teaching and /admin on desktop and mobile.
- Test contact submission and admin login against the intended Supabase instance.
- Replace contact, social, and portfolio links through the admin studio when needed.

## Scope

This redesign changes the public-facing design and content architecture. The authenticated admin dashboard and teaching experience remain in place pending separate QA and design work.
