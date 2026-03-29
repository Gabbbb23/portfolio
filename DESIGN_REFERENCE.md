# Portfolio Design Reference — Gab

This document serves as the definitive design guide for Gab's portfolio redesign. Any AI agent or developer working on this project should read this file thoroughly before making design decisions.

---

## Design Vision

The portfolio is a **clean, minimal light theme** with **sky blue as the sole accent color** — no gradients anywhere. The layout remains inspired by SIRNIK's clean structure, while game-inspired elements from Persona 3 Reload and Zenless Zone Zero are retained as personality touches (ghost text, section numbering, bold condensed typography).

Think: **Linear or Vercel's design language meets game-UI typography.** Professional enough for recruiters, but with unmistakable personality in the details.

**Key Principles:**
- Light backgrounds, no gradients, no glows
- Sky blue (`#0EA5E9`) is the only accent color — used sparingly for links, buttons, and interactive states
- Game-inspired elements (ghost text, section numbers, Bebas Neue display type) are kept but adapted for light backgrounds
- Clean card shadows instead of colored glows
- High whitespace, strong vertical rhythm

---

## Color Palette

A flat, no-gradient palette. Sky blue is the only color accent.

### Primary Colors
- **White (Main Background):** `#FFFFFF` — The dominant background
- **Off-White (Alt Background):** `#F8FAFC` — Alternating section backgrounds for visual rhythm (slate-50)
- **Sky Blue (Primary Accent):** `#0EA5E9` — The sole accent color. Links, buttons, active indicators, interactive elements (sky-500)
- **Sky Blue Hover:** `#0284C7` — Slightly darker for hover states (sky-600)
- **Sky Blue Light:** `#E0F2FE` — Very light sky blue for tags, badges, subtle fills (sky-100)

### Text Colors
- **Heading Text:** `#0F172A` — Near-black for maximum readability (slate-900)
- **Body Text:** `#334155` — Dark gray for paragraphs and descriptions (slate-700)
- **Secondary Text:** `#64748B` — Medium gray for metadata, labels, dates (slate-500)
- **Muted Text:** `#94A3B8` — Light gray for placeholders and tertiary info (slate-400)

### Structural Colors
- **Ghost Text:** `#F1F5F9` — Barely visible on white backgrounds, for oversized background text (slate-100)
- **Borders:** `#E2E8F0` — Thin borders for cards and dividers (slate-200)
- **Card Background:** `#FFFFFF` — White cards on off-white sections, or off-white cards on white sections
- **Card Shadow:** `0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)` — Subtle, flat shadows
- **Card Hover Shadow:** `0 4px 12px rgba(0, 0, 0, 0.1)` — Slightly elevated on hover

### What NOT to Use
- NO gradients anywhere (no background gradients, no button gradients, no text gradients)
- NO colored glows or box-shadow colors (no cyan glow, no sky blue shadows)
- NO neon green, electric cyan, or any secondary accent colors
- NO dark backgrounds except possibly the footer (optional)

---

## Typography

Same font stack as before — the game-inspired type treatments are a core personality element.

### Font Stack (Unchanged)
- **Headings:** Space Grotesk — Geometric, modern, techy
- **Body:** Inter — Clean and readable
- **Display/Ghost:** Bebas Neue — Tall condensed for oversized decorative text (section numbers, ghost words)
- **Mono/UI:** Space Mono — For navigation labels, tags, metadata

### Type Treatments (Adapted for Light Theme)
- **Oversized Ghost Text:** Still present, but now in `#F1F5F9` (slate-100) — barely visible watermark-like text on white backgrounds. Keeps the P3R "CONFIG"/"STATUS" energy without fighting the light aesthetic
- **Section Numbers:** Large "01", "02", "03" in Bebas Neue, colored in `#F1F5F9` as background decoration, or in `#0EA5E9` (sky blue) as small inline labels
- **Section Labels:** The small "ABOUT ME", "TECH STACK", "FEATURED WORK" labels should be in `font-mono` (Space Mono), uppercase, `text-sky-500`, letter-spaced
- **Typing Effect:** Keep the typewriter on the hero. Cursor color: sky blue

---

## Layout & Structure

### Overall Layout Philosophy
- **Clean, full-width sections** with generous whitespace and strong vertical rhythm
- **Light mode throughout** — white and off-white backgrounds only
- **Alternating section backgrounds:** Sections alternate between `#FFFFFF` and `#F8FAFC` to create visual separation without divider lines
- **Keep asymmetric layout touches** — staggered content, offset elements for visual interest

