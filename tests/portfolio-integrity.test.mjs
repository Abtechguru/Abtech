import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

function source(file) {
  return readFileSync(new URL("../" + file, import.meta.url), "utf8");
}

test("sample environment contains no service-role key", () => {
  const env = source(".env.example");
  assert.doesNotMatch(env, /^VITE_SERVICEROLE_SECRET=/m);
  assert.match(env, /^VITE_PORTFOLIO_OWNER_ID=/m);
  assert.match(env, /^VITE_SUPABASE_ANON_KEY=/m);
});

test("public data queries and admin sessions are owner scoped", () => {
  const data = source("src/app/contexts/DataContext.tsx");
  assert.match(data, /VITE_PORTFOLIO_OWNER_ID/);
  assert.match(data, /isAuthenticated:\s*isOwnerSession\(session\)/);
  assert.match(data, /\.eq\('id', PORTFOLIO_OWNER_ID\)/);
  assert.match(data, /\.eq\('user_id', PORTFOLIO_OWNER_ID\)/);
  assert.match(data, /to_user_id:\s*PORTFOLIO_OWNER_ID/);
});

test("featured case study slugs remain distinct and reachable", () => {
  const cases = source("src/app/components/modern/caseStudies.ts");
  const slugs = [...cases.matchAll(/^\s+slug:\s+"([a-z0-9-]+)",/gm)].map(match => match[1]);
  assert.equal(slugs.length, 4);
  assert.equal(new Set(slugs).size, slugs.length);
  const app = source("src/app/App.tsx");
  assert.match(app, /pathname\.startsWith\("\/work\/"\)/);
  assert.match(app, /<CaseStudyPage\s*\/>/);
  const publicHome = source("src/app/components/modern/IconicPortfolio.tsx");
  assert.match(publicHome, /"\/work\/" \+ project\.slug/);
});

test("studio logout performs an auth operation rather than only navigating", () => {
  const app = source("src/app/App.tsx");
  const studio = source("src/app/components/admin/AdminLayout.tsx");
  assert.match(app, /await logout\(\)/);
  assert.match(studio, /onClick=\{onLogout\}/);
});

test("settings do not promise fake password or notification persistence", () => {
  const settings = source("src/app/components/admin/Settings.tsx");
  assert.match(settings, /supabase\.auth\.updateUser/);
  assert.doesNotMatch(settings, /Password changed successfully!/);
  assert.doesNotMatch(settings, /Notification preferences updated!/);
  const teaching = source("src/app/components/modern/ModernTeaching.tsx");
  assert.doesNotMatch(teaching, /sampleTestimonials/);
});

test("dashboard avoids unverifiable growth percentages", () => {
  const overview = source("src/app/components/admin/Overview.tsx");
  assert.doesNotMatch(overview, /\+5% overall/);
  assert.doesNotMatch(overview, /Real-time sync/);
  assert.match(overview, /projects\.reduce/);
});


test("analytics reports only stored counters, never fabricated retention or reach", () => {
  const analytics = source("src/app/components/admin/Analytics.tsx");
  assert.match(analytics, /projects\.reduce/);
  assert.match(analytics, /messages\.length/);
  assert.doesNotMatch(analytics, /Retention Rate|Top Referral|Peak Activity|2\.4K|68%|\+12%|\+24%/);
});

test("private routes are split from the initial public homepage bundle", () => {
  const app = source("src/app/App.tsx");
  assert.match(app, /lazy\(\(\) => import\("\.\/components\/admin\/AdminPage"\)/);
  assert.match(app, /lazy\(\(\) => import\("\.\/components\/modern\/ModernTeaching"\)/);
  assert.match(app, /Suspense fallback=/);
});

test("editor media uploads never fabricate base64-backed storage records", () => {
  const uploader = source("src/app/components/admin/MediaUploader.tsx");
  const settings = source("src/app/components/admin/Settings.tsx");
  assert.match(uploader, /supabase\.storage\.from\("media"\)\.upload/);
  assert.match(settings, /supabase\.storage\.from\("media"\)\.upload/);
  assert.doesNotMatch(uploader, /readAsDataURL|reader\.result/);
  assert.doesNotMatch(settings, /readAsDataURL|reader\.result/);
});

test("owner sessions are validated through Supabase Auth service", () => {
  const context = source("src/app/contexts/DataContext.tsx");
  assert.match(context, /supabase\.auth\.getUser\(\)/);
  assert.match(context, /data\.user\?\.id\?\.toLowerCase\(\) === PORTFOLIO_OWNER_ID/);
  assert.match(context, /isOwnerSession\(session\)/);
});

test("inbox offers real search, refresh and scoped mutations", () => {
  const viewer = source("src/app/components/admin/MessagesViewer.tsx");
  const context = source("src/app/contexts/DataContext.tsx");
  assert.match(viewer, /type="search"/);
  assert.match(viewer, /Refresh inbox/);
  assert.match(viewer, /postgres_changes/);
  assert.match(context, /refreshMessages: \(\) => Promise/);
  assert.match(context, /\.eq\("to_user_id", PORTFOLIO_OWNER_ID\)/);
});

test("media replacement never deletes the previous gallery before insertion", () => {
  const context = source("src/app/contexts/DataContext.tsx");
  assert.match(context, /Insert replacements before deleting existing attachments/);
  assert.doesNotMatch(context, /await supabase\.from\('teaching_media'\)\.delete\(\)\.eq\('profile_id'/);
  assert.match(context, /const removedIds = existing\.filter/);
});
