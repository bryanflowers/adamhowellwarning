

# Full Bug Check, Code Quality Review, and SEO Improvements

## Bugs Found

### 1. BUG (HIGH): Thai audio plays English audio on some pages
The `ArticleNarration` component queries `article_audio` by `articleSlug` (which is `location.pathname`). On Thai pages, the slug is e.g. `/th/unmasking-adam-howell`. However, English pages like `/unmasking-adam-howell` have NO cached audio in the database -- only `/investigative-report-...`, `/exposing-the-superdoge-rug-pull-...`, and `/blog/how-to-identify-crypto-rug-pulls` have English audio. The remaining English articles (homepage `/`, `/unmasking-adam-howell`, `/keith-shingleton-david-edwards`, `/the-architect-of-deception-...`, `/investigative-update-...`) have NO English audio cached, so clicking "Listen to Article" on those pages will trigger a new ElevenLabs API call and charge you.

**Fix:** Generate and cache English audio for the 4 missing English articles (homepage, unmasking, keith-shingleton, architect-of-deception, investigative-update). This ensures all 12 audio files (7 Thai + 5 English that have pages) are pre-cached.

### 2. BUG (MEDIUM): Index page has no ArticleNarration component
The homepage (`Index.tsx`) does not render `ArticleNarration` at all -- only the `ArticlePage` component includes narration. So the homepage (both English `/` and Thai `/th`) has cached audio in the DB but no way for users to play it.

**Fix:** Add `ArticleNarration` to the homepage, after the hero section header area.

### 3. BUG (MEDIUM): 404 page "Return to Home" link is hardcoded to `/`
`NotFound.tsx` uses `<a href="/">` instead of `localPath("/")`. Thai users hitting a 404 will be redirected to the English homepage. Also, the 404 page doesn't use `Layout` so it has no nav/footer.

**Fix:** Use `Link` with `localPath("/")` and wrap in `Layout`.

### 4. BUG (LOW): `useLanguage` detects `/th` prefix too broadly
`location.pathname.startsWith("/th")` would match routes like `/the-architect-...` as Thai. Currently this doesn't cause an issue because the route is `/the-architect-of-deception...` and starts with `/th` -- but the check should be `/th/` or exactly `/th`.

Wait -- this IS a real bug. The path `/the-architect-of-deception-and-adam-howells-web-of-accomplices` starts with `/th`, so `useLanguage` will return `lang = "th"` for this English page. This means:
- The Architect of Deception page always renders in Thai mode
- Thai translations are fetched unnecessarily
- UI labels show Thai text on an English URL

**Fix:** Change the check to `pathname === "/th" || pathname.startsWith("/th/")`.

### 5. BUG (LOW): SEOHead `basePath` stripping has same `/th` prefix issue
Line 30 of `SEOHead.tsx`: `pathname.startsWith("/th")` will incorrectly strip the `/th` prefix from `/the-architect-...`, producing a broken canonical URL like `e-architect-of-deception-...`.

**Fix:** Same pattern -- use `pathname === "/th" || pathname.startsWith("/th/")`.

### 6. BUG (LOW): ArticlePage `normalizeSlug` has the same issue
Line 33: `pathname.startsWith("/th/")` is correct here, but the `pathname === "/th"` case returns `/` which is fine. However, the component's rendering logic for `lang === "th"` depends on `useLanguage` which has Bug #4.

---

## Code Quality Issues

### 7. QUALITY: Duplicate prose class string
`PROSE_CLASSES` is defined in `Index.tsx` (line 22) and a near-identical string exists in `ArticlePage.tsx` (line 173). Should be extracted to a shared constant.

### 8. QUALITY: Index.tsx is 553 lines
The homepage file is very large with inline article content. Consider extracting the article body into a separate component.

### 9. QUALITY: `queryClient` created outside component in App.tsx
This is actually fine for single-instance apps, but worth noting it's a module-level singleton.

### 10. QUALITY: Missing `key` prop concern in sitemap
Not a React issue (static XML), but all blog sitemap entries are on single lines making them hard to maintain.

---

## SEO Improvements

### 11. SEO (HIGH): Broken canonical URL for "Architect of Deception"
Due to Bug #5, the canonical URL for this page is malformed. This confuses search engines significantly.

