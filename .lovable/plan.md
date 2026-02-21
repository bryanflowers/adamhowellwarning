
# Fix: Include Article Title and Subtitle in Audio Narration

## Problem
The narration text is extracted only from the `.prose` body div (`proseRef`), which skips the article's title and subtitle. The audio starts reading from whatever text appears first in the body -- often a caption or paragraph below an image -- instead of beginning with the headline.

## Solution
Prepend the `title` and `subtitle` to the extracted text before passing it to the `ArticleNarration` component.

## Technical Changes

### File: `src/components/ArticlePage.tsx`

**Lines 47-53** -- Update the text extraction `useEffect` to prepend the title and subtitle:

```typescript
useEffect(() => {
  if (proseRef.current) {
    const bodyText = proseRef.current.innerText || proseRef.current.textContent || "";
    // Prepend title and subtitle so narration starts with the headline
    const header = [title, subtitle].filter(Boolean).join(". ");
    const fullText = header ? `${header}. ${bodyText}` : bodyText;
    setArticleText(fullText.slice(0, 5000));
  }
}, [children, title, subtitle]);
```

This single change ensures every article's narration begins with the title, then subtitle, followed by the body text -- across all articles site-wide since they all use the shared `ArticlePage` component.

**Important**: Any previously cached audio for articles will still play the old version. To regenerate, the cached row in the `article_audio` table for the affected slug would need to be deleted so the next play triggers a fresh TTS call.
