"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "about", label: "About", num: "01" },
  { id: "projects", label: "Projects", num: "02" },
  { id: "experience", label: "Experience", num: "03" },
  { id: "contact", label: "Contact", num: "04" },
];

export default function SideNav() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const activeRef = useRef(-1);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < 100) {
        if (activeRef.current !== -1) {
          activeRef.current = -1;
          setActiveIndex(-1);
        }
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      let newIndex = -1;

      // Check each section — use the pin-spacer if it exists (GSAP wraps pinned sections)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (!el) continue;

        // GSAP pin-spacer wraps the pinned element — check both the spacer and the element
        const spacer = el.closest(".pin-spacer") as HTMLElement | null;
        const checkEl = spacer || el;
        const rect = checkEl.getBoundingClientRect();

        // Section is "active" if it occupies the center of the viewport
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          newIndex = i;
          break;
        }
      }

      if (newIndex !== activeRef.current) {
        activeRef.current = newIndex;
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 md:block" aria-label="Section navigation">
      <div className="rounded-full border border-slate-200 bg-white/80 px-3 py-5 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col items-center gap-5">
          {sections.map((section, i) => {
            const isActive = activeIndex === i;

            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className="group relative flex flex-col items-center gap-1"
                aria-label={`Navigate to ${section.label}`}
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-3 w-3 bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]"
                      : "h-2 w-2 bg-slate-400 group-hover:bg-slate-600 group-hover:scale-125"
                  }`}
                />

                <span
                  className={`font-mono text-[9px] leading-none transition-colors duration-300 ${
                    isActive ? "text-sky-500 font-bold" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  {section.num}
                </span>

                <div className="pointer-events-none absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1 font-mono text-[10px] text-white opacity-0 shadow-lg transition-all duration-200 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0">
                  {section.label}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-4 border-transparent border-l-slate-900" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex justify-center">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-slate-200 bg-white/80 px-2.5 py-1.5 font-mono text-[9px] font-medium tracking-wider text-slate-500 shadow-sm backdrop-blur-sm transition-colors hover:border-sky-500 hover:text-sky-500"
        >
          CV
        </a>
      </div>
    </nav>
  );
}
