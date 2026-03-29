"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "experience", label: "Experience", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
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
      const sectionIds = ["hero", ...sections.map((s) => s.id)];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const isPinned = style.position === "fixed";

        if (
          (isPinned && rect.top <= 0 && rect.bottom >= viewportCenter) ||
          (!isPinned && rect.top <= viewportCenter && rect.bottom >= viewportCenter)
        ) {
          newIndex = i === 0 ? -1 : i - 1;
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

  // Projects section has a dark bg — SideNav needs lighter inactive colors there
  const onDark = activeIndex === 2; // index 2 = "projects"

  return (
    <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-6 md:flex">
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className="group flex cursor-pointer items-center gap-3"
          aria-label={`Navigate to ${section.label}`}
        >
          <span
            className={`font-mono text-[10px] tracking-wider transition-all duration-300 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${
              activeIndex === i ? "text-sky-500" : onDark ? "text-slate-400" : "text-slate-400"
            }`}
          >
            {section.label.toUpperCase()}
          </span>

          <span
            className={`font-mono text-[10px] transition-colors duration-300 ${
              activeIndex === i
                ? "text-sky-500"
                : onDark
                  ? "text-slate-400 group-hover:text-slate-300"
                  : "text-slate-300 group-hover:text-slate-500"
            }`}
          >
            {section.num}
          </span>

          <div
            className={`h-[2px] rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "w-6 bg-sky-500"
                : onDark
                  ? "w-4 bg-slate-500 group-hover:w-6 group-hover:bg-slate-400"
                  : "w-4 bg-slate-300 group-hover:w-6 group-hover:bg-slate-400"
            }`}
          />
        </button>
      ))}

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-4 font-mono text-[10px] tracking-wider transition-colors hover:text-sky-500 [writing-mode:vertical-lr] rotate-180 ${
          onDark ? "text-slate-400" : "text-slate-400"
        }`}
      >
        RESUME
      </a>
    </div>
  );
}
