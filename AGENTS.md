# Guardian Studios agent guide

Read README.md, PRODUCT.md, and DESIGN.md first. Preserve the supplied reference direction. Use the sibling web-app-orchestrator's Impeccable, UI/UX Pro Max and orchestrator-design workflows for UI work when available.

Keep mutable studio facts in src/config/site.ts. Never invent contact details, clients, team identities, or delivered-message claims. This is a static Vite React TypeScript site; add server functionality only for a real requirement.

Preserve semantic markup, keyboard behavior, visible focus, Spanish voice, and reduced motion. Keep content visible without animation and use existing motion tokens and section hooks. GSAP Core is the shared motion library: use the MotionProvider context and scoped hooks, preserve both persistent on/off switches, and let system reduced motion override all optional movement. Do not add another motion framework or create effects outside the provider's cleanup lifecycle.

Run npm run lint and npm run build, then inspect desktop and mobile for visual changes. Keep illustrative assets labeled until replaced.

Keep App.tsx focused on composition and shared state. Co-locate component SCSS with its TSX; centralize design tokens in src/styles/_variables.scss and register styles in src/styles/main.scss with @use. Preserve the explicit cascade order and avoid monolithic stylesheets.
