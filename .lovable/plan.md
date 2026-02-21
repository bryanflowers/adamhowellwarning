
## Add ElevenLabs Text-to-Speech for All Articles (Generate Once, Save Forever)

### Overview
Add a "Listen to this article" audio player to every article page. Audio is generated once via ElevenLabs TTS, saved to file storage, and served directly from there on all future visits -- no repeat API calls.

### How It Works

1. **First visit (no audio exists yet):** A "Generate Audio" button appears. Clicking it sends the article text to an edge function, which calls ElevenLabs TTS, uploads the MP3 to a storage bucket, and saves the URL in a database table.

2. **Every visit after that:** The audio player loads the saved MP3 directly from storage. No ElevenLabs call is made.

### Step-by-Step Implementation

#### 1. Connect ElevenLabs
- Link the existing ElevenLabs connection to this project (provides the `ELEVENLABS_API_KEY` secret automatically)

#### 2. Create Database Table: `article_audio`
```
- id (uuid, primary key)
- article_slug (text, unique) -- identifies each article
- audio_url (text) -- public URL of saved MP3
- voice_id (text) -- which ElevenLabs voice was used
- status (text) -- "pending", "generating", "completed", "failed"
- created_at (timestamp)
```
With public SELECT RLS so the frontend can check if audio exists, and no INSERT/UPDATE from client (only the edge function writes via service role).

#### 3. Create Storage Bucket: `article-audio`
- Public bucket so audio files can be served directly via URL
- RLS policy allowing public read access

#### 4. Create Edge Function: `generate-article-audio`
- Accepts: `{ slug, text, title }`
- Checks if audio already exists in `article_audio` table -- if so, returns the existing URL immediately
- Calls ElevenLabs TTS API (`eleven_multilingual_v2` model, a clear narrator voice like "Brian")
- Since articles are long, splits text into chunks under 5,000 characters at sentence boundaries, generates each chunk, then concatenates the audio buffers
- Uploads the final MP3 to the `article-audio` storage bucket
- Saves the public URL in the `article_audio` table
- Returns the audio URL

#### 5. Create Reusable Component: `ArticleAudioPlayer`
- Takes `slug` and `articleText` as props
- On mount, queries `article_audio` table for the slug
  - If `status === "completed"`: renders an audio player with play/pause, progress bar, and speed controls
  - If no record exists: shows a "Listen to this article" button that triggers generation
  - If `status === "generating"`: shows a loading spinner
- Placed inside the `ArticlePage` component header area so it appears on every article automatically

#### 6. Update ArticlePage Component
- Add the `ArticleAudioPlayer` component in the header section (below the date/read-time metadata)
- Pass the slug and article text content down

#### 7. Update All Article Pages
- **Standalone pages** (6 total): UnmaskingAdamHowell, KeithShingletonDavidEdwards, ArchitectOfDeception, ExposingSuperdogeRugPull, InvestigativeUpdateSuperdoge, InvestigativeReportUncovering -- each needs to pass a `slug` and extract their text content
- **Blog posts** (via BlogPost.tsx): Already has `article.slug` and `article.content` available -- passes them through naturally

### Articles Covered
- 6 standalone investigative articles
- 10 blog articles from `blogArticles.ts`
- Total: 16 articles, each generating audio only once

### Technical Details
- **Voice**: Brian (`nPczCjzI2devNBz1zQrb`) -- clear male narrator, good for investigative content
- **Model**: `eleven_multilingual_v2` for highest quality
- **Text chunking**: Split at sentence boundaries, max 5,000 chars per chunk, using `previous_text`/`next_text` for smooth stitching
- **Storage**: MP3 files at `article-audio/{slug}.mp3`
- **Cost control**: The database check guarantees each article is only ever generated once
- **Edge function config**: `verify_jwt = false` in config.toml (public articles, no auth needed)

### Files Changed
| File | Change |
|------|--------|
| `supabase/functions/generate-article-audio/index.ts` | New edge function |
| `supabase/config.toml` | Add function config |
| `src/components/ArticleAudioPlayer.tsx` | New audio player component |
| `src/components/ArticlePage.tsx` | Add audio player slot |
| `src/pages/UnmaskingAdamHowell.tsx` | Pass slug prop |
| `src/pages/KeithShingletonDavidEdwards.tsx` | Pass slug prop |
| `src/pages/ArchitectOfDeception.tsx` | Pass slug prop |
| `src/pages/ExposingSuperdogeRugPull.tsx` | Pass slug prop |
| `src/pages/InvestigativeUpdateSuperdoge.tsx` | Pass slug prop |
| `src/pages/InvestigativeReportUncovering.tsx` | Pass slug prop |
| `src/pages/BlogPost.tsx` | Pass slug and content |
| SQL migration | Create `article_audio` table + storage bucket |
