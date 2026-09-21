"use client";

import { useState } from "react";

export default function CoastalHorizon() {
  const [failed, setFailed] = useState(false);

  return (
    <div aria-hidden="true" className="forever-coast pointer-events-none absolute inset-x-0 top-0 overflow-hidden">
      {!failed && (
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/forever/coast-desktop.webp" />
          {/* Art-directed picture selects one static source without downloading both compositions. */}
          <img
            src="/images/forever/coast-mobile.webp"
            alt=""
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        </picture>
      )}
      <div className="forever-coast-fade absolute inset-0" />
    </div>
  );
}
