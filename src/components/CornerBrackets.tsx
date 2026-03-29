export default function CornerBrackets({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-sky-500/30" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-sky-500/30" />
      {children}
    </div>
  );
}
