"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScroll = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const moveIndicator = useCallback((index: number) => {
    setActiveIndex(index);
    const link = linkRefs.current[index];
    const indicator = indicatorRef.current;
    if (!link || !indicator) return;

    gsap.to(indicator, {
      x: link.offsetLeft,
      width: link.offsetWidth,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 },
      );

      // Hide indicator when in hero
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom center",
        onEnter: () => {
          gsap.to(indicatorRef.current, { opacity: 0, duration: 0.2 });
          setActiveIndex(-1);
        },
        onEnterBack: () => {
          gsap.to(indicatorRef.current, { opacity: 0, duration: 0.2 });
          setActiveIndex(-1);
        },
      });

      // Active section tracking
      const sections = ["about", "skills", "projects", "experience", "contact"];
      sections.forEach((id, index) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => moveIndicator(index),
          onEnterBack: () => moveIndicator(index),
          onLeave: () => {
            if (index === sections.length - 1) {
              gsap.to(indicatorRef.current, { opacity: 0, duration: 0.2 });
              setActiveIndex(-1);
            }
          },
          onLeaveBack: () => {
            if (index === 0) {
              gsap.to(indicatorRef.current, { opacity: 0, duration: 0.2 });
              setActiveIndex(-1);
            }
          },
        });
      });
    });

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 50);
      if (currentScroll > 100) {
        setHidden(currentScroll > lastScroll.current);
      } else {
        setHidden(false);
      }
      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [moveIndicator]);

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 z-40 w-full transition-transform duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-5 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            : "bg-white border-b border-slate-200"
        }`}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-heading text-xl font-bold text-slate-900"
        >
          Gab<span className="text-sky-500">.</span>
        </a>

        {/* Desktop links with active indicator */}
        <div className="relative hidden items-center gap-8 md:flex">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.href}
              label={link.label}
              href={link.href}
              ref={(el) => { linkRefs.current[i] = el; }}
              isActive={activeIndex === i}
            />
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-300 px-5 py-2 font-mono text-sm font-medium text-slate-700 no-underline transition-all duration-300 hover:border-sky-500 hover:text-sky-500"
          >
            Resume
          </a>
          {/* Sliding indicator line */}
          <div
            ref={indicatorRef}
            className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-sky-500 opacity-0"
            style={{ width: 0 }}
          />
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 bg-slate-700 transition-all duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-slate-700 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-slate-700 transition-all duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-white border-b border-slate-200 transition-all duration-500 md:hidden ${
          mobileOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-mono text-lg font-medium text-slate-500 transition-colors hover:text-sky-500"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-300 px-6 py-2 font-mono text-sm font-medium text-slate-700 transition-all duration-300 hover:border-sky-500 hover:text-sky-500"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}

import { forwardRef } from "react";

const NavLink = forwardRef<HTMLAnchorElement, { label: string; href: string; isActive: boolean }>(
  ({ label, href, isActive }, ref) => {
    const magneticRef = useMagnetic<HTMLAnchorElement>(0.2);

    const combinedRef = (el: HTMLAnchorElement | null) => {
      (magneticRef as React.MutableRefObject<HTMLAnchorElement | null>).current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLAnchorElement | null>).current = el;
    };

    return (
      <a
        ref={combinedRef}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }}
        className={`relative font-mono text-sm font-medium transition-colors duration-300 ${
          isActive ? "text-sky-500" : "text-slate-500 hover:text-sky-500"
        }`}
      >
        {label}
      </a>
    );
  }
);
NavLink.displayName = "NavLink";
