
# Update "Unmasking Adam Howell" Article URL

## What's Changing
The slug for the "Unmasking Adam Howell" article needs to change from `/unmasking-adam-howell` to `/unmasking-adam-howell-the-serial-scammer-extortionist-and-crypto-fraudster-a-warning-to-investors`.

A redirect from the old URL will be added so existing links and search engine indexes continue to work.

## Files to Modify (7)

### 1. `src/App.tsx`
- Change the route path from `unmasking-adam-howell` to the new full slug
- Add a redirect from the old slug to the new one (same pattern as existing redirects like `superdoge-rug-pull`)

### 2. `src/pages/UnmaskingAdamHowell.tsx`
- Update the `mainEntityOfPage` URL in the JSON-LD structured data
- Update the `currentSlug` passed to `RelatedArticles`

### 3. `src/components/RelatedArticles.tsx`
- Update the slug reference from `/unmasking-adam-howell` to the new full slug

### 4. `src/components/GlobalSearch.tsx`
- Update the slug in the investigative articles search list

### 5. `src/i18n/translations.ts`
- Update the slug in both the `en` and `th` article metadata arrays

### 6. `public/sitemap.xml`
- Update all 3 URL references (loc, en hreflang, th hreflang, x-default) to use the new slug

### 7. `supabase/functions/rss-feed/index.ts`
- Update the slug in the articles array

## Backward Compatibility
A `Navigate` redirect ensures `/unmasking-adam-howell` still works for anyone with bookmarks or cached search results.
