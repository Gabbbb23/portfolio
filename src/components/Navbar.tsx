"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useMagnetic } from "@/lib/animations";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function NavLink({ label, href }: { label: string; href: string }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.2);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      className="group relative font-mono text-sm font-medium text-slate-500 transition-colors duration-300 hover:text-sky-500"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-sky-500 transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScroll = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 z-50 w-full transition-transform duration-500 ${
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

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-300 px-5 py-2 font-mono text-sm font-medium text-slate-700 no-underline transition-all duration-300 hover:border-sky-500 hover:text-sky-500"
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-slate-700 transition-all duration-300 ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-700 transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-700 transition-all duration-300 ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
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
