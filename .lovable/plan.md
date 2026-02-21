

# UX Improvements Plan

## 1. Reading Progress Bar on Articles
Add a thin progress bar at the top of the page that fills as users scroll through long articles. This gives readers a sense of how far they've read -- especially useful for the 20-35 minute articles.

- A thin animated bar fixed to the top of the viewport (below the sticky header)
- Applies on all article pages (ArticlePage component and Index page)

## 2. Estimated Read Progress + "Jump to Section" (Table of Contents)
Add a collapsible table of contents sidebar/dropdown for long articles like the homepage and the SuperDoge report, letting readers jump to specific sections instead of scrolling endlessly.

- A sticky floating "Contents" button on article pages
- Clicking it shows a dropdown of h2/h3 headings with smooth-scroll links
- Auto-highlights the current section as you scroll

## 3. Share Buttons on Articles
Add social sharing buttons (Twitter/X, Facebook, copy link) to every article page. Investigative content like this benefits from viral sharing.

- Positioned at the top of articles near the date/read-time metadata
- "Copy link" button with a toast confirmation
- Twitter/X share with pre-filled text
- Facebook share link

## 4. Smooth Page Transitions
Add fade-in animations when navigating between pages to make the site feel more polished instead of hard-cutting between routes.

- A simple CSS fade-in animation on the main content area
- Applied via the Layout component so it works globally

## 5. Image Lightbox on Evidence Photos
Currently clicking evidence images does nothing. Add a lightbox overlay so users can view photos full-screen with zoom -- critical for reading screenshots and documents.

- Click any article image to open a full-screen overlay
- Close with X button, Escape key, or clicking the backdrop
- Simple zoom-in animation

## 6. "Back to Top" Progress Indicator
Enhance the existing back-to-top button with a circular progress ring showing how far down the page the user is.

- Replace the plain circle button with an SVG ring that fills as you scroll
- The arrow icon stays in the center

---

## Technical Details

### Files to create:
- `src/components/ReadingProgressBar.tsx` -- scroll-driven progress bar
- `src/components/TableOfContents.tsx` -- floating TOC with scroll-spy
- `src/components/ShareButtons.tsx` -- social sharing component
- `src/components/ImageLightbox.tsx` -- full-screen image viewer

### Files to modify:
- `src/components/Layout.tsx` -- add ReadingProgressBar, page transition animation
- `src/components/ArticlePage.tsx` -- add ShareButtons, TableOfContents, ImageLightbox
- `src/pages/Index.tsx` -- add ReadingProgressBar, ShareButtons for the homepage article
- `src/index.css` -- add fade-in keyframe animation

### No database or backend changes required.
