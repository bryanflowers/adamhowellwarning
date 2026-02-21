

# Create Favicon Matching Header Logo

## Current State
The header uses a Lucide `Shield` icon in the primary color (an orange tone, `hsl(15, 90%, 55%)`). The current favicon is the default `public/favicon.ico`.

## Plan

### 1. Create an SVG favicon (`public/favicon.svg`)
Create an SVG file using the same Shield shape from Lucide icons, filled with the primary orange color (`hsl(15, 90%, 55%)` which is approximately `#F26522`). SVG favicons are supported by all modern browsers and will look crisp at any size.

### 2. Update `index.html`
Add a `<link rel="icon">` tag pointing to the new SVG favicon:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

## Technical Details
- The Lucide Shield icon SVG path will be used to create a standalone SVG file
- The shield will be orange (`#F26522`) on a transparent background
- The existing `favicon.ico` will be kept as a fallback for older browsers
- No dependencies or packages needed

