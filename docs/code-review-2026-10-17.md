# NikSha code review — 17 October 2026

Reviewed the current application after merging PR #74: curtain and welcome portrait, invitation/discovery boundary, index/history navigation, seven story chapters and photo viewer, Garden entry/renderer/memories, countdown/livestream scheduling, Forever, shared motion, assets, metadata, package configuration and dependency audit. No wedding content, photographs, dates or venues are changed.

## Confirmed findings and fixes

| Finding | Evidence before changes | Fix |
| --- | --- | --- |
| Slow Garden photos become permanently unavailable | A real response held for more than 12 seconds sets the DOM photo to `error`, removes its image node, and cannot recover after the response arrives. The texture library also abandons requests after 8 seconds. | Let actual load/error events decide the outcome; retain image handlers until completion or component cleanup. Renderer startup/travel safety timeouts remain. |
| Browser Back leaves a blocking modal over another history entry | Both the story photo dialog and Garden remained open with a fixed body after Back navigation. | Close modal owners synchronously on history navigation, restore locks/inert state, and preserve the original position for Forward restoration. |
| Reduced-motion decoration still performs work | Reduced-motion rendering kept 18 animated petal nodes (hidden only through CSS); the curtain's idle keyframes did not respect the preference. | Do not mount the petals in reduced motion. Use static idle curtain/prompt states and a brief reduced-motion opening. Follow live preference changes without restarting handoff timers. |
| Background decoration runs behind dialogs/in hidden tabs | The fixed decorative layer stays mounted through modal lifetimes. Beam visibility alone does not account for document visibility or body locks. | Share one page-activity subscription; suspend petals and cursor work, and pause the entry beams when the page is locked or hidden. |
| Offscreen invitation keeps measuring scroll layout | The tilt effect calls `getBoundingClientRect()` on window scroll throughout the long story. Cursor movement also stays subscribed when disabled. | Attach tilt listeners only near the visible card on an active page, and pointer listeners only when the desktop cursor is enabled and active. |
| Framework/transitive dependencies have audit advisories | Production audit reported 17 advisories, including Next.js 16.2.12 and its image/CSS dependency chain. | Update Next.js and its ESLint config together to 16.3.8, and refresh compatible patched transitive dependencies. |

The audit is a dependency inventory, not evidence that every reported advisory is exploitable on this static invitation. For example, this site's Open Graph image uses Edge and fixed content, and its image configuration does not allow remote patterns. No auth, user uploads, payment, database or arbitrary URL input flow is present.

## Validation

- TypeScript, ESLint, production build and `git diff --check` pass on Next.js 16.3.8.
- Six full Chromium production flows passed at 360×852, 393×852 and 1440×852, each with normal and reduced motion. All three normal-motion runs reached the 3D renderer in this matrix; reduced motion used the intended static fallback.
- Each full flow exercised all ten story photo previews, uncropped originals, keyboard/focus and scroll restoration, the photo-free separation, the final proposal, the distinct Garden section, all memories (including both Memory II photographs), the final arch and returning to Forever. No runtime errors, failed HTTP responses or horizontal overflow occurred in these flows.
- Focused Back/Forward tests passed for both story-photo and Garden dialogs, including original reading-position restoration.
- A photo response held beyond 12 seconds remained loading and then became ready when released. A deliberately failed photo still showed its error state and allowed navigation to the next memory.
- Live OS reduced-motion and simulated hidden-document visibility changes stop/resume decorative petals correctly. Opening the index/Garden/photo viewer removes background petal nodes. Reduced motion has zero petal nodes, compared with 18 hidden-but-animated nodes before the fix.
- Both automatic curtain handoffs still work; manual scrolling cancels them. Changing the motion preference mid-opening does not restart the opening timers.
- The countdown changes from one remaining second to the completed state at the exact ceremony boundary. The unconfigured livestream keeps its existing “link coming soon” state.
- Browser network checks confirm that the 3D renderer chunk and Garden memory photographs are not fetched before discovery.
- Production dependency audit: **17 reported advisories before, zero after**. The full audit has **one development-only advisory** remaining: `braces` through `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch`. The registry lists no patched version. The remaining package is used by local lint tooling, not by a production request path.
- A compatible `brace-expansion` 5.0.x patch override is retained because the ESLint dependency chain pins an older patch. Other compatible transitive patches are recorded in the lockfile.

## Remaining limits and follow-up

- The 3D Garden still has its existing safety fallback for a slow/unsupported GPU. Chromium software rendering is not a substitute for final Safari/iPhone hardware profiling.
- Next.js reports that the existing Edge Open Graph route is deprecated. It remains functional; a separate migration can move social-image generation to Node or a static asset without mixing runtime changes into these fixes.
- The remaining development-only `braces` advisory needs an upstream fix or a separately evaluated lint-toolchain change. No production advisories remain in the registry audit.
- Legacy unused Celebration, Timeline and Venue components are not mounted by `app/page.tsx`; their removal is optional repository cleanup, not a runtime speed improvement.
- No premium features or redesign are introduced in this maintenance change.
