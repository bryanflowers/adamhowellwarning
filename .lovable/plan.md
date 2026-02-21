

# Bug Check and UX Improvements (Round 2)

## Bugs Found

### 1. BUG (MEDIUM): Quiz share toast is English-only in Thai mode
`RedFlagQuiz.tsx` line 309: `toast.success("Result copied to clipboard!")` is always English. Thai users see English toast after sharing their quiz result.

**Fix:** Use `lang` to show `"คัดลอกผลลัพธ์แล้ว!"` when Thai.

### 2. BUG (MEDIUM): Bingo share toast is English-only in Thai mode
`ScamBingo.tsx` line 155: `toast.success("Copied to clipboard!")` is always English.

**Fix:** Use `lang` to show `"คัดลอกแล้ว!"` when Thai.

### 3. BUG (MEDIUM): Quiz questions and scenarios are English-only
`RedFlagQuiz.tsx` lines 19-130: All 10 quiz questions (scenarios, options, explanations) are hardcoded in English. Thai users taking the quiz see 100% English content despite the rest of the UI being localized.

**Fix:** This is a large localization task. For now, add a notice banner when `lang === "th"` explaining that quiz content is currently only available in English, rather than leaving users confused.

### 4. BUG (MEDIUM): Bingo share text is always English
`ScamBingo.tsx` line 149: The share text `"BINGO! I spotted X scam red flags..."` is hardcoded in English.

**Fix:** Use Thai share text when `lang === "th"`.

### 5. BUG (LOW): Quiz rating labels and descriptions are English-only
`RedFlagQuiz.tsx` lines 132-138: `getRating()` returns English labels ("Elite Scam Detective", "Sharp Investor", etc.) regardless of language.

**Fix:** Add Thai translations for the 4 rating tiers.

### 6. BUG (LOW): Quiz share text is English-only
`RedFlagQuiz.tsx` line 304: `"I scored X% on the Spot the Red Flag crypto quiz!"` is always English.

**Fix:** Use Thai text when `lang === "th"`.

### 7. BUG (LOW): "Generating..." label on Music tracks is English-only
`Music.tsx` line 315: `"Generating..."` is hardcoded. Thai users see English on disabled track cards.

**Fix:** Show `"กำลังสร้าง..."` when Thai.

### 8. BUG (LOW): Music "Shuffle" label is partially English
`Music.tsx` line 269: `Shuffle {shuffleMode ? tr.shuffleOn : tr.shuffleOff}` — the word "Shuffle" itself is hardcoded English.

**Fix:** Add a `shuffle` key to the translation object, or inline Thai text.

### 9. BUG (LOW): Blog article content (HTML) is English-only
`BlogPost.tsx` line 50: Blog article content is rendered via `dangerouslySetInnerHTML` from `article.content` which is always English. Unlike the investigative articles, blog posts have no translation mechanism.

**Fix:** This is a structural limitation (blog content would need a translation pipeline). Add an "English only" notice when Thai is active, similar to the quiz.

### 10. BUG (LOW): VictimContactSlideIn error message fallback is English
`VictimContactSlideIn.tsx` line 119: The catch block uses `"Failed to send message"` as a fallback error message in English.

**Fix:** Use Thai fallback when `lang === "th"`.

---

## UX Improvements

### 11. UX (MEDIUM): Body scroll not locked when VictimContactSlideIn modal is open
When the victim contact form modal opens (line 169), the background page is still scrollable. The `ImageLightbox` correctly locks scroll with `document.body.style.overflow = "hidden"` but the victim contact modal does not.

**Fix:** Add `document.body.style.overflow = "hidden"` when `formOpen` is true, restore on close.

### 12. UX (MEDIUM): No focus trap in VictimContactSlideIn modal
When the modal is open, users can tab out of the modal to interact with background elements. This is an accessibility issue.

**Fix:** Auto-focus the first input when the modal opens (using a ref + useEffect).

### 13. UX (LOW): "FREE SPACE" in Bingo is always English
`ScamBingo.tsx` line 76: `result[FREE_SPACE_INDEX] = "FREE SPACE"` is hardcoded. Although the `localizeSquare` function maps it via `bingoSquaresTh`, the original string "FREE SPACE" is set before localization and doesn't include the emoji consistently.

**Fix:** Already handled by `localizeSquare()` and the translation map has `"FREE SPACE 🎯": "ช่องฟรี 🎯"` — this is actually working. No fix needed.

### 14. UX (LOW): ErrorBoundary "Go Home" button is English-only
`ErrorBoundary.tsx` line 33: `"Something went wrong"` and line 45: `"Go Home"` are hardcoded English. If a Thai user hits an error, they see English.

**Fix:** Since ErrorBoundary is a class component without hooks, check `window.location.pathname` to determine language and show Thai text.

---

## Implementation Plan

### Step 1: Localize Quiz toasts, share text, and rating labels
**File:** `src/pages/RedFlagQuiz.tsx`
- Add Thai text for `toast.success` (line 309)
- Add Thai share text (line 304)
- Add Thai rating labels in `getRating()` (lines 132-138)
- Add an "English only" notice banner for quiz content when Thai

### Step 2: Localize Bingo share text and toast
**File:** `src/pages/ScamBingo.tsx`
- Add Thai share text (line 149)
- Add Thai `toast.success` (line 155)

### Step 3: Localize Music remaining English strings
**File:** `src/pages/Music.tsx`
- Translate "Generating..." (line 315) and "Shuffle" label (line 269)

### Step 4: Fix VictimContactSlideIn error fallback + body scroll lock
**File:** `src/components/VictimContactSlideIn.tsx`
- Localize error fallback (line 119)
- Add body scroll lock when `formOpen` is true
- Auto-focus first input on modal open

### Step 5: Add English-only notice on blog posts when Thai
**File:** `src/pages/BlogPost.tsx`
- Add a small info banner above blog content when `lang === "th"` indicating content is in English only

### Step 6: Localize ErrorBoundary
**File:** `src/components/ErrorBoundary.tsx`
- Check `window.location.pathname` for `/th` prefix
- Show Thai text for heading and button

---

## Technical Details

### Files to modify (6 files):
- `src/pages/RedFlagQuiz.tsx` — Quiz localization (toasts, share, ratings, notice)
- `src/pages/ScamBingo.tsx` — Bingo localization (share, toast)
- `src/pages/Music.tsx` — "Generating..." and "Shuffle" labels
- `src/components/VictimContactSlideIn.tsx` — Error fallback, scroll lock, auto-focus
- `src/pages/BlogPost.tsx` — English-only notice for Thai users
- `src/components/ErrorBoundary.tsx` — Thai error page text

