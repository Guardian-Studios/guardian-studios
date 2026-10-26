# Guardian Studios

Static, Spanish-language studio homepage built with Vite, React and TypeScript. The supplied reference is preserved in `docs/reference/homepage.png`.

## Development

Requires Node 24 LTS and npm.

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

Deploy the generated `dist/` directory to any static host. No server runtime or environment secrets are required. Source repository: [Guardian-Studios/guardian-studios](https://github.com/Guardian-Studios/guardian-studios) (private). Hosting has not been configured.

## Project structure

- `src/App.tsx`: page composition and shared service-selection state.
- `src/components/<Name>/<Name>.tsx`: one section or reusable UI component per folder.
- `src/components/<Name>/<Name>.scss`: styles and responsive rules owned by that component. Small presentational children share their section's styles; ActionLink shares Button styles.
- `src/styles/_variables.scss`: colors, typography tokens, motion, content width, and Sass breakpoints.
- `src/styles/_mixins.scss`: shared responsive helpers.
- `src/styles/_typography.scss`: self-hosted font declarations and heading/body roles.
- `src/styles/_base.scss`: browser defaults, accessibility, and shared utilities.
- `src/styles/_layout.scss`: shared page containers and section dividers. HeroSection owns its header composition, artwork, gradient, and responsive background rules.
- `src/styles/main.scss`: the single stylesheet entry, loaded by `main.tsx`; uses Sass `@use` in explicit order.
- `src/config/site.ts`: business details, navigation, services, team, work and process content.
- `PRODUCT.md` and `DESIGN.md`: durable product facts and visual direction.
- `public/images/`: supplied artwork and provisional crops.

### Editing components and styles

Edit a section's JSX and its adjacent SCSS together. Keep global rules in `styles/`, not section files. Add new component styles to `main.scss` so imports and cascade order stay predictable. Import `variables` and `mixins` with Sass `@use` for breakpoint helpers; use `var(--color-accent)` and the other CSS tokens for themed values. Sass is compiled by Vite during development and builds.

`HeroSection` and `MvpSection` receive `onServiceChange`; `ContactSection` receives the selected service. Navigation, buttons, brand artwork, project/team cards, and the inquiry summary are separate reusable components. Keep this state in App rather than duplicating it between sections.

Section IDs and `data-motion` attributes are stable animation targets. Add motion by section, preserve server-independent content, and respect reduced motion. No animation library is installed yet.

## Before launch

1. Confirm business copy, real team, and publishable case studies. Current portraits/projects are explicitly illustrative.
2. Replace the cropped portal, portraits, and project images with original high-resolution assets. See `docs/ASSETS.md`.
3. Set a verified contact email in `src/config/site.ts`, or integrate a form service. The current form validates locally and downloads an inquiry; it does not send messages. Setting the email enables a mail-client handoff, not server delivery.
4. Confirm domain and hosting, add canonical/social metadata, and remove the staging `noindex` in `index.html` when ready.
5. Check production performance after adding animation.

No fabricated contact info, analytics, tracking or credentials are included. CI runs lint and the production build on pull requests and pushes to main.

## Selected homepage composition (2026-10-26)

Hero: original C portal explorer, reconstructed from saved rendered markup/styles.
Team and Process: new C featured discipline selector and interactive timeline.
Work/Ideas: original B staggered editorial project layout, reconstructed from saved styles.
MVP: main component and styles preserved verbatim.
Contact/form: original A layout reconstructed from saved markup/styles; inquiry preparation/download restored with stale-output invalidation on service or input changes.

All sections keep their own named folders and adjacent SCSS. `Arrow` is the shared decorative SVG; `site.servicePrompts` owns the service-specific introductory questions. App retains shared service state. No new dependencies. The form saves locally and does not send messages.
