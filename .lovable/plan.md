

# Bug Check, Code Quality, and SEO Improvements (Round 3)

The previous two rounds fixed the major issues. This audit found 7 remaining items -- mostly localization gaps and one wrong SEO URL.

---

## Bugs Found

### 1. BUG (MEDIUM): Wrong `mainEntityOfPage` URL in ExposingSuperdogeRugPull.tsx
Line 26 has `mainEntityOfPage` set to a **truncated, incorrect slug**:
`exposing-the-superdoge-rug-pull-adam-howells-13m-crypto-scheme`

The actual route is:
`exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned`

This tells Google the main page lives at a URL that returns a 404.

**Fix:** Correct the slug to match the actual route.

### 2. BUG (LOW): UnmaskingAdamHowell.tsx missing `mainEntityOfPage` in JSON-LD
All other investigative articles now have `mainEntityOfPage`, but this one was missed.

**Fix:** Add `"mainEntityOfPage": "https://web-rescu.lovable.app/unmasking-adam-howell"` to the JSON-LD object.

### 3. BUG (LOW): Comment dates always show English locale
`CommentSection.tsx` line 65 hardcodes `"en-US"`. Thai users see English-formatted dates in comments.

**Fix:** Import `useLanguage` and use `"th-TH"` locale when `lang === "th"`.

### 4. BUG (LOW): ErrorBoundary "Go Home" always links to `/`
Line 40 uses `window.location.href = "/"`. Thai users hitting an error get sent to the English homepage.

**Fix:** Check `window.location.pathname` for `/th` prefix and redirect to `/th` accordingly.

### 5. BUG (LOW): VictimContactSlideIn is English-only
All text in the "Were You Affected?" slide-in and the contact form is hardcoded in English. Thai visitors see English CTA and form labels.

**Fix:** Import `useLanguage` and add Thai translations for all text strings.

### 6. BUG (LOW): RelatedArticles heading is English-only
Line 38-39: "Related Articles & Warnings" is hardcoded.

**Fix:** Import `useLanguage` and show "บทความที่เกี่ยวข้อง" when Thai.

---

## SEO Improvements

### 7. SEO (MEDIUM): Sitemap `lastmod` dates are stale
All blog posts show `2024-10-01`. Investigative articles show dates from 2024. The JSON-LD `dateModified` values were updated to `2026-02-01`. Google may see conflicting freshness signals between the sitemap and the on-page schema.

**Fix:** Update all sitemap `lastmod` dates to `2026-02-21` (today) to match reality.

---

## No other issues found
- The `/th` prefix detection fix from the last round is correctly implemented
- All 15 audio files are cached
- All JSON-LD schemas (except the two items above) are complete
- Navigation, Layout, SEOHead, ArticlePage, and ArticleNarration are working correctly
- The 404 page uses Layout and localized paths
- PROSE_CLASSES is properly extracted to constants

---

## Implementation Plan

### Step 1: Fix wrong mainEntityOfPage URL
**File:** `src/pages/ExposingSuperdogeRugPull.tsx` (line 26)
Change the slug to the correct full route.

### Step 2: Add mainEntityOfPage to UnmaskingAdamHowell
**File:** `src/pages/UnmaskingAdamHowell.tsx` (line 9-18)
Add the field to the JSON-LD object.

### Step 3: Localize comment dates
**File:** `src/components/CommentSection.tsx`
Import `useLanguage`, pass locale to `toLocaleDateString`.

### Step 4: Fix ErrorBoundary home redirect
**File:** `src/components/ErrorBoundary.tsx` (line 40)
Detect `/th` prefix and redirect accordingly.

### Step 5: Localize VictimContactSlideIn
**File:** `src/components/VictimContactSlideIn.tsx`
Import `useLanguage`, add Thai text for all strings (CTA title, description, button, form labels, confirmation).

### Step 6: Localize RelatedArticles heading
**File:** `src/components/RelatedArticles.tsx` (line 38-39)
Show Thai heading when `lang === "th"`.

### Step 7: Update sitemap dates
**File:** `public/sitemap.xml`
Update all `lastmod` values to `2026-02-21`.

### Files to modify (7 files):
- `src/pages/ExposingSuperdogeRugPull.tsx` -- 1-line URL fix
- `src/pages/UnmaskingAdamHowell.tsx` -- Add 1 field to JSON-LD
- `src/components/CommentSection.tsx` -- Localize dates
- `src/components/ErrorBoundary.tsx` -- Fix redirect
- `src/components/VictimContactSlideIn.tsx` -- Add Thai translations
- `src/components/RelatedArticles.tsx` -- Localize heading
- `public/sitemap.xml` -- Update dates

