import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-100">
      <Section id="footer" className="bg-transparent px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-stone-400">
            With love
          </p>

          <h2 className="mt-6 font-heading text-5xl md:text-6xl">
            {wedding.couple.monogram}
          </h2>

          <p className="mt-5 text-lg text-stone-300">
            {wedding.couple.groom} &amp; {wedding.couple.bride}
          </p>

          <div className="mx-auto my-10 h-px w-16 bg-stone-700" />

          <p className="text-sm tracking-wide text-stone-400">
            {wedding.ceremony.date}
          </p>

          <p className="mt-8 text-sm leading-7 text-stone-500">
            Thank you for being a part of our journey and for making our
            celebration even more special with your presence and blessings.
          </p>

          <p className="mt-12 font-heading text-2xl text-stone-300">
            Forever begins here.
          </p>
        </div>
      </Section>
    </footer>
  );
}
