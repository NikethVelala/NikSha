type FloralDividerProps = {
  className?: string;
};

export default function FloralDivider({ className = "" }: FloralDividerProps) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-3 text-white/70 ${className}`}>
      <span className="h-px w-12 bg-current/40" />
      <span className="text-xs tracking-[0.35em]">✦</span>
      <span className="h-px w-12 bg-current/40" />
    </div>
  );
}
