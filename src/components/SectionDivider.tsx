"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionDivider({ className = "" }: { className?: string }) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={`relative z-10 overflow-hidden py-4 ${className}`}>
      <div ref={lineRef} className="mx-auto h-px max-w-5xl bg-sky-500/40" />
    </div>
  );
}
