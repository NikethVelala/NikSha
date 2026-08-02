import { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  id,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 bg-stone-50 px-6 py-24 sm:px-8 lg:px-12 ${className ?? ""}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        {children}
      </div>
    </section>
  );
}