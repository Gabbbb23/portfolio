"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HudReadout from "@/components/HudReadout";
import BackgroundNoise from "@/components/BackgroundNoise";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Project One",
    description: "A full-stack web application built with modern technologies. Features real-time updates, authentication, and a clean UI.",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "2",
    title: "Project Two",
    description: "An API-driven platform that streamlines workflow automation. Built for scalability and performance.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "3",
    title: "Project Three",
    description: "A mobile-first application focused on user experience. Implements complex state management and offline support.",
    tags: ["React", "Python", "REST API", "Figma"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "4",
    title: "Project Four",
    description: "A developer tool that simplifies common tasks. Features a CLI interface and extensible plugin system.",
    tags: ["TypeScript", "Node.js", "CLI", "Open Source"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

const projectAccents = ["#0EA5E9", "#F59E0B", "#0EA5E9", "#10B981"]; // sky, amber, sky, emerald

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isOdd = index % 2 === 1;
  const projectNum = String(index + 1).padStart(2, "0");
  const accent = projectAccents[index] || "#0EA5E9";
  const marqueeText = `${project.title} \u00B7 `.repeat(10);

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6 md:px-8">
      <div className="relative grid w-full max-w-6xl grid-cols-12 items-center gap-6 md:gap-8">
        {/* Marquee behind */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0">
          <div className={index % 2 === 0 ? "animate-marquee whitespace-nowrap" : "animate-marquee-reverse whitespace-nowrap"}>
            <span className="font-display text-[clamp(6rem,15vw,12rem)] font-bold uppercase text-slate-800/60 leading-none">
              {marqueeText}
            </span>
          </div>
        </div>

        {/* Image area */}
        <div className={`relative z-10 col-span-12 md:col-span-7 ${isOdd ? "md:order-2" : ""}`}>
          <div className="crt-scanlines relative rounded-xl bg-slate-800 aspect-video overflow-hidden border border-slate-700">
            {/* Browser chrome — dark terminal style */}
            <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-2 border-b border-slate-700">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-400/80" />
                <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
                <div className="h-2 w-2 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 rounded bg-slate-900/60 px-2 py-0.5 text-center">
                <span className="font-mono text-[10px] text-slate-500">localhost:3000</span>
              </div>
            </div>
            {/* Content placeholder with wireframe lines */}
            <div className="p-4 space-y-2">
              <div className="h-2 w-3/4 rounded bg-slate-700" />
              <div className="h-2 w-1/2 rounded bg-slate-700" />
              <div className="h-2 w-2/3 rounded bg-sky-500/20" />
              <div className="h-2 w-1/3 rounded bg-slate-700" />
              <div className="mt-2 h-8 w-full rounded bg-sky-500/10" />
            </div>
            {/* Top accent bar — per-project color */}
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: accent }} />
            {/* Project number */}
            <span className="absolute bottom-3 right-3 font-display text-5xl" style={{ color: accent, opacity: 0.2 }}>{projectNum}</span>
          </div>
        </div>

        {/* Info area */}
        <div className={`relative z-10 col-span-12 md:col-span-5 ${isOdd ? "md:order-1 md:text-right" : ""}`}>
          <h3 className="mb-3 font-heading text-3xl font-bold text-white">{project.title}</h3>
          <p className="mb-4 text-slate-400">{project.description}</p>
          <div className={`mb-4 flex flex-wrap gap-2 ${isOdd ? "md:justify-end" : ""}`}>
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-sky-500/15 px-3 py-1 font-mono text-xs text-sky-300 border border-sky-500/20">{tag}</span>
            ))}
          </div>
          <div className={`mb-4 flex items-center gap-2 text-slate-500 ${isOdd ? "md:justify-end" : ""}`}>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-mono text-xs">Full-Stack · 2024</span>
          </div>
          <div className={`flex gap-4 ${isOdd ? "md:justify-end" : ""}`}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-sm text-sky-400 transition-colors hover:text-sky-300">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-sm text-sky-400 transition-colors hover:text-sky-300">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    if (!section || !stack) return;

    // gsap.matchMedia() is the modern API (GSAP 3.11+) — it replaces the
    // problematic gsap.context() + ScrollTrigger.matchMedia() combo that
    // caused timeline tweens to become orphaned during React StrictMode
    // double-mount cleanup.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".project-card", stack);
      const cardCount = cardEls.length;
      if (cardCount === 0) return;

      // Set z-index stacking + initial positions
      cardEls.forEach((card, i) => {
        gsap.set(card, { zIndex: i + 1 });
        if (i > 0) gsap.set(card, { yPercent: 100 });
      });

      // Single timeline drives all card transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(cardCount - 1) * window.innerHeight}`,
          pin: true,
          pinType: "transform",
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const transitions = cardCount - 1;
      cardEls.forEach((card, i) => {
        if (i === 0) return;
        const cardStart = (i - 1) / transitions;
        const enterDuration = 0.7 / transitions;
        const recessDuration = 0.4 / transitions;

        // Previous card recedes subtly (covered by incoming solid bg)
        tl.to(cardEls[i - 1], {
          scale: 0.95, yPercent: -3, ease: "none", duration: recessDuration,
        }, cardStart);

        // New card slides up — solid bg covers previous
        tl.fromTo(card,
          { yPercent: 100, opacity: 1, scale: 1 },
          { yPercent: 0, opacity: 1, scale: 1, ease: "none", duration: enterDuration },
          cardStart,
        );

        const glitchLine = card.querySelector(".project-card-glitch");
        if (glitchLine) {
          tl.fromTo(glitchLine, { opacity: 1, scaleX: 0 }, { scaleX: 1, duration: 0.05, ease: "none" }, cardStart + enterDuration * 0.5);
          tl.to(glitchLine, { opacity: 0, duration: 0.1 }, cardStart + enterDuration * 0.7);
        }
      });

    });

    mm.add("(max-width: 767px)", () => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".project-card", stack);
      // Mobile: simple stagger fade-in
      cardEls.forEach((card) => {
        gsap.set(card, { position: "relative", opacity: 1, yPercent: 0, scale: 1 });
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" } },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="project-section relative z-10 min-h-screen bg-slate-900">
      <BackgroundNoise seed={404} density={20} variant="dark" />
      <HudReadout position="top-right" lines={["PROJ:SCAN // IDX:01", "STATUS:DEPLOYED", "BUILD:PASSING"]} />

      {/* Dot-grid texture overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Noise grain overlay */}
      <div className="tv-noise pointer-events-none absolute inset-0 z-0" style={{ opacity: 0.06 }} />

      {/* Heading overlay — top-20 clears the floating logo pill */}
      <div className="pointer-events-none absolute left-8 top-20 z-20">
        <p className="font-mono text-sm uppercase tracking-wider text-sky-400">&#9656; Featured Work</p>
        <h2 className="mt-2 font-heading text-4xl font-bold text-white">Projects</h2>
      </div>

      {/* Stacked cards */}
      <div ref={stackRef} className="relative md:h-screen flex md:items-center md:justify-center flex-col md:flex-row gap-16 md:gap-0 px-6 py-20 md:py-0 md:overflow-hidden">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="project-card md:absolute md:inset-0 bg-slate-900"
          >
            <div className="project-card-glitch pointer-events-none absolute inset-x-0 top-1/2 z-50 h-[2px] bg-sky-400/50 opacity-0" />
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>

    </section>
  );
}
