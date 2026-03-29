"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextReveal } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

// Placeholder projects — will be replaced by Sanity CMS data
const projects: Project[] = [
  {
    id: "1",
    title: "Project One",
    description:
      "A full-stack web application built with modern technologies. Features real-time updates, authentication, and a clean UI.",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    image: "/placeholder-project.jpg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "2",
    title: "Project Two",
    description:
      "An API-driven platform that streamlines workflow automation. Built for scalability and performance.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Docker"],
    image: "/placeholder-project.jpg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "3",
    title: "Project Three",
    description:
      "A mobile-first application focused on user experience. Implements complex state management and offline support.",
    tags: ["React", "Python", "REST API", "Figma"],
    image: "/placeholder-project.jpg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "4",
    title: "Project Four",
    description:
      "A developer tool that simplifies common tasks. Features a CLI interface and extensible plugin system.",
    tags: ["TypeScript", "Node.js", "CLI", "Open Source"],
    image: "/placeholder-project.jpg",
    liveUrl: "#",
    githubUrl: "#",
  },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const projectNum = String(index + 1).padStart(2, "0");
  const isOdd = index % 2 === 1;

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const ctx = gsap.context(() => {
      gsap.from(row, {
        x: isOdd ? 40 : -40,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, [isOdd]);

  return (
    <div ref={rowRef} className="grid grid-cols-12 gap-6 md:gap-8 items-center">
      {/* Image area */}
      <div
        className={`col-span-12 md:col-span-7 ${isOdd ? "md:order-2" : ""}`}
      >
        <div className="relative bg-slate-100 rounded-xl aspect-video overflow-hidden border border-slate-200">
          {/* Sky blue top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-sky-500" />
          {/* Project number */}
          <span className="absolute top-4 right-4 font-display text-6xl text-slate-200">
            {projectNum}
          </span>
          {/* Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-6xl">
            {"</ >"}
          </div>
        </div>
      </div>

      {/* Info area */}
      <div
        className={`col-span-12 md:col-span-5 ${
          isOdd ? "md:order-1 md:text-right" : ""
        }`}
      >
        <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2 hover:text-sky-500 transition">
          {project.title}
        </h3>
        <p className="text-slate-600 mb-4 text-sm">{project.description}</p>

        {/* Tags */}
        <div
          className={`flex flex-wrap gap-2 mb-4 ${
            isOdd ? "md:justify-end" : ""
          }`}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-sky-100 text-sky-700 font-mono text-xs rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          className={`flex gap-4 ${isOdd ? "md:justify-end" : ""}`}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sky-500 hover:text-sky-600 font-mono text-sm transition-colors"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sky-500 hover:text-sky-600 font-mono text-sm transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const headingRef = useTextReveal<HTMLHeadingElement>();
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter-directional: heading from left, ghost from right
      gsap.from(headingWrapRef.current, {
        x: -60,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(ghostRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Highlight bar sweeps in behind heading
      gsap.fromTo(
        highlightRef.current,
        { width: 0 },
        {
          width: "calc(100% + 1rem)",
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 75%",
          },
        }
      );

      // Ghost parallax
      gsap.to(ghostRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-slate-50 py-16 md:py-20 relative overflow-hidden"
    >
      {/* Ghost text */}
      <span
        ref={ghostRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(10rem,25vw,20rem)] leading-none text-ghost"
        aria-hidden="true"
      >
        04
      </span>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading area */}
        <div ref={headingWrapRef}>
          <p className="font-mono text-sky-500 uppercase tracking-wider text-sm mb-2">
            &#9656; Featured Work
          </p>

          <div className="relative inline-block">
            <div
              ref={highlightRef}
              className="absolute -left-2 bottom-1 h-3 bg-sky-100 -z-10 rounded-sm"
              style={{ width: 0 }}
            />
            <h2
              ref={headingRef}
              className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-12"
            >
              Projects
            </h2>
          </div>
        </div>

        {/* Project rows — vertical alternating layout */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
