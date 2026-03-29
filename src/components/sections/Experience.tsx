"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextReveal } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  type: "work" | "education";
}

// Placeholder data — will be replaced by Sanity CMS
const experiences: ExperienceItem[] = [
  {
    id: "1",
    title: "Software Engineering Intern",
    company: "Tech Company",
    period: "Summer 2025",
    description:
      "Developed and maintained full-stack features. Collaborated with cross-functional teams to deliver production-ready code.",
    type: "work",
  },
  {
    id: "2",
    title: "B.S. Computer Science",
    company: "University",
    period: "2023 — Present",
    description:
      "Studying computer science with a focus on software engineering, data structures, algorithms, and system design.",
    type: "education",
  },
  {
    id: "3",
    title: "Freelance Developer",
    company: "Self-Employed",
    period: "2024",
    description:
      "Built custom web applications for clients. Managed projects end-to-end from requirements to deployment.",
    type: "work",
  },
  {
    id: "4",
    title: "Open Source Contributor",
    company: "Various Projects",
    period: "2023 — Present",
    description:
      "Contributed to open source projects, fixing bugs and adding features. Active member of developer communities.",
    type: "work",
  },
];

function TimelineItem({
  item,
  index,
  isLeft,
}: {
  item: ExperienceItem;
  index: number;
  isLeft: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    const dot = dotRef.current;
    if (!el || !dot) return;

    gsap.set(el, { opacity: 0, x: isLeft ? -60 : 60 });
    gsap.set(dot, { scale: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
        });
        gsap.to(dot, {
          scale: 1,
          duration: 0.5,
          delay: index * 0.15 + 0.2,
          ease: "back.out(1.7)",
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [index, isLeft]);

  return (
    <div
      className={`relative flex w-full items-center ${
        isLeft ? "md:justify-start" : "md:justify-end"
      }`}
    >
      {/* Timeline dot — sky blue filled with soft ring */}
      <div
        ref={dotRef}
        className="absolute left-0 z-10 h-3 w-3 rounded-full bg-sky-500 ring-4 ring-sky-100 md:left-1/2 md:-translate-x-1/2"
      />

      {/* Card */}
      <div
        ref={itemRef}
        className={`ml-8 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
          isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
        }`}
      >
        <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-full bg-sky-100 px-3 py-1 font-mono text-xs font-medium text-sky-600">
              {item.type === "work" ? "Work" : "Education"}
            </span>
            <span className="font-mono text-xs text-slate-500">{item.period}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
          <p className="mb-2 text-sm font-medium text-sky-500">{item.company}</p>
          <p className="text-sm leading-relaxed text-slate-700">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const headingRef = useTextReveal<HTMLHeadingElement>();
  const lineRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ghostRef.current && sectionRef.current) {
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
    }
  }, []);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    gsap.set(line, { scaleY: 0, transformOrigin: "top" });

    gsap.to(line, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: line,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative bg-white py-32 px-6 overflow-hidden">
      {/* Ghost text */}
      <span
        ref={ghostRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(10rem,25vw,20rem)] leading-none text-ghost"
        aria-hidden="true"
      >
        05
      </span>

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-sm font-medium tracking-widest text-sky-500 uppercase">
          &#9656; Journey
        </p>

        <h2
          ref={headingRef}
          className="mb-16 font-heading text-4xl font-bold text-slate-900 md:text-5xl"
        >
          Experience & Education
        </h2>

        <div className="relative">
          {/* Timeline line — dashed, P3R-style segmented connections */}
          <div
            ref={lineRef}
            className="absolute left-[5px] top-0 h-full w-0 border-l-2 border-dashed border-slate-200 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-12">
            {experiences.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
