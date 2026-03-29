"use client";

import { useMagnetic } from "@/lib/animations";

export default function Footer() {
  const backToTopRef = useMagnetic<HTMLButtonElement>(0.2);

  return (
    <footer className="bg-white py-12 px-6 border-t border-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        <button
          ref={backToTopRef}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-all duration-300 hover:border-sky-500 hover:text-sky-500"
          aria-label="Back to top"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <div className="flex gap-6 font-mono text-sm text-slate-500">
          {["About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="transition-colors duration-300 hover:text-sky-500"
            >
              {item}
            </a>
          ))}
        </div>

        <p className="font-mono text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Gab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
