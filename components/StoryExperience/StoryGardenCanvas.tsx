"use client";

import { createRoot, events, extend, useFrame, type RootState } from "@react-three/fiber";
import { Component, useLayoutEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";
import StoryGardenScene from "./StoryGardenScene";
import type { GardenChapter, GardenMoment } from "./content";
import type { GardenProfile } from "./runtime";

extend({
  Group: THREE.Group, Mesh: THREE.Mesh, InstancedMesh: THREE.InstancedMesh,
  Color: THREE.Color, Fog: THREE.Fog, AmbientLight: THREE.AmbientLight,
  HemisphereLight: THREE.HemisphereLight, DirectionalLight: THREE.DirectionalLight, PointLight: THREE.PointLight,
  PlaneGeometry: THREE.PlaneGeometry, BoxGeometry: THREE.BoxGeometry, RingGeometry: THREE.RingGeometry,
  SphereGeometry: THREE.SphereGeometry, CylinderGeometry: THREE.CylinderGeometry, ConeGeometry: THREE.ConeGeometry,
  CircleGeometry: THREE.CircleGeometry, TorusGeometry: THREE.TorusGeometry,
  MeshBasicMaterial: THREE.MeshBasicMaterial, MeshStandardMaterial: THREE.MeshStandardMaterial,
  Sprite: THREE.Sprite, SpriteMaterial: THREE.SpriteMaterial, Points: THREE.Points,
  BufferGeometry: THREE.BufferGeometry, BufferAttribute: THREE.BufferAttribute, PointsMaterial: THREE.PointsMaterial,
});

type Props = {
  chapter: GardenChapter;
  activeMoment: GardenMoment | null;
  profile: GardenProfile;
  isMobile: boolean;
  onReady: () => void;
  onFailure: (reason: string) => void;
  onSelect: (moment: GardenMoment) => void;
};

class SceneBoundary extends Component<{ children: ReactNode; onFailure: Props["onFailure"] }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure("scene-error"); }
  render() { return this.state.failed ? null : this.props.children; }
}

function RenderFrame({ onReady, onFailure }: Pick<Props, "onReady" | "onFailure">) {
  const ready = useRef(false);
  const failed = useRef(false);
  // Owning the draw also contains runtime render errors. Ready means a real frame.
  useFrame(({ gl, scene, camera }) => {
    if (failed.current || gl.getContext().isContextLost()) return;
    try {
      gl.render(scene, camera);
      if (!ready.current) { ready.current = true; onReady(); }
    } catch {
      failed.current = true;
      onFailure("render-error");
    }
  }, 1);
  return null;
}

export default function StoryGardenCanvas(props: Props) {
  const container = useRef<HTMLDivElement>(null);
  const render = useRef<((next: Props) => void) | null>(null);
  const latest = useRef(props);
  useLayoutEffect(() => { latest.current = props; render.current?.(props); }, [props]);
  const { profile, onFailure } = props;

  useLayoutEffect(() => {
    const host = container.current;
    if (!host) return;
    // Fresh canvas for every lifetime, including Strict Mode's setup/cleanup replay.
    // Fiber's delayed disposal can never lose the next renderer's context.
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "display:block;width:100%;height:100%;touch-action:pan-y";
    host.appendChild(canvas);
    let intentionalTeardown = false;
    let failed = false;
    let state: RootState | undefined;
    let renderer: THREE.WebGLRenderer | undefined;
    let root: ReturnType<typeof createRoot<HTMLCanvasElement>> | undefined;
    const report = (reason: string) => {
      if (intentionalTeardown || failed) return;
      failed = true;
      state?.setFrameloop("never");
      onFailure(reason);
    };
    const lost = (event: Event) => {
      event.preventDefault();
      report("context-lost");
    };
    const size = () => ({ width: host.clientWidth, height: host.clientHeight, top: 0, left: 0 });
    const draw = (next: Props) => root?.render(
      <SceneBoundary onFailure={report}>
        <StoryGardenScene activeMoment={next.activeMoment} finale={next.chapter === "finale"} isMobile={next.isMobile} onSelect={next.onSelect} />
        <RenderFrame onReady={next.onReady} onFailure={report} />
      </SceneBoundary>,
    );
    const resize = new ResizeObserver(() => {
      if (!state || intentionalTeardown || failed) return;
      void root?.configure({ size: size(), dpr: Math.min(window.devicePixelRatio, latest.current.isMobile ? 1.2 : 1.5) }).catch(() => report("resize-error"));
    });
    const visibility = () => {
      if (!failed && !intentionalTeardown) state?.setFrameloop(document.hidden ? "never" : "always");
    };
    canvas.addEventListener("webglcontextlost", lost);
    document.addEventListener("visibilitychange", visibility);
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: !profile.mobile, alpha: false, powerPreference: profile.mobile ? "default" : "high-performance", stencil: false });
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      root = createRoot(canvas);
      void root.configure({
        gl: renderer,
        events,
        size: size(),
        dpr: Math.min(window.devicePixelRatio, profile.mobile ? 1.2 : 1.5),
        camera: { position: [0, 4.2, 16], fov: 42, near: 0.1, far: 60 },
        frameloop: document.hidden ? "never" : "always",
        onCreated: (created) => { state = created; created.events.connect?.(canvas); },
      }).then(() => {
        if (intentionalTeardown || failed) return;
        render.current = draw;
        draw(latest.current);
        resize.observe(host);
      }).catch(() => report("initialization-error"));
    } catch {
      report("initialization-error");
    }
    return () => {
      intentionalTeardown = true;
      render.current = null;
      resize.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      canvas.removeEventListener("webglcontextlost", lost);
      root?.unmount();
      renderer?.dispose();
      if (!root) renderer?.forceContextLoss();
      canvas.remove();
    };
  }, [profile, onFailure]);
  return <div ref={container} style={{ position: "absolute", inset: 0 }} />;
}
