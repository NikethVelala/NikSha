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
      className={`scroll-mt-16 bg-ivory px-6 py-28 sm:px-8 sm:py-32 lg:px-12 lg:py-36 ${className ?? ""}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        {children}
      </div>
    </section>
  );
}
