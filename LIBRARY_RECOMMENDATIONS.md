# Library & Tooling Recommendations

This document outlines the recommended libraries and tools for building Gab's game-inspired portfolio. Read alongside `DESIGN_REFERENCE.md` for full context.

---

## Current Stack (Keep As-Is)

| Library | Version | Purpose | Bundle Size |
|---------|---------|---------|-------------|
| Next.js | 16.2.1 | Framework (App Router) | — |
| React | 19.2.4 | UI Library | — |
| TypeScript | ^5 | Type safety | — |
| Tailwind CSS | 4 | Utility-first styling | — |
| GSAP | ^3.14.2 | Core animation engine | ~23 KB gzipped |
| Lenis | ^1.3.19 | Smooth scroll | ~10 KB gzipped |
| Framer Motion | ^12.38.0 | React component animations | ~32 KB gzipped |
| Sanity | ^7.20.0 | Headless CMS for content | — |

**Note on GSAP:** As of late 2024, Webflow acquired GreenSock and made GSAP 100% free for all use, including commercial. All formerly members-only plugins (SplitText, MorphSVG, etc.) are now free. Use without licensing concerns.

---

## Recommended Additions

### 1. GSAP SplitText Plugin (FREE — formerly paid)
- **Purpose:** Split text into characters/words/lines for P3R-style text reveal animations
- **Why:** Now free with GSAP; native integration with ScrollTrigger; supports masking/reveal effects perfect for the ghost-text and section heading animations
- **Install:** Already included with GSAP — just import it
- **Priority:** HIGH — enables the core typographic animation style

### 2. Font Additions: Space Grotesk + Space Mono + Bebas Neue
- **Purpose:** Game-inspired typography stack
- **Space Grotesk** — Geometric, modern, sci-fi feel for headings. Currently trending heavily in tech/game UI design
- **Space Mono** — Monospace variant for UI elements, nav labels, code blocks. Gives a technical "game terminal" feel
- **Bebas Neue** — Tall condensed font for oversized ghost text and section numbers (like P3R's "CONFIG", "RESULT")
- **Install:** Via `next/font/google` (zero layout shift, self-hosted)
- **Bundle impact:** Minimal — Next.js handles font optimization automatically
- **Priority:** HIGH — immediate visual impact with zero performance cost

### 3. @yhattav/react-component-cursor
- **Purpose:** Custom cursor with smooth animations for game-UI feel
- **Why:** TypeScript-first, zero dependencies, SSR support (Next.js compatible), smooth physics-based movement
- **Bundle size:** ~5 KB gzipped
- **Install:** `npm install @yhattav/react-component-cursor`
- **Priority:** MEDIUM — high polish factor, low effort

### 4. tsParticles (React integration)
- **Purpose:** Subtle particle/noise backgrounds for the hero and contact sections
- **Why:** Highly configurable, performant, supports custom shapes and presets. The TypeScript evolution of Particles.js
- **Bundle size:** ~15 KB gzipped (configurable — import only needed presets)
- **Install:** `npm install @tsparticles/react @tsparticles/slim`
- **Usage note:** Lazy-load the particles component since it's only needed for background effects. Use the "slim" bundle to minimize size
- **Priority:** LOW-MEDIUM — nice visual enhancement but not core to the design

---

## Libraries Evaluated But NOT Recommended

| Library | Why Not |
|---------|---------|
| **Motion (Motion One)** | While performant, GSAP already covers scroll animations better for our complex needs. Adding another animation library would increase bundle without clear benefit |
| **Three.js / React Three Fiber** | Overkill for this project. The 3D engine adds ~140 KB+ and we don't need 3D rendering. tsParticles covers particle effects at a fraction of the size |
| **shadcn/ui** | Good library but we're building fully custom components for the game aesthetic. Adding a component library would fight against our custom design more than help |
| **Particles.js** | Deprecated — use tsParticles instead (same creator, actively maintained, TypeScript support) |
| **FluidGPU.js** | Experimental, WebGPU not universally supported yet. Revisit when browser support improves |

---

## Font Configuration Guide

```tsx
// In layout.tsx — replace current Inter-only setup
import { Inter, Space_Grotesk, Space_Mono, Bebas_Neue } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
```

### Usage in Tailwind
```css
/* In globals.css */
@theme inline {
  --font-heading: var(--font-space-grotesk);
  --font-display: var(--font-bebas);
  --font-mono: var(--font-space-mono);
  --font-body: var(--font-inter);
}
```

### Where Each Font Is Used
- **Space Grotesk:** Section headings (h1, h2, h3), CTA buttons, navbar logo
- **Bebas Neue:** Oversized ghost text ("01", "ABOUT", "PROJECTS"), decorative section numbers
- **Space Mono:** Navigation labels, tags/badges, metadata (dates, periods), code-like elements
- **Inter:** Body text, descriptions, paragraphs — keeps readability high

---

## Animation Strategy

### Division of Labor: GSAP vs Framer Motion

**Use GSAP for:**
- Scroll-triggered section reveals (ScrollTrigger)
- Text splitting and character-by-character animations (SplitText)
- Timeline-based entrance sequences (hero load animation)
- Parallax effects (background layers moving at different speeds)
- Horizontal scroll pinning (projects section)
- Counter/number animations

**Use Framer Motion for:**
- Component mount/unmount transitions (AnimatePresence)
- Layout animations (when elements reposition)
- Gesture-based interactions (drag, tap)
- Simple hover state animations where Tailwind transitions aren't enough
- Mobile menu open/close animation

**Use Tailwind CSS transitions for:**
- Simple hover color changes
- Border/shadow transitions
- Opacity transitions on interaction
- Transform: scale on hover

This split minimizes conflicts between animation libraries and keeps each tool focused on what it does best.

---

## Performance Budget

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| First Contentful Paint | < 1.5s |
| Total Blocking Time | < 200ms |
| Cumulative Layout Shift | < 0.1 |
| JS Bundle (gzipped) | < 120 KB total |

### Optimization Techniques
- Lazy-load tsParticles (below hero fold or after initial load)
- Use `next/font` for all fonts (self-hosted, no external requests)
- Use GSAP's `gsap.context()` for proper cleanup in React effects
- Debounce resize handlers for responsive animations
- Use `will-change: transform` only on actively animating elements, remove after animation completes
- Prefer `transform` and `opacity` for all animations (GPU-composited, no layout thrashing)
- Use Lenis' `requestAnimationFrame` integration for frame-locked GSAP updates

---

## Install Commands

```bash
# Fonts are handled by next/font/google — no install needed

# Custom cursor
npm install @yhattav/react-component-cursor

# Particles (optional — install only if using particle backgrounds)
npm install @tsparticles/react @tsparticles/slim
```

GSAP SplitText is already included with your GSAP installation — just import it:
```ts
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);
```
