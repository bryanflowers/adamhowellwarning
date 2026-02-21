

# Full Bug Check and Code Quality Audit

## Summary

The codebase is generally well-structured and functional. No critical runtime errors were found. Below are all issues organized by severity.

---

## BUGS (Things that are broken or will break)

### 1. `moderate-comments` edge function uses deprecated `getClaims()` API
**File:** `supabase/functions/moderate-comments/index.ts` (line 29)
**Issue:** `supabase.auth.getClaims(token)` is not a standard Supabase JS method. This likely fails silently or throws, potentially blocking admin access.
**Fix:** Replace with `supabase.auth.getUser(token)` which is the correct method.

### 2. `comments` table has overly permissive INSERT RLS policy
**Issue:** The `comments` table allows `INSERT ... WITH CHECK (true)` for `{public}` role. This means anyone (even without authentication) can insert comments with any `status` value, including `"approved"`, bypassing moderation entirely.
**Fix:** Add a constraint so inserts always set `status = 'pending'`: `WITH CHECK (status = 'pending')`.

### 3. `victim_contacts` table has overly permissive INSERT RLS policy
**Issue:** Same problem -- `WITH CHECK (true)` allows inserting rows with any `status`, though the edge function uses service role anyway. Still a direct-access vulnerability.
**Fix:** Restrict to `WITH CHECK (status = 'pending')`.

### 4. `RelatedArticles` component doesn't use localized paths
**File:** `src/components/RelatedArticles.tsx` (lines 39-42)
**Issue:** Links are hardcoded (e.g., `/blog/slug`, `/unmasking-adam-howell`) without `localPath()`. When viewing Thai pages (`/th/...`), related article links will navigate to English versions, breaking the user's language context.
**Fix:** Accept `localPath` as a prop or use `useLanguage()` hook internally.

### 5. `skipPrev` in Music page has wrong logic
**File:** `src/pages/Music.tsx` (line 118)
**Issue:** The expression `(idx + 1 < 1 ? pool.length - 1 : idx - 1)` -- `idx + 1 < 1` is always false for valid array indices, so this always evaluates to `idx - 1`. When `idx === 0`, it becomes `-1 % pool.length` which equals `-1` in JavaScript (not the last element). The track list will error or play the wrong track.
**Fix:** Use `(idx - 1 + pool.length) % pool.length`.

### 6. `ArticleNarration` uses raw `fetch()` instead of Supabase client
**File:** `src/components/ArticleNarration.tsx` (lines 53-62)
**Issue:** Uses `import.meta.env.VITE_SUPABASE_URL` and manual headers instead of `supabase.functions.invoke()`. This creates maintenance risk and duplicates auth logic.
**Fix:** Use `supabase.functions.invoke("elevenlabs-tts", { body: {...} })`.

### 7. `CommentSection` doesn't refetch after successful submission
**File:** `src/components/CommentSection.tsx` (line 52-56)
**Issue:** After a comment is submitted, `queryClient.invalidateQueries` is never called. The comment count shown won't update. (Though comments are moderated, the pending count in admin won't auto-refresh either.)
**Fix:** Add `queryClient.invalidateQueries({ queryKey: ["comments", articleSlug] })` in `onSuccess`.

---

## SECURITY ISSUES

