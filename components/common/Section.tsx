import { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 overflow-hidden bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36 ${className ?? ""}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <span className="h-px w-20 bg-champagne/45" />
      </div>
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}
