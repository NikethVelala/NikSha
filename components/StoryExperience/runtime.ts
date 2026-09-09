export const portraitQuery = "(max-width: 767px), (pointer: coarse) and (max-width: 1023px)";
export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export type GardenProfile = { mobile: boolean; reducedMotion: boolean; webgl: boolean };

/** Run on entry, before the lazy renderer is mounted. Never accept WebGL 1. */
export function getGardenProfile(): GardenProfile {
  const mobile = window.matchMedia(portraitQuery).matches;
  const reducedMotion = window.matchMedia(reducedMotionQuery).matches;
  if (reducedMotion) return { mobile, reducedMotion, webgl: false };
  let context: WebGL2RenderingContext | null = null;
  try {
    context = document.createElement("canvas").getContext("webgl2", { antialias: !mobile, alpha: false });
    return { mobile, reducedMotion, webgl: Boolean(context && !context.isContextLost()) };
  } catch {
    return { mobile, reducedMotion, webgl: false };
  } finally {
    // This is a disposable probe, never the application's renderer.
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  }
}