### 8. Admin page has no route protection or `noindex`
**File:** `src/pages/AdminComments.tsx`
**Issue:** The `/admin/comments` route is publicly discoverable (it's even in the sitemap if someone finds it). While it requires login to see data, it should have `noindex` meta and ideally not be in the sitemap.
**Fix:** Add `<SEOHead noindex />` and remove from `sitemap.xml`.

### 9. No rate limiting on comment or victim contact submission
**Issue:** The `comments` table and `send-victim-contact` edge function have no rate limiting. A bot could spam thousands of entries.
**Fix:** Consider adding rate limiting in the edge function or a database trigger.

### 10. Leaked password protection is disabled
**Issue:** Flagged by the database linter. Accounts can use passwords found in known data breaches.
**Fix:** Enable leaked password protection in auth settings.

---

## CODE QUALITY ISSUES

### 11. Duplicate `articles` array in `Index.tsx`
**File:** `src/pages/Index.tsx` (lines 20-63)
**Issue:** The `articles` array is defined but never used -- the page uses `localArticles` from `articlesMeta` instead. Dead code.
**Fix:** Remove the unused `articles` array.

### 12. Duplicate `ReadingProgressBar` and `ScrollProgressButton`
**Files:** `src/components/ReadingProgressBar.tsx` + `src/components/Layout.tsx` (lines 11-52)
**Issue:** Both track scroll progress independently with separate scroll listeners. `ReadingProgressBar` shows a top bar, and `ScrollProgressButton` shows a circular indicator with the same data. Two scroll listeners for the same data is wasteful.
**Fix:** Consider combining into a single scroll context or hook.

### 13. `TableOfContents` headings are scanned once on mount (empty dependency array)
**File:** `src/components/TableOfContents.tsx` (line 29)
**Issue:** The `useEffect` runs once with `[]` deps. If content loads lazily or changes, headings won't update.
**Fix:** Low priority since content is static, but could be improved with a MutationObserver or content-dependent dep.

### 14. `GlobalSearch` variable shadowing
**File:** `src/components/GlobalSearch.tsx` (lines 46-48)
**Issue:** The `filter` callback uses `.filter((t) => ...)` and `.map((t) => ...)` which shadows the imported `t` (translations object) from line 8. This works but is confusing and could cause bugs if someone refactors.
**Fix:** Rename the callback parameters (e.g., `track` instead of `t`).

### 15. Index page has two separate `<article>` elements with duplicated prose classes
**File:** `src/pages/Index.tsx` (lines 156-282, 286-406)
**Issue:** The same massive Tailwind prose class string is duplicated across two `<article>` blocks. This should be a shared constant or component.
**Fix:** Extract the prose class string into a constant.

### 16. `ShareButtons` component is not localized
**File:** `src/components/ShareButtons.tsx` (line 29)
**Issue:** The "Share:" label is hardcoded in English. The translations file has `shareLabel` but it's not used.
**Fix:** Use `useLanguage()` and `tr.shareLabel`.

### 17. `elevenlabs-tts` uses old `serve()` import pattern
**File:** `supabase/functions/elevenlabs-tts/index.ts` (line 1)
**Issue:** Uses `serve` from `https://deno.land/std@0.168.0/http/server.ts` which is the old pattern. The `moderate-comments` and `send-victim-contact` functions use the newer `Deno.serve()` pattern. Inconsistency.
**Fix:** Migrate to `Deno.serve()` for consistency.

### 18. `generate-suno-music` also uses old `serve()` pattern
**File:** `supabase/functions/generate-suno-music/index.ts` (line 1)
**Fix:** Same as above -- migrate to `Deno.serve()`.

---

## Recommended Fix Priority

| Priority | Issue | Effort |
|----------|-------|--------|
| 1 | Fix `getClaims()` in moderate-comments (Bug 1) | Small |
| 2 | Fix RLS INSERT policies for comments and victim_contacts (Bugs 2-3) | Small |
| 3 | Fix `skipPrev` math in Music.tsx (Bug 5) | Small |
| 4 | Fix RelatedArticles missing localization (Bug 4) | Small |
| 5 | Add `noindex` to admin page, remove from sitemap (Security 8) | Small |
| 6 | Remove dead `articles` array in Index.tsx (Quality 11) | Small |
| 7 | Fix ShareButtons localization (Quality 16) | Small |
| 8 | Standardize edge function serve patterns (Quality 17-18) | Medium |
| 9 | Refactor ArticleNarration to use supabase client (Bug 6) | Medium |
| 10 | Add comment query invalidation (Bug 7) | Small |
| 11 | Fix GlobalSearch variable shadowing (Quality 14) | Small |
| 12 | Extract duplicate prose classes (Quality 15) | Small |

---

## What's Working Well

- SEO implementation (SEOHead, sitemap, hreflang, JSON-LD) is solid
- Error boundary properly catches React errors
- Language toggle with URL-based routing works correctly
- Comment moderation flow via edge function is well-architected
- Image lightbox, table of contents, and reading progress are polished
- Proper input sanitization on comment and victim contact forms
- Audio visualizer with Web Audio API is correctly implemented
- Theme persistence with next-themes is properly configured