### Section-by-Section Design Notes

#### Navbar
- **White background** with a thin `border-bottom: 1px solid #E2E8F0` — no glassmorphism
- On scroll: add a subtle `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06)` to indicate elevation
- Logo "Gab." with the dot in sky blue (`#0EA5E9`)
- Nav links in `#64748B` (slate-500) with hover color `#0EA5E9` (sky blue)
- Sliding underline on hover: a thin sky blue line slides in from the left
- Active section indicator: sky blue underline on the current section's nav link
- Resume button: sky blue border pill, `text-sky-500`, on hover fills to `bg-sky-500 text-white`

#### Hero Section
- **White background** (no gradient)
- **Subtle dot-grid pattern** in the background using CSS: tiny dots in `#E2E8F0` on a repeating grid (~24px spacing). Gives the hero visual texture without color — inspired by Linear/Vercel's landing pages
- Name "Gab" in massive, bold near-black (`#0F172A`) text
- Floating geometric shapes: **thin-stroked outlines** in `#E2E8F0` (light gray), no fill, no glow. Circles, triangles, diamonds — subtle decorative elements that float gently
- Ghost "01" in Bebas Neue, `#F1F5F9`, positioned behind the name
- CTA buttons: Primary — `bg-sky-500 text-white` (flat, no gradient). Secondary — `border border-slate-300 text-slate-700`, on hover `border-sky-500 text-sky-500`
- Scroll indicator: thin line in `#E2E8F0` with a small sky blue dot pulsing at the bottom

#### About Section (bg: `#F8FAFC`)
- Ghost "ABOUT" text in `#F1F5F9` behind the content
- Heading in near-black, body in `#334155`
- Stat cards: white background, `border border-slate-200`, subtle shadow. Numbers in sky blue (`#0EA5E9`), labels in `#64748B`
- On hover: cards lift slightly (translateY -2px) and shadow deepens

#### Skills Section (bg: `#FFFFFF`)
- Ghost "03" in background
- Skill cards: white bg with `border border-slate-200` and subtle shadow
- Category headers in Bebas Neue, `#0F172A`
- **Icon tint on hover:** When hovering a skill card, the icon shifts to sky blue (use CSS filter or SVG fill). Card also gets a `border-left: 3px solid #0EA5E9` that slides in
- Tags/badges: `bg-sky-100 text-sky-600` pill badges for proficiency if needed

#### Projects Section (bg: `#F8FAFC`)
- Ghost "04" in background
- Project cards: white bg, border, subtle shadow
- Image/preview area: `bg-slate-100` placeholder
- Project numbers ("01", "02") in Bebas Neue, `#E2E8F0` or small sky blue label
- Tech tags: `bg-sky-100 text-sky-700` pill badges
- **Card hover: sky blue left-border reveal** — on hover, a 3px `border-left` in sky blue slides in from the top, card lifts slightly, shadow deepens
- Keep the horizontal scroll mechanism with GSAP ScrollTrigger
- "Live Demo" and "GitHub" links in sky blue

#### Experience Section (bg: `#FFFFFF`)
- Ghost "05" in background
- **Timeline line:** thin vertical line in `#E2E8F0` (light gray)
- **Timeline dots:** solid sky blue filled circles (`bg-sky-500`), with a subtle `ring-4 ring-sky-100` to make them pop on white
- Cards: white bg, border, shadow. Slide in from alternating sides
- Type badges: `bg-sky-100 text-sky-600 rounded-full px-3 py-1 font-mono text-xs`
- Dates/periods in Space Mono, `#64748B`
- Company/school names in sky blue

#### Contact Section (bg: `#F8FAFC`)
- Ghost "06" in background
- Large heading "Let's Connect" in near-black
- Social icon buttons: `border border-slate-200` circles on white bg. On hover: `bg-sky-500 text-white border-sky-500` — a clean fill transition
- Description text in `#64748B`

#### Footer (bg: `#FFFFFF` or optionally `#0F172A` for contrast)
- If light: thin `border-top: 1px solid #E2E8F0` separator
- If dark (optional): near-black bg with white text for a grounding contrast at the page bottom
- Back-to-top button: `border border-slate-300` circle, hover `border-sky-500 text-sky-500`
- Nav links in `#64748B`, hover `#0EA5E9`
- Copyright in `#94A3B8`

