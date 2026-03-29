"use client";

import { useState } from "react";

const sections = [
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "experience", label: "Experience", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed right-6 top-6 z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-white/80 shadow-sm backdrop-blur-sm md:hidden"
        aria-label="Toggle menu"
      >
        <span className={`h-0.5 w-5 bg-slate-700 transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 w-5 bg-slate-700 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-5 bg-slate-700 transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      <div
        className={`fixed inset-0 z-[55] bg-white/95 backdrop-blur-md transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className="flex items-center gap-4 font-heading text-3xl font-bold text-slate-900 transition-colors hover:text-sky-500"
            >
              <span className="font-mono text-sm text-slate-300">{section.num}</span>
              {section.label}
            </button>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-full border border-slate-300 px-6 py-2 font-mono text-sm text-slate-600 transition-all hover:border-sky-500 hover:text-sky-500"
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
