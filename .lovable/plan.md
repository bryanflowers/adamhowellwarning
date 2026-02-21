

# Full SEO Audit Results

## What's Working Well
- SEOHead component with canonical URLs, hreflang alternates, OG tags, Twitter cards, and JSON-LD -- solid foundation
- Sitemap has all pages including 40+ blog posts with hreflang alternates
- robots.txt properly configured with Sitemap reference
- All investigative articles have Article JSON-LD with datePublished/dateModified
- Trust pages (Disclaimer, Privacy, About) have breadcrumb JSON-LD
- Homepage has WebSite + Organization + Article @graph schema
- HelmetProvider wrapping the app correctly
- noindex on 404 page

---

## Issues Found

### 1. SEO (HIGH): OG image URLs are relative in index.html fallback
**File:** `index.html` lines 10, 13
The `og:image` and `twitter:image` meta tags use `/og-adam-howell.png` (relative path). Social media crawlers (Facebook, Twitter) require absolute URLs. While SEOHead overrides these on client-side navigation, crawlers that don't execute JavaScript will see the relative URL from the HTML and fail to load the image.

**Fix:** Change to `https://web-rescu.lovable.app/og-adam-howell.png` in `index.html`.

### 2. SEO (HIGH): Missing `og:url` in index.html fallback
**File:** `index.html`
No `og:url` meta tag in the static HTML. Crawlers that don't run JavaScript won't get a canonical OG URL.

**Fix:** Add `<meta property="og:url" content="https://web-rescu.lovable.app">` to `index.html`.

### 3. SEO (MEDIUM): Index page dateModified is stale
**File:** `src/pages/Index.tsx` line 134
`"dateModified": "2025-02-01"` -- this is over a year old. Google uses dateModified to assess content freshness.

**Fix:** Update to `"2026-02-21"` to reflect actual last modification.

### 4. SEO (MEDIUM): Index page datePublished says "November 22, 2026" (future date)
**File:** `src/pages/Index.tsx` line 167
The displayed date is `"November 22, 2026"` -- current date is Feb 21, 2026, so this appears to be a future date. This may confuse users and search engines.

**Fix:** Verify correct publication date. If the article was published in Nov 2024, update to `"November 22, 2024"`. The JSON-LD says `"datePublished": "2024-11-22"` so the display date should match.

### 5. SEO (MEDIUM): Admin page is indexable
**File:** `src/App.tsx` line 57, `src/pages/AdminComments.tsx`
The `/admin/comments` route has no noindex tag. robots.txt blocks `/admin/` but crawlers may still find and attempt to index it through internal links or direct access.

**Fix:** Add `noindex` prop to the SEOHead in AdminComments page.

### 6. SEO (MEDIUM): Music and Quiz pages lack JSON-LD structured data
**Files:** `src/pages/Music.tsx`, `src/pages/RedFlagQuiz.tsx`, `src/pages/ScamBingo.tsx`
These interactive pages have SEOHead with title/description but no JSON-LD schema. Adding WebPage or FAQPage schema would help search engines understand and feature this content.

**Fix:** Add WebPage JSON-LD with breadcrumb to each interactive page.

### 7. SEO (LOW): Blog post JSON-LD `datePublished` format inconsistent
**File:** `src/pages/BlogPost.tsx` line 33
Blog articles use `article.date` which is formatted as `"2026-02-10"` (ISO date). This is correct. However, the `dateModified` is set to the same value as `datePublished` -- ideally it should be updated when content changes.

**Fix:** Minor -- acceptable as-is since blog content is static.

### 8. SEO (LOW): Missing `article:published_time` and `article:author` OG tags
**File:** `src/components/SEOHead.tsx`
When `ogType="article"`, standard OG article meta tags like `article:published_time` and `article:author` are missing. These help social platforms and search engines understand article metadata.

**Fix:** Accept optional `publishedTime` and `author` props in SEOHead and render `article:published_time` and `article:author` when ogType is "article".

### 9. SEO (LOW): Sitemap missing `x-default` hreflang
**File:** `public/sitemap.xml`
The sitemap has `hreflang="en"` and `hreflang="th"` alternates but is missing `hreflang="x-default"` which tells search engines the default version. The SEOHead component correctly includes x-default in the HTML, but the sitemap should match.

**Fix:** Add `<xhtml:link rel="alternate" hreflang="x-default" href="..."/>` to each sitemap URL entry.

### 10. SEO (LOW): No structured data for Articles listing page
**File:** `src/pages/Articles.tsx`
The Articles listing page has SEOHead but no JSON-LD. A CollectionPage or ItemList schema would help search engines understand this is an index of articles.

**Fix:** Add ItemList JSON-LD listing the investigative articles.

---

## Implementation Plan

### Step 1: Fix index.html OG image URLs and add og:url
**File:** `index.html`
- Change relative OG image paths to absolute URLs
- Add `og:url` meta tag

### Step 2: Fix Index page date inconsistencies
**File:** `src/pages/Index.tsx`
- Update `dateModified` to `"2026-02-21"`
- Fix displayed date to match actual publication (Nov 2024 not 2026)

### Step 3: Add noindex to AdminComments
**File:** `src/pages/AdminComments.tsx`
- Add `noindex` prop to SEOHead

### Step 4: Add JSON-LD to interactive pages
**Files:** `src/pages/Music.tsx`, `src/pages/RedFlagQuiz.tsx`, `src/pages/ScamBingo.tsx`
- Add WebPage schema with breadcrumb to each

### Step 5: Add article OG tags to SEOHead
**File:** `src/components/SEOHead.tsx`
- Add optional `publishedTime` prop
- Render `article:published_time` and `article:author` when ogType is "article"

### Step 6: Add x-default hreflang to sitemap entries
**File:** `public/sitemap.xml`
- Add `hreflang="x-default"` alternate to all URL entries (pointing to English version)

### Step 7: Add ItemList JSON-LD to Articles page
**File:** `src/pages/Articles.tsx`
- Add ItemList structured data listing all investigative articles

---

## Technical Details

### Files to modify (8):
- `index.html` -- Absolute OG image URLs, add og:url
- `src/pages/Index.tsx` -- Fix dateModified and display date
- `src/pages/AdminComments.tsx` -- Add noindex
- `src/pages/Music.tsx` -- Add WebPage JSON-LD
- `src/pages/RedFlagQuiz.tsx` -- Add WebPage JSON-LD
- `src/pages/ScamBingo.tsx` -- Add WebPage JSON-LD
- `src/components/SEOHead.tsx` -- Add article:published_time support
- `public/sitemap.xml` -- Add x-default hreflang to all entries
- `src/pages/Articles.tsx` -- Add ItemList JSON-LD

