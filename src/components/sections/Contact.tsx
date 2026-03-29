"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@example.com",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

function SocialButton({ social }: { social: SocialLink }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.2);

  return (
    <a
      ref={ref}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-lg border border-slate-600 px-6 py-3 font-mono text-sm text-slate-300 transition-colors duration-300 hover:border-sky-500 hover:text-white"
    >
      <span className="absolute inset-0 -translate-x-full bg-sky-500 transition-transform duration-300 ease-out group-hover:translate-x-0" />
      <span className="relative z-10 flex items-center gap-2">
        {social.icon}
        {social.label}
      </span>
    </a>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        x: -40, opacity: 0, duration: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(ghostRef.current, {
        x: 100, opacity: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.to(ghostRef.current, {
        yPercent: -20, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      // Quote line-by-line reveal
      const lines = quoteRef.current?.querySelectorAll(".reveal-line");
      if (lines && lines.length > 0) {
        gsap.fromTo(lines,
          { opacity: 0.2, y: 8 },
          {
            opacity: 1, y: 0, stagger: 0.2, ease: "none",
            scrollTrigger: { trigger: quoteRef.current, start: "top 75%", end: "bottom 65%", scrub: 1 },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-slate-900 py-16 md:py-20"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-12 gap-8">
          <div ref={contentRef} className="col-span-12 md:col-span-6">
            <p className="mb-2 font-mono text-sm uppercase tracking-wider text-sky-400">
              &#9656; Get In Touch
            </p>
            <h2 className="mb-6 font-heading text-5xl font-bold text-white md:text-6xl">
              Let&apos;s Connect
            </h2>
            <div ref={quoteRef} className="mb-8 max-w-lg font-heading text-2xl leading-snug text-slate-400 md:text-3xl">
              <span className="reveal-line block">Building software that matters,</span>
              <span className="reveal-line block">one line of code at a time.</span>
              <span className="reveal-line block">Always learning, always shipping.</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <SocialButton key={social.label} social={social} />
              ))}
            </div>
          </div>

          <div className="col-span-12 hidden items-center justify-center md:col-span-6 md:flex">
            <span ref={ghostRef} className="select-none font-display text-[16rem] leading-none text-slate-800">
              06
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