---

## New Design Elements

### 1. Dot-Grid Background (Hero)
A CSS-based repeating dot pattern. No images needed:
```css
background-image: radial-gradient(circle, #E2E8F0 1px, transparent 1px);
background-size: 24px 24px;
```
Apply to the hero section only. Creates a subtle grid texture that feels techy and modern.

### 2. Outlined Floating Shapes
Replace the current filled/glowing shapes with thin-stroked outlines:
- Circles: `border: 1px solid #E2E8F0`, no fill
- Triangles/Diamonds: SVG paths with `stroke: #E2E8F0`, `fill: none`, `stroke-width: 1`
- Keep the gentle floating animation (GSAP)
- These should be barely-there decorative elements — visible but not attention-grabbing

### 3. Card Hover: Left-Border Reveal
Instead of glow effects, cards get a clean left-border accent on hover:
```css
.card {
  border-left: 3px solid transparent;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}
.card:hover {
  border-left-color: #0EA5E9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### 4. Alternating Section Backgrounds
Sections alternate between `#FFFFFF` and `#F8FAFC`:
- Hero: `#FFFFFF` (with dot-grid)
- About: `#F8FAFC`
- Skills: `#FFFFFF`
- Projects: `#F8FAFC`
- Experience: `#FFFFFF`
- Contact: `#F8FAFC`
No divider lines needed — the subtle color shift creates natural separation.

### 5. Skill Card Icon Tint on Hover
When a skill card is hovered, the icon transitions to sky blue:
- For emoji/image icons: apply `filter: brightness(0) saturate(100%) invert(56%) sepia(59%) saturate(4834%) hue-rotate(176deg) brightness(97%) contrast(93%);` on hover
- For SVG icons: change `fill` or `stroke` to `#0EA5E9`
- Pair this with the left-border reveal for a cohesive hover state

### 6. Timeline Dots (Sky Blue Filled)
Timeline nodes become solid sky blue with a soft ring:
```css
.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #0EA5E9;
  box-shadow: 0 0 0 4px #E0F2FE;
}
```

---

## Animation & Motion Design

### Philosophy (Updated for Light Theme)
Animations should feel **crisp, clean, and precise** — like navigating a well-designed productivity app. Smooth but not flashy. No glowing or pulsing effects.

### Key Animation Patterns (Keep)
- Scroll-triggered reveals with GSAP ScrollTrigger (fade up + slide in)
- Staggered entrances for card groups
- Parallax on ghost text and floating shapes
- Magnetic button hover (keep current)
- Typewriter effect on hero
- Lenis smooth scroll

### Updated Hover Interactions
- Cards: translateY(-2px) + shadow deepen + sky blue left border (no glow)
- Buttons: clean color fill transitions (no glow, no shadow color)
- Nav links: sky blue sliding underline from left
- Social icons: border circle fills to sky blue bg on hover
- Skill icons: color tint to sky blue on hover

### Transition Timing (Keep)
- `power3.out` for entrances
- `ease: "none"` for scroll-linked
- Duration: 0.6-1.0s, stagger: 0.05-0.15s

---

## Technical Constraints & Existing Stack

### Current Stack (Keep)
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP + ScrollTrigger
- Lenis (smooth scroll)
- Framer Motion
- Sanity CMS

### Performance Guidelines (Keep)
- 90+ Lighthouse Performance
- Lazy-load images and heavy animations
- Prefer CSS transitions for hover states, GSAP for scroll-driven
- Keep JS bundle lean

---

## Summary: Design Identity

| Aspect | Approach |
|--------|----------|
| Theme | Light — white and off-white backgrounds only |
| Accent | Sky blue (`#0EA5E9`) — the only color accent, used sparingly |
| Gradients | None — completely flat color fills |
| Typography | Game-inspired — Space Grotesk headings, Bebas Neue ghost/display, Space Mono UI |
| Ghost Text | Kept — adapted to very light gray (`#F1F5F9`) on white backgrounds |
| Cards | White with borders and subtle shadows, sky blue left-border on hover |
| Hero Texture | CSS dot-grid pattern for subtle depth |
| Floating Shapes | Thin outlined strokes in light gray, no fill |
| Animations | Clean and precise — scroll reveals, stagger, parallax. No glows or pulses |
