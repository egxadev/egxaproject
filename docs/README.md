# EGXA Project — Portfolio Landing Page

Personal portfolio landing page for egxaproject, built with Three.js/WebGL and GSAP.

## Tech Stack

| Layer | Tech |
|---|---|
| Build | Vite |
| 3D/WebGL | Three.js |
| Animation | GSAP + ScrollTrigger |
| Typography | Space Grotesk + Inter (Google Fonts) |
| Styling | Vanilla CSS |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
egxa-landing/
├── index.html                    # Main HTML (semantic, SEO-optimized)
├── vite.config.js
├── public/
│   ├── hero_bg.png              # Hero particle background image
│   ├── project_web.png          # Web project thumbnail
│   └── project_mobile.png       # Mobile project thumbnail
└── src/
    ├── main.js                  # App entry point & orchestrator
    ├── style.css                # Design system & global styles
    ├── scene/
    │   ├── ParticleSphere.js    # Hero WebGL particle sphere
    │   ├── ContactWaves.js      # Contact section wave shader
    │   └── shaders/
    │       ├── particle.vert    # Particle vertex shader
    │       └── particle.frag    # Particle fragment shader
    └── animations/
        ├── ScrollAnimations.js  # GSAP ScrollTrigger setup
        ├── MagneticButton.js    # Magnetic CTA button effect
        ├── Cursor.js            # Custom cursor
        └── TiltCards.js        # 3D tilt on service cards
```

## Sections

1. **Hero** — Full-viewport WebGL particle sphere (6000 particles, fibonacci distribution), mouse-reactive distortion, animated title entrance
2. **About** — Brand intro, counter animation (50+ projects, 30+ clients), 3D floating card
3. **Services** — Web Development, Mobile Apps, UI/UX Design, Tech Consulting — with 3D tilt + glow
4. **Work** — Drag-scroll project gallery with momentum physics
5. **Contact** — WebGL wave background, magnetic email button
6. **Footer** — Minimal

## Customization

### Colors (src/style.css)
```css
--primary: #8b5cf6;   /* Violet */
--accent: #06b6d4;    /* Cyan */
--bg: #050505;        /* Dark background */
```

### Personal Info (index.html)
- Email: Update `href="mailto:hello@egxaproject.com"`
- WhatsApp: Update `href="https://wa.me/62812345678"`
- Social links: GitHub, Instagram, LinkedIn

### Stats (index.html)
```html
<span class="stat-number" data-count="50">0</span>  <!-- Projects -->
<span class="stat-number" data-count="30">0</span>  <!-- Clients -->
<span class="stat-number" data-count="2">0</span>   <!-- Years -->
```

### Projects (index.html)
Replace project card content and thumbnail images in `public/` directory.

## Performance
- WebGL with `devicePixelRatio` capped at 2
- Mobile reduces particle count (3000 vs 6000)
- GSAP ScrollTrigger with `once: true` for entrance animations
- Lazy-loaded project images
