
# Fix Broken Image in Thai Translation + Reset Thai Audio Cache

## Problem 1: Broken Image
The cached Thai translation stored in the database contains a hardcoded path `/src/assets/drummond-superdoge-defense.png` which doesn't exist in production builds. Vite transforms asset paths during build, so only the ES6-imported version works. The fix is to delete the cached translation so it regenerates with the correct Vite-processed URL.

## Problem 2: Thai Audio Starts from Wrong Place
The cached Thai audio was generated before the title-prepending fix was applied. It needs to be deleted so it regenerates starting from the article title.

## Steps

### 1. Delete the cached Thai translation for this article
Run a database migration to remove the row from `article_translations` where `article_slug = '/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned'` and `language = 'th'`. When the user next visits the Thai page, a fresh translation will be generated with correct image URLs.

### 2. Delete the cached Thai audio for this article
Run a database migration to remove the row from `article_audio` where `article_slug = '/th/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned'`. The next "Listen to Article" click will generate fresh audio starting from the article title.

### 3. No code changes needed
The title-prepending fix in `ArticlePage.tsx` was already applied in the previous update, so the regenerated audio will correctly start from the title. The image issue is purely a stale cache problem -- the fresh translation will capture the correct Vite-processed image URL from the rendered DOM.

## Summary
- 2 database rows deleted (1 translation cache, 1 audio cache)
- 0 code files modified
- Both will auto-regenerate correctly on next visit
