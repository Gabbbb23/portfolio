"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isOdd = index % 2 === 1;
  const projectNum = String(index + 1).padStart(2, "0");
  const marqueeText = `${project.title} \u00B7 `.repeat(10);

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6 md:px-8">
      <div className="relative grid w-full max-w-6xl grid-cols-12 items-center gap-6 md:gap-8">
        {/* Marquee behind */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0">
          <div className={index % 2 === 0 ? "animate-marquee whitespace-nowrap" : "animate-marquee-reverse whitespace-nowrap"}>
            <span className="font-display text-[clamp(6rem,15vw,12rem)] font-bold uppercase text-slate-300 leading-none">
              {marqueeText}
            </span>
          </div>
        </div>

        {/* Image area */}
        <div className={`relative z-10 col-span-12 md:col-span-7 ${isOdd ? "md:order-2" : ""}`}>
          <div className="relative rounded-xl bg-slate-100 aspect-video overflow-hidden border border-slate-200">
            <div className="absolute top-0 left-0 right-0 h-1 bg-sky-500" />
            <span className="absolute top-4 right-4 font-display text-6xl text-slate-200">{projectNum}</span>
            <div className="absolute inset-0 flex items-center justify-center text-6xl text-slate-300">{"</ >"}</div>
          </div>
        </div>

        {/* Info area */}
        <div className={`relative z-10 col-span-12 md:col-span-5 ${isOdd ? "md:order-1 md:text-right" : ""}`}>
          <h3 className="mb-3 font-heading text-3xl font-bold text-slate-900">{project.title}</h3>
          <p className="mb-4 text-slate-600">{project.description}</p>
          <div className={`mb-4 flex flex-wrap gap-2 ${isOdd ? "md:justify-end" : ""}`}>
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-sky-100 px-3 py-1 font-mono text-xs text-sky-700">{tag}</span>
            ))}
          </div>
          <div className={`flex gap-4 ${isOdd ? "md:justify-end" : ""}`}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-sm text-sky-500 transition-colors hover:text-sky-600">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-sm text-sky-500 transition-colors hover:text-sky-600">
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
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    if (!section || !stack) return;

    const cards = stack.querySelectorAll<HTMLElement>(".project-card");
    const dots = dotsRef.current?.querySelectorAll<HTMLElement>(".project-dot");

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
          const cardCount = cards.length;

          // Single timeline drives all card transitions
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${cardCount * window.innerHeight}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (!dots || dots.length === 0) return;
                const activeCard = Math.min(
                  Math.floor(self.progress * cardCount),
                  cardCount - 1,
                );
                dots.forEach((d, di) => {
                  d.classList.toggle("bg-sky-500", di === activeCard);
                  d.classList.toggle("bg-slate-300", di !== activeCard);
                });
              },
            },
          });

          cards.forEach((card, i) => {
            if (i === 0) return;
            const cardStart = i / cardCount;
            const enterDuration = 0.7 / cardCount;
            const recessDuration = 0.4 / cardCount;

            // Previous card recedes
            tl.to(cards[i - 1], {
              scale: 0.92, opacity: 0.4, ease: "none", duration: recessDuration,
            }, cardStart);

            // New card slides up
            tl.fromTo(card,
              { yPercent: 100, opacity: 0, scale: 0.9 },
              { yPercent: 0, opacity: 1, scale: 1, ease: "none", duration: enterDuration },
              cardStart,
            );
          });

          if (dots && dots[0]) dots[0].classList.add("bg-sky-500");
        },
        "(max-width: 767px)": function () {
          // Mobile: simple stagger fade-in
          cards.forEach((card, i) => {
            gsap.set(card, { position: "relative", opacity: 1, yPercent: 0, scale: 1 });
            gsap.fromTo(card,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 85%" } },
            );
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative z-10 min-h-screen bg-slate-50">
      {/* Heading overlay */}
      <div className="pointer-events-none absolute left-8 top-12 z-20">
        <p className="font-mono text-sm uppercase tracking-wider text-sky-500">&#9656; Featured Work</p>
        <h2 className="mt-2 font-heading text-4xl font-bold text-slate-900">Projects</h2>
      </div>

      {/* Stacked cards */}
      <div ref={stackRef} className="relative md:h-screen flex md:items-center md:justify-center flex-col md:flex-row gap-16 md:gap-0 px-6 py-20 md:py-0">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`project-card md:absolute md:inset-0 ${i === 0 ? "" : "md:opacity-0"}`}
            style={i === 0 ? { opacity: 1 } : undefined}
          >
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div ref={dotsRef} className="absolute right-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {projects.map((_, i) => (
          <div key={i} className="project-dot h-2 w-2 rounded-full bg-slate-300 transition-colors" />
        ))}
      </div>
    </section>
  );
}
