"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextReveal, useScrollFadeUp, useCountUp } from "@/lib/animations";
import CornerBrackets from "@/components/CornerBrackets";

gsap.registerPlugin(ScrollTrigger);

function StatCard({ value, label }: { value: number; label: string }) {
  const countRef = useCountUp(value);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
      <span ref={countRef} className="text-3xl font-heading font-bold text-sky-500">
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
  const bioRef = useScrollFadeUp<HTMLDivElement>();
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter-directional: heading wrapper from left, ghost from right
      gsap.from(headingWrapRef.current, {
        x: -60,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(ghostRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-slate-50 py-16 md:py-20 relative overflow-hidden"
    >
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
              className="absolute -left-2 top-0 h-full bg-sky-100/60 -z-10 rounded-sm"
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

        {/* Overlapping layout */}
        <div className="relative">
          {/* Bio text */}
          <div ref={bioRef} className="md:w-[55%] relative z-10">
            <p className="text-slate-700 leading-relaxed">
              I&apos;m a software engineer passionate about creating clean,
              performant, and thoughtful digital experiences. I believe great
              software sits at the intersection of technical excellence and
              human-centered design.
            </p>
            <p className="text-slate-700 leading-relaxed mt-4">
              Currently a junior-year computer science student, I spend my time
              exploring full-stack development, diving into new technologies, and
              building projects that solve real problems.
            </p>
            <p className="text-slate-700 leading-relaxed mt-4">
              I&apos;m always looking for opportunities to grow, collaborate, and
              build something meaningful. If you have an interesting project or
              just want to chat — reach out.
            </p>
          </div>

          {/* Stat cards */}
          <div className="md:absolute md:right-0 md:top-[-2rem] md:w-[50%] mt-8 md:mt-0">
            <CornerBrackets className="p-3">
              <div className="grid grid-cols-2 gap-4">
                <StatCard value={10} label="Projects Built" />
                <StatCard value={8} label="Technologies" />
                <StatCard value={3} label="Years Coding" />
                <StatCard value={2} label="Internships" />
              </div>
            </CornerBrackets>
          </div>
        </div>
      </div>
    </section>
  );
}
