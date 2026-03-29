"use client";

import { useState, useEffect } from "react";

export default function FloatingLogo() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`fixed left-6 top-6 z-50 font-heading text-lg font-bold text-slate-900 transition-all duration-300 ${
        scrolled ? "rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm" : ""
      }`}
    >
      Gab<span className="text-sky-500">.</span>
    </a>
  );
}
