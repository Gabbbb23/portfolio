import { forwardRef } from "react";

interface CornerBracketsProps {
  children: React.ReactNode;
  className?: string;
  variant?: "brackets" | "crosshair";
}

const CrosshairSvg = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1" />
    <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const CornerBrackets = forwardRef<HTMLDivElement, CornerBracketsProps>(
  ({ children, className = "", variant = "brackets" }, ref) => {
    if (variant === "crosshair") {
      return (
        <div ref={ref} className={`group relative ${className}`}>
          <span className="absolute top-0 left-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100"><CrosshairSvg /></span>
          <span className="absolute top-0 right-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100"><CrosshairSvg /></span>
          <span className="absolute bottom-0 left-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100"><CrosshairSvg /></span>
          <span className="absolute bottom-0 right-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100"><CrosshairSvg /></span>
          {children}
        </div>
      );
    }

    return (
      <div ref={ref} className={`relative ${className}`}>
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-sky-500/30" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-sky-500/30" />
        {children}
      </div>
    );
  }
);

CornerBrackets.displayName = "CornerBrackets";
export default CornerBrackets;
