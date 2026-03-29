"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollFadeUp, useTextReveal, useCountUp } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

function StatItem({ value, label }: { value: number; label: string }) {
  const countRef = useCountUp(value);

  return (
    <div className="rounded-xl bg-white p-6 text-center border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
      <div className="text-4xl font-bold text-sky-500 md:text-5xl">
        <span ref={countRef}>0</span>+
      </div>
      <p className="mt-2 font-mono text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

export default function About() {
  const headingRef = useTextReveal<HTMLHeadingElement>();
  const textRef = useScrollFadeUp<HTMLDivElement>();
  const statsRef = useScrollFadeUp<HTMLDivElement>();
  const ghostRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const headingWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter-directional entrance: heading from left, ghost from right
      gsap.from(headingWrapRef.current, {
        x: -80, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(ghostRef.current, {
        x: 120, opacity: 0, duration: 1.0, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Ghost parallax
      gsap.to(ghostRef.current, {
        yPercent: -20, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative bg-slate-50 py-32 px-6 overflow-hidden">
      {/* Ghost text */}
      <span
        ref={ghostRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(10rem,25vw,20rem)] leading-none text-ghost"
        aria-hidden="true"
      >
        ABOUT
      </span>

      <div className="relative mx-auto max-w-6xl">
        <div ref={headingWrapRef}>
          <p className="mb-4 font-mono text-sm font-medium tracking-widest text-sky-500 uppercase">
            &#9656; About Me
          </p>

          <h2
            ref={headingRef}
            className="mb-12 font-heading text-4xl font-bold text-slate-900 md:text-5xl"
          >
            Building software that makes a difference
          </h2>
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          <div ref={textRef} className="space-y-6">
            <p className="text-lg leading-relaxed text-slate-700">
              I&apos;m a software engineer passionate about creating clean, performant,
              and thoughtful digital experiences. I believe great software sits at the
              intersection of technical excellence and human-centered design.
            </p>
            <p className="text-lg leading-relaxed text-slate-700">
              Currently a junior-year computer science student, I spend my time
              exploring full-stack development, diving into new technologies, and
              building projects that solve real problems. When I&apos;m not coding,
              you&apos;ll find me exploring new tools, contributing to open source, or
              learning about system design.
            </p>
            <p className="text-lg leading-relaxed text-slate-700">
              I&apos;m always looking for opportunities to grow, collaborate, and build
              something meaningful. If you have an interesting project or just want to
              chat — reach out.
            </p>
          </div>

          <div ref={statsRef} className="flex items-center">
            <div className="grid w-full grid-cols-2 gap-6">
              <StatItem value={10} label="Projects Built" />
              <StatItem value={8} label="Technologies" />
              <StatItem value={3} label="Years Coding" />
              <StatItem value={2} label="Internships" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
