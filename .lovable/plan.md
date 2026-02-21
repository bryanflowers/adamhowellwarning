

# Fix ElevenLabs TTS: Upgrade to v3 for Thai + Clear Thai Audio Cache

## Problem
The edge function uses `eleven_multilingual_v2` for Thai, but ElevenLabs v3 (`eleven_v3`) is required for proper Thai support. All cached Thai audio was generated with v2 and needs to be deleted and regenerated. Additionally, the text extraction should start from the first heading tag.

## Changes

### Step 1: Update the edge function to use v3 for Thai
**File:** `supabase/functions/elevenlabs-tts/index.ts`

- Change Thai model from `eleven_multilingual_v2` to `eleven_v3`
- Add `language_code: "tha"` to the request body when Thai (v3 uses ISO 639-3 codes)
- Keep English on `eleven_turbo_v2_5` (unchanged)

### Step 2: Extract text starting from the heading tag
**File:** `src/components/ArticlePage.tsx`

Update the text extraction `useEffect` (lines 80-87) to find the first `<h1>`-`<h6>` element in `proseRef` and start reading from there, rather than prepending the title/subtitle manually. This ensures TTS reads from the actual article heading.

### Step 3: Delete all 7 Thai audio cache entries
Delete from both the `article_audio` database table and the `article-audio` storage bucket:

**Database rows to delete (article_slug):**
- `/th`
- `/th/unmasking-adam-howell`
- `/th/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned`
- `/th/investigative-report-uncovering-the-trail-of-adam-howells-ventures-in-crypto-and-beyond`
- `/th/investigative-update-exposing-the-superdoge-scam-adam-howells-anonymous-pitch-vanished-promises-and-inner-circle-ties`
- `/th/keith-shingleton-david-edwards`
- `/th/the-architect-of-deception-and-adam-howells-web-of-accomplices`

**Storage files to delete:**
- `th.mp3`
- `th_unmasking-adam-howell.mp3`
- `th_exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned.mp3`
- `th_investigative-report-uncovering-the-trail-of-adam-howells-ventures-in-crypto-and-beyond.mp3`
- `th_investigative-update-exposing-the-superdoge-scam-adam-howells-anonymous-pitch-vanished-promises-and-inner-circle-ties.mp3`
- `th_keith-shingleton-david-edwards.mp3`
- `th_the-architect-of-deception-and-adam-howells-web-of-accomplices.mp3`

Thai audio will be regenerated on-demand using v3 when users click "Listen to Article" on Thai pages.

---

## Technical Details

### Edge function change (key diff):
```text
// Before:
const modelId = isThai ? "eleven_multilingual_v2" : "eleven_turbo_v2_5";

// After:
const modelId = isThai ? "eleven_v3" : "eleven_turbo_v2_5";

// Add to request body for Thai:
language_code: isThai ? "tha" : undefined,
```

### Text extraction change:
```text
// Before: prepends title + subtitle manually
const header = [displayTitle, displaySubtitle].filter(Boolean).join(". ");
const fullText = header ? `${header}. ${bodyText}` : bodyText;

// After: find first heading in prose and read from there
const firstHeading = proseRef.current.querySelector("h1, h2, h3, h4, h5, h6");
const startNode = firstHeading || proseRef.current;
const bodyText = startNode.innerText || startNode.textContent || "";
```

### Files modified:
- `supabase/functions/elevenlabs-tts/index.ts` -- Switch to `eleven_v3` model for Thai
- `src/components/ArticlePage.tsx` -- Start text extraction from heading tag
