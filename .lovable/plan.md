

## Set Uploaded Photo as Default OG Image for All Pages

### What Changes
1. **Copy the uploaded image** to `public/og-adam-howell.png`, replacing the current OG image file
2. **Update `index.html`** — the existing `og:image` and `twitter:image` meta tags already point to `/og-adam-howell.png`, so they will automatically pick up the new image with no code change needed
3. **Update `Music.tsx`** — change the `og:image` and `twitter:image` meta tags from the music-specific OG image to use the same photo (`https://web-rescu.lovable.app/og-adam-howell.png`) so all pages share one consistent OG image

### Result
- Every page will show the uploaded headshot photo when shared on social media (Facebook, Twitter/X, LinkedIn, etc.)
- The `/music` page previously had its own OG image — it will now use this photo too

### Technical Details
- Copy `user-uploads://ALV-UjX1...` to `public/og-adam-howell.png` (overwrites existing)
- Edit `src/pages/Music.tsx` lines 104 and 110: change image URL from `og-music.png` to `og-adam-howell.png`
- No changes needed to `index.html` since it already references `/og-adam-howell.png`
