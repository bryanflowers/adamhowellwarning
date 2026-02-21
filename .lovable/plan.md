

# Code Review and Improvements: Quiz, Bingo, and Music Features

## Issues Found

### Quiz (RedFlagQuiz.tsx)
1. **Bug: `selected` is initialized as `[]` (empty array)** -- Checking `selected[i]` on an uninitialized index returns `undefined` (falsy), which works by accident but is fragile. Should initialize to `Array(4).fill(false)`.
2. **Bug: `selected.length === 0` check is wrong** -- After toggling, `selected` is a sparse array so `.length` can be > 0 even if nothing is checked. The `!selected.some(Boolean)` part saves it, but the first condition is misleading.
3. **No keyboard accessibility** -- Option buttons lack `aria-pressed` or `role="checkbox"` attributes for screen readers.
4. **Missing OG meta tags** -- No Open Graph or Twitter Card tags for social sharing of quiz results.

### Bingo (ScamBingo.tsx)
1. **Bug: Only 25 squares but `allSquares` has exactly 25 items** -- `shuffle(allSquares).slice(0, 25)` just shuffles and returns the same 25. The FREE SPACE then overwrites one, meaning one tactic always gets dropped. This is fine, but if you ever want variety between cards, you'd need more than 25 items.
2. **No share feedback** -- `navigator.clipboard.writeText()` has no success toast so users don't know it worked.
3. **No animation on cell toggle** -- Marking a cell could feel more satisfying with a brief animation.
4. **`key={idx}` on shuffled items** -- Using index as key means React reuses DOM nodes incorrectly after shuffle. Should use the text content as key.

### Music (Music.tsx)
1. **Bug: Audio visualizer breaks on track switch** -- `MediaElementAudioSourceNode` can only be created once per `<audio>` element. The `AudioVisualizer` guards with `initialized` state, but if the component unmounts and remounts, a new `AudioContext` is attempted on an already-connected element, silently failing.
2. **No error handling for broken audio URLs** -- If an audio URL 404s, there's no user feedback. Should listen for `onerror` on the `<audio>` element.
3. **Now-playing bar overlaps page content** -- The fixed bottom bar covers the last tracks in the grid. Needs bottom padding on the page when a track is playing.
4. **`getShuffledPool` is called on every render** -- It creates a new shuffle each call. When used in `skipNext`/`skipPrev`, shuffle mode picks a random track rather than following a pre-shuffled order, which means you can hear the same track twice before hearing all tracks.
5. **Mobile: time display hidden** -- The time/volume controls are `hidden sm:block`, so mobile users can't see progress time or control volume.
6. **Missing `crossOrigin` on audio element** -- The AudioVisualizer uses `createMediaElementSource` which requires CORS headers on the audio files. If the CDN doesn't set them, the visualizer shows nothing. Adding `crossOrigin="anonymous"` would make this explicit.

### Global Search (GlobalSearch.tsx)
1. **Music search links all go to `/music`** -- Clicking a music result navigates to `/music` but doesn't auto-play or highlight the track.
2. **No debounce on search** -- Filtering on every keystroke across 50+ tracks and articles is fine for now but not scalable.

---

## Proposed Improvements

### 1. Quiz Fixes
- Initialize `selected` state as `Array(question.options.length).fill(false)` and reset it properly on next question.
- Add `aria-pressed` to option buttons.
- Add OG meta tags for sharing.
- Add a toast when "Share Result" copies to clipboard (vs. native share).

### 2. Bingo Fixes
- Add more squares (5-10 extra) so each card has genuine variety.
- Use text content as React key instead of index.
- Add a toast on clipboard copy for share feedback.
- Add a subtle pulse/pop animation on cell toggle using Tailwind.

### 3. Music Player Fixes
- Add `pb-24` bottom padding to the track grid when a track is playing, so the now-playing bar doesn't cover content.
- Add `onError` handler on the `<audio>` element to show a toast and skip to next track.
- Pre-shuffle the playlist into state so skip next/prev follows a consistent order instead of re-randomizing.
- Add `crossOrigin="anonymous"` to the audio element for the visualizer.
- Show elapsed time on mobile (move it outside the `hidden sm:` wrapper).

### 4. Global Search
- When clicking a music result, navigate to `/music?track={id}` and auto-play that track on the Music page.

---

## Technical Details

### Files to modify

| File | Changes |
|------|---------|
| `src/pages/RedFlagQuiz.tsx` | Fix `selected` init, add aria attributes, add OG meta, add clipboard toast |
| `src/pages/ScamBingo.tsx` | Add 5-10 new squares, use text as key, add share toast, add toggle animation |
| `src/pages/Music.tsx` | Add bottom padding when playing, add audio error handler, fix shuffle to use pre-shuffled queue, add crossOrigin, show time on mobile |
| `src/components/AudioVisualizer.tsx` | No changes needed -- the guard logic is sufficient |
| `src/components/GlobalSearch.tsx` | Update music results to link with `?track=` param |

### New squares for Bingo (examples)
- "Doxxing Threats"
- "Fake Volume Bots"
- "Roadmap Copy-Paste"
- "Whitelist Presale Scam"
- "Rug Pull Fork"
- "Missing LinkedIn Profiles"
- "VPN-Only Team Calls"
- "Token Tax 20%+"

### Shuffle queue approach for Music
Instead of calling `Math.random()` on each skip, store a `shuffledQueue` in state when shuffle mode is toggled on or when "Play All" is pressed. `skipNext`/`skipPrev` then follow that queue in order, wrapping around at the end.

