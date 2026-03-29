"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextReveal } from "@/lib/animations";

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

function SkillCategorySection({ category }: { category: SkillCategory }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const trigger = categoryRef.current;
    if (!grid || !trigger) return;

    const cards = grid.children;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(cards,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power3.out" },
          );
          // Animated skill bar fills after cards reveal
          const bars = grid.querySelectorAll(".skill-bar-fill");
          gsap.fromTo(bars,
            { width: "0%" },
            {
              width: (_: number, el: Element) => `${(el as HTMLElement).dataset.level}%`,
              stagger: 0.08,
              duration: 0.8,
              delay: 0.3,
              ease: "power2.out",
            },
          );
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={categoryRef} className="mb-10 rounded-lg border border-slate-100 bg-slate-50/50 p-6">
      <h3 className="mb-4 font-display text-xl uppercase text-slate-900">
        <span className="text-sky-500/30">[</span> {category.title}{" "}
        <span className="text-sky-500/30">]</span>
      </h3>
      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6"
      >
        {category.skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
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
      // Highlight bar sweeps in behind heading
      gsap.fromTo(
        highlightRef.current,
        { width: 0 },
        {
          width: "calc(100% + 1rem)",
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 75%" },
        }
      );

      // Counter-directional entrance: heading from left, ghost from right
      gsap.from(headingWrapRef.current, {
        x: -60,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(ghostRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

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
      id="skills"
      className="relative overflow-hidden bg-white py-16 px-6 md:py-20"
    >
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
          <p className="mb-2 font-mono text-sm uppercase tracking-wider text-sky-500">
            &#9656; Tech Stack
          </p>

          <div className="relative inline-block">
            <div
              ref={highlightRef}
              className="-z-10 absolute -left-2 bottom-1 h-3 rounded-sm bg-sky-100"
              style={{ width: 0 }}
            />
            <h2
              ref={headingRef}
              className="mb-10 font-heading text-4xl font-bold text-slate-900 md:text-5xl"
            >
              Skills & Technologies
            </h2>
          </div>
        </div>

        {skillCategories.map((category) => (
          <SkillCategorySection key={category.title} category={category} />
        ))}
      </div>
    </section>
  );
}
