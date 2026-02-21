

# Bug Check, Code Quality & SEO Review (Post-Fix Audit)

## Status: Previous fixes confirmed working

The critical `/th` prefix detection bug, 404 page fix, homepage narration, shared constants extraction, and JSON-LD improvements from the last round are all correctly implemented. All 15 audio files (7 Thai + 7 English + 1 blog) are permanently cached.

---

## Remaining Issues Found

### 1. BUG (MEDIUM): `toggleLanguage` in `useLanguage.ts` can produce broken URLs

Line 15: `location.pathname.replace(/^\/th/, "")` uses the same broad regex that was previously fixed for the `lang` detection. If someone is on `/th/the-architect-...` and clicks the language toggle, the regex `^\/th` would strip the `/th` prefix correctly. But if they toggle back from English to Thai on `/the-architect-...`, the resulting URL would be `/th/the-architect-...` which is correct.

However, the real issue is the regex `^\/th` without a trailing `/` or end anchor. On the path `/th` itself, it produces an empty string (handled by `|| "/"`). On `/th/something`, it produces `/something`. This is actually correct behavior. **No bug here upon closer inspection.**

### 2. BUG (LOW): `ExposingSuperdogeRugPull.tsx` has wrong `mainEntityOfPage` URL

Line 26: The `mainEntityOfPage` is set to `https://web-rescu.lovable.app/exposing-the-superdoge-rug-pull-adam-howells-13m-crypto-scheme` but the actual route is `exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned`. This is a **truncated/wrong slug** in the JSON-LD, causing Google to point to a non-existent URL.

**Fix:** Update to the correct full slug.

### 3. BUG (LOW): `UnmaskingAdamHowell.tsx` JSON-LD missing `mainEntityOfPage`

The Unmasking page has `dateModified` but no `mainEntityOfPage` field, unlike the other 4 articles that were fixed.

**Fix:** Add `"mainEntityOfPage": "https://web-rescu.lovable.app/unmasking-adam-howell"`.

### 4. BUG (LOW): Comment date format is always English

`CommentSection.tsx` line 65 hardcodes `toLocaleDateString("en-US", ...)`. Thai users see English-formatted dates in comments.

**Fix:** Pass the current `lang` to the `formatDate` function and use `"th-TH"` locale when in Thai mode.

### 5. BUG (LOW): ErrorBoundary "Go Home" link hardcodes `/`

`ErrorBoundary.tsx` line 40: `window.location.href = "/"` always goes to the English homepage. Thai users hitting an error are sent to the wrong language.

**Fix:** This is a class component so it can't use hooks. The simplest fix is to check `window.location.pathname` for the `/th` prefix and redirect accordingly.

### 6. BUG (LOW): `VictimContactSlideIn` is English-only

The "Were You Affected?" slide-in panel (lines 84-89 and the full form) has no Thai translations. Thai users see English text for this CTA.

**Fix:** Add Thai translations for the slide-in text and form labels.

### 7. BUG (LOW): `RelatedArticles` heading is English-only

Line 38: "Related Articles & Warnings" is hardcoded in English.

**Fix:** Add Thai variant.

---

## SEO Issues

### 8. SEO (MEDIUM): Sitemap `lastmod` dates are outdated

Most sitemap entries show dates from 2024-2025 (e.g., `2024-10-01` for blog posts, `2024-12-15` for SuperDoge), but the JSON-LD `dateModified` values were just updated to `2026-02-01`. The sitemap and JSON-LD should be consistent for Google.

**Fix:** Update sitemap `lastmod` dates to match the JSON-LD `dateModified` values.

### 9. SEO (LOW): Sitemap missing `x-default` hreflang

The sitemap includes `hreflang="en"` and `hreflang="th"` alternates but not `hreflang="x-default"`. While the `SEOHead` component correctly includes `x-default` in the HTML, having it in the sitemap too helps Google choose the right version.

**Fix:** Add `x-default` hreflang entries pointing to the English URLs.

### 10. SEO (LOW): Blog articles and listing pages have no JSON-LD

`Blog.tsx` and `Articles.tsx` only use basic `SEOHead` with title/description but no JSON-LD structured data. Adding a `CollectionPage` or `ItemList` schema would help Google understand these are index pages.

**Fix:** Add JSON-LD with `CollectionPage` type.

---

## Code Quality

### 11. QUALITY (LOW): Duplicate scroll progress tracking

Both `ReadingProgressBar.tsx` (visual progress bar) and `Layout.tsx`'s `ScrollProgressButton` independently track scroll progress with separate `addEventListener("scroll")` handlers. These could share a single scroll listener.

Not critical -- both use `{ passive: true }` so performance impact is minimal.

### 12. QUALITY (LOW): Index.tsx still 558 lines

The homepage is large with inline article content. Not blocking, but could benefit from extracting the article body sections into a sub-component for maintainability.

---

## Implementation Plan

### Step 1: Fix wrong `mainEntityOfPage` URL in ExposingSuperdogeRugPull
**File:** `src/pages/ExposingSuperdogeRugPull.tsx` (line 26)
Change the truncated slug to the correct full route URL.

### Step 2: Add missing `mainEntityOfPage` to UnmaskingAdamHowell
**File:** `src/pages/UnmaskingAdamHowell.tsx` (line 9-18)
Add `mainEntityOfPage` to the JSON-LD object.

### Step 3: Localize comment dates
**File:** `src/components/CommentSection.tsx`
Accept `lang` via `useLanguage()` and pass the correct locale to `toLocaleDateString`.

### Step 4: Fix ErrorBoundary home link for Thai users
**File:** `src/components/ErrorBoundary.tsx` (line 40)
Check `window.location.pathname` for `/th` prefix before redirecting.

### Step 5: Add Thai translations to VictimContactSlideIn
**File:** `src/components/VictimContactSlideIn.tsx`
Add Thai text for the slide-in CTA, form labels, and confirmation message. Import `useLanguage`.

### Step 6: Localize RelatedArticles heading
**File:** `src/components/RelatedArticles.tsx` (line 38)
Use `useLanguage` to show Thai heading when `lang === "th"`.

### Step 7: Update sitemap dates
**File:** `public/sitemap.xml`
Update all `lastmod` entries to be consistent with JSON-LD `dateModified` values. Add `x-default` hreflang entries.

---

## Technical Details

### Files to modify:
- `src/pages/ExposingSuperdogeRugPull.tsx` -- Fix mainEntityOfPage URL (1-line change)
- `src/pages/UnmaskingAdamHowell.tsx` -- Add mainEntityOfPage to JSON-LD
- `src/components/CommentSection.tsx` -- Localize date format
- `src/components/ErrorBoundary.tsx` -- Fix home redirect for Thai users
- `src/components/VictimContactSlideIn.tsx` -- Add Thai translations
- `src/components/RelatedArticles.tsx` -- Localize heading
- `public/sitemap.xml` -- Update lastmod dates, add x-default

### Priority order:
1. **Medium** -- Fix wrong mainEntityOfPage URL (sends Google to 404)
2. **Low** -- Add missing mainEntityOfPage to Unmasking page
3. **Low** -- Localize comments, error boundary, slide-in, related articles
4. **Low** -- Update sitemap dates for consistency

