import { forwardRef } from "react";

const CornerBrackets = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = "" }, ref) => {
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
