import { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  eyebrow?: string;
  children?: ReactNode;
  className?: string;
};

export default function Section({
  id,
  title,
  eyebrow,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 bg-stone-50 px-6 py-20 sm:px-8 lg:px-12 ${className ?? ""}`}
    >
      <div className="mx-auto flex max-w-5xl flex-col">
        <div className="mb-10">
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.35em] text-stone-500">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-light tracking-[0.2em] text-stone-900 sm:text-4xl">
            {title}
          </h2>
        </div>

        {children}
      </div>
    </section>
  );
}