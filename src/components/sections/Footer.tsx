"use client";

import { useMagnetic } from "@/lib/animations";

export default function Footer() {
  const backToTopRef = useMagnetic<HTMLButtonElement>(0.2);

  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        <button
          ref={backToTopRef}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-600 text-slate-400 transition-all duration-300 hover:border-sky-400 hover:text-sky-400"
          aria-label="Back to top"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <div className="flex gap-6 font-mono text-sm text-slate-400">
          {["About", "Projects", "Experience", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="transition-colors duration-300 hover:text-sky-400"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex gap-3">
          <a href="https://github.com/Gabbbb23" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-500 transition-colors hover:border-sky-400 hover:text-sky-400">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
          </a>
          <a href="https://linkedin.com/in/gabbbb" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-500 transition-colors hover:border-sky-400 hover:text-sky-400">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
          <a href="mailto:gabvinculado23@gmail.com" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-500 transition-colors hover:border-sky-400 hover:text-sky-400">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3 font-mono text-xs text-slate-500">
          <span>Built with</span>
          {["Next.js", "React", "Tailwind CSS", "GSAP", "TypeScript"].map((tech) => (
            <span key={tech} className="rounded bg-slate-800 px-2 py-0.5 text-slate-400">{tech}</span>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-slate-600">
          <span className="flex items-center gap-0.5">
            <span className="h-1 w-0.5 rounded-sm bg-sky-500" />
            <span className="h-1.5 w-0.5 rounded-sm bg-sky-500" />
            <span className="h-2 w-0.5 rounded-sm bg-sky-500" />
            <span className="h-2.5 w-0.5 rounded-sm bg-sky-500" />
          </span>
          <span>SIGNAL:ACTIVE // NODE:DEPLOYED // UPTIME:99.9%</span>
        </div>

        <p className="font-mono text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Gab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
