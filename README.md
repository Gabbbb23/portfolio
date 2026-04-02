# Gab's Portfolio
#### Video Demo: https://youtu.be/9LZyikirKa4
#### Description:

Gab's Portfolio is a single-page personal portfolio website built to showcase my work, skills, and experience as a software engineering student. Rather than building a plain resume site, I wanted something that felt like a personal brand — minimal, animated, and intentional. The site is heavily inspired by award-winning portfolios on Awwwards, with a focus on smooth scroll-driven animations, a clean sky-blue accent color, and a design language that balances professionalism with personality. The entire site is built with Next.js (App Router), React, TypeScript, Tailwind CSS, and GSAP for animations, and is deployed on Vercel.

The site is structured as a single scrollable page with six main sections: Hero, About, Skills, Projects, Experience, and Contact. Each section has its own scroll-triggered entrance animations, background textures, and ghost typography layered behind the content for visual depth. On desktop, several sections use GSAP's ScrollTrigger pinning to create immersive scroll experiences — the Hero pins in place and fades as you scroll past it, the Skills section scrolls horizontally through three category panels, and the Projects section stacks cards on top of each other in a pinned container.

#### File Structure and What Each File Does

**`src/app/page.tsx`** is the main entry point. It composes all sections and global UI components (smooth scroll provider, floating logo, navigation, custom cursor) into a single page layout. This is a client component because GSAP animations require browser APIs.

**`src/app/layout.tsx`** is the root layout that loads four Google Fonts (Inter, Space Grotesk, Space Mono, Bebas Neue) as CSS variables and defines the site's metadata for SEO and Open Graph sharing. I chose this combination because Inter handles body text well, Space Grotesk works for headings, Space Mono gives the UI a technical feel for labels and tags, and Bebas Neue is used for the large ghost text behind each section.

**`src/app/globals.css`** contains Tailwind CSS imports and custom utility classes like the CRT scanline overlay, halftone dot patterns, terminal cursor blink animation, and marquee keyframes used throughout the site for visual texture.

**`src/app/icon.tsx`** dynamically generates the browser favicon as a `<G/>` monogram using Next.js ImageResponse, so there is no static favicon file — it renders the same logo mark used in the floating header.

**`src/components/sections/Hero.tsx`** is the landing section visitors see first. It features a choreographed GSAP timeline that staggers in the label, name letters (with 3D rotation), typing subtitle, and CTA button in sequence. The name "Gab" has a randomized glitch effect using two color-shifted overlay layers (blue and red) with clip-path slicing. A decorative code editor window on the right side reinforces the developer identity. The typing effect cycles through titles like "Software Engineer," "Full-Stack Developer," "Problem Solver," and "Product Developer."

**`src/components/sections/About.tsx`** presents a brief bio with scroll-linked line-by-line text reveal — as you scroll, each paragraph fades from dim to full opacity. It includes stat cards with animated count-up numbers and 3D tilt-on-hover using the `useCountUp` and `useTilt` hooks. I debated whether to include joke stats like "999 Tabs Open" alongside real ones, but decided the humor makes the section more memorable and authentic.

**`src/components/sections/Skills.tsx`** organizes skills into three categories (Frontend, Backend, Tools) displayed as horizontal-scroll panels on desktop. Each skill card shows signal-strength bars that animate in with a stepped ease as the panel scrolls into view. On mobile, the layout collapses to a vertical stack with staggered fade-in animations instead. I chose horizontal scroll here because it gives each category its own full-screen moment without making the page extremely long.

**`src/components/sections/Projects.tsx`** showcases featured work using a stacked-card scroll animation on desktop — each project card slides up and covers the previous one as you scroll, with a subtle glitch line flashing during the transition. On mobile, cards simply fade in sequentially. Project data is currently hardcoded with one completed project (App Inventor Studio) and placeholder cards for upcoming work. The section was originally designed to pull from Sanity CMS, and the query infrastructure still exists in `src/lib/sanity.ts`.

