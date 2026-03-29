"use client";

import { useMemo } from "react";

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const shapes = ["circle", "cross", "diamond", "square", "dot-grid"] as const;
const codeFragments = ["0x4F", "//", "[ ]", ">>>", "++", "&&", "!=", "=>", "{}", "01", "**", "<<", ":::", "null", "fn()", "$."];

const driftKeyframes = `
@keyframes noise-drift-1 {
  0%, 100% { transform: translate(0, 0) rotate(var(--r)); }
  25% { transform: translate(12px, -8px) rotate(var(--r)); }
  50% { transform: translate(-6px, 14px) rotate(var(--r)); }
  75% { transform: translate(10px, 6px) rotate(var(--r)); }
}
@keyframes noise-drift-2 {
  0%, 100% { transform: translate(0, 0) rotate(var(--r)); }
  33% { transform: translate(-14px, 10px) rotate(var(--r)); }
  66% { transform: translate(8px, -12px) rotate(var(--r)); }
}
@keyframes noise-drift-3 {
  0%, 100% { transform: translate(0, 0) rotate(var(--r)); }
  20% { transform: translate(16px, 4px) rotate(var(--r)); }
  40% { transform: translate(-4px, -16px) rotate(var(--r)); }
  60% { transform: translate(-12px, 8px) rotate(var(--r)); }
  80% { transform: translate(6px, -10px) rotate(var(--r)); }
}
@keyframes noise-drift-4 {
  0%, 100% { transform: translate(0, 0) rotate(var(--r)); }
  30% { transform: translate(-10px, -14px) rotate(var(--r)); }
  70% { transform: translate(14px, 12px) rotate(var(--r)); }
}
@keyframes noise-drift-5 {
  0%, 100% { transform: translate(0, 0) rotate(var(--r)); }
  15% { transform: translate(8px, 16px) rotate(var(--r)); }
  45% { transform: translate(-16px, -4px) rotate(var(--r)); }
  75% { transform: translate(4px, -14px) rotate(var(--r)); }
}
`;

const driftNames = ["noise-drift-1", "noise-drift-2", "noise-drift-3", "noise-drift-4", "noise-drift-5"];

interface BackgroundNoiseProps {
  seed?: number;
  density?: number;
  className?: string;
  variant?: "light" | "dark";
}

export default function BackgroundNoise({
  seed = 42,
  density = 18,
  className = "",
  variant = "light",
}: BackgroundNoiseProps) {
  const elements = useMemo(() => {
    const rand = seededRandom(seed);
    const items: {
      type: "shape" | "text" | "line";
      shape?: typeof shapes[number];
      text?: string;
      x: number;
      y: number;
      size: number;
      rotation: number;
      opacity: number;
      drift: string;
      duration: number;
      delay: number;
    }[] = [];

    for (let i = 0; i < density; i++) {
      const type = rand() < 0.4 ? "shape" : rand() < 0.7 ? "text" : "line";
      const isText = type === "text";
      items.push({
        type,
        shape: shapes[Math.floor(rand() * shapes.length)],
        text: codeFragments[Math.floor(rand() * codeFragments.length)],
        x: rand() * 90 + 5,
        y: rand() * 90 + 5,
        size: 20 + rand() * 44,
        rotation: type === "text" ? (rand() * 20 - 10) : rand() * 360,
        opacity: isText ? (0.20 + rand() * 0.25) : (0.15 + rand() * 0.20),
        drift: driftNames[Math.floor(rand() * driftNames.length)],
        duration: 15 + rand() * 25,
        delay: -(rand() * 20),
      });
    }
    return items;
  }, [seed, density]);

  const baseColor = variant === "dark" ? "rgb(148,163,184)" : "rgb(148,163,184)"; // slate-400 for both — dark bg needs same brightness since opacity handles visibility

  return (
    <div className={`pointer-events-none absolute inset-0 select-none hidden md:block ${className}`} aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: driftKeyframes }} />
      {elements.map((el, i) => {
        const anim = `${el.drift} ${el.duration}s ease-in-out ${el.delay}s infinite`;
        const style: React.CSSProperties = {
          position: "absolute",
          left: `${el.x}%`,
          top: `${el.y}%`,
          opacity: el.opacity,
          "--r": `${el.rotation}deg`,
          animation: anim,
          willChange: "transform",
        } as React.CSSProperties;

        if (el.type === "text") {
          return (
            <span
              key={i}
              className="font-mono font-medium"
              style={{
                ...style,
                fontSize: `${el.size * 0.45}px`,
                color: baseColor,
                letterSpacing: "0.05em",
              }}
            >
              {el.text}
            </span>
          );
        }

        if (el.type === "line") {
          return (
            <div
              key={i}
              style={{
                ...style,
                width: `${el.size * 2.5}px`,
                height: "1.5px",
                backgroundColor: baseColor,
              }}
            />
          );
        }

        const s = el.size;
        if (el.shape === "circle") {
          return (
            <div
              key={i}
              style={{
                ...style,
                width: s, height: s,
                borderRadius: "50%",
                border: `2px solid ${baseColor}`,
              }}
            />
          );
        }
        if (el.shape === "cross") {
          return (
            <div key={i} style={{ ...style, width: s, height: s }}>
              <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 2, backgroundColor: baseColor }} />
              <div style={{ position: "absolute", left: "50%", top: 0, height: "100%", width: 2, backgroundColor: baseColor }} />
            </div>
          );
        }
        if (el.shape === "diamond") {
          return (
            <div
              key={i}
              style={{
                ...style,
                width: s * 0.7, height: s * 0.7,
                border: `2px solid ${baseColor}`,
                "--r": "45deg",
                animation: anim,
              } as React.CSSProperties}
            />
          );
        }
        if (el.shape === "dot-grid") {
          return (
            <div
              key={i}
              style={{
                ...style,
                width: s * 2, height: s * 2,
                backgroundImage: `radial-gradient(circle, ${baseColor} 1.5px, transparent 1.5px)`,
                backgroundSize: "8px 8px",
              }}
            />
          );
        }
        return (
          <div
            key={i}
            style={{
              ...style,
              width: s * 0.6, height: s * 0.6,
              border: `2px solid ${baseColor}`,
            }}
          />
        );
      })}
    </div>
  );
}
