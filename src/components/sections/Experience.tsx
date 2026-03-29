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

// Chronological order: newest first
const workExperience: ExperienceItem[] = [
  {
    id: "1",
    title: "Product Developer",
    company: "Experia",
    period: "Dec 2025 — Present",
    description:
      "Building and shipping product features focused on delivering user value. Working across the stack to create scalable, maintainable solutions.",
    type: "work",
    technologies: ["React", "Next.js", "TypeScript", "AI"],
  },
  {
    id: "2",
    title: "DLSU Hackercup — Participant",
    company: "De La Salle University",
    period: "July 2024",
    description:
      "24-hour hackathon building solutions for SDGs across multiple universities. Built Fuse, a social media, course discovery, and mentor platform using React, TailwindCSS, Next.js, and Firebase. Based on SDG 4, quality education.",
    type: "work",
    technologies: ["React", "Next.js", "TailwindCSS", "Firebase"],
  },
  {
    id: "3",
    title: "Level it Up! — Seminar Participant",
    company: "CICS",
    period: "2024",
    description:
      "Seminar on Tactics for Mobile and Web App Development Mastery. Explored Blockchain Technology, Full Stack Development, and IT Career Paths.",
    type: "work",
    technologies: ["Blockchain", "Full Stack", "Mobile Dev"],
  },
];

const education: ExperienceItem[] = [
  {
    id: "4",
    title: "B.S. Information Technology",
    company: "Rizal Technological University",
    period: "2023 — Present",
    description:
      "Cumulative GWA: 1.33. Academic Achiever 2023-2024. Studying information technology with focus on software development and system design.",
    type: "education",
    technologies: ["Java", "Python", "C++", "System Design"],
  },
  {
    id: "5",
    title: "ICT Strand",
    company: "Rizal Technological University",
    period: "2021 — 2023",
    description:
      "Senior high school ICT strand. Cumulative GWA: 1.30. Foundation in programming, networking, and information systems.",
    type: "education",
    technologies: ["HTML/CSS", "Java", "Networking"],
  },
];

function TimelineCard({ item, index, accent = "sky" }: { item: ExperienceItem; index: number; accent?: "sky" | "amber" }) {
  const dotColor = accent === "amber" ? "bg-amber-500 ring-amber-100" : "bg-sky-500 ring-sky-100";
  const badgeColor = accent === "amber" ? "bg-amber-100 text-amber-600" : "bg-sky-100 text-sky-600";
  const hoverBorder = accent === "amber" ? "hover:border-l-amber-500" : "hover:border-l-sky-500";
  const companyColor = accent === "amber" ? "text-amber-500" : "text-sky-500";

  return (
    <div className="relative transition-opacity duration-300 group-hover/exp:opacity-60 hover:!opacity-100" style={{ opacity: 1 }}>
      <div data-dot className="absolute -left-8 top-6 flex items-center gap-1 -translate-x-[5px]">
        <div className={`h-3 w-3 rounded-full ring-4 ${dotColor}`} />
        <span className="hidden font-mono text-[8px] text-slate-300 tracking-wider md:inline">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <CornerBrackets variant="crosshair">
        <div
          data-card
          className={`bg-white border border-slate-200 border-l-2 border-l-transparent rounded-xl p-6 shadow-sm hover:shadow-md ${hoverBorder} transition-all duration-300`}
          style={{ opacity: 1 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={`${badgeColor} font-mono text-xs rounded-full px-3 py-1`}>
              {item.type === "work" ? "Work" : "Education"}
            </span>
            <span className="text-slate-500 font-mono text-xs">{item.period}</span>
          </div>
          <h3 className="text-lg font-heading font-bold text-slate-900">{item.title}</h3>
          <p className={`${companyColor} text-sm font-medium`}>{item.company}</p>
          <p className="text-slate-600 text-sm mt-2">{item.description}</p>
          {item.technologies && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.technologies.map((tech) => (
                <span key={tech} className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-500">{tech}</span>
              ))}
            </div>
          )}
        </div>
      </CornerBrackets>
    </div>
  );
}

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
      <BackgroundNoise seed={505} density={16} />
      {/* Ghost text — large word behind content */}
      <span
        ref={ghostRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(10rem,25vw,20rem)] leading-none text-ghost"
        aria-hidden="true"
      >
        JOURNEY
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

        {/* Work & Events timeline */}
        <div ref={timelineRef} className="relative">
          <h3 className="mb-6 font-mono text-xs uppercase tracking-wider text-sky-500">&#9656; Work &amp; Events</h3>
          <div className="absolute left-0 md:left-[60px] top-10 bottom-0 w-[2px]">
            <div ref={lineRef} className="w-full bg-slate-200" style={{ height: 0 }} />
          </div>
          <div className="group/exp space-y-8 ml-0 md:ml-[60px] pl-8">
            {workExperience.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Education section */}
        <div className="mt-16 relative">
          <h3 className="mb-6 font-mono text-xs uppercase tracking-wider text-amber-500">&#9656; Education</h3>
          <div className="absolute left-0 md:left-[60px] top-10 bottom-0 w-[2px] bg-slate-200" />
          <div className="group/exp space-y-8 ml-0 md:ml-[60px] pl-8">
            {education.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} accent="amber" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