**`src/components/sections/Experience.tsx`** displays work experience and education in a timeline layout with a vertical line that draws downward as you scroll. Cards stagger in from below, and timeline dots pop in with an elastic ease. Work and education are separated into distinct sub-sections with different accent colors (sky blue for work, amber for education).

**`src/components/sections/Contact.tsx`** is the closing section with social links (GitHub, LinkedIn, Email), a scroll-linked quote reveal, an "Available for opportunities" status indicator, and a decorative terminal card on the right side that mimics a `whoami` command. Social buttons use the magnetic hover effect and have a color-fill animation on hover.

**`src/components/sections/Footer.tsx`** provides a back-to-top button, section navigation links, social icons, and a tech stack display. The back-to-top button uses the magnetic hover effect.

**`src/lib/animations.ts`** is a shared animation hooks library containing seven reusable React hooks: `useScrollFadeUp` (fade-up on scroll), `useStaggerReveal` (stagger children), `useTextReveal` (clip-path text reveal), `useCountUp` (animated number counter), `useParallax` (scroll parallax), `useMagnetic` (cursor-following magnetic button effect), and `useTilt` (3D perspective tilt on hover). Every animation in the site is built on GSAP and ScrollTrigger. I chose GSAP over pure CSS animations because the scroll-linked timing, pinning, and horizontal scroll features required a level of control that CSS alone could not provide.

**`src/lib/sanity.ts`** and **`src/lib/sanity-schemas.ts`** contain the Sanity CMS client configuration and schema definitions for "project" and "experience" document types. The Sanity integration allows managing portfolio content (projects, experience entries) through a headless CMS without touching code. GROQ queries are pre-defined for fetching projects and experiences sorted by display order.

**`src/components/CustomCursor.tsx`** replaces the default cursor on desktop with a GSAP-animated circular cursor that smoothly follows the mouse and expands when hovering over interactive elements. It detects touch devices and disables itself on mobile.

**`src/components/SideNav.tsx`** is a desktop-only dot navigation fixed to the right edge of the viewport. It tracks which section occupies the center of the viewport (including GSAP pin-spacers) and highlights the corresponding dot, providing quick section navigation.

**`src/components/MobileNav.tsx`** is a hamburger menu for mobile that opens a full-screen overlay with section links. The hamburger icon animates into an X when toggled.

**`src/components/FloatingLogo.tsx`** renders the `<G/>` logo fixed in the top-left corner. It gains a pill-shaped background with backdrop blur after scrolling past 100px, ensuring visibility over any section background.

**`src/components/BackgroundNoise.tsx`** generates procedural background texture using seeded randomness — circles, crosses, diamonds, dot-grids, and code fragments are scattered across each section and drift slowly using CSS keyframe animations. The seed ensures each section gets a unique but deterministic pattern. This component is desktop-only to keep mobile performance smooth.

**`src/components/HudReadout.tsx`**, **`src/components/CornerBrackets.tsx`**, **`src/components/SectionDivider.tsx`**, and **`src/components/SectionTransition.tsx`** are small decorative components that add visual texture — HUD-style monospaced readouts in section corners, corner bracket or crosshair marks around cards, animated divider lines between sections, and a diagonal wipe transition effect.

**`src/components/ScrollProgressBar.tsx`** is a thin sky-blue bar fixed to the top of the viewport that fills left-to-right as the user scrolls, driven by GSAP ScrollTrigger scrub.

#### Design Decisions

I debated between a multi-page layout and a single-page layout. I chose single-page because the content is concise enough to fit comfortably, and it allowed me to build a continuous scroll narrative with pinned sections and horizontal scroll that would feel disjointed across separate pages.

I considered using Framer Motion exclusively for animations since it integrates more naturally with React, but GSAP's ScrollTrigger offered pinning, scrub-linked timelines, horizontal scroll with `containerAnimation`, and `matchMedia` breakpoint handling that Framer Motion does not support as cleanly. Framer Motion is still listed as a dependency for potential future use.

The sky-blue accent color and monospaced HUD elements were a deliberate choice to create a "developer terminal meets clean design" aesthetic. I avoided gradients entirely to keep the visual language sharp and minimal.
