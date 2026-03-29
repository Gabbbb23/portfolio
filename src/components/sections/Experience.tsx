"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextReveal } from "@/lib/animations";
import CornerBrackets from "@/components/CornerBrackets";
import BackgroundNoise from "@/components/BackgroundNoise";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  type: "work" | "education";
  technologies?: string[];
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
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: "2",
    title: "B.S. Computer Science",
    company: "University",
    period: "2023 — Present",
    description:
      "Studying computer science with a focus on software engineering, data structures, algorithms, and system design.",
    type: "education",
    technologies: ["Java", "Python", "C++", "Algorithms"],
  },
  {
    id: "3",
    title: "Freelance Developer",
    company: "Self-Employed",
    period: "2024",
    description:
      "Built custom web applications for clients. Managed projects end-to-end from requirements to deployment.",
    type: "work",
    technologies: ["Next.js", "Tailwind", "Vercel", "Stripe"],
  },
  {
    id: "4",
    title: "Open Source Contributor",
    company: "Various Projects",
    period: "2023 — Present",
    description:
      "Contributed to open source projects, fixing bugs and adding features. Active member of developer communities.",
    type: "work",
    technologies: ["TypeScript", "Git", "GitHub Actions"],
  },
];

export default function Experience() {
  const headingRef = useTextReveal<HTMLHeadingElement>();
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter-directional entrance: heading from left, ghost from right
      gsap.fromTo(headingWrapRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } },
      );
      gsap.fromTo(ghostRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } },
      );

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

      // Timeline line draws downward
      gsap.fromTo(lineRef.current,
        { height: "0%" },
        {
          height: "100%", ease: "none",
          scrollTrigger: { trigger: timelineRef.current, start: "top 60%", end: "bottom 80%", scrub: 0.5 },
        },
      );

      // Cards stagger in from the right
      const cards = timelineRef.current?.querySelectorAll("[data-card]");
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.06, duration: 0.35, ease: "power3.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 85%" },
          },
        );
      }

      // Dots pop in with elastic ease
      const dots = timelineRef.current?.querySelectorAll("[data-dot]");
      if (dots && dots.length > 0) {
        gsap.fromTo(dots,
          { scale: 0 },
          {
            scale: 1, stagger: 0.12, duration: 0.3, ease: "back.out(2)",
            scrollTrigger: { trigger: timelineRef.current, start: "top 70%" },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-10 bg-white py-16 md:py-20 overflow-hidden"
    >
      <BackgroundNoise seed={505} density={30} />
      {/* Ghost text */}
      <span
        ref={ghostRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(10rem,25vw,20rem)] leading-none text-slate-200 opacity-60"
        aria-hidden="true"
      >
        05
      </span>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading area */}
        <div ref={headingWrapRef}>
          <p className="font-mono text-sky-500 uppercase tracking-wider text-sm mb-2">
            &#9656; Journey
          </p>

          <div className="relative inline-block">
            <div
              ref={highlightRef}
              className="absolute -left-2 bottom-1 h-3 bg-sky-100 -z-10 rounded-sm"
              style={{ width: 0 }}
            />
            <h2
              ref={headingRef}
              className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-10"
            >
              Experience &amp; Education
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Timeline — 8 columns */}
          <div className="col-span-12 md:col-span-8">
            {/* Left-aligned timeline */}
            <div ref={timelineRef} className="relative">
              {/* Drawing timeline line */}
              <div className="absolute left-0 md:left-[60px] top-0 bottom-0 w-[2px]">
                <div ref={lineRef} className="w-full bg-slate-200" style={{ height: 0 }} />
              </div>

              {/* Timeline entries — group hover dims siblings */}
              <div className="group/exp space-y-8 ml-0 md:ml-[60px] pl-8">
                {experiences.map((item, index) => (
                  <div key={item.id} className="relative transition-opacity duration-300 group-hover/exp:opacity-60 hover:!opacity-100" style={{ opacity: 1 }}>
                    {/* Timeline dot */}
                    <div data-dot className="absolute -left-8 top-6 flex items-center gap-1 -translate-x-[5px]">
                      <div className="h-3 w-3 rounded-full bg-sky-500 ring-4 ring-sky-100" />
                      <span className="hidden font-mono text-[8px] text-slate-300 tracking-wider md:inline">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Card */}
                    <CornerBrackets variant="crosshair">
                      <div
                        data-card
                        className="bg-white border border-slate-200 border-l-2 border-l-transparent rounded-xl p-6 shadow-sm hover:shadow-md hover:border-l-sky-500 transition-all duration-300"
                        style={{ opacity: 1 }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-sky-100 text-sky-600 font-mono text-xs rounded-full px-3 py-1">
                            {item.type === "work" ? "Work" : "Education"}
                          </span>
                          <span className="text-slate-500 font-mono text-xs">
                            {item.period}
                          </span>
                        </div>
                        <h3 className="text-lg font-heading font-bold text-slate-900">
                          {item.title}
                        </h3>
                        <p className="text-sky-500 text-sm font-medium">
                          {item.company}
                        </p>
                        <p className="text-slate-600 text-sm mt-2">
                          {item.description}
                        </p>
                        {item.technologies && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.technologies.map((tech) => (
                              <span key={tech} className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-500">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </CornerBrackets>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary sidebar — 4 columns, sticky */}
          <div className="hidden md:col-span-4 md:block">
            <div className="sticky top-32">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-sky-500">Quick Stats</h4>
                <div className="space-y-4">
                  <div>
                    <span className="font-heading text-2xl font-bold text-slate-900">3+</span>
                    <span className="ml-2 font-mono text-xs text-slate-500">Years Coding</span>
                  </div>
                  <div>
                    <span className="font-heading text-2xl font-bold text-slate-900">4+</span>
                    <span className="ml-2 font-mono text-xs text-slate-500">Projects Shipped</span>
                  </div>
                  <div>
                    <span className="font-heading text-2xl font-bold text-slate-900">10+</span>
                    <span className="ml-2 font-mono text-xs text-slate-500">Technologies</span>
                  </div>
                </div>
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-sky-500">Top Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {["React", "TypeScript", "Node.js", "Next.js", "Python"].map((s) => (
                      <span key={s} className="rounded-full bg-sky-100 px-2.5 py-0.5 font-mono text-[10px] text-sky-700">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
