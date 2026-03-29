"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundNoise from "@/components/BackgroundNoise";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
  accent: string;       // Tailwind color class for fills (e.g. "sky" | "amber" | "emerald")
  accentBar: string;    // CSS class for signal bar fill color
  accentText: string;   // CSS class for bracket/hover text
  accentGhost: string;  // CSS class for faint ghost title tint
}

const skillCategories: SkillCategory[] = [
  {
    title: "FRONTEND",
    accent: "sky",
    accentBar: "bg-sky-400",
    accentText: "text-sky-500",
    accentGhost: "text-sky-100",
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
    accent: "amber",
    accentBar: "bg-amber-400",
    accentText: "text-amber-500",
    accentGhost: "text-amber-100",
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
    accent: "emerald",
    accentBar: "bg-emerald-400",
    accentText: "text-emerald-500",
    accentGhost: "text-emerald-100",
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

const accentHex: Record<string, string> = {
  sky: "#0EA5E9",
  amber: "#F59E0B",
  emerald: "#10B981",
};

function SkillCard({ skill, category }: { skill: Skill; category: SkillCategory }) {
  const hex = accentHex[category.accent] || "#0EA5E9";

  return (
    <div
      className="group relative rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md overflow-hidden"
      style={{ opacity: 1, "--accent": hex } as React.CSSProperties}
    >
      {/* Left accent strip — category colored */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 group-hover:w-[4px]" style={{ backgroundColor: hex, opacity: 0.4 }} />
      <span className="mb-2 block text-2xl text-slate-700 transition-colors duration-200 group-hover:[color:var(--accent)]">
        {skill.icon}
      </span>
      <span className="font-mono text-xs font-medium text-slate-700 transition-colors duration-200 group-hover:[color:var(--accent)]">{skill.name}</span>
      <div className="mt-2 flex items-end justify-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="skill-signal-bar w-1.5 rounded-sm transition-colors"
            style={{
              height: `${6 + i * 3}px`,
              width: 0,
              backgroundColor: i < Math.round((skill.level / 100) * 5) ? hex : "#E2E8F0",
            }}
          />
        ))}
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
              pinType: "transform",
              scrub: 1.5,
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

          // Animate signal bars using containerAnimation for proper timing
          panels.querySelectorAll(".skill-panel").forEach((panel) => {
            const signalBars = panel.querySelectorAll(".skill-signal-bar");
            gsap.fromTo(signalBars,
              { width: 0 },
              { width: "6px", stagger: 0.02, duration: 0.3, ease: "steps(1)",
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
            const signalBars = panel.querySelectorAll(".skill-signal-bar");
            gsap.fromTo(cards,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power3.out",
                scrollTrigger: { trigger: panel, start: "top 80%" } },
            );
            gsap.fromTo(signalBars,
              { width: 0 },
              { width: "6px", stagger: 0.02, duration: 0.3, delay: 0.3, ease: "steps(1)",
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
      {/* Cross-hatch pattern overlay for visual texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(45deg, #94A3B8 1px, transparent 1px), linear-gradient(-45deg, #94A3B8 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }} />

      {/* Fixed heading overlay */}
      <div className="pointer-events-none absolute left-8 top-12 z-20">
        <p className="font-mono text-sm uppercase tracking-wider text-sky-500">&#9656; Tech Stack</p>
        <h2 className="mt-2 font-heading text-4xl font-bold text-slate-900">Skills &amp; Technologies</h2>
      </div>

      {/* Horizontal panels (desktop) / Vertical stack (mobile) */}
      <div ref={panelsRef} className="flex md:flex-row flex-col md:h-screen md:items-center">
        {skillCategories.map((category, index) => (
          <div
            key={category.title}
            className="skill-panel relative flex-shrink-0 md:w-screen md:h-screen flex items-center justify-center px-6 md:px-16 py-20 md:py-0"
          >
            <BackgroundNoise seed={300 + index * 100} density={14} />
            <div className="relative z-10 w-full max-w-5xl">
              {/* Category panel left border accent */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ backgroundColor: accentHex[category.accent] || "#0EA5E9", opacity: 0.6 }} />
                <div className="flex items-end justify-between mb-4">
                  <h3 className={`font-display text-7xl ${category.accentGhost}`}>{category.title}</h3>
                  <span className={`font-mono text-[10px] tracking-wider ${category.accentText}`}>
                    [{String(index + 1).padStart(2, "0")}/{String(skillCategories.length).padStart(2, "0")}] {category.skills.length} LOADED
                  </span>
                </div>
                <p className="mb-6 font-mono text-xs text-slate-400 max-w-md">
                  {index === 0 && "Building interfaces that feel alive — responsive, accessible, and performant."}
                  {index === 1 && "Architecting server-side systems, APIs, and databases that scale."}
                  {index === 2 && "The ecosystem that ties it all together — version control, deployment, and design."}
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="skill-card-wrap">
                      <SkillCard skill={skill} category={category} />
                    </div>
                  ))}
                </div>
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
