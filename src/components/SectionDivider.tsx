export default function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="h-[1px] w-full bg-slate-200" />
      <div className="absolute h-3 w-3 rotate-45 border border-slate-200 bg-white" />
    </div>
  );
}
