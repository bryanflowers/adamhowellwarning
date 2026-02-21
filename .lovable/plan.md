

# Fix English Audio: Extract Full Article Text for Narration

## Problem
The text extraction in `ArticlePage.tsx` (line 83-84) finds the first `<h2>` heading and reads only **that element's text**. For the "Unmasking Adam Howell" article, the first heading is "Introduction: The Predator Behind the Schemes", so the narration contains only the title prefix plus that one heading -- a few seconds of audio instead of the full article.

## Root Cause (line 83-84)
```typescript
const firstHeading = proseRef.current.querySelector("h1, h2, h3, h4, h5, h6");
const startNode = (firstHeading || proseRef.current) as HTMLElement;
const bodyText = startNode.innerText || startNode.textContent || "";
```
`startNode.innerText` on an `<h2>` returns only that heading's text, not the rest of the article.

## Fix

### 1. Update text extraction (`src/components/ArticlePage.tsx`, lines 79-88)
Use the full prose container for text extraction instead of a single heading:

```typescript
useEffect(() => {
  if (proseRef.current) {
    const bodyText = proseRef.current.innerText || proseRef.current.textContent || "";
    const prefix = [displayTitle, displaySubtitle].filter(Boolean).join(". ") + ". ";
    setArticleText((prefix + bodyText).slice(0, 5000));
  }
}, [children, displayTitle, displaySubtitle, translatedHtml]);
```

This captures the entire article body (up to 5000 chars) and prepends the title.

### 2. Delete the stale English audio cache
Remove the cached row from `article_audio` for slug `/unmasking-adam-howell-the-serial-scammer-extortionist-and-crypto-fraudster-a-warning-to-investors` so the next click regenerates with the full article text.

## Impact
- This fix applies to **all articles** globally, ensuring every article sends its full body text (not just the first heading) to the audio generation service.
- The 5000-character and 4900-character limits remain in place (client-side and edge function respectively), so very long articles will still be trimmed but will cover significantly more content than before.
