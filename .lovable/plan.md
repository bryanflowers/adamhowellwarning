
# Fix Article Narration: Include Title in Audio

## Problem
The narration for the "Unmasking Adam Howell" article starts from "Introduction: The Predator Behind the Schemes" instead of the article title. This happens because the text extraction in `ArticlePage.tsx` finds the first heading inside the prose `<div>`, which is `<h2>Introduction...</h2>` -- the title and subtitle live in the `<header>` above the prose area.

## Solution

### 1. Fix text extraction (`src/components/ArticlePage.tsx`, line 79-87)
Prepend `displayTitle` and `displaySubtitle` to the extracted body text so the narration always begins with the article's title:

```typescript
useEffect(() => {
  if (proseRef.current) {
    const firstHeading = proseRef.current.querySelector("h1, h2, h3, h4, h5, h6");
    const startNode = (firstHeading || proseRef.current) as HTMLElement;
    const bodyText = startNode.innerText || startNode.textContent || "";
    // Prepend title + subtitle so narration starts with the headline
    const prefix = [displayTitle, displaySubtitle].filter(Boolean).join(". ") + ". ";
    setArticleText((prefix + bodyText).slice(0, 5000));
  }
}, [children, displayTitle, displaySubtitle, translatedHtml]);
```

### 2. Delete cached audio from the database
Remove the stale English cache entry so the next "Listen to Article" click generates fresh audio starting from the title. There are 4 rows to clean up (old slug variants + current slug):

- `/unmasking-adam-howell`
- `/unmasking-adam-howell-the-serial-scammer-extortionist-and-crypto-fraudster-a-warning-to-investors`
- `/unmasking-adam-howell-the-serial-scammer-extortionist-and-crypto-fraudster-a-warning-to-investors/`

A database migration will delete these rows. The storage files will remain but become orphaned (harmless, and will be overwritten on regeneration since the edge function uses `upsert: true`).

### 3. Delete stale storage files
Remove the old MP3 files from the `article-audio` storage bucket so they don't take up space. The edge function will upload fresh ones on next generation.

---

## Technical Details

### Files to modify (1):
- `src/components/ArticlePage.tsx` -- Prepend `displayTitle` and `displaySubtitle` to the TTS text extraction (lines 79-87)

### Database migration (1):
- Delete rows from `article_audio` where `article_slug` matches the old cached entries for this article

### Note
This fix applies globally to all articles using `ArticlePage`, so every article's narration will now correctly start with its title. No other articles need individual fixes.
