# CHANGELOG

## 2026-04-10 — Initial build: EGXA Project Portfolio Landing Page

### Added
- Project scaffolded with **Vite** (vanilla JS, no framework)
- Installed dependencies: `three@^0.183.2`, `gsap@^3.14.2`

### Files Created

#### Core
- `index.html` — Full semantic HTML with all sections, SEO meta tags, OG tags, Google Fonts (Space Grotesk + Inter)
- `vite.config.js` — Vite config with raw asset support for `.vert`/`.frag` shader files
- `src/style.css` — Full design system with CSS custom properties, all section styles, animations

#### Three.js / WebGL
- `src/scene/ParticleSphere.js` — 6000-particle sphere using fibonacci distribution, mouse reactive, morphing on scroll, additive blending glow
- `src/scene/ContactWaves.js` — Fragment shader wave background for contact section
- `src/scene/shaders/particle.vert` — Vertex shader: sphere morph, mouse distortion, wave animation
- `src/scene/shaders/particle.frag` — Fragment shader: circular particles with soft glow and bright core

#### Animations
- `src/animations/ScrollAnimations.js` — GSAP ScrollTrigger for section reveals, stat counters, navbar scroll state, drag momentum scroll
- `src/animations/MagneticButton.js` — Magnetic button effect with eased lerp and spring return
- `src/animations/Cursor.js` — Custom cursor with lagging ring and hover states
- `src/animations/TiltCards.js` — 3D CSS perspective tilt for service cards

#### Entry
- `src/main.js` — Orchestrator: loader animation, Three.js init, hero entrance, all animations

#### Assets (public/)
- `hero_bg.png` — AI-generated particle sphere art
- `project_web.png` — AI-generated web development project thumbnail
- `project_mobile.png` — AI-generated mobile app project thumbnail

### Sections
1. **Hero** — Full-viewport WebGL particle sphere, animated title entrance, magnetic CTA buttons
2. **About** — EGXA Project intro, animated stat counters, 3D floating card
3. **Services** — 4 service cards (Web, Mobile, UI/UX, Consulting) with 3D tilt and glow effects
4. **Work** — Horizontal drag-scroll project gallery with momentum physics
5. **Contact** — WebGL wave background, magnetic email button, social links
6. **Footer** — Minimal with copyright

### Design
- Dark theme: near-black `#050505` background
- Gradient system: violet `#8b5cf6` → cyan `#06b6d4`
- Typography: Space Grotesk (headings) + Inter (body)
- Custom cursor with lagging ring follower
- Loading screen with animated progress bar
- Grain noise texture overlay
- Full mobile responsive with hamburger menu
