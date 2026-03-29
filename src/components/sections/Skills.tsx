"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextReveal, useStaggerReveal } from "@/lib/animations";
import CornerBrackets from "@/components/CornerBrackets";

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
    title: "Frontend",
    skills: [
      { name: "React", icon: "⚛", level: 95 },
      { name: "Next.js", icon: "▲", level: 90 },
      { name: "TypeScript", icon: "TS", level: 90 },
      { name: "Tailwind CSS", icon: "🎨", level: 95 },
      { name: "HTML/CSS", icon: "🌐", level: 90 },
      { name: "JavaScript", icon: "JS", level: 92 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "🟢", level: 85 },
      { name: "Python", icon: "🐍", level: 80 },
      { name: "Express", icon: "⚡", level: 80 },
      { name: "REST APIs", icon: "🔗", level: 85 },
      { name: "PostgreSQL", icon: "🐘", level: 75 },
      { name: "MongoDB", icon: "🍃", level: 75 },
    ],
  },
  {
    title: "Tools & Other",
    skills: [
      { name: "Git", icon: "📦", level: 85 },
      { name: "Docker", icon: "🐳", level: 65 },
      { name: "Linux", icon: "🐧", level: 70 },
      { name: "VS Code", icon: "💻", level: 90 },
      { name: "Figma", icon: "🎯", level: 70 },
      { name: "CI/CD", icon: "🔄", level: 60 },
    ],
  },
];

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="group flex flex-col items-center gap-3 rounded-xl bg-white p-4 border-l-3 border-l-transparent border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-l-sky-500 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
      <span className="text-3xl text-slate-700 transition-all duration-300 group-hover:scale-110 group-hover:text-sky-500">
        {skill.icon}
      </span>
      <span className="font-mono text-sm font-medium text-slate-500 transition-colors duration-300 group-hover:text-sky-500">
        {skill.name}
      </span>
      {/* Progress bar — ZZZ stat level */}
      <div className="mt-1 h-1 w-full rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-sky-400" style={{ width: `${skill.level}%` }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const headingRef = useTextReveal<HTMLHeadingElement>();
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(highlightRef.current,
        { width: 0 },
        { width: "calc(100% + 2rem)", duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 75%" } },
      );
      gsap.from(headingWrapRef.current, {
        x: -80, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(ghostRef.current, {
        x: 120, opacity: 0, duration: 1.0, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.to(ghostRef.current, {
        yPercent: -20, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative bg-white py-32 px-6 overflow-hidden">
      {/* Ghost text */}
      <span
        ref={ghostRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(10rem,25vw,20rem)] leading-none text-ghost"
        aria-hidden="true"
      >
        03
      </span>

      <div className="relative mx-auto max-w-6xl">
        <div ref={headingWrapRef}>
          <p className="mb-4 font-mono text-sm font-medium tracking-widest text-sky-500 uppercase">
            &#9656; Tech Stack
          </p>

          <div className="relative inline-block">
            <div ref={highlightRef} className="absolute -left-4 top-0 h-full bg-sky-500/10 -z-10 rounded-r-sm" style={{ width: 0 }} />
            <h2
              ref={headingRef}
              className="mb-16 font-heading text-4xl font-bold text-slate-900 md:text-5xl"
            >
              Skills & Technologies
            </h2>
          </div>
        </div>

        <div className="space-y-16">
          {skillCategories.map((category) => (
            <SkillCategorySection key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategorySection({ category }: { category: SkillCategory }) {
  const gridRef = useStaggerReveal<HTMLDivElement>(0.08);

  return (
    <CornerBrackets className="p-3">
      <h3 className="mb-6 font-display text-2xl uppercase tracking-wider text-slate-900">
        {category.title}
      </h3>
      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6"
      >
        {category.skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </CornerBrackets>
  );
}
