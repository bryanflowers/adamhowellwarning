

## Remove Duplicate Placeholder Articles

### Problem
There are 3 original placeholder articles that have since been replaced by more complete versions with longer slugs, images, and richer content. Both versions are live and listed, causing confusion.

### Duplicates Found

| # | Placeholder (to remove) | Replacement (to keep) |
|---|---|---|
| 1 | `SuperDogeScamUpdate.tsx` — `/superdoge-scam-update` (75 lines, no images, no date) | `InvestigativeUpdateSuperdoge.tsx` — `/investigative-update-exposing-the-superdoge-scam-adam-howells-anonymous-pitch-vanished-promises-and-inner-circle-ties` (107 lines, images, dated Jan 29 2026) |
| 2 | `InvestigativeReport.tsx` — `/investigative-report` (85 lines, no images, no date) | `InvestigativeReportUncovering.tsx` — `/investigative-report-uncovering-the-trail-of-adam-howells-ventures-in-crypto-and-beyond` (135 lines, images, dated Jan 28 2026) |
| 3 | `SuperDogeRugPull.tsx` — `/superdoge-rug-pull` (296 lines, some images, no date) | `ExposingSuperdogeRugPull.tsx` — `/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned` (473 lines, more images, dated Jan 12 2026) |

### Changes

**Step 1: Remove placeholder page files**
- Delete `src/pages/SuperDogeScamUpdate.tsx`
- Delete `src/pages/InvestigativeReport.tsx`
- Delete `src/pages/SuperDogeRugPull.tsx`

**Step 2: Update `App.tsx`**
- Remove the 3 old routes and their imports
- Add redirects from old slugs to new slugs (so any existing links still work):
  - `/superdoge-scam-update` redirects to `/investigative-update-exposing-the-superdoge-scam-...`
  - `/investigative-report` redirects to `/investigative-report-uncovering-the-trail-...`
  - `/superdoge-rug-pull` redirects to `/exposing-the-superdoge-rug-pull-...`

**Step 3: Update `Articles.tsx`**
- Remove the 3 old entries from the articles array (slugs `/superdoge-scam-update`, `/investigative-report`, `/superdoge-rug-pull`)

**Step 4: Update `RelatedArticles.tsx`**
- Check for and remove any references to the old slugs, or update them to point to the new slugs

### Technical Notes
- Redirects will use a simple `Navigate` component from react-router-dom so bookmarks and shared links still work
- No database changes needed
- No images are removed (the old pages' images are also used by other pages)

