

# SEO Trust Pages: Disclaimer, Privacy Policy, About

## Overview
Create three new static pages (Disclaimer, Privacy Policy, About) that build trust and credibility for search engines and visitors. Add footer links to them, include JSON-LD structured data, and update the sitemap.

## New Pages

### 1. Disclaimer (`/disclaimer`)
Content covering:
- Purpose of the site (documenting publicly available information)
- Not legal advice
- Fair use and freedom of expression
- Accuracy disclaimer (best efforts, public sources)
- No liability for third-party links
- Right to update content

### 2. Privacy Policy (`/privacy`)
Content covering:
- What data is collected (contact form submissions, comments)
- How data is used (victim contact, moderation)
- No tracking cookies (or minimal analytics)
- Third-party services (ElevenLabs for TTS, etc.)
- Data retention and rights
- Contact information

### 3. About (`/about`)
Content covering:
- Mission statement (investor protection, public awareness)
- What the site does (investigative journalism, evidence-based reporting)
- Editorial standards (court records, public filings, verifiable sources)
- How to contribute information
- Bilingual support (English and Thai)

## Footer Updates
Add a row of links below the existing footer text:
- Disclaimer | Privacy Policy | About
- Links will be localized for Thai (`/th/disclaimer`, etc.)

## Structured Data (JSON-LD)
Each page gets appropriate schema:
- **About**: `Organization` schema with name, description, URL
- **Disclaimer/Privacy**: `WebPage` schema with breadcrumb

## Translation
Add translation keys for:
- Footer link labels (disclaimer, privacyPolicy, about)
- Page titles and meta descriptions
- Page content (full Thai translations for all three pages)

## Sitemap Updates
Add 3 new URLs to `public/sitemap.xml` with hreflang alternates.

## Route Registration
Add routes for all 3 pages in `App.tsx` under both `/` and `/th` route groups.

---

## Technical Details

### Files to create (3):
- `src/pages/Disclaimer.tsx` -- Full disclaimer page with Layout, SEOHead, JSON-LD
- `src/pages/PrivacyPolicy.tsx` -- Privacy policy page with Layout, SEOHead, JSON-LD
- `src/pages/About.tsx` -- About page with Layout, SEOHead, Organization JSON-LD

### Files to modify (4):
- `src/App.tsx` -- Add lazy imports and routes for the 3 new pages
- `src/components/Layout.tsx` -- Add footer links row (Disclaimer, Privacy, About)
- `src/i18n/translations.ts` -- Add translation keys for footer links, page titles, and full page content in both English and Thai
- `public/sitemap.xml` -- Add 3 new URL entries with hreflang alternates

### Pattern followed:
- Same Layout + SEOHead pattern as existing pages (e.g., RedFlagQuiz, ScamBingo)
- Lazy-loaded routes in App.tsx
- Bilingual via `useLanguage()` hook and `t[lang]` translations
- Tailwind prose styling for readable long-form content
