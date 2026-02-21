
# Final SEO Audit and Fixes

## Issues Found

### 1. CRITICAL: Missing JSON-LD on UnmaskingAdamHowell
The `UnmaskingAdamHowell` page has JSON-LD but is missing `datePublished`. All other article pages include it. This article is your highest-priority page.

### 2. CRITICAL: "Back to all articles" link not localized in ArticlePage
Line 118-121 of `ArticlePage.tsx` has a hardcoded English "Back to all articles" link pointing to `/` instead of `localPath("/")`. Thai users clicking this link get sent to the English homepage.

### 3. CRITICAL: Blog post sitemap entries missing hreflang alternates
The 40 blog post URLs in `sitemap.xml` (lines 93-132) have NO `xhtml:link` hreflang alternates, unlike the investigative articles and listing pages which correctly include them. Even though blogs aren't translated, Google still expects hreflang annotations for consistency.

### 4. MEDIUM: `index.html` has duplicate/conflicting meta tags
The static `index.html` has its own `og:title`, `og:description`, `og:image`, `twitter:*` tags that conflict with the dynamic `<SEOHead>` Helmet component. Since react-helmet-async should override these, the static ones are redundant clutter. Worse, the static title says "Adam Howell Public Warning" while Helmet sets per-page titles — crawlers that don't execute JS will only see the static fallback.

### 5. MEDIUM: `index.html` has leftover TODO comments
Lines 7 and 11 have `<!-- TODO -->` comments visible in source. Unprofessional for a public-facing site.

### 6. MEDIUM: Missing `lastmod` dates in sitemap
None of the sitemap entries include `<lastmod>` dates. Google uses these to prioritize crawling. All articles have known publication dates.

### 7. MEDIUM: No Organization JSON-LD on the site level
The homepage has a basic `WebSite` schema but no `Organization` schema with logo, social links, or `sameAs` properties. This helps Google's Knowledge Panel.

### 8. LOW: ScamBingo and RedFlagQuiz missing JSON-LD
These interactive pages have `SEOHead` but no structured data. Adding `WebApplication` or `Quiz` schema would improve rich results.

### 9. LOW: No `og:locale` meta tag
The SEOHead component sets `og:title`, `og:description`, etc. but doesn't set `og:locale` (e.g., `en_US` or `th_TH`), which helps Facebook and social crawlers serve the right language.

### 10. LOW: `robots.txt` missing Disallow for admin
The admin panel at `/admin/comments` is correctly `noindex` via Helmet, but crawlers could still discover and waste budget crawling it. Adding `Disallow: /admin/` to robots.txt is a belt-and-suspenders fix.

---

## Implementation Plan

### Step 1: Fix ArticlePage "Back" link localization
Update `ArticlePage.tsx` to use `localPath("/")` instead of hardcoded `/`, and translate the text "Back to all articles" for Thai.

### Step 2: Add `datePublished` to UnmaskingAdamHowell JSON-LD
Add the missing `datePublished` field to the JSON-LD object.

### Step 3: Add hreflang alternates to blog sitemap entries
Update all 40 blog `<url>` entries in `sitemap.xml` to include `xhtml:link` alternates for `en` and `th`.

### Step 4: Clean up `index.html`
- Remove TODO comments
- Keep static meta tags as JS-disabled fallbacks but ensure they match the homepage SEOHead values

### Step 5: Add `lastmod` to sitemap entries
Add `<lastmod>` dates based on known article publication dates.

### Step 6: Add `og:locale` to SEOHead
Add `<meta property="og:locale" content="en_US" />` (or `th_TH` when Thai) to the SEOHead component.

### Step 7: Add `Disallow: /admin/` to robots.txt

### Step 8: Enhance homepage JSON-LD with Organization schema
Add logo URL, sameAs (Twitter/social links), and founding info to the structured data.

### Step 9: Add JSON-LD to Quiz and Bingo pages
Add basic `WebApplication` or `Quiz` schema for richer search presence.

---

## Technical Details

**Files to modify:**
- `src/components/ArticlePage.tsx` — localize back link
- `src/components/SEOHead.tsx` — add `og:locale`
- `src/pages/UnmaskingAdamHowell.tsx` — add datePublished to JSON-LD
- `src/pages/Index.tsx` — enhance Organization JSON-LD
- `src/pages/RedFlagQuiz.tsx` — add JSON-LD
- `src/pages/ScamBingo.tsx` — add JSON-LD
- `public/sitemap.xml` — add hreflang + lastmod to blog entries
- `public/robots.txt` — add admin disallow
- `index.html` — clean up TODOs and redundant tags
