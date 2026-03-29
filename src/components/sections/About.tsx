"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextReveal, useCountUp, useTilt } from "@/lib/animations";
import CornerBrackets from "@/components/CornerBrackets";
import BackgroundNoise from "@/components/BackgroundNoise";
import HudReadout from "@/components/HudReadout";

gsap.registerPlugin(ScrollTrigger);

function StatCard({ value, label }: { value: number; label: string }) {
  const countRef = useCountUp(value);
  const tiltRef = useTilt<HTMLDivElement>(5);

  return (
    <div ref={tiltRef} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <span ref={countRef} className="text-4xl font-heading font-bold text-sky-500">
        0
      </span>
      <span className="text-3xl font-heading font-bold text-sky-500">+</span>
      <span className="text-slate-500 font-mono text-xs uppercase mt-1 block">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const headingRef = useTextReveal<HTMLHeadingElement>();
  const bioRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter-directional: heading wrapper from left, ghost from right
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

      // Scroll-linked line-by-line bio reveal
      const lines = bioRef.current?.querySelectorAll(".reveal-line");
      if (lines && lines.length > 0) {
        gsap.fromTo(lines,
          { opacity: 0.15, y: 8 },
          {
            opacity: 1, y: 0, stagger: 0.15, ease: "none",
            scrollTrigger: { trigger: bioRef.current, start: "top 70%", end: "bottom 60%", scrub: 1 },
          },
        );
      }

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
      id="about"
      className="relative z-10 bg-slate-50 py-16 md:py-20 overflow-hidden rounded-t-3xl -mt-1"
    >
      <BackgroundNoise seed={202} density={16} />
      <HudReadout position="top-right" lines={["SEC:02 // ABOUT", "SCAN:COMPLETE"]} />

      {/* Ghost text */}
      <span
        ref={ghostRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(10rem,25vw,20rem)] leading-none text-ghost"
        aria-hidden="true"
      >
        ABOUT
      </span>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading area */}
        <div ref={headingWrapRef}>
          <p className="font-mono text-sky-500 uppercase tracking-wider text-sm mb-2">
            &#9656; About Me
          </p>

          <div className="relative inline-block">
            <div
              ref={highlightRef}
              className="absolute -left-2 bottom-1 h-3 bg-sky-100 -z-10 rounded-sm"
              style={{ width: 0 }}
            />
            <h2
              ref={headingRef}
              className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8"
            >
              Building software that makes a difference
            </h2>
          </div>
        </div>

        <div className="mb-6 h-1 w-32 halftone-dots opacity-40" />

        {/* Side-by-side layout */}
        <div className="grid gap-8 md:grid-cols-[55%_1fr]">
          {/* Bio text — in a subtle panel */}
          <div ref={bioRef} className="rounded-xl border border-slate-100 bg-white/60 p-6">
            <p className="reveal-line text-slate-700 leading-relaxed">
              I&apos;m a software engineer passionate about creating clean,
              performant, and thoughtful digital experiences. I believe great
              software sits at the intersection of technical excellence and
              human-centered design.
            </p>
            <p className="reveal-line text-slate-700 leading-relaxed mt-4">
              Currently a junior-year computer science student, I spend my time
              exploring full-stack development, diving into new technologies, and
              building projects that solve real problems.
            </p>
            <p className="reveal-line text-slate-700 leading-relaxed mt-4">
              I&apos;m always looking for opportunities to grow, collaborate, and
              build something meaningful. If you have an interesting project or
              just want to chat — reach out.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Next.js", "Open Source", "UI/UX", "Clean Code", "System Design", "Coffee"].map((tag) => (
                <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-xs text-slate-500 transition-colors hover:border-sky-300 hover:text-sky-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <CornerBrackets className="p-3">
            <div className="grid grid-cols-2 gap-4">
              <StatCard value={10} label="Projects Built" />
              <StatCard value={8} label="Technologies" />
              <StatCard value={3} label="Years Coding" />
              <StatCard value={2} label="Internships" />
            </div>
          </CornerBrackets>
          <p className="mt-4 font-mono text-xs italic text-slate-400">
            // clean code, clear thinking
          </p>
        </div>
      </div>
    </section>
  );
}
