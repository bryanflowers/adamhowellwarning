

# Full SEO Audit -- Adam Howell Warning Site

## Summary of Findings

After a thorough review of the codebase, here are the SEO issues grouped by severity.

---

## CRITICAL Issues

### 1. No Sitemap
There is no `sitemap.xml` file. Search engines rely on sitemaps to discover and index pages. With 6 investigative articles, 40 blog posts, and several interactive pages, a sitemap is essential.

**Fix**: Generate a `public/sitemap.xml` listing all pages including `/th` variants.

### 2. Most Pages Have No `<Helmet>` Meta Tags
Only 3 pages (Music, Quiz, Bingo) use `react-helmet-async`. The following pages have **zero** per-page meta tags:

- `/` (Index -- the most important page)
- `/unmasking-adam-howell`
- `/exposing-the-superdoge-rug-pull-...`
- `/investigative-report-uncovering-...`
- `/investigative-update-exposing-...`
- `/keith-shingleton-david-edwards`
- `/the-architect-of-deception-...`
- `/articles`
- `/blog` (listing page)
- `/blog/:slug` (all 40 blog posts)

These all fall back to the generic `index.html` meta: *"Lovable Generated Project"* as the description.

**Fix**: Add `<Helmet>` with unique `<title>`, `<meta name="description">`, and Open Graph tags to every page.

### 3. No Canonical URLs
Only the Music page has a `<link rel="canonical">`. Every other page is missing canonicals. With `/th` duplicates for every route, search engines will see duplicate content without canonical signals.

**Fix**: Add canonical links to all pages pointing to the preferred (English) version.

### 4. No `hreflang` Tags for Thai/English
The site has two language versions (`/` and `/th/`) but no `hreflang` annotations. Google cannot determine which version to show Thai or English users.

**Fix**: Add `<link rel="alternate" hreflang="en" href="...">` and `<link rel="alternate" hreflang="th" href="...">` on every page.

---

## HIGH Issues

### 5. No Structured Data (JSON-LD)
Zero structured data across the entire site. Adding `Article` schema to investigative pages and blog posts would enable rich results in Google (author, date, headline).

**Fix**: Add JSON-LD `Article` schema to `ArticlePage` and `BlogPost` components.

### 6. Blog Post Pages Have No Meta Tags
The `BlogPost.tsx` component renders articles but never sets `<title>`, description, or OG tags. Each blog article already has `title`, `metaDescription`, and `heroImage` in the data -- they just aren't wired to `<Helmet>`.

**Fix**: Add `<Helmet>` to `BlogPost.tsx` using article data fields.

### 7. Blog Cards Have No Hero Images
The blog data has a `heroImage` field and 40 images were generated, but neither `Blog.tsx` (listing) nor `BlogPost.tsx` (detail) display them. Missing images hurt click-through rates and social sharing.

**Fix**: Wire `heroImage` into blog cards and blog post headers.

### 8. Generic `index.html` Meta Description
The default description is *"Lovable Generated Project"* and the author is *"Lovable"*. These appear on every page without per-page Helmet overrides.

**Fix**: Update `index.html` with proper defaults: a real site description, correct author name, and remove "Lovable" branding.

---

## MEDIUM Issues

### 9. Missing `alt` Text on Some Images
Some images in investigative articles have good alt text, but the blog articles render via `dangerouslySetInnerHTML` with no images inside. The hero images (once wired) will need descriptive alt text.

### 10. `robots.txt` Has No Sitemap Reference
The `robots.txt` allows all crawlers but doesn't point to a sitemap:
```
Sitemap: https://web-rescu.lovable.app/sitemap.xml
```

### 11. No OG Images for Most Pages
Only Music and Quiz pages set OG images (both use the same generic `og-adam-howell.png`). Blog posts should use their individual hero images as OG images for better social sharing.

### 12. `og:url` Missing on All Pages Except Music
The `og:url` property is only set on the Music page. Every page should declare its canonical URL via `og:url`.

### 13. No 404 Page SEO
The `NotFound.tsx` page has no `<Helmet>` and doesn't set a `noindex` meta tag, meaning Google could index a 404 page.

---

## LOW Issues

### 14. No `lang` Attribute Switching
The `<html lang="en">` in `index.html` is static. When viewing `/th` pages, the lang attribute should be `th`.

### 15. ScamBingo Missing OG/Twitter Tags
The Bingo page only has `title` and `description` in Helmet -- no OG or Twitter card tags.

### 16. Same OG Image for Everything
Every page that does have OG tags uses the same `og-adam-howell.png`. Individual OG images per article would improve social click-through.

---

## Implementation Plan

### Step 1: Fix `index.html` defaults
- Update `<meta name="description">` to a real site description
- Update `<meta name="author">` 
- Remove "Lovable Generated Project" references

### Step 2: Create an SEO component
Build a reusable `<SEOHead>` component wrapping `<Helmet>` that handles:
- Title
- Description
- Canonical URL
- OG tags (title, description, image, url, type)
- Twitter card tags
- hreflang (en + th)
- JSON-LD structured data (optional)
- lang attribute on `<html>`

### Step 3: Add `<SEOHead>` to every page
- **Index**: Custom title, description, OG image
- **Each investigative article** (6 pages): Unique title/description from article data
- **Articles listing**: Custom title/description
- **Blog listing**: Custom title/description
- **BlogPost** (40 articles): Dynamic title/description/heroImage from `blogArticles` data
- **Music, Quiz, Bingo**: Consolidate existing Helmet into `<SEOHead>`
- **NotFound**: Add `noindex` meta

### Step 4: Wire hero images into blog
- Display `heroImage` in `Blog.tsx` cards
- Display `heroImage` as header image in `BlogPost.tsx`
- Use hero images as OG images for social sharing

### Step 5: Create `sitemap.xml`
- Static file listing all English and Thai routes
- Include all 6 investigative articles, 40 blog posts, and utility pages
- Add `Sitemap:` directive to `robots.txt`

### Step 6: Add JSON-LD structured data
- `Article` schema for investigative pages and blog posts
- `WebSite` schema on the homepage with `SearchAction`

---

## Technical Details

### Files to create:
- `src/components/SEOHead.tsx` -- reusable SEO component
- `public/sitemap.xml` -- static sitemap

### Files to modify:
- `index.html` -- fix default meta tags
- `public/robots.txt` -- add Sitemap directive
- `src/pages/Index.tsx` -- add SEOHead
- `src/pages/UnmaskingAdamHowell.tsx` -- add SEOHead
- `src/pages/ExposingSuperdogeRugPull.tsx` -- add SEOHead
- `src/pages/InvestigativeReportUncovering.tsx` -- add SEOHead
- `src/pages/InvestigativeUpdateSuperdoge.tsx` -- add SEOHead
- `src/pages/KeithShingletonDavidEdwards.tsx` -- add SEOHead
- `src/pages/ArchitectOfDeception.tsx` -- add SEOHead
- `src/pages/Articles.tsx` -- add SEOHead
- `src/pages/Blog.tsx` -- add SEOHead
- `src/pages/BlogPost.tsx` -- add SEOHead + wire hero image
- `src/pages/Music.tsx` -- migrate to SEOHead
- `src/pages/RedFlagQuiz.tsx` -- migrate to SEOHead
- `src/pages/ScamBingo.tsx` -- migrate to SEOHead
- `src/pages/NotFound.tsx` -- add noindex
- `src/components/ArticlePage.tsx` -- accept optional JSON-LD prop

