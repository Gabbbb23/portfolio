"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsDesktop(true);

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tickerFn = () => {
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    gsap.ticker.add(tickerFn);
    document.addEventListener("mousemove", handleMove);

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    const observe = () => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    observe();

    const observer = new MutationObserver(observe);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      gsap.ticker.remove(tickerFn);
      document.removeEventListener("mousemove", handleMove);
      observer.disconnect();
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-[width,height,border-color] duration-200 ease-out ${
        isHovering
          ? "h-12 w-12 border-sky-500/80"
          : "h-6 w-6 border-sky-500/50"
      }`}
    />
  );
}
