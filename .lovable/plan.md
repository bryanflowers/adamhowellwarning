

# Full Bug Check and UX Improvements

## Bugs Found

### 1. BUG (MEDIUM): CommentSection heading and form labels are English-only
`CommentSection.tsx` line 78 shows `Comments (X)` and lines 104-147 have all-English text: "Leave a Comment", "Name", "Comment", "Submit Comment", "Thank you!", etc. Thai users see a jarring mix of Thai content and English comment UI.

**Fix:** Add Thai translations for all comment section strings using `lang` (already imported).

### 2. BUG (MEDIUM): TableOfContents heading is English-only
`TableOfContents.tsx` line 54: `"Contents"` is hardcoded. Thai users see English.

**Fix:** Import `useLanguage` and show "สารบัญ" when Thai.

### 3. BUG (MEDIUM): ShareButtons "Copy Link" toast is English-only
`ShareButtons.tsx` line 19: `toast.success("Link copied to clipboard")` is always English. Line 42: `"Copy Link"` button text is English.

**Fix:** Use `lang` to show Thai toast and button text.

### 4. BUG (LOW): GlobalSearch "No results found" is English-only
`GlobalSearch.tsx` line 119: `"No results found"` is hardcoded in English.

**Fix:** Show Thai text when `lang === "th"`.

### 5. BUG (LOW): Music page "No favorites yet" is English-only
`Music.tsx` line 276-277: The empty favorites message is hardcoded in English.

**Fix:** Use `lang` to show Thai translation.

### 6. BUG (LOW): ArticleNarration toast errors are English-only
`ArticleNarration.tsx` lines 71 and 87: `toast.error("Failed to generate audio narration")` and `toast.error("Audio playback failed")` are always English.

**Fix:** Use `language` prop to show Thai error messages.

### 7. BUG (LOW): Music page track error toast is English-only
`Music.tsx` line 193: `toast.error("Track failed to load, skipping...")` is English.

**Fix:** Use `lang` for Thai text.

---

## UX Improvements

### 8. UX (MEDIUM): No keyboard Escape to close VictimContactSlideIn modal
The victim contact modal (`VictimContactSlideIn.tsx`) doesn't handle Escape key. The ImageLightbox handles it, and the search handles it, but this modal does not. Users who open the form expect Escape to close it.

**Fix:** Add a `useEffect` with keydown listener for Escape when `formOpen` is true.

### 9. UX (MEDIUM): TableOfContents and VictimContactSlideIn overlap
Both are fixed-positioned at `bottom-24 left-4` (TOC line 50) and `bottom-24 left-4` (VictimContactSlideIn line 113). On pages with long articles, both render at the same position and overlap.

**Fix:** Move the TOC button to `bottom-24 left-20` (or `left-[4.5rem]`) when the victim CTA is also visible, or position the TOC slightly higher to avoid collision.

### 10. UX (LOW): No email validation on VictimContactSlideIn
`VictimContactSlideIn.tsx` line 84 checks for empty fields but doesn't validate the email format. Users could submit "abc" as an email, making responses impossible.

**Fix:** Add a basic email regex check before submission and show an error toast if invalid.

---

## Implementation Plan

### Step 1: Localize CommentSection
**File:** `src/components/CommentSection.tsx`
Add Thai text for: heading ("ความคิดเห็น"), "Loading comments...", "No comments yet...", "Leave a Comment", "Name", "Comment", "Submit Comment", "Submitting...", thank-you message, and review notice.

### Step 2: Localize TableOfContents
**File:** `src/components/TableOfContents.tsx`
Import `useLanguage`, show "สารบัญ" for Thai.

### Step 3: Localize ShareButtons
**File:** `src/components/ShareButtons.tsx`
Use `lang` to show Thai toast message and "คัดลอกลิงก์" button text.

### Step 4: Localize GlobalSearch empty state
**File:** `src/components/GlobalSearch.tsx`
Show "ไม่พบผลลัพธ์" when Thai.

### Step 5: Localize Music page empty favorites
**File:** `src/pages/Music.tsx`
Use `lang` for Thai empty-favorites text.

### Step 6: Localize ArticleNarration error toasts
**File:** `src/components/ArticleNarration.tsx`
Use `language` prop for Thai error messages.

### Step 7: Localize Music track error toast
**File:** `src/pages/Music.tsx`
Use `lang` for Thai track error toast.

### Step 8: Add Escape key to VictimContactSlideIn
**File:** `src/components/VictimContactSlideIn.tsx`
Add `useEffect` listening for Escape key when `formOpen` is true.

### Step 9: Fix TOC/VictimCTA overlap
**File:** `src/components/TableOfContents.tsx`
Change position from `bottom-24 left-4` to `bottom-40 left-4` to stack above the victim CTA area.

### Step 10: Add email validation to VictimContactSlideIn
**File:** `src/components/VictimContactSlideIn.tsx`
Add simple email format validation before submission with Thai/English error toast.

---

## Files to modify (7 files):
- `src/components/CommentSection.tsx` -- Full Thai localization
- `src/components/TableOfContents.tsx` -- Localize heading + fix position
- `src/components/ShareButtons.tsx` -- Localize toast and button text
- `src/components/GlobalSearch.tsx` -- Localize empty state
- `src/components/ArticleNarration.tsx` -- Localize error toasts
- `src/components/VictimContactSlideIn.tsx` -- Escape key + email validation
- `src/pages/Music.tsx` -- Localize empty favorites + error toast

