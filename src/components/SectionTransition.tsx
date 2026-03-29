"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionTransition() {
  const wipeRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });

      // Diagonal wipe enters from bottom-left
      tl.fromTo(
        wipeRef.current,
        { clipPath: "polygon(-20% 120%, 0% 100%, -20% 140%, -40% 160%)" },
        { clipPath: "polygon(-20% -20%, 120% -20%, 120% 100%, -20% 120%)", duration: 0.5 }
      );
      // Wipe exits to top-right
      tl.to(wipeRef.current, {
        clipPath: "polygon(120% -40%, 140% -20%, 120% -20%, 100% 0%)",
        duration: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative h-[50vh] -my-[25vh] z-40 pointer-events-none">
      <div
        ref={wipeRef}
        className="fixed inset-0 bg-sky-500/8 z-40"
        style={{ clipPath: "polygon(-20% 120%, 0% 100%, -20% 140%, -40% 160%)" }}
      />
      {/* Diamond divider marker in the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <div className="relative flex items-center justify-center">
          <div className="h-[1px] w-16 bg-slate-200" />
          <div className="mx-2 h-3 w-3 rotate-45 border border-slate-200 bg-white" />
          <div className="h-[1px] w-16 bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
