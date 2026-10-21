# Guardian Studios — logo & typography system

## What is included
Eight SVG files in `logos/`: stacked logo, horizontal logo, wordmark and emblem, each in black and white. Each has a transparent background and actual vector paths, with no installed font dependency.
The emblem uses the corrected full-resolution alpha trace. The wordmark is traced directly from the supplied black-and-white lettering reference. Both lines preserve its letter shapes, weight, relative widths, tracking and vertical gap. The reference is converted to filled vector contours with a maximum 0.6-pixel simplification tolerance; no font substitution or weight adjustment is applied.
The emblem retains the source outline and slight asymmetry. The lettering retains the supplied reference contours and is independent of the website fonts.

## Identity lettering
“GUARDIAN / STUDIOS” is fixed logo artwork. It is not Space Grotesk and is not an installable custom font. Use the supplied outlined SVG instead of retyping the brand name, changing tracking or rearranging letters. The full editable text families for other brand content are Space Grotesk and Inter, included here.
Preserve “Studios” in the approved logo. “Studio” in the latest request has been treated as a reference to the same existing brand, not as a rename.

## Font families
| Role | Family | Brand weights | Available files |
| --- | --- | --- | --- |
| Brand display, web heroes, headings | Space Grotesk | 500 Medium; 600 Semibold for smaller headings | Variable TTF + WOFF2, weight axis 300–700, upright |
| Paragraphs, navigation, buttons, forms, captions | Inter | 400 Regular; 500 Medium; 600 Semibold | Variable TTF + WOFF2, weight axis 100–900, upright + italic |
| Code excerpts only | System monospace | Regular | Uses the viewer’s platform; no third font download |

Use Space Grotesk for branded presentation titles, project names, packaging headlines and website headings. Use Inter for proposals, descriptions, legal content, case studies and interface controls. Reserve Inter italic for emphasis and citations. Space Grotesk has no supplied italic; do not synthesize one.

Desktop: install the three TTFs in `fonts/`. Web: self-host the three WOFF2 files and include `guardian-typography.css`. These contain full source font coverage, not a Latin-only web subset.
The Google Fonts desktop Inter build and upstream Inter web build are distributed separately; small metric or glyph differences may exist. Logo masters do not depend on either build.

## Responsive web scale
Values assume the user’s default root size of 16px. Preserve browser font settings and zoom.
| Role | Mobile → desktop | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- |
| Hero display | 44 → 88px | Space Grotesk 500 | 1.08 | −0.025em |
| H1 | 36 → 64px | Space Grotesk 500 | 1.12 | −0.02em |
| H2 | 30 → 44px | Space Grotesk 500 | 1.16 | −0.02em |
| H3 | 24 → 28px | Space Grotesk 500 | 1.25 | −0.01em |
| H4 | 20px | Space Grotesk 600 | 1.3 | normal |
| Lead | 18 → 20px | Inter 400 | 1.55 | normal |
| Body | 16px | Inter 400 | 1.65 | normal |
| UI / forms | 16px | Inter 500 | 1.4 | normal |
| Supporting text | 14px | Inter 400–500 | 1.55 | normal |
| Captions | 13px | Inter 500 | 1.5 | normal |
| Short uppercase labels | 14px | Inter 600 | 1.4 | +0.08em |

The CSS uses bounded fluid display sizes; body and interface text remain stable. H1–H4 are semantic levels; visual sizes can be assigned independently where the document structure requires it.

## Reading and composition
- Sentence case for headlines and normal copy. Uppercase is for the logo and short labels.
- Target 65ch for prose, 45–75ch where content and viewport permit. Hero support text is capped at 50ch.
- Use 1.25em between paragraphs. Let translated content wrap; avoid fixed-height text boxes.
- Use flat foreground colors for reading text. The metallic material is an artwork treatment.
- Use tabular numerals for aligned amounts, tables and changing counts. Keep ordinary paragraphs proportional.
- Normal text contrast: at least 4.5:1; large text: 3:1. The included dark theme uses #E8EFED primary text, #A5B6B1 secondary text and #7FC7B8 accents on #0B0F0E or #1A2423.
- Test accents and currency with real content: Diseño y desarrollo · Soluciones digitales · ¿Cómo empezamos? · $1,250.00 · ₡650.000 · €1.250,00.

## Logo usage
Keep the corrected silhouette and central opening intact. Never stretch, skew, close gaps, apply live text substitutions, or add strokes to fill small details.
Use black artwork on a clear light background and white artwork on dark backgrounds. Preview panel backgrounds are not part of the SVGs.
Clear space: at least 12% of the visible emblem width around each complete lockup. Recommended starting minimums: emblem 40 CSS px, horizontal lockup 240 CSS px wide, stacked lockup 180 CSS px wide. At smaller sizes use the emblem. Verify with the intended print process; the traced outline has fine source detail.
Keep the traced source shape’s original slight asymmetry; do not automatically mirror quadrants.

## Web delivery
Include the CSS as a normal stylesheet. No framework is required. Font paths assume the CSS sits beside `fonts/`.
Use `font-display: swap`; preload at most the single font needed for the first meaningful text above the fold. The optional Inter italic is not requested until italic content uses it. Avoid third-party font imports.
Fallbacks are Arial and system sans-serif. They are functional fallbacks, not metrically adjusted replicas, so some layout shift remains possible on first load. Test with font requests blocked and on narrow screens.
Use the logo SVG as an image with an appropriate accessible name. Decorative duplicates should have empty alternative text. Preserve browser zoom and never disable user scaling.

## License and sources
Space Grotesk by Florian Karsten Studio / The Space Grotesk Project Authors: https://github.com/floriankarsten/space-grotesk
Inter by Rasmus Andersson / The Inter Project Authors: https://github.com/rsms/inter
Desktop TTF distribution: https://github.com/google/fonts/tree/main/ofl/spacegrotesk and https://github.com/google/fonts/tree/main/ofl/inter
Both font families are distributed under the SIL Open Font License 1.1. Their source license and copyright notices are included in `fonts/`; retain them when redistributing the fonts. Consult those license files for the full terms.
Downloaded 2026-10-17. The reference-matched logo lettering remains an outlined brand asset, not a complete custom alphabet font.

## Files
- `brand-guide.html` — offline visual specimen and logo overview.
- `guardian-typography.css` — reusable font declarations, responsive type tokens and utility styles.
- `typography-guide.md` — this written specification.
- `logos/` — eight outlined SVG masters.
- `fonts/` — installable fonts, webfonts and licenses.
- `font-metadata.json` — measured axes and metadata from the packaged TTF files.

