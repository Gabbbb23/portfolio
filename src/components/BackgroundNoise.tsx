"use client";

import { useMemo } from "react";

// Seeded pseudo-random for consistent renders
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const shapes = ["circle", "cross", "diamond", "square", "dot-grid"] as const;
const codeFragments = ["0x4F", "//", "[ ]", ">>>", "++", "&&", "!=", "=>", "{}", "01", "**", "<<"];

interface BackgroundNoiseProps {
  seed?: number;
  density?: number; // number of elements (default 18)
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
    }[] = [];

    for (let i = 0; i < density; i++) {
      const type = rand() < 0.4 ? "shape" : rand() < 0.7 ? "text" : "line";
      items.push({
        type,
        shape: shapes[Math.floor(rand() * shapes.length)],
        text: codeFragments[Math.floor(rand() * codeFragments.length)],
        x: rand() * 100,
        y: rand() * 100,
        size: 8 + rand() * 20,
        rotation: rand() * 360,
        opacity: 0.03 + rand() * 0.05,
      });
    }
    return items;
  }, [seed, density]);

  const baseColor = variant === "dark" ? "rgb(148,163,184)" : "rgb(148,163,184)"; // slate-400

  return (
    <div className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`} aria-hidden="true">
      {elements.map((el, i) => {
        const style: React.CSSProperties = {
          position: "absolute",
          left: `${el.x}%`,
          top: `${el.y}%`,
          opacity: el.opacity,
          transform: `rotate(${el.rotation}deg)`,
        };

        if (el.type === "text") {
          return (
            <span
              key={i}
              className="font-mono"
              style={{
                ...style,
                fontSize: `${el.size * 0.5}px`,
                color: baseColor,
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
                width: `${el.size * 2}px`,
                height: "1px",
                backgroundColor: baseColor,
              }}
            />
          );
        }

        // Shapes
        const s = el.size;
        if (el.shape === "circle") {
          return (
            <div
              key={i}
              style={{
                ...style,
                width: s, height: s,
                borderRadius: "50%",
                border: `1px solid ${baseColor}`,
              }}
            />
          );
        }
        if (el.shape === "cross") {
          return (
            <div key={i} style={{ ...style, width: s, height: s, position: "absolute", left: `${el.x}%`, top: `${el.y}%` }}>
              <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1, backgroundColor: baseColor, opacity: el.opacity }} />
              <div style={{ position: "absolute", left: "50%", top: 0, height: "100%", width: 1, backgroundColor: baseColor, opacity: el.opacity }} />
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
                border: `1px solid ${baseColor}`,
                transform: `rotate(45deg)`,
              }}
            />
          );
        }
        if (el.shape === "dot-grid") {
          return (
            <div
              key={i}
              style={{
                ...style,
                width: s * 1.5, height: s * 1.5,
                backgroundImage: `radial-gradient(circle, ${baseColor} 1px, transparent 1px)`,
                backgroundSize: "6px 6px",
              }}
            />
          );
        }
        // square
        return (
          <div
            key={i}
            style={{
              ...style,
              width: s * 0.6, height: s * 0.6,
              border: `1px solid ${baseColor}`,
            }}
          />
        );
      })}
    </div>
  );
}
