"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useThree } from "@react-three/fiber";

type Point = [number, number, number];
type Instance = { position: Point; rotation: Point; scale: Point; color: string };

const BotanicalTexture = createContext<THREE.Texture | null>(null);

/** One shared 768px atlas, loaded outside Suspense. Geometry remains if it fails. */
export function BotanicalPalette({ children }: { children: ReactNode }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    const image = new Image();
    let atlas: THREE.Texture | undefined;
    image.onload = () => {
      atlas = new THREE.Texture(image);
      atlas.colorSpace = THREE.SRGBColorSpace;
      atlas.needsUpdate = true;
      setTexture(atlas);
    };
    image.src = "/images/garden/jasmine-branch.webp";
    return () => { image.onload = null; image.src = ""; atlas?.dispose(); };
  }, []);
  return <BotanicalTexture.Provider value={texture}>{children}</BotanicalTexture.Provider>;
}

/** Geometry follows stems; seeded variation changes individual leaves, never the planting plan. */
export function GardenPlant({ position, scale, seed }: { position: Point; scale: Point; seed: number }) {
  const atlas = useContext(BotanicalTexture);
  const multisampled = useThree((state) => state.gl.getContext().getContextAttributes()?.antialias ?? false);
  const data = useMemo(() => {
    const leaves: Instance[] = [];
    const stems: THREE.BufferGeometry[] = [];
    for (let stem = 0; stem < 7; stem++) {
      const angle = stem * 2.399 + seed;
      const height = 0.65 + (stem % 3) * 0.14;
      const tip = new THREE.Vector3(Math.cos(angle) * 0.8, height, Math.sin(angle) * 0.6);
      const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(tip.x * 0.18, height * 0.8, tip.z * 0.2), tip);
      stems.push(new THREE.TubeGeometry(curve, 8, 0.009, 3, false));
      for (let node = 1; node <= 7; node++) {
        const t = node / 8;
        const anchor = curve.getPoint(t);
        for (const side of [-1, 1]) {
          const leafAngle = angle + side * 1.1;
          const length = (0.3 + Math.sin(t * Math.PI) * 0.18) * (1 - t * 0.4);
          leaves.push({ position: anchor.toArray() as Point, rotation: [0.65 + t * 0.4, leafAngle, side * (0.95 + t * 0.3)], scale: [length * 0.68, length, length], color: ["#4a6b42", "#638351", "#829365", "#45654a"][(node + stem + seed) % 4] });
        }
      }
    }
    const geometry = mergeGeometries(stems);
    stems.forEach((stem) => stem.dispose());
    return { leaves, geometry };
  }, [seed]);
  useEffect(() => () => data.geometry.dispose(), [data]);
  const bed = scale[1] < 1.3;
  if (atlas) return <group position={position} scale={scale}>
    {[0, 1, 2].map((branch) => <mesh key={branch} position={[(branch - 1) * (bed ? 0.42 : 0.22), 0.42 + ((seed + branch) % 3) * 0.065, (branch - 1) * 0.16]} rotation={[0.02 * (seed % 4), (branch - 1) * 0.64 + (seed % 5 - 2) * 0.17, (branch - 1) * (bed ? -0.48 : -0.19)]} scale={[(bed ? 0.8 : Math.min(scale[1], scale[0] * 1.7) / scale[0]) * ((seed + branch) % 2 ? -1 : 1), 0.84 + ((seed * 7 + branch * 3) % 5) * 0.045, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial map={atlas} alphaTest={0.45} alphaToCoverage={multisampled} side={THREE.DoubleSide} color={["#a5b49b", "#bac1a4", "#96ad9d"][(seed + branch) % 3]} roughness={0.84} />
    </mesh>)}
  </group>;
  return <group position={position} scale={scale}>
    <mesh geometry={data.geometry}><meshStandardMaterial color="#42513a" roughness={0.94} /></mesh>
    <BotanicalInstances instances={data.leaves} kind="leaf" />
  </group>;
}

export function JasmineSwag({ position, scale = 1, rotation = 0 }: { position: Point; scale?: number; rotation?: number }) {
  const flowers = useMemo(() => {
    const result: Instance[] = [];
    for (let index = 0; index < 55; index++) {
      const t = index / 54;
      const x = (t - 0.5) * 5;
      const y = -Math.sin(t * Math.PI) * 0.8;
      for (let petal = 0; petal < 5; petal++) {
        const a = petal * Math.PI * 0.4 + index;
        result.push({ position: [x + Math.cos(a) * 0.052, y + Math.sin(a) * 0.052, Math.sin(index * 2.4) * 0.05], rotation: [0.4, a, a], scale: [0.028, 0.061, 0.026], color: index > 5 && index < 10 || index > 43 && index < 47 ? "#672330" : index % 4 === 0 ? "#d9d3ad" : "#f2e8d3" });
      }
      if (index % 9 === 0) {
        for (let drop = 1; drop <= 7; drop++) result.push({ position: [x + Math.sin(drop) * 0.018, y - drop * 0.062, 0], rotation: [0, 0, 0.1], scale: [0.035, 0.052, 0.03], color: "#e5ddc5" });
      }
    }
    return result;
  }, []);
  return <group position={position} scale={scale} rotation={[0, 0, rotation]}><BotanicalInstances instances={flowers} kind="flower" /></group>;
}

export function PetalBed({ position, width = 2, seed = 0 }: { position: Point; width?: number; seed?: number }) {
  const petals = useMemo(() => Array.from({ length: 28 }, (_, i): Instance => {
    const a = i * 2.399 + seed;
    const radius = (i % 7) / 7;
    return { position: [Math.cos(a) * radius * width, 0.005 + (i % 3) * 0.002, Math.sin(a) * radius * 0.6], rotation: [Math.PI / 2, 0, a], scale: [0.028, 0.052, 0.01], color: i % 7 === 0 ? "#641d2c" : "#dcd3b8" };
  }), [width, seed]);
  return <group position={position}><BotanicalInstances instances={petals} kind="flower" /></group>;
}

function BotanicalInstances({ instances, kind }: { instances: Instance[]; kind: "leaf" | "flower" }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => {
    if (kind === "flower") return new THREE.SphereGeometry(1, 5, 4);
    const shape = new THREE.Shape();
    shape.moveTo(0, 0); shape.bezierCurveTo(0.8, 0.45, 0.6, 0.75, 0, 1); shape.bezierCurveTo(-0.6, 0.75, -0.8, 0.45, 0, 0);
    const leaf = new THREE.ShapeGeometry(shape, 5);
    const p = leaf.attributes.position;
    const colors: number[] = [];
    for (let i = 0; i < p.count; i++) {
      p.setZ(i, Math.sin(p.getY(i) * Math.PI) * 0.14 - Math.abs(p.getX(i)) * 0.17);
      const tone = Math.abs(p.getX(i)) < 0.04 ? 1 : 0.74;
      colors.push(tone, tone, tone);
    }
    leaf.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    leaf.computeVertexNormals();
    return leaf;
  }, [kind]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    instances.forEach((item, i) => {
      dummy.position.set(...item.position); dummy.rotation.set(...item.rotation); dummy.scale.set(...item.scale); dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix); mesh.setColorAt(i, new THREE.Color(item.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [instances]);
  return <instancedMesh ref={ref} args={[geometry, undefined, instances.length]}>
    <meshStandardMaterial color="#ffffff" vertexColors={kind === "leaf"} side={THREE.DoubleSide} roughness={kind === "leaf" ? 0.57 : 0.92} metalness={0} emissive={kind === "leaf" ? "#1a3422" : "#000000"} emissiveIntensity={0.15} />
  </instancedMesh>;
}
