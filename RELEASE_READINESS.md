# ABTECH Portfolio — Release Readiness

Last reviewed: 2026-11-01

## Current implementation

- Public portfolio rebuilt around a distinctive responsive design system.
- Featured project summaries lead to dedicated routes under /work/:slug.
- Editorial case studies avoid invented metrics, testimonials, and deployment claims.
- Admin content studio redesigned and connected to actual sign-out actions.
- Admin/teaching/case-study routes are lazy-loaded instead of shipped with the homepage bundle.
- Overview and Analytics use real database counters and real messages; unsupported retention, growth and reach figures were removed.
- Inbox now supports searching, unread filtering, refresh, real error handling and optional Supabase Realtime events.
- Settings now calls Supabase Auth for password updates and does not promise delivery of unconfigured notifications.
- Profile photos and project media upload to Storage with type/size checks; no base64 fallback is presented as a saved upload.
- Media registry updates insert new records before removing old ones, with errors surfaced to the editor.
- Public portfolio data is filtered to one configured owner UUID; admin UI only accepts that owner's Supabase session, verified with the Auth service.
- Failing dynamic database reads present a warning instead of silently pretending to be an empty portfolio.

## Required deployment configuration

Configure these **public browser variables** for Production, Preview, and Development in the **abtechportfolio** Vercel project:

- VITE_SUPABASE_URL — the portfolio Supabase project URL
- VITE_SUPABASE_ANON_KEY — the project's browser-safe publishable (or legacy anon) key
- VITE_PORTFOLIO_OWNER_ID — the UUID of the **existing portfolio owner** in Supabase Authentication > Users (auth.users.id).

The owner UUID is not secret. It must identify the owner profile in public.profiles and be the same auth.users.id used by projects, skills, services, experience, testimonials and teaching media. **Do not invent a UUID or create a replacement owner without reviewing existing data.**

If the owner ID is absent or malformed, the app intentionally refuses admin access and DB-backed public reads. The curated featured case studies remain visible; the contact section offers direct email/WhatsApp instead of a nonworking inbox form.

## Critical security work — not closed

1. **Exposed credential:** A previous public .env.example commit included a Supabase service-role credential. The active example file has been cleaned on main and the feature branch, but the leaked key remains discoverable in Git history. **Rotate/revoke it inside the correct Supabase project and review access logs.** Do not mark complete based on file removal alone.
2. **Vercel variable:** The dangerous VITE_SERVICEROLE_SECRET variable was replaced with a non-secret, non-VITE placeholder name. Verify the Vercel environment shows LEGACY_SERVICE_ROLE_REMOVED and not VITE_SERVICEROLE_SECRET. This does not revoke the old credential or remove the historical exposure.
3. **Supabase project access:** The portfolio Supabase project was not available through the connected Supabase project list during this audit. No live RLS policies were read or migrated. Do **not** interpret repository SQL as proof of actual production policy.
4. **RLS review:** Check public.profiles and each content table for row ownership and limited edit permissions; ensure public reads show only intended rows. Verify public.messages INSERT allows only valid recipient and controlled input sizes; consider captcha and per-IP rate limiting through a server endpoint. Anonymous writes to a table are subject to spam without server-side enforcement.
5. **SECURITY DEFINER routines:** Repository SQL contains public increment_profile_view and increment_project_view routines running with elevated privileges. Review EXECUTE grants, user permissions, safe argument validation, and abuse/rate limits. Do not assume RLS automatically applies inside definer functions.
6. **Storage:** Review public bucket access, upload ownership, object type/size restrictions and authenticated upload policies. Avoid allowing all authenticated users to upload to the same public bucket.
7. **Auth:** Client-only owner checks improve UX and reduce accidental cross-account access but **are not** a substitute for database-enforced authorization. Validate server-side owner access and configure RLS before production rollout.

## Testing and verification

| Check | Status |
| --- | --- |
| GitHub Actions: TypeScript | Pass on latest verified run; check current PR head |
| GitHub Actions: Vite production build | Pass on latest verified run; check current PR head |
| GitHub Actions: static integrity regression checks | Added; not a substitute for browser tests or live Supabase testing |
| New /work/:slug routes integrated in SPA router | Implemented |
| Responsive CSS for 360px–desktop | Implemented; needs screenshot QA |
| Real Supabase owner login and dashboard edits | Blocked on portfolio project access and owner UUID |
| Real contact submission and inbox receipt | Blocked on owner UUID and live RLS verification |
| Keyboard focus, reduced motion, no fake data | Implemented in key public pages; needs full browser audit |
| Vercel preview and production deploy | Blocked by Vercel build-rate limit |

## Manual acceptance checklist

- On desktop/mobile, inspect /, /teaching, /admin and each /work/:slug directly (including refresh).
- Confirm hamburger menu opens/closes on tap and Escape; keyboard links are visible.
- Confirm category filters, case-study links, repository links, and back-to-work links operate.
- Confirm correct owner can sign in; an authenticated non-owner account cannot reach the studio.
- Verify project CRUD, skill and experience changes persist and appear publicly as intended.
- Verify contact message submission arrives in owner inbox and failures show correct error feedback.
- Verify password change with current Supabase Auth settings (reauthentication may be required).
- Confirm no sensitive key appears in built assets or published source.
- Run browser accessibility checks and mobile performance testing. Run Lighthouse/axe, verify portrait media, and inspect dynamic load errors.
- Confirm no base64 media placeholders appear after failed storage uploads; upload success should persist after refresh.
- Verify Realtime message changes where enabled, and that manual inbox refresh works otherwise.
- Confirm the verified Supabase owner can edit projects, teaching media and profile photos under the actual Storage RLS policies.
- Revisit SEO/social previews after deployment.

## Deployment rule

Do not merge this branch into production until the real Supabase owner ID, revoked compromised credentials, live RLS checks, and Vercel deployment access have been validated.
