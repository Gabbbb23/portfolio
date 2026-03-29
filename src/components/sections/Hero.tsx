"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const titles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Problem Solver",
  "Creative Builder",
];

function FloatingShape({
  size,
  x,
  y,
  delay,
  shape,
}: {
  size: number;
  x: string;
  y: string;
  delay: number;
  shape: "circle" | "square" | "diamond";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, scale: 0 });
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      delay: 1 + delay,
      ease: "power3.out",
    });

    gsap.to(el, {
      y: "+=30",
      x: "+=15",
      duration: 4 + delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [delay]);

  const shapeClasses =
    shape === "circle"
      ? "rounded-full"
      : shape === "diamond"
        ? "rotate-45"
        : "";

  return (
    <div
      ref={ref}
      className={`absolute border border-slate-200 ${shapeClasses}`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
      }}
    />
  );
}

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const btnWorkRef = useMagnetic<HTMLAnchorElement>(0.2);
  const btnContactRef = useMagnetic<HTMLAnchorElement>(0.2);

  // Name reveal animation
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    const text = el.textContent || "";
    el.innerHTML = "";

    [...text].forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(100%)";
      if (char === " ") span.style.width = "0.3em";
      el.appendChild(span);
    });

    gsap.to(el.children, {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      stagger: 0.06,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  // Subtitle and CTA entrance
  useEffect(() => {
    gsap.from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 1.2,
    });

    gsap.from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 1.5,
    });

    gsap.from(scrollIndicatorRef.current, {
      opacity: 0,
      duration: 1,
      delay: 2,
    });

    // Ghost text parallax
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

  // Typing effect
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentTitle) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentTitle.substring(0, displayText.length - 1)
          : currentTitle.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6"
      style={{
        backgroundImage: "radial-gradient(circle, #E2E8F0 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Diagonal slashes — P3R signature element */}
      <div className="pointer-events-none absolute top-[-10vh] left-[15%] h-[120vh] w-[1px] rotate-[15deg] bg-slate-200 opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute top-[-10vh] right-[20%] h-[120vh] w-[1px] -rotate-12 bg-slate-200 opacity-50" aria-hidden="true" />

      {/* Ghost text — P3R style */}
      <span
        ref={ghostRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(15rem,35vw,30rem)] leading-none text-ghost"
        aria-hidden="true"
      >
        01
      </span>

      {/* Floating shapes — thin outlines only */}
      <FloatingShape size={60} x="10%" y="20%" delay={0} shape="circle" />
      <FloatingShape size={40} x="80%" y="15%" delay={0.3} shape="diamond" />
      <FloatingShape size={50} x="75%" y="70%" delay={0.6} shape="circle" />
      <FloatingShape size={35} x="15%" y="75%" delay={0.9} shape="diamond" />
      <FloatingShape size={45} x="50%" y="10%" delay={0.4} shape="circle" />
      <FloatingShape size={30} x="90%" y="50%" delay={0.7} shape="square" />

      <div className="relative z-10 text-center">
        <p className="mb-4 font-mono text-sm font-medium tracking-widest text-slate-500 uppercase">
          Hello, I&apos;m
        </p>

        <h1
          ref={nameRef}
          className="mb-6 font-heading text-[clamp(4rem,12vw,10rem)] font-bold leading-none tracking-tight text-slate-900"
        >
          Gab
        </h1>

        <div ref={subtitleRef} className="mb-12 h-10">
          <span className="text-xl font-light text-slate-500 md:text-2xl">
            {displayText}
          </span>
          <span className="ml-0.5 inline-block h-6 w-[2px] animate-pulse bg-sky-500" />
        </div>

        <div ref={ctaRef} className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
          <a
            ref={btnWorkRef}
            href="#projects"
            onClick={handleScrollTo("#projects")}
            className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-10 py-4 text-base font-semibold text-white transition-colors duration-300 hover:bg-sky-600"
          >
            View My Work
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            ref={btnContactRef}
            href="#contact"
            onClick={handleScrollTo("#contact")}
            className="inline-flex items-center rounded-full border border-slate-300 px-10 py-4 text-base font-semibold text-slate-700 transition-all duration-300 hover:border-sky-500 hover:text-sky-500"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs font-medium tracking-widest text-slate-400 uppercase">
            Scroll
          </span>
          <div className="h-10 w-[1px] bg-slate-200 overflow-hidden">
            <div className="h-3 w-full animate-bounce bg-sky-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
