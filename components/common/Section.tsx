import { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

function ChapterOrnament() {
  return (
    <svg viewBox="0 0 120 20" aria-hidden="true" className="h-5 w-28 text-champagne/70" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M60 3c-5 4-5 10 0 14 5-4 5-10 0-14ZM46 10c4-4 10-4 14 0-4 4-10 4-14 0ZM74 10c-4-4-10-4-14 0 4 4 10 4 14 0Z" />
      <path d="M31 10c3-3 7-3 10 0-3 3-7 3-10 0ZM89 10c-3-3-7-3-10 0 3 3 7 3 10 0Z" />
      <circle cx="60" cy="10" r="1.5" />
    </svg>
  );
}

export default function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 overflow-hidden bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36 ${className ?? ""}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-champagne/40 sm:w-12" />
          <ChapterOrnament />
          <span className="h-px w-8 bg-champagne/40 sm:w-12" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}
