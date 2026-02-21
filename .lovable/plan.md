

## Music Page with 20 Pre-Generated Suno AI Songs

### Overview
Create a dedicated `/music` page featuring 20 pre-generated songs about the investigative content. An edge function will handle Suno API calls, and generated song data will be stored as static content for the page.

### Architecture

The flow works in two phases:
1. **Generation phase**: An edge function calls the Suno API to generate songs. You trigger it, collect the audio URLs, and we hardcode them into the site.
2. **Display phase**: A beautiful music player page shows all 20 songs organized by genre with playback controls.

### Step-by-Step Plan

**Step 1: Store the Suno API Key**
- Add your Suno API key as a secret (`SUNO_API_KEY`) so it can be used securely in an edge function.

**Step 2: Create the Suno Edge Function**
- `supabase/functions/generate-suno-music/index.ts`
- Accepts a prompt and genre, calls the official Suno API to generate a song
- Returns the audio URL and metadata
- This is a utility function you'll call to generate each song -- the results get saved as static data

**Step 3: Create Song Data File**
- `src/data/musicTracks.ts`
- Contains all 20 songs with metadata: title, genre, description, audio URL, duration
- Mixed genres covering the investigative themes, for example:
  1. Hip-Hop: "Rug Pull King" -- about the SuperDoge scam
  2. Rock: "Shadow COO" -- about Keith Shingleton
  3. Country: "Bangkok Runner" -- about fleeing justice
  4. Electronic: "Deleted Domains" -- about evidence erasure
  5. Jazz: "The Whitepaper Blues" -- about Smoke Exchange
  6. Pop: "Charity Lies" -- about fake donations
  7. Reggae: "DopeCoin Dreams" -- about the pump and dump
  8. Metal: "Web of Accomplices" -- about the inner circle
  9. R&B: "Anonymous Pitch" -- about the podcast appearance
  10. Folk: "Vanished Promises" -- about abandoned projects
  11-20. Additional varied genres (punk, blues, lo-fi, synthwave, ska, Latin, gospel, grunge, disco, orchestral)

**Step 4: Create the Music Page**
- `src/pages/Music.tsx`
- Header section with page title and description
- Grid/list of 20 songs with:
  - Genre badge/tag for each song
  - Song title and short description of what it's about
  - HTML5 audio player with play/pause, progress bar, volume
  - Currently playing highlight state
  - Track duration display
- Genre filter buttons to filter by genre
- A "Now Playing" sticky bar at the bottom when a song is active

**Step 5: Update Routing and Navigation**
- Add `/music` route to `App.tsx`
- Add "Music" link to the navigation in `Layout.tsx`

### Song Generation Process
Since Suno generates 2 songs per request, we'll need 10 API calls to get 20 songs. After generation, we'll copy the resulting audio URLs into the static data file. The edge function is just a helper tool for you to trigger generation -- the final page loads pre-generated audio URLs directly (no API calls from visitors).

### Technical Details
- **Edge function**: Uses `Deno.env.get("SUNO_API_KEY")` with Bearer auth to `https://apibox.erweima.ai/api/v1/generate` (official Suno endpoint)
- **Audio playback**: Native HTML5 `<audio>` element -- no extra dependencies needed
- **State management**: React `useState` for current track, playing state, and genre filter
- **Styling**: Tailwind CSS matching existing site design (dark cards, badges, muted foreground text)
- **config.toml**: Add `[functions.generate-suno-music]` with `verify_jwt = false`

