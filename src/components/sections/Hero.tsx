"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "@/lib/animations";
import HudReadout from "@/components/HudReadout";

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
  shape,
}: {
  size: number;
  x: string;
  y: string;
  shape: "circle" | "square" | "diamond";
}) {
  const shapeClasses =
    shape === "circle"
      ? "rounded-full"
      : shape === "diamond"
        ? "rotate-45"
        : "";

  return (
    <div
      className={`absolute border border-slate-300 opacity-0 ${shapeClasses}`}
      style={{ width: size, height: size, left: x, top: y }}
    />
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);

  const btnWorkRef = useMagnetic<HTMLAnchorElement>(0.2);
  const btnContactRef = useMagnetic<HTMLAnchorElement>(0.2);

  // Choreographed entrance timeline
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    const letters = el.querySelectorAll(".hero-letter");

    const ctx = gsap.context(() => {
      // Set initial invisible states
      gsap.set(ghostRef.current, { x: 200, opacity: 0 });
      gsap.set(labelRef.current, { y: 15, opacity: 0 });
      gsap.set(letters, { y: 40, rotateX: -10, opacity: 0 });
      gsap.set(subtitleRef.current, { opacity: 0 });
      gsap.set(ctaRef.current!.children, { y: 20, opacity: 0 });
      if (shapesRef.current) gsap.set(shapesRef.current.children, { scale: 0.5, opacity: 0 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // t=0.1: Ghost "01" slams in from the right
      tl.to(ghostRef.current, { x: 0, opacity: 1, duration: 0.4, ease: "power4.out" }, 0.1);

      // t=0.3: Label fades from y:15
      tl.to(labelRef.current, { y: 0, opacity: 1, duration: 0.3 }, 0.3);

      // t=0.5: "Gab" letters stagger in with 3D rotation
      tl.to(letters, {
        y: 0, rotateX: 0, opacity: 1,
        stagger: 0.06, duration: 0.4,
      }, 0.5);

      // t=0.9: Subtitle area appears, start typing
      tl.to(subtitleRef.current, { opacity: 1, duration: 0.3 }, 0.9);
      tl.call(() => setTypingStarted(true), [], 0.9);

      // t=1.0: CTA buttons slide up
      tl.to(ctaRef.current!.children, {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.4,
      }, 1.0);

      // t=1.2: Floating shapes drift in, then float
      if (shapesRef.current) {
        tl.to(shapesRef.current.children, {
          scale: 1, opacity: 1, stagger: 0.04, duration: 0.5,
        }, 1.2);

        // Start floating after entrance
        tl.call(() => {
          if (!shapesRef.current) return;
          Array.from(shapesRef.current.children).forEach((child, i) => {
            gsap.to(child, {
              y: "+=25", x: "+=10",
              duration: 4 + i * 0.3,
              repeat: -1, yoyo: true, ease: "sine.inOut",
            });
          });
        }, [], ">");
      }

      // t=1.5: Scroll indicator
      tl.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.4 }, 1.5);

      // Ghost text parallax
      gsap.to(ghostRef.current, {
        yPercent: -30, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      // Pin hero — About section slides over it
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      // Hero content recedes as user scrolls away
      const contentEl = sectionRef.current?.querySelector(".hero-content");
      if (contentEl) {
        gsap.to(contentEl, {
          scale: 0.95, opacity: 0.6, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }

      // Floating shapes parallax faster
      if (shapesRef.current) {
        gsap.to(shapesRef.current, {
          yPercent: -50, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Typing effect — only starts after timeline triggers it
  useEffect(() => {
    if (!typingStarted) return;

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
  }, [displayText, isDeleting, titleIndex, typingStarted]);

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-white crt-scanlines tv-noise"
      style={{
        backgroundImage: "radial-gradient(circle, #E2E8F0 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <HudReadout position="top-right" lines={["SIG:OK // FREQ:443.2", "NODE:ACTIVE", "v2.0.1"]} />

      {/* Diagonal slash lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-10%] left-[15%] h-[120%] w-[1px] rotate-[12deg] bg-slate-200/60" />
        <div className="absolute top-[-10%] right-[20%] h-[120%] w-[1px] -rotate-[8deg] bg-slate-200/40" />
      </div>

      {/* 12-column grid container */}
      <div className="hero-content relative z-10 mx-auto grid w-full max-w-6xl grid-cols-12 items-center gap-8 px-6">
        {/* Left side — 7 columns */}
        <div className="col-span-12 md:col-span-7">
          <p
            ref={labelRef}
            className="mb-2 font-mono text-sm font-medium tracking-wider text-sky-500 uppercase"
          >
            &#9658; Hello, I&apos;m
          </p>

          <h1
            ref={nameRef}
            className="mb-6 font-heading text-7xl font-bold leading-none tracking-tight text-slate-900 md:text-8xl lg:text-9xl glitch-text"
            data-text="Gab"
            style={{ perspective: "600px" }}
          >
            {"Gab".split("").map((char, i) => (
              <span key={i} className="hero-letter inline-block">{char}</span>
            ))}
          </h1>

          <div ref={subtitleRef} className="mb-10 h-10">
            <span className="text-xl font-light text-slate-500">
              {displayText}
            </span>
            <span className="ml-0.5 inline-block h-6 w-[2px] animate-pulse bg-sky-500" />
          </div>

          <div ref={ctaRef} className="flex flex-col gap-4 sm:flex-row">
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

        {/* Right side — 5 columns, decorative (hidden on mobile) */}
        <div className="relative col-span-5 hidden md:block">
          {/* Giant "01" ghost number */}
          <span
            ref={ghostRef}
            className="pointer-events-none absolute -right-8 -top-24 select-none font-display text-[20rem] leading-none text-slate-200"
            aria-hidden="true"
          >
            01
          </span>

          {/* Floating shapes clustered on the right */}
          <div ref={shapesRef} className="pointer-events-none absolute inset-0">
            <FloatingShape size={60} x="10%" y="5%" shape="circle" />
            <FloatingShape size={40} x="70%" y="0%" shape="diamond" />
            <FloatingShape size={50} x="60%" y="65%" shape="circle" />
            <FloatingShape size={35} x="20%" y="75%" shape="diamond" />
            <FloatingShape size={45} x="40%" y="20%" shape="circle" />
            <FloatingShape size={30} x="85%" y="45%" shape="square" />
          </div>

          {/* Floating code fragments */}
          <div className="pointer-events-none absolute inset-0 select-none">
            {[
              { text: "const", x: "15%", y: "20%", size: "text-sm" },
              { text: "=>", x: "80%", y: "35%", size: "text-base" },
              { text: "{ }", x: "55%", y: "60%", size: "text-lg" },
              { text: "async", x: "75%", y: "50%", size: "text-xs" },
              { text: "</>", x: "30%", y: "75%", size: "text-sm" },
              { text: "npm run dev", x: "60%", y: "12%", size: "text-xs" },
            ].map((frag) => (
              <span
                key={frag.text}
                className={`absolute font-mono text-slate-400/70 ${frag.size}`}
                style={{ left: frag.x, top: frag.y }}
              >
                {frag.text}
              </span>
            ))}
          </div>

          {/* Decorative code editor window */}
          <div className="relative z-[5] mt-16 w-full max-w-sm rotate-2 rounded-lg border border-slate-200 bg-slate-900 overflow-hidden shadow-lg">
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-2">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                <div className="h-2 w-2 rounded-full bg-green-400" />
              </div>
              <span className="font-mono text-[10px] text-slate-500">portfolio.ts</span>
            </div>
            <div className="p-4 font-mono text-xs leading-relaxed">
              <p><span className="text-sky-400">const</span> <span className="text-white">portfolio</span> <span className="text-slate-400">=</span> <span className="text-slate-400">{"{"}</span></p>
              <p className="pl-4"><span className="text-white">name</span><span className="text-slate-400">:</span> <span className="text-emerald-400">&quot;Gab&quot;</span><span className="text-slate-400">,</span></p>
              <p className="pl-4"><span className="text-white">role</span><span className="text-slate-400">:</span> <span className="text-emerald-400">&quot;Full-Stack Developer&quot;</span><span className="text-slate-400">,</span></p>
              <p className="pl-4"><span className="text-white">skills</span><span className="text-slate-400">:</span> <span className="text-slate-400">[</span><span className="text-emerald-400">&quot;React&quot;</span><span className="text-slate-400">,</span> <span className="text-emerald-400">&quot;Node.js&quot;</span><span className="text-slate-400">,</span> <span className="text-emerald-400">&quot;TS&quot;</span><span className="text-slate-400">],</span></p>
              <p className="pl-4"><span className="text-white">passion</span><span className="text-slate-400">:</span> <span className="text-emerald-400">&quot;Building things that matter&quot;</span></p>
              <p><span className="text-slate-400">{"}"}</span><span className="text-slate-400">;</span></p>
            </div>
            <div className="flex gap-4 border-t border-slate-800 px-3 py-1.5 font-mono text-[10px] text-slate-500">
              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />ONLINE</span>
              <span className="flex items-center gap-0.5">
                <span className="h-1 w-0.5 rounded-sm bg-sky-400" />
                <span className="h-1.5 w-0.5 rounded-sm bg-sky-400" />
                <span className="h-2 w-0.5 rounded-sm bg-sky-400" />
                <span className="h-2.5 w-0.5 rounded-sm bg-sky-400" />
                <span className="ml-1">SIG:STRONG</span>
              </span>
              <span>TS</span>
              <span>UTF-8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator at bottom center */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs font-medium tracking-widest text-slate-400 uppercase">
            Scroll
          </span>
          <div className="h-10 w-[1px] overflow-hidden bg-slate-200">
            <div className="h-3 w-full animate-bounce bg-sky-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
