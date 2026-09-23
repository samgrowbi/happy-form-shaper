# Landing page visual updates

## Scope
- Replace the first six facial result cards with the six supplied photos, preserving card order, names, ages, controls, and styling.
- Keep body-specific result photos unchanged while applying the new facial photos across all facial landing pages.
- Remove Sofia from the site and remove the Google Maps, Yelp, and Trustpilot logo row without affecting booking or tracking.
- Compact the "Who Is This For?" section below 768px only, including the body-page version.
- Compact the five treatment stat cards at every screen size, preserving one desktop row and using a two-column mobile grid with a centered final card.

## Verification
- Confirm every landing page renders without Sofia or review-platform badges.
- Check 1440px, 768px, and 375px views for overlaps, wrapping, spacing gaps, and card sizing.
- Confirm the Meta Pixel script still loads and queues the page-view event.
- Confirm the current build and browser console remain error-free.

## Technical details
- Use managed local asset pointers for the six supplied photos rather than external hotlinks.
- Add lazy loading, asynchronous decoding, and result-specific alt text to the shared result image rendering.
- Remove only unused facial result imports/files after checking all references; leave treatment-specific body assets intact.
- Remove the Sofia mount and related client component code, while leaving unrelated booking and tracking integrations unchanged.
