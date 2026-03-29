interface HudReadoutProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  lines?: string[];
  dark?: boolean;
}

const defaultLines = ["SIG:OK // FREQ:443.2", "NODE:ACTIVE", "LAT:14.5995 LON:120.9842"];

export default function HudReadout({ position = "top-right", lines = defaultLines, dark = false }: HudReadoutProps) {
  const posClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  }[position];

  const alignClass = position.includes("right") ? "text-right" : "text-left";

  return (
    <div className={`pointer-events-none absolute z-30 hidden select-none md:block ${posClasses}`} aria-hidden="true">
      <div className={`font-mono text-[10px] leading-relaxed tracking-wider ${dark ? "text-slate-600" : "text-slate-300"} ${alignClass}`}>
        {lines.map((line, i) => (<p key={i}>{line}</p>))}
      </div>
    </div>
  );
}
