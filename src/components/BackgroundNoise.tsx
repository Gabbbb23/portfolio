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
    }[] = [];

    for (let i = 0; i < density; i++) {
      const type = rand() < 0.4 ? "shape" : rand() < 0.7 ? "text" : "line";
      const isText = type === "text";
      items.push({
        type,
        shape: shapes[Math.floor(rand() * shapes.length)],
        text: codeFragments[Math.floor(rand() * codeFragments.length)],
        x: rand() * 94 + 3,  // 3-97% to avoid edge clipping
        y: rand() * 94 + 3,
        size: 12 + rand() * 28,
        rotation: type === "text" ? (rand() * 20 - 10) : rand() * 360,
        opacity: isText ? (0.08 + rand() * 0.10) : (0.06 + rand() * 0.09),
      });
    }
    return items;
  }, [seed, density]);

  const baseColor = variant === "dark" ? "rgb(100,116,139)" : "rgb(148,163,184)"; // slate-500 dark, slate-400 light

  return (
    <div className={`pointer-events-none absolute inset-0 select-none ${className}`} aria-hidden="true">
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
                height: "1px",
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
                border: `1.5px solid ${baseColor}`,
              }}
            />
          );
        }
        if (el.shape === "cross") {
          return (
            <div key={i} style={{ ...style, width: s, height: s }}>
              <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1.5, backgroundColor: baseColor }} />
              <div style={{ position: "absolute", left: "50%", top: 0, height: "100%", width: 1.5, backgroundColor: baseColor }} />
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
                border: `1.5px solid ${baseColor}`,
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
                width: s * 2, height: s * 2,
                backgroundImage: `radial-gradient(circle, ${baseColor} 1.2px, transparent 1.2px)`,
                backgroundSize: "7px 7px",
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
              border: `1.5px solid ${baseColor}`,
            }}
          />
        );
      })}
    </div>
  );
}
