"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextReveal, useScrollFadeUp, useMagnetic } from "@/lib/animations";

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
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@example.com",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

function SocialButton({ social }: { social: SocialLink }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <a
      ref={ref}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-3"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-300 group-hover:border-sky-500 group-hover:bg-sky-500 group-hover:text-white">
        {social.icon}
      </div>
      <span className="font-mono text-sm font-medium text-slate-500 transition-colors duration-300 group-hover:text-sky-500">
        {social.label}
      </span>
    </a>
  );
}

export default function Contact() {
  const headingRef = useTextReveal<HTMLHeadingElement>();
  const contentRef = useScrollFadeUp<HTMLDivElement>();
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

  return (
    <section ref={sectionRef} id="contact" className="relative bg-slate-50 py-32 px-6 overflow-hidden">
      {/* Ghost text */}
      <span
        ref={ghostRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(10rem,25vw,20rem)] leading-none text-ghost"
        aria-hidden="true"
      >
        06
      </span>

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-4 font-mono text-sm font-medium tracking-widest text-sky-500 uppercase">
          &#9656; Get In Touch
        </p>

        <h2
          ref={headingRef}
          className="mb-6 font-heading text-4xl font-bold text-slate-900 md:text-5xl"
        >
          Let&apos;s Connect
        </h2>

        <div ref={contentRef}>
          <p className="mb-12 text-lg leading-relaxed text-slate-500">
            I&apos;m always open to new opportunities, collaborations, or just a
            friendly chat about tech. Feel free to reach out through any of the
            platforms below.
          </p>

          <div className="flex justify-center gap-12">
            {socials.map((social) => (
              <SocialButton key={social.label} social={social} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
