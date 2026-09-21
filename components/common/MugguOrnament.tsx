type MugguOrnamentProps = {
  variant?: "compact" | "divider";
  className?: string;
};

// Decorative adaptation of dot-grid / curved (tippudu) muggu, not a ritual symbol.
// Reference: IDC, IIT Bombay — https://www.dsource.in/resource/rangoli/types-rangolis/muggu
export default function MugguOrnament({ variant = "compact", className = "" }: MugguOrnamentProps) {
  const divider = variant === "divider";
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={divider ? "-52 0 144 32" : "0 0 40 32"}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {divider && <path d="M-50 16h39M51 16h39" opacity="0.55" />}
      <path d="M20 16C15 11 10 7 10 4C10 0 16 1 20 6C24 1 30 0 30 4C30 7 25 11 20 16C15 21 10 25 10 28C10 32 16 31 20 26C24 31 30 32 30 28C30 25 25 21 20 16Z" />
      <path d="M20 16C15 11 11 6 7 6C1 6 1 12 6 16C1 20 1 26 7 26C11 26 15 21 20 16C25 11 29 6 33 6C39 6 39 12 34 16C39 20 39 26 33 26C29 26 25 21 20 16Z" />
      <g fill="currentColor" stroke="none">
        <circle cx="20" cy="8" r="1" />
        <circle cx="12" cy="16" r="1" />
        <circle cx="28" cy="16" r="1" />
        <circle cx="20" cy="24" r="1" />
      </g>
    </svg>
  );
}
