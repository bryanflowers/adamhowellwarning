

# Thai Article Body Translations — Options and Plan

## The Problem

The `/th/` language prefix currently translates:
- Navigation labels, buttons, footer text
- Article titles and excerpts on listing pages (Index, Articles)
- UI components (quiz, bingo, music, share buttons)

It does NOT translate the actual article body content. All 6 investigative articles and 40 blog posts have their full text hardcoded in English JSX.

## Options

### Option A: Auto-translate via AI edge function (Recommended)

Add an on-the-fly translation layer using an AI model via a backend function. When a user visits `/th/...`, the article body is translated server-side (cached in the database for subsequent visits).

**Pros:** Covers all articles automatically, low maintenance, scales to new content.
**Cons:** First load per article has a delay (~5-10s), AI translations may have quality issues for investigative/legal language.

**Implementation:**
1. Create a `translate-article` backend function that accepts article text and target language, calls an AI model (e.g., Gemini Flash), and returns translated HTML.
2. Create a `article_translations` database table to cache results (article_slug, language, translated_html).
3. Modify `ArticlePage` to detect Thai language, check for cached translation, and either display it or trigger generation.
4. Show a loading state ("Translating...") while generating.

### Option B: Static Thai content components

Create Thai versions of each article page (e.g., `ExposingSuperdogeRugPullTh.tsx`) with manually translated content.

**Pros:** Full control over translation quality, no runtime cost.
**Cons:** Enormous manual effort (6 articles x 300-500 lines each = ~2,400+ lines of Thai text to write), must maintain two copies of every article.

### Option C: Hybrid — AI-translate once, then store as static

Use the AI translation approach once to generate Thai content, review it, and store it permanently in the database. No runtime translation after the initial pass.

**Pros:** Best of both worlds — automated generation with cached results.
**Cons:** Still needs review for quality; initial setup is the same as Option A.

---

## Recommended Plan: Option A (Auto-translate with caching)

### Step 1: Database table for cached translations
Create `article_translations` table with columns:
- `id` (uuid, primary key)
- `article_slug` (text, unique per language)
- `language` (text, e.g. "th")
- `translated_html` (text, the translated body)
- `created_at` (timestamp)

### Step 2: Backend function `translate-article`
- Accepts `{ slug, text, targetLang }`
- Checks cache first; if found, returns cached version
- If not cached, calls Lovable AI (Gemini 2.5 Flash) to translate
- Stores result in `article_translations` and returns it

### Step 3: Update `ArticlePage` component
- Detect if current language is Thai via `useLanguage()`
- If Thai, fetch translation from backend (shows loading spinner)
- Render translated HTML using `dangerouslySetInnerHTML` with sanitization
- Fall back to English if translation fails

### Step 4: Translation quality
- Preserve all HTML structure (headings, links, images, figures)
- Only translate text nodes, keep names/URLs/evidence untouched
- Add a small "Auto-translated" disclaimer badge on Thai pages

### Technical Considerations
- Gemini 2.5 Flash handles Thai well and is cost-effective
- Article text is capped at 5,000 chars in narration; for translation we can send the full prose HTML
- RLS: public SELECT on `article_translations`, service-role INSERT from the edge function
- Cache invalidation: not needed unless articles are edited (rare)

