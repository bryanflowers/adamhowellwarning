

# Implement Request Stitching for Full English Article Narration

## Problem
English articles are capped at 5,000 characters (~5-7 minutes of audio), meaning longer articles get cut off. ElevenLabs has a per-request text limit, so sending the full article in one call won't work.

## Solution
Use ElevenLabs **request stitching** -- split the article into chunks at sentence boundaries, generate audio for each chunk with `previous_text`/`next_text` context for smooth transitions, then concatenate the MP3 buffers into a single file. Thai audio stays unchanged (single chunk, 5000 char limit).

## Changes

### 1. Client Side: Remove 5000 char cap for English (`src/components/ArticlePage.tsx`)

- Change the `.slice(0, 5000)` text extraction to send the **full article text** for English
- Keep a reasonable upper bound (e.g. 50,000 chars) to avoid abuse
- Thai articles keep the 5000 char limit since they use a different, more expensive model

Lines ~92 and ~97: change `.slice(0, 5000)` to send full text (or a much higher limit like 50,000).

### 2. Edge Function: Implement Stitching (`supabase/functions/elevenlabs-tts/index.ts`)

The core logic change:

- **For English text over 4,500 chars**: Split into chunks of ~4,500 chars at sentence boundaries (`. `, `! `, `? `)
- **Generate audio for each chunk** in parallel, passing `previous_text` (last ~200 chars of prior chunk) and `next_text` (first ~200 chars of next chunk) for natural prosody
- **Concatenate** all MP3 ArrayBuffers into a single file before uploading to storage
- **For Thai or short English text**: Keep existing single-request behavior

```text
Flow:
  Full text (e.g. 15,000 chars)
       |
  Split into chunks at sentence boundaries
       |
  [Chunk 1: 4500 chars] [Chunk 2: 4500 chars] [Chunk 3: 4500 chars] [Chunk 4: 1500 chars]
       |                      |                      |                      |
  TTS request            TTS request            TTS request            TTS request
  (next_text=...)        (prev+next)            (prev+next)            (prev_text=...)
       |                      |                      |                      |
       v                      v                      v                      v
  [MP3 buffer 1]         [MP3 buffer 2]         [MP3 buffer 3]         [MP3 buffer 4]
       |
  Concatenate all buffers
       |
  Single MP3 file -> Upload to storage -> Cache in DB
```

### 3. Delete stale English audio cache

Delete the cached audio for `/unmasking-adam-howell-the-serial-scammer-extortionist-and-crypto-fraudster-a-warning-to-investors` so it regenerates with full stitching.

## Technical Details

### Chunk splitting function
- Target ~4,500 chars per chunk
- Split at sentence endings (`. `, `? `, `! `) to avoid mid-word cuts
- If no sentence boundary found, fall back to splitting at the nearest space

### Request stitching parameters
- `previous_text`: Last ~200 chars of the previous chunk (provides prosody context)
- `next_text`: First ~200 chars of the next chunk (provides prosody context)
- First chunk: no `previous_text`; last chunk: no `next_text`

### MP3 concatenation
- MP3 is a frame-based format -- raw concatenation of MP3 buffers produces valid playback
- Simply combine all ArrayBuffers sequentially into one before uploading

### Files modified
- `supabase/functions/elevenlabs-tts/index.ts` -- stitching logic
- `src/components/ArticlePage.tsx` -- remove 5000 char cap for English

