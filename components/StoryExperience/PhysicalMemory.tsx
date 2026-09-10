"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gardenMoments, type GardenMomentId } from "./content";

const Prints = createContext<Partial<Record<GardenMomentId, THREE.Texture>>>({});

/** Three 384×512 derivatives, independent of DOM photography and renderer readiness. */
export function PhysicalMemoryLibrary({ children }: { children: ReactNode }) {
  const [prints, setPrints] = useState<Partial<Record<GardenMomentId, THREE.Texture>>>({});
  useEffect(() => {
    const disposers = gardenMoments.map(({ id }) => {
      const image = new Image();
      let texture: THREE.Texture | undefined;
      let finished = false;
      const releaseImage = () => { image.onload = null; image.onerror = null; };
      const timer = window.setTimeout(() => { finished = true; releaseImage(); image.src = ""; }, 8000);
      image.onload = () => {
        if (finished) return;
        finished = true;
        window.clearTimeout(timer);
        texture = new THREE.Texture(image);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;
        setPrints((current) => ({ ...current, [id]: texture }));
        releaseImage();
      };
      image.onerror = () => { finished = true; window.clearTimeout(timer); releaseImage(); };
      image.decoding = "async";
      image.src = `/images/garden/memories/${id}.webp`;
      return () => { finished = true; window.clearTimeout(timer); releaseImage(); image.src = ""; texture?.dispose(); };
    });
    return () => disposers.forEach((dispose) => dispose());
  }, []);
  return <Prints.Provider value={prints}>{children}</Prints.Provider>;
}

type Point = [number, number, number];
type Props = { id: GardenMomentId; position?: Point; rotation?: Point; width: number; active: boolean; treatment: "album" | "brass" | "ivory" };

/** The print is mounted onto a lit, dimensional object; it is never a floating plane. */
export default function PhysicalMemory({ id, position, rotation, width, treatment, active }: Props) {
  const texture = useContext(Prints)[id];
  const invalidate = useThree((state) => state.invalidate);
  const print = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((_, delta) => {
    if (!print.current) return;
    const target = active ? 1 : 0.1;
    const illumination = THREE.MathUtils.damp(print.current.color.r, target, 4, Math.min(delta, 0.05));
    print.current.color.setRGB(illumination, illumination, illumination);
    if (Math.abs(illumination - target) > 0.003) invalidate();
  });
  const height = width * 4 / 3;
  const album = treatment === "album";
  const frame = treatment === "brass" ? "#b79a63" : "#ded3b8";
  return <group position={position} rotation={rotation} name={`physical-memory-${id}`} userData={{ imageState: texture ? "ready" : "unavailable", derivative: "384x512" }}>
    <mesh castShadow receiveShadow position={[0, 0, -0.034]}>
      <boxGeometry args={[width + (album ? 0.13 : 0.19), height + (album ? 0.13 : 0.19), album ? 0.025 : 0.075]} />
      <meshStandardMaterial color={frame} roughness={album ? 0.96 : 0.62} metalness={treatment === "brass" ? 0.55 : 0} />
    </mesh>
    <mesh position={[0, 0, 0.006]}><planeGeometry args={[width + 0.055, height + 0.055]} /><meshStandardMaterial color="#f1e7d2" roughness={0.96} /></mesh>
    {texture ? <mesh position={[0, 0, 0.009]}><planeGeometry args={[width, height]} /><meshBasicMaterial ref={print} map={texture} color="#868686" toneMapped={false} /></mesh> : <mesh position={[0, 0, 0.01]}><planeGeometry args={[width, height]} /><meshStandardMaterial color="#d7cab1" roughness={1} /></mesh>}
    {!album && <>
      <mesh position={[0, -height / 2 - 0.12, -0.12]}><boxGeometry args={[width + 0.3, 0.065, 0.42]} /><meshStandardMaterial color={frame} roughness={0.5} metalness={treatment === "brass" ? 0.55 : 0} /></mesh>
      <mesh position={[0, -height * 0.28, -0.18]} rotation={[-0.22, 0, 0]}><boxGeometry args={[0.08, height * 0.62, 0.08]} /><meshStandardMaterial color={frame} roughness={0.55} metalness={0.45} /></mesh>
    </>}
  </group>;
}
