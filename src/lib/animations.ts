"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Fade up animation triggered on scroll
export function useScrollFadeUp<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { y: 60, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, []);

  return ref;
}

// Staggered children animation on scroll
export function useStaggerReveal<T extends HTMLElement>(stagger = 0.1) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.children;
    gsap.set(children, { y: 40, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(children, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [stagger]);

  return ref;
}

// Text reveal animation — splits text into words and animates them
export function useTextReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent || "";
    el.innerHTML = "";

    const words = text.split(" ");
    words.forEach((word, i) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";
      wrapper.style.verticalAlign = "top";

      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.textContent = word;
      inner.className = "reveal-word";

      wrapper.appendChild(inner);
      el.appendChild(wrapper);

      if (i < words.length - 1) {
        el.appendChild(document.createTextNode("\u00A0"));
      }
    });

    const wordEls = el.querySelectorAll(".reveal-word");
    gsap.set(wordEls, { y: "110%" });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(wordEls, {
          y: "0%",
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, []);

  return ref;
}

// Counter animation
export function useCountUp(target: number, duration = 2) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { value: 0 };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(obj, {
          value: target,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.value).toString();
          },
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [target, duration]);

  return ref;
}

// Parallax effect
export function useParallax<T extends HTMLElement>(speed = 0.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [speed]);

  return ref;
}

// Magnetic button effect
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
}
