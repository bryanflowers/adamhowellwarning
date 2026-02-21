

# Fix Thai Audio: Prevent Narration Until Translation is Ready

## Root Cause

When visiting a Thai article page, this sequence happens:

1. Page renders with English `children` in the prose container
2. `articleText` is extracted: **Thai title + English body** (because the translation hasn't loaded yet)
3. Narration button appears immediately (since `translating` stays `false` when cache hits)
4. Translation loads from cache (after ~100ms) and prose re-renders with Thai content
5. `articleText` updates to Thai title + Thai body

The problem: the narration button is visible and clickable between steps 2-4 with **wrong content**. Even without clicking, the `ArticleNarration` component checks its own audio cache on mount, and if the user clicks "Listen" before step 5 completes, the audio is generated from English body text with a Thai title prefix.

## Fix

### 1. Add a "translation ready" guard (`src/components/ArticlePage.tsx`)

Change the narration button condition from:
```
articleText && !(lang === "th" && translating)
```
to:
```
articleText && !(lang === "th" && translatable && !translatedHtml)
```

This hides the narration button on Thai translatable pages until `translatedHtml` is actually set -- not just until `translating` is false. The button will only appear once the Thai content is rendered in the prose and `articleText` has been re-extracted from the Thai DOM.

### 2. Delete the stale Thai audio cache (database)

Remove the incorrectly cached Thai audio:
```sql
DELETE FROM article_audio
WHERE article_slug = '/th/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned';
```

Also delete the mp3 file from storage bucket `article-audio` with key `th_exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned.mp3`.

## Summary
- 1 line changed in `ArticlePage.tsx` (line 202)
- 1 database row deleted
- 1 storage file deleted
- After the fix, the "Listen" button on Thai pages only appears once the Thai translation is loaded and the text has been re-extracted from the translated content

