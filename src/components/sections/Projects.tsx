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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const projectNum = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { clipPath: "polygon(-10% 0%, 0% 0%, -10% 100%, -20% 100%)" });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        onEnter: () => {
          gsap.to(card, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.8,
            delay: index * 0.15,
            ease: "power2.out",
          });
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative flex-shrink-0 w-[85vw] max-w-[500px] md:w-[450px]"
    >
      <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        {/* Top accent bar — ZZZ mission status style */}
        <div className="h-[3px] w-full bg-sky-500" />
        {/* Image placeholder */}
        <div className="relative h-64 overflow-hidden bg-slate-100">
          {/* Project number */}
          <span className="absolute top-4 right-4 z-10 font-display text-5xl text-slate-200">
            {projectNum}
          </span>
          <div className="flex h-full items-center justify-center text-6xl text-slate-300">
            {"</>"}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="mb-2 font-heading text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-sky-500">
            {project.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-slate-700">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sky-100 px-3 py-1 font-mono text-xs font-medium text-sky-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-sky-500 transition-colors hover:text-sky-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-sky-500 transition-colors hover:text-sky-600"
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
    </div>
  );
}

export default function Projects() {
  const headingRef = useTextReveal<HTMLHeadingElement>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    const section = sectionRef.current;
    const container = scrollContainerRef.current;
    if (!inner || !section || !container) return;

    const totalScrollWidth = inner.scrollWidth - container.clientWidth;

    const tween = gsap.to(inner, {
      x: -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 10%",
        end: () => `+=${totalScrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative bg-slate-50 py-32 px-6 overflow-hidden">
      {/* Ghost text */}
      <span
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(10rem,25vw,20rem)] leading-none text-ghost"
        aria-hidden="true"
      >
        04
      </span>

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-sm font-medium tracking-widest text-sky-500 uppercase">
          &#9656; Featured Work
        </p>

        <h2
          ref={headingRef}
          className="mb-16 font-heading text-4xl font-bold text-slate-900 md:text-5xl"
        >
          Projects
        </h2>
      </div>

      <div ref={scrollContainerRef} className="overflow-hidden">
        <div ref={innerRef} className="flex gap-8">
          {/* Left spacer — aligns first card with max-w-6xl container */}
          <div className="w-6 flex-shrink-0 md:w-[max(1.5rem,calc((100vw-72rem)/2))]" />
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
          {/* Right spacer */}
          <div className="w-6 flex-shrink-0 md:w-[max(1.5rem,calc((100vw-72rem)/2))]" />
        </div>
      </div>
    </section>
  );
}