### 12. SEO (MEDIUM): Missing `dateModified` in most article JSON-LD
Only the homepage and UnmaskingAdamHowell include `dateModified`. The other 4 investigative articles are missing it. Google uses this for freshness signals.

### 13. SEO (MEDIUM): Blog posts missing `dateModified` in JSON-LD
`BlogPost.tsx` only includes `datePublished` but no `dateModified`.

### 14. SEO (LOW): No `mainEntityOfPage` in article JSON-LD
Most article pages are missing `mainEntityOfPage` which helps Google understand the primary content URL.

### 15. SEO (LOW): `x-default` hreflang missing from SEOHead
The `SEOHead` component includes `x-default` hreflang pointing to English, which is good. No issue here.

### 16. SEO (LOW): 404 page returns 200 status
Since this is a client-side SPA, all routes return 200 from the server. The 404 page is correctly `noindex`, but a `<meta http-equiv="status" content="404">` wouldn't help either. This is an inherent SPA limitation -- not fixable without SSR.

---

## Implementation Plan

### Step 1: Fix the critical `/th` prefix detection bug (Bugs #4 and #5)
**Files:** `src/hooks/useLanguage.ts`, `src/components/SEOHead.tsx`

Update the language detection to use `pathname === "/th" || pathname.startsWith("/th/")` instead of `pathname.startsWith("/th")`. This fixes the Architect of Deception page being treated as Thai and having a broken canonical URL.

### Step 2: Add ArticleNarration to the homepage (Bug #2)
**File:** `src/pages/Index.tsx`

Add the `ArticleNarration` component to the homepage hero section so cached audio can be played.

### Step 3: Fix 404 page (Bug #3)
**File:** `src/pages/NotFound.tsx`

Wrap in `Layout`, use `Link` with `localPath("/")`, and add Thai text for the Thai version.

### Step 4: Extract shared prose classes (Quality #7)
**File:** Create `src/lib/constants.ts` with the shared `PROSE_CLASSES` string, import in both `Index.tsx` and `ArticlePage.tsx`.

### Step 5: Add `dateModified` to remaining article JSON-LD (SEO #12, #13)
**Files:** `ExposingSuperdogeRugPull.tsx`, `ArchitectOfDeception.tsx`, `InvestigativeReportUncovering.tsx`, `InvestigativeUpdateSuperdoge.tsx`, `KeithShingletonDavidEdwards.tsx`, `BlogPost.tsx`

Add `dateModified` fields to all JSON-LD objects.

### Step 6: Add `mainEntityOfPage` to article JSON-LD (SEO #14)
Same files as Step 5 -- add `mainEntityOfPage` with the canonical URL.

### Step 7: Generate missing English audio (Bug #1)
Trigger the TTS edge function for the 4 English articles that are missing cached audio: `/`, `/unmasking-adam-howell`, `/keith-shingleton-david-edwards`, `/the-architect-of-deception-and-adam-howells-web-of-accomplices`, `/investigative-update-exposing-the-superdoge-scam-adam-howells-anonymous-pitch-vanished-promises-and-inner-circle-ties`.

---

## Technical Details

### Files to modify:
- `src/hooks/useLanguage.ts` -- Fix `/th` prefix detection (1-line change on line 9)
- `src/components/SEOHead.tsx` -- Fix `/th` prefix stripping (line 30)
- `src/pages/Index.tsx` -- Add ArticleNarration, import it
- `src/pages/NotFound.tsx` -- Wrap in Layout, use localPath
- `src/pages/ExposingSuperdogeRugPull.tsx` -- Add dateModified + mainEntityOfPage to JSON-LD
- `src/pages/ArchitectOfDeception.tsx` -- Same
- `src/pages/InvestigativeReportUncovering.tsx` -- Same
- `src/pages/InvestigativeUpdateSuperdoge.tsx` -- Same
- `src/pages/KeithShingletonDavidEdwards.tsx` -- Same
- `src/pages/BlogPost.tsx` -- Add dateModified to JSON-LD
- `src/lib/constants.ts` -- New file for shared PROSE_CLASSES

### Priority order:
1. **Critical** -- Fix `/th` prefix bug (breaks Architect of Deception page entirely + SEO)
2. **High** -- Add narration to homepage, fix 404 page
3. **Medium** -- JSON-LD improvements, generate missing English audio
4. **Low** -- Extract shared constants

