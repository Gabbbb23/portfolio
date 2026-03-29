"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "FRONTEND",
    skills: [
      { name: "React", icon: "\u269B", level: 95 },
      { name: "Next.js", icon: "\u25B2", level: 90 },
      { name: "TypeScript", icon: "TS", level: 90 },
      { name: "Tailwind CSS", icon: "\uD83C\uDFA8", level: 95 },
      { name: "HTML/CSS", icon: "\uD83C\uDF10", level: 90 },
      { name: "JavaScript", icon: "JS", level: 92 },
    ],
  },
  {
    title: "BACKEND",
    skills: [
      { name: "Node.js", icon: "\uD83D\uDFE2", level: 85 },
      { name: "Python", icon: "\uD83D\uDC0D", level: 80 },
      { name: "Express", icon: "\u26A1", level: 80 },
      { name: "REST APIs", icon: "\uD83D\uDD17", level: 85 },
      { name: "PostgreSQL", icon: "\uD83D\uDC18", level: 75 },
      { name: "MongoDB", icon: "\uD83C\uDF43", level: 75 },
    ],
  },
  {
    title: "TOOLS",
    skills: [
      { name: "Git", icon: "\uD83D\uDCE6", level: 85 },
      { name: "Docker", icon: "\uD83D\uDC33", level: 65 },
      { name: "Linux", icon: "\uD83D\uDC27", level: 70 },
      { name: "VS Code", icon: "\uD83D\uDCBB", level: 90 },
      { name: "Figma", icon: "\uD83C\uDFAF", level: 70 },
      { name: "CI/CD", icon: "\uD83D\uDD04", level: 60 },
    ],
  },
];

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-l-4 hover:border-l-sky-500 hover:shadow-md" style={{ opacity: 1 }}>
      <span className="mb-2 block text-2xl text-slate-700 transition-colors duration-200 group-hover:text-sky-500">
        {skill.icon}
      </span>
      <span className="font-mono text-xs text-slate-600">{skill.name}</span>
      <div className="mt-2 h-1 w-full rounded-full bg-slate-100">
        <div
          className="skill-bar-fill h-full rounded-full bg-sky-400"
          data-level={skill.level}
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panels = panelsRef.current;
    if (!section || !panels) return;

    const ctx = gsap.context(() => {
      // Desktop: horizontal scroll
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
          const totalWidth = panels.scrollWidth - window.innerWidth;

          const horizontalTween = gsap.to(panels, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${totalWidth}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              onUpdate: (self: ScrollTrigger) => {
                const dots = section.querySelectorAll(".skill-progress-dot");
                const activePanel = Math.min(Math.floor(self.progress * 3), 2);
                dots.forEach((d, i) => {
                  d.classList.toggle("bg-sky-500", i === activePanel);
                  d.classList.toggle("bg-slate-200", i !== activePanel);
                });
              },
            },
          });

          // Animate skill bars using containerAnimation for proper timing
          panels.querySelectorAll(".skill-panel").forEach((panel) => {
            const bars = panel.querySelectorAll(".skill-bar-fill");
            gsap.fromTo(bars,
              { width: "0%" },
              {
                width: (_: number, el: Element) => `${(el as HTMLElement).dataset.level}%`,
                stagger: 0.08, duration: 0.8, ease: "power2.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalTween,
                  start: "left 80%",
                  toggleActions: "play none none none",
                },
              },
            );
          });
        },
        "(max-width: 767px)": function () {
          // Mobile: simple stagger reveal per category
          panels.querySelectorAll(".skill-panel").forEach((panel) => {
            const cards = panel.querySelectorAll(".skill-card-wrap");
            const bars = panel.querySelectorAll(".skill-bar-fill");
            gsap.fromTo(cards,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power3.out",
                scrollTrigger: { trigger: panel, start: "top 80%" } },
            );
            gsap.fromTo(bars,
              { width: "0%" },
              {
                width: (_: number, el: Element) => `${(el as HTMLElement).dataset.level}%`,
                stagger: 0.08, duration: 0.8, delay: 0.3, ease: "power2.out",
                scrollTrigger: { trigger: panel, start: "top 80%" },
              },
            );
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative z-10 overflow-hidden bg-white">
      {/* Fixed heading overlay */}
      <div className="pointer-events-none absolute left-8 top-12 z-20">
        <p className="font-mono text-sm uppercase tracking-wider text-sky-500">&#9656; Tech Stack</p>
        <h2 className="mt-2 font-heading text-4xl font-bold text-slate-900">Skills &amp; Technologies</h2>
      </div>

      {/* Horizontal panels (desktop) / Vertical stack (mobile) */}
      <div ref={panelsRef} className="flex md:flex-row flex-col md:h-screen md:items-center">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="skill-panel flex-shrink-0 md:w-screen md:h-screen flex items-center justify-center px-6 md:px-16 py-20 md:py-0"
          >
            <div className="w-full max-w-4xl">
              <h3 className="mb-8 font-display text-7xl text-slate-200">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-card-wrap">
                    <SkillCard skill={skill} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Panel progress dots */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 gap-2 md:flex">
        {skillCategories.map((_, i) => (
          <div key={i} className="skill-progress-dot h-1 w-8 rounded-full bg-slate-200 transition-colors" />
        ))}
      </div>
    </section>
  );
}
