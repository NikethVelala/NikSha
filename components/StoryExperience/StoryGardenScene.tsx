"use client";

import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { gardenMoments, type GardenMoment, type GardenMomentId } from "./content";

type StoryGardenSceneProps = {
  activeMoment: GardenMoment | null;
  finale: boolean;
  isMobile: boolean;
  onSelect: (moment: GardenMoment) => void;
};

type CameraMark = { position: [number, number, number]; target: [number, number, number] };

const desktopMarks: Record<"garden" | "finale" | GardenMomentId, CameraMark> = {
  garden: { position: [0, 4.5, 17.5], target: [0, 2.6, -3] },
  "school-days": { position: [-4.5, 3.1, 5.7], target: [-3.6, 1.15, -0.3] },
  friendship: { position: [4.8, 3.2, 6.8], target: [3.45, 1.7, -0.5] },
  "something-more": { position: [0.7, 3.5, 4.8], target: [0, 2, -4.45] },
  finale: { position: [0, 3.4, 8.4], target: [0, 3.2, -6] },
};

const mobileMarks: Record<"garden" | "finale" | GardenMomentId, CameraMark> = {
  garden: { position: [0, 3.2, 10], target: [0, 2, -1.8] },
  "school-days": { position: [0.3, 2.6, 6], target: [0, 0.9, 0] },
  friendship: { position: [0, 2.4, 6.7], target: [0, 1.6, 0] },
  "something-more": { position: [0, 2.2, 7], target: [0, 1.6, -1] },
  finale: { position: [0, 2.8, 8.2], target: [0, 2.5, -2] },
};

const palette = {
  gold: "#d6a25e",
  champagne: "#f1d3a3",
  ivory: "#f8efdf",
  forest: "#183c2b",
  leaf: "#31583a",
  deepLeaf: "#132b20",
  rose: "#791e2c",
  crimson: "#9b2132",
  stone: "#74644e",
  night: "#0b1711",
};

export default function StoryGardenScene({ activeMoment, finale, isMobile, onSelect }: StoryGardenSceneProps) {
  const focalX = isMobile ? 0 : activeMoment?.id === "school-days" ? -3.6 : activeMoment?.id === "friendship" ? 3.45 : 0;
  return (
    <>
      <color attach="background" args={[palette.night]} />
      <fog attach="fog" args={[palette.night, 12, 33]} />
      <ambientLight intensity={0.45} color="#e8d8b3" />
      <hemisphereLight args={["#d3dfd9", "#102319", 1.05]} />
      <directionalLight position={[-5, 9, 3]} intensity={1.6} color="#ffe5b7" />
      <pointLight position={[focalX, 3.8, isMobile ? 2 : -0.2]} intensity={finale ? 18 : 12} distance={12} decay={2} color="#f8cb87" />

      <CameraDirector activeMoment={activeMoment} finale={finale} isMobile={isMobile} />
      <GardenBackdrop />
      <GroundPath />
      {isMobile ? <PortraitStage activeMoment={activeMoment} finale={finale} onSelect={onSelect} /> : <>
      <SilkWing side="left" />
      <SilkWing side="right" />
      <GardenGate finale={finale} />

      <PlantMass position={[-6.3, 0, 3]} scale={[1.7, 3.5, 1.8]} seed={26} />
      <PlantMass position={[6.3, 0, 3]} scale={[1.7, 3.5, 1.8]} seed={34} />
      <PlantMass position={[-5.3, 0, -4.7]} scale={[1.5, 3.1, 1.3]} seed={11} />
      <PlantMass position={[5.3, 0, -4.7]} scale={[1.5, 3.1, 1.3]} seed={12} />
      <PlantMass position={[-3.7, 0, -2.7]} scale={[1.3, 1, 1]} seed={16} />
      <PlantMass position={[3.8, 0, -2.7]} scale={[1.3, 1, 1]} seed={18} />

      <GardenLantern position={[-6.15, 4.8, -2.3]} scale={1.1} phase={0.4} lit />
      <GardenLantern position={[6.15, 4.65, -2.8]} scale={1.04} phase={1.1} lit />
      <GardenLantern position={[-1.8, 5.55, -5.1]} scale={0.76} phase={2.4} />
      <GardenLantern position={[2.15, 5.75, -5.1]} scale={0.72} phase={3.1} />
      <GardenLantern position={[-8.5, 3.9, 2.1]} scale={0.76} phase={4.1} />
      <GardenLantern position={[8.5, 3.9, 2.1]} scale={0.76} phase={5.1} />

      <SchoolDesk moment={gardenMoments[0]} active={activeMoment?.id === "school-days"} onSelect={onSelect} />
      <FriendshipLanterns moment={gardenMoments[1]} active={activeMoment?.id === "friendship"} onSelect={onSelect} />
      <PromiseArch moment={gardenMoments[2]} active={activeMoment?.id === "something-more"} onSelect={onSelect} />
      </>}
      <AtmosphericPollen count={isMobile ? 12 : 30} />
      {!isMobile && <ForegroundPetals count={3} />}
      {finale && <FinaleGlow />}
    </>
  );
}

/** Portrait vignettes have their own object layout, scale and framing. */
function PortraitStage({ activeMoment, finale, onSelect }: Pick<StoryGardenSceneProps, "activeMoment" | "finale" | "onSelect">) {
  const chapter = activeMoment?.id;
  return <>
    <group position={[0, 0, chapter === "school-days" ? -2.5 : 0]} scale={chapter === "school-days" ? 0.5 : 0.65}><GardenGate finale={finale} /></group>
    <PlantMass position={[-3.1, 0, -0.6]} scale={[1, 2.6, 1]} seed={26} />
    <PlantMass position={[3.1, 0, -1.1]} scale={[1, 2.2, 1]} seed={34} />
    {chapter === "school-days" && <SchoolDesk position={[0, 0.16, 0]} moment={gardenMoments[0]} active onSelect={onSelect} />}
    {chapter === "friendship" && <FriendshipLanterns position={[0, 0.1, 0]} moment={gardenMoments[1]} active onSelect={onSelect} />}
    {chapter === "something-more" && <PromiseArch position={[0, 0, -0.7]} moment={gardenMoments[2]} active onSelect={onSelect} />}
    {!chapter && <><GardenLantern position={[-1.5, 1.5, -1]} scale={0.9} phase={0.4} /><GardenLantern position={[1.5, 1.8, -1.5]} scale={0.9} phase={1.2} /></>}
  </>;
}

function PlantMass({ position, scale, seed }: { position: [number, number, number]; scale: [number, number, number]; seed: number }) {
  return <group position={position}>
    <mesh position={[0, scale[1] * 0.46, 0]} scale={scale}><sphereGeometry args={[0.62, 10, 8]} /><meshStandardMaterial color="#183d28" roughness={1} /></mesh>
    <FoliageField count={42} center={[0, scale[1] * 0.6, 0]} spread={[scale[0] * 1.25, scale[1], scale[2] * 1.25]} seed={seed} />
  </group>;
}

function CameraDirector({ activeMoment, finale, isMobile }: Pick<StoryGardenSceneProps, "activeMoment" | "finale" | "isMobile">) {
  const camera = useThree((state) => state.camera);
  const pointer = useThree((state) => state.pointer);
  const size = useThree((state) => state.size);
  const currentTarget = useRef(new THREE.Vector3(0, 3, -2));
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(), []);
  const lastLayout = useRef<boolean | null>(null);

  useFrame((_, delta) => {
    const marks = isMobile ? mobileMarks : desktopMarks;
    const mark = finale ? marks.finale : activeMoment ? marks[activeMoment.id] : marks.garden;
    const parallax = isMobile ? 0 : 0.15;
    const aspect = size.width / Math.max(1, size.height);
    const extraDistance = isMobile ? Math.max(0, 1.1 - aspect) * 3 : Math.max(0, 1.1 - aspect) * 7;
    desiredPosition.set(mark.position[0] + pointer.x * parallax, mark.position[1] + pointer.y * parallax * 0.18, mark.position[2] + extraDistance);
    desiredTarget.set(mark.target[0] + pointer.x * parallax * 0.3, mark.target[1] + pointer.y * parallax * 0.12, mark.target[2]);
    if (lastLayout.current !== isMobile) {
      camera.position.copy(desiredPosition);
      currentTarget.current.copy(desiredTarget);
      lastLayout.current = isMobile;
    }
    const easing = 1 - Math.exp(-Math.min(delta, 0.05) * (isMobile ? 3 : 1.8));
    camera.position.lerp(desiredPosition, easing);
    currentTarget.current.lerp(desiredTarget, easing);
    camera.lookAt(currentTarget.current);
  });

  return null;
}

function GardenBackdrop() {
  const backdrop = useMemo(() => makeBackdropTexture(), []);
  useEffect(() => () => backdrop.dispose(), [backdrop]);

  return (
    <group>
      <mesh position={[0, 7.5, -13.8]}>
        <planeGeometry args={[36, 20]} />
        <meshBasicMaterial map={backdrop} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0, 8, -12.9]}>
        <planeGeometry args={[30, 15]} />
        <meshBasicMaterial color="#13261a" transparent opacity={0.32} />
      </mesh>
      <HazeSprite position={[-6.8, 4.8, -8.7]} scale={6.5} opacity={0.12} />
      <HazeSprite position={[7.1, 5.5, -9.2]} scale={7.5} opacity={0.1} />
      <HazeSprite position={[0, 7.2, -8.3]} scale={9.5} opacity={0.08} />
    </group>
  );
}

function GroundPath() {
  const stone = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1c2d22", roughness: 0.88, metalness: 0.02 }), []);
  const path = useMemo(() => new THREE.MeshStandardMaterial({ color: "#665440", roughness: 0.68, metalness: 0.06 }), []);
  const inlay = useMemo(() => new THREE.MeshStandardMaterial({ color: "#d2a573", roughness: 0.4, metalness: 0.5, emissive: "#5c3817", emissiveIntensity: 0.28 }), []);
  useEffect(() => () => { stone.dispose(); path.dispose(); inlay.dispose(); }, [stone, path, inlay]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, -2]} material={stone}>
        <planeGeometry args={[35, 36]} />
      </mesh>
      {Array.from({ length: 12 }, (_, index) => {
        const z = 10 - index * 1.7;
        const x = Math.sin(index * 0.48) * 0.45;
        const width = 3.2 - index * 0.085;
        return <group key={index} position={[x, -0.025, z]}>
          <mesh material={path}><boxGeometry args={[width, 0.06, 1.66]} /></mesh>
          {[-1, 1].map((side) => <mesh key={side} position={[side * (width / 2 + 0.05), 0.04, 0]} material={stone}><boxGeometry args={[0.1, 0.13, 1.66]} /></mesh>)}
        </group>;
      })}
      {[-3.6, 3.45].map((x) => <ContactShade key={x} position={[x, 0.013, -0.3]} scale={[3, 1.9, 1]} />)}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -1.2]}>
        <ringGeometry args={[7.8, 8.1, 72, 1, 0.1, Math.PI - 0.2]} />
        <meshStandardMaterial color="#b88951" transparent opacity={0.2} roughness={0.55} metalness={0.35} />
      </mesh>
    </group>
  );
}

function ContactShade({ position, scale }: { position: [number, number, number]; scale: [number, number, number] }) {
  const texture = useMemo(() => makeGlowTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);
  return <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} scale={scale}><planeGeometry args={[1, 1]} /><meshBasicMaterial map={texture} color="#000000" transparent opacity={0.6} depthWrite={false} /></mesh>;
}

function SilkWing({ side }: { side: "left" | "right" }) {
  const texture = useMemo(() => makeSilkTexture(side), [side]);
  const geometry = useMemo(() => makeDrapeGeometry(), []);
  useEffect(() => () => { texture.dispose(); geometry.dispose(); }, [geometry, texture]);

  return (
    <mesh position={[side === "left" ? -10.4 : 10.4, 6.3, 3.1]} rotation={[0.04, side === "left" ? -0.3 : 0.3, side === "left" ? 0.08 : -0.08]} geometry={geometry}>
      <meshStandardMaterial map={texture} color="#c58c4e" roughness={0.52} metalness={0.08} side={THREE.DoubleSide} transparent opacity={0.92} />
    </mesh>
  );
}

function GardenGate({ finale }: { finale: boolean }) {
  const archGeometry = useMemo(() => makeArchGeometry(), []);
  const vineGeometry = useMemo(() => makeVineGeometry(), []);
  useEffect(() => () => { archGeometry.dispose(); vineGeometry.dispose(); }, [archGeometry, vineGeometry]);

  const stone = useMemo(() => new THREE.MeshStandardMaterial({ color: "#826c50", roughness: 0.74, metalness: 0.08 }), []);
  const gold = useMemo(() => new THREE.MeshStandardMaterial({ color: "#d9ad6e", roughness: 0.38, metalness: 0.62, emissive: finale ? "#7d4f1b" : "#1e1209", emissiveIntensity: finale ? 0.65 : 0.1 }), [finale]);
  useEffect(() => () => stone.dispose(), [stone]);
  useEffect(() => () => gold.dispose(), [gold]);

  return (
    <group position={[0, 0, -5.1]}>
      {[-5.1, 5.1].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 2.5, 0]} material={stone}><boxGeometry args={[0.72, 5, 0.85]} /></mesh>
          <mesh position={[0, 5.48, 0]} material={gold}><cylinderGeometry args={[0.55, 0.48, 0.25, 12]} /></mesh>
          <mesh position={[0, 0.18, 0]} material={gold}><cylinderGeometry args={[0.7, 0.82, 0.3, 12]} /></mesh>
        </group>
      ))}
      <mesh geometry={archGeometry} material={stone} />
      <mesh geometry={archGeometry} material={stone} position={[0, 0, -2.1]} />
      <mesh position={[0, 7.36, -0.8]} material={stone}><boxGeometry args={[10.8, 0.22, 2.8]} /></mesh>
      <mesh position={[0, 0.08, -0.8]} material={stone}><boxGeometry args={[10.9, 0.16, 3]} /></mesh>
      <mesh geometry={vineGeometry} position={[0, 0, 0.12]}>
        <meshStandardMaterial color="#264832" roughness={0.7} metalness={0.02} />
      </mesh>
      <FlowerGarland position={[0, 6.3, 0.3]} scale={1.15} />
      <FlowerGarland position={[-4.9, 4.9, 0.28]} scale={0.88} rotation={0.7} />
      <FlowerGarland position={[4.9, 4.9, 0.28]} scale={0.88} rotation={-0.7} />
      <HazeSprite position={[0, 4.2, 0.25]} scale={finale ? 6.8 : 5.6} opacity={finale ? 0.25 : 0.12} />
    </group>
  );
}

function FlowerGarland({ position, scale, rotation = 0 }: { position: [number, number, number]; scale: number; rotation?: number }) {
  const flowers = useMemo(() => Array.from({ length: 12 }, (_, index) => ({
    x: (index - 5.5) * 0.43,
    y: Math.sin(index * 1.9) * 0.17,
    z: Math.cos(index * 1.4) * 0.16,
    scale: 0.5 + ((index * 13) % 5) * 0.07,
    tone: index % 4 === 0 ? palette.rose : index % 3 === 0 ? palette.champagne : "#efe1bd",
  })), []);
  return <group position={position} scale={scale} rotation={[0, 0, rotation]}>{flowers.map((flower, index) => <Blossom key={index} position={[flower.x, flower.y, flower.z]} scale={flower.scale} color={flower.tone} />)}</group>;
}

function Blossom({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  return (
    <group position={position} scale={scale} rotation={[Math.PI / 2, 0, 0]}>
      {Array.from({ length: 5 }, (_, index) => <mesh key={index} rotation={[0, 0, (index / 5) * Math.PI * 2]} position={[0, 0.21, 0]}><circleGeometry args={[0.26, 8, 0, Math.PI]} /><meshStandardMaterial color={color} roughness={0.62} metalness={0.04} side={THREE.DoubleSide} /></mesh>)}
      <mesh position={[0, 0, 0.02]}><circleGeometry args={[0.11, 10]} /><meshStandardMaterial color="#b98443" emissive="#543213" emissiveIntensity={0.2} /></mesh>
    </group>
  );
}

function FoliageField({ count, center, spread, seed }: { count: number; center: [number, number, number]; spread: [number, number, number]; seed: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makeLeafGeometry(), []);
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.88, metalness: 0, side: THREE.DoubleSide }), []);
  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const random = seeded(seed);
    const dummy = new THREE.Object3D();
    const colors = ["#173b28", "#244c2d", "#315c38", "#3a6138", "#20452b"];
    for (let index = 0; index < count; index += 1) {
      const x = center[0] + (random() - 0.5) * spread[0];
      const y = center[1] + (random() - 0.5) * spread[1];
      const z = center[2] + (random() - 0.5) * spread[2];
      const scale = 0.28 + random() * 0.7;
      dummy.position.set(x, y, z);
      dummy.rotation.set((random() - 0.5) * 0.8, random() * Math.PI, (random() - 0.5) * 2.2);
      dummy.scale.set(scale * (0.7 + random() * 0.55), scale, scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
      mesh.setColorAt(index, new THREE.Color(colors[Math.floor(random() * colors.length)]));
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [center, count, seed, spread]);

  return <instancedMesh ref={ref} args={[geometry, material, count]} frustumCulled={false} />;
}

function GardenLantern({ position, scale, phase, lit = false }: { position: [number, number, number]; scale: number; phase: number; lit?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const glow = useMemo(() => makeGlowTexture(), []);
  useEffect(() => () => glow.dispose(), [glow]);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.45 + phase) * 0.045;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh position={[0, -0.1, 0]}><cylinderGeometry args={[0.23, 0.28, 0.55, 10]} /><meshStandardMaterial color="#b98243" roughness={0.34} metalness={0.68} /></mesh>
      <mesh position={[0, 0.28, 0]}><cylinderGeometry args={[0.32, 0.24, 0.18, 10]} /><meshStandardMaterial color="#c89553" roughness={0.32} metalness={0.7} /></mesh>
      <mesh position={[0, 0.68, 0]}><coneGeometry args={[0.3, 0.25, 10]} /><meshStandardMaterial color="#b67b39" roughness={0.32} metalness={0.72} /></mesh>
      <mesh position={[0, 0.12, 0]}><cylinderGeometry args={[0.15, 0.15, 0.36, 10]} /><meshStandardMaterial color="#ffd98a" emissive="#f6a943" emissiveIntensity={2.4} transparent opacity={0.93} /></mesh>
      <sprite position={[0, 0.12, 0]} scale={[1.6, 1.6, 1]}><spriteMaterial map={glow} color="#f5b45e" transparent opacity={0.46} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>
      {lit && <pointLight position={[0, 0.15, 0.35]} intensity={7.5} distance={6.5} decay={2} color="#f4b45d" />}
    </group>
  );
}

type MemoryProp = { moment: GardenMoment; active: boolean; position?: [number, number, number]; onSelect: (moment: GardenMoment) => void };

function SchoolDesk({ moment, active, position = [-3.6, 0.16, -0.3], onSelect }: MemoryProp) {
  return (
    <group position={position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(moment); }}>
      <mesh position={[0, 0.75, 0]}><boxGeometry args={[2.35, 0.16, 1.22]} /><meshStandardMaterial color="#68442d" roughness={0.58} metalness={0.1} /></mesh>
      {[-0.92, 0.92].flatMap((x) => [-0.4, 0.4].map((z) => <mesh key={`${x}-${z}`} position={[x, 0.28, z]}><boxGeometry args={[0.15, 0.88, 0.15]} /><meshStandardMaterial color="#5b3825" roughness={0.62} /></mesh>))}
      <mesh position={[0, 0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.48, 0.9]} /><meshStandardMaterial color="#efe3c7" roughness={0.72} /></mesh>
      <mesh position={[0, 0.86, 0.01]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.15, 0.65]} /><meshStandardMaterial color="#faf3df" roughness={0.82} /></mesh>
      <mesh position={[0, 0.875, -0.02]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.02, 0.67]} /><meshStandardMaterial color="#b58042" metalness={0.4} roughness={0.44} /></mesh>
      <HazeSprite position={[0, 1.25, -0.1]} scale={active ? 2.8 : 1.6} opacity={active ? 0.32 : 0.11} />
      <ContactShade position={[0, -0.145, 0]} scale={[3, 2.1, 1]} />
    </group>
  );
}

function FriendshipLanterns({ moment, active, position = [3.45, 0.1, -0.5], onSelect }: MemoryProp) {
  return (
    <group position={position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(moment); }}>
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[1.7, 32]} /><meshStandardMaterial color="#284532" roughness={0.9} /></mesh>
      <GardenLantern position={[-0.72, 1.4, 0.2]} scale={1.2} phase={1.4} lit={active} />
      <GardenLantern position={[0.72, 1.85, -0.25]} scale={1.2} phase={2.4} />
      <mesh position={[0, 2.45, 0]}><torusGeometry args={[0.9, 0.04, 8, 32, Math.PI]} /><meshStandardMaterial color="#c38b4c" metalness={0.65} roughness={0.35} /></mesh>
    </group>
  );
}

function PromiseArch({ moment, active, position = [0, 0, -4.45], onSelect }: MemoryProp) {
  return (
    <group position={position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(moment); }}>
      <mesh position={[0, 0.48, 0.45]}><cylinderGeometry args={[0.95, 1.1, 0.75, 12]} /><meshStandardMaterial color="#766149" roughness={0.75} metalness={0.08} /></mesh>
      <mesh position={[0, 0.89, 0.45]}><cylinderGeometry args={[0.72, 0.88, 0.14, 16]} /><meshStandardMaterial color="#c4904d" roughness={0.34} metalness={0.55} /></mesh>
      <Blossom position={[-0.44, 1.1, 0.55]} scale={0.8} color="#ece0bd" />
      <Blossom position={[0.35, 1.2, 0.6]} scale={0.75} color="#8f2230" />
      <Blossom position={[0.02, 1.26, 0.75]} scale={0.62} color="#d6a25e" />
      {active && <HazeSprite position={[0, 1.1, -0.3]} scale={2.5} opacity={0.13} />}
    </group>
  );
}

function AtmosphericPollen({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const data = useMemo(() => {
    const random = seeded(78);
    const base = Array.from({ length: count }, () => ({ x: (random() - 0.5) * 18, y: random() * 8.5, z: -7 + random() * 13, phase: random() * Math.PI * 2, speed: 0.06 + random() * 0.13 }));
    const positions = new Float32Array(count * 3);
    return { base, positions };
  }, [count]);
  useFrame(({ clock }) => {
    const geometry = ref.current?.geometry;
    if (!geometry) return;
    const elapsed = clock.getElapsedTime();
    data.base.forEach((particle, index) => {
      data.positions[index * 3] = particle.x + Math.sin(elapsed * particle.speed + particle.phase) * 0.35;
      data.positions[index * 3 + 1] = particle.y + Math.cos(elapsed * particle.speed * 0.8 + particle.phase) * 0.18;
      data.positions[index * 3 + 2] = particle.z;
    });
    geometry.attributes.position.needsUpdate = true;
  });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[data.positions, 3]} /></bufferGeometry><pointsMaterial color="#f6d49e" size={0.035} transparent opacity={0.58} sizeAttenuation depthWrite={false} /></points>;
}

function ForegroundPetals({ count }: { count: number }) {
  const geometry = useMemo(() => makePetalGeometry(), []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const petals = useMemo(() => {
    const random = seeded(119);
    return Array.from({ length: count }, (_, index) => ({
      position: [(random() - 0.5) * 16, 1 + random() * 8, 2 + random() * 4] as [number, number, number],
      scale: 0.16 + random() * 0.25,
      phase: random() * Math.PI * 2,
      speed: 0.22 + random() * 0.24,
      color: index % 3 === 0 ? "#e5c184" : index % 2 === 0 ? "#a71e32" : "#dcb27c",
    }));
  }, [count]);
  return <>{petals.map((petal, index) => <DriftingPetal key={index} geometry={geometry} {...petal} />)}</>;
}

function DriftingPetal({ geometry, position, scale, phase, speed, color }: { geometry: THREE.BufferGeometry; position: [number, number, number]; scale: number; phase: number; speed: number; color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const time = clock.getElapsedTime() * speed + phase;
    mesh.current.position.x = position[0] + Math.sin(time) * 0.8;
    mesh.current.position.y = position[1] + Math.cos(time * 1.2) * 0.5;
    mesh.current.rotation.set(time * 0.7, time * 0.45, time * 0.9);
  });
  return <mesh ref={mesh} geometry={geometry} position={position} scale={scale}><meshStandardMaterial color={color} roughness={0.62} side={THREE.DoubleSide} /></mesh>;
}

function HazeSprite({ position, scale, opacity }: { position: [number, number, number]; scale: number; opacity: number }) {
  const texture = useMemo(() => makeGlowTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);
  return <sprite position={position} scale={[scale, scale, 1]}><spriteMaterial map={texture} color="#f6c982" transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>;
}

function FinaleGlow() {
  const glow = useMemo(() => makeGlowTexture(), []);
  useEffect(() => () => glow.dispose(), [glow]);
  return <group position={[0, 3.8, -4.75]}>
    <sprite scale={[8.2, 8.2, 1]}><spriteMaterial map={glow} color="#f1bd68" transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>
    <pointLight intensity={13} distance={10} color="#f7c36d" />
  </group>;
}

function makeArchGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-5.5, 4.8);
  shape.bezierCurveTo(-5.5, 8.15, 5.5, 8.15, 5.5, 4.8);
  shape.lineTo(4.7, 4.8);
  shape.bezierCurveTo(4.7, 7.15, -4.7, 7.15, -4.7, 4.8);
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, { depth: 0.6, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 1, steps: 1, curveSegments: 20 });
}

function makeVineGeometry() {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4.75, 3.5, 0), new THREE.Vector3(-4.15, 6.15, 0), new THREE.Vector3(-1.5, 7.15, 0), new THREE.Vector3(1.3, 7.15, 0), new THREE.Vector3(4.1, 6.1, 0), new THREE.Vector3(4.78, 3.5, 0),
  ]);
  return new THREE.TubeGeometry(curve, 72, 0.1, 7, false);
}

function makeDrapeGeometry() {
  const geometry = new THREE.PlaneGeometry(7.2, 15, 30, 18);
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index);
    const y = positions.getY(index);
    positions.setZ(index, Math.sin(x * 2.6) * 0.24 + Math.cos(y * 0.72 + x) * 0.09);
  }
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

function makeLeafGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.5);
  shape.bezierCurveTo(0.55, -0.28, 0.62, 0.25, 0, 0.62);
  shape.bezierCurveTo(-0.62, 0.25, -0.55, -0.28, 0, -0.5);
  return new THREE.ShapeGeometry(shape, 5);
}

function makePetalGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.46);
  shape.bezierCurveTo(0.38, -0.28, 0.44, 0.14, 0, 0.54);
  shape.bezierCurveTo(-0.44, 0.14, -0.38, -0.28, 0, -0.46);
  return new THREE.ShapeGeometry(shape, 5);
}

function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,250,220,1)");
    gradient.addColorStop(0.16, "rgba(255,216,143,0.8)");
    gradient.addColorStop(0.5, "rgba(236,169,76,0.18)");
    gradient.addColorStop(1, "rgba(236,169,76,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeSilkTexture(side: "left" | "right") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createLinearGradient(0, 0, 512, 0);
    gradient.addColorStop(0, "#4e2513");
    gradient.addColorStop(0.2, "#9f5d2d");
    gradient.addColorStop(0.48, "#edbc72");
    gradient.addColorStop(0.7, "#935023");
    gradient.addColorStop(1, "#422010");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 512, 1024);
    for (let x = 0; x < 512; x += 13) {
      const width = 5 + ((x * 7) % 17);
      const fold = context.createLinearGradient(x, 0, x + width, 0);
      fold.addColorStop(0, "rgba(255,241,195,0.2)");
      fold.addColorStop(0.5, "rgba(57,21,10,0.18)");
      fold.addColorStop(1, "rgba(255,222,156,0.08)");
      context.fillStyle = fold;
      context.fillRect(side === "left" ? x : 512 - x - width, 0, width, 1024);
    }
    const light = context.createRadialGradient(255, 170, 30, 255, 170, 430);
    light.addColorStop(0, "rgba(255,246,205,0.42)");
    light.addColorStop(1, "rgba(255,246,205,0)");
    context.fillStyle = light;
    context.fillRect(0, 0, 512, 1024);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function makeBackdropTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const context = canvas.getContext("2d");
  if (context) {
    const sky = context.createLinearGradient(0, 0, 0, 640);
    sky.addColorStop(0, "#08120d");
    sky.addColorStop(0.35, "#153223");
    sky.addColorStop(0.72, "#23452d");
    sky.addColorStop(1, "#0f2118");
    context.fillStyle = sky;
    context.fillRect(0, 0, 1024, 640);
    const random = seeded(41);
    for (let index = 0; index < 145; index += 1) {
      const x = random() * 1024;
      const height = 70 + random() * 240;
      const width = 10 + random() * 28;
      const y = 580 - height;
      const color = index % 3 === 0 ? "rgba(8,31,18,0.75)" : "rgba(20,62,31,0.68)";
      context.fillStyle = color;
      context.beginPath();
      context.ellipse(x, y + height * 0.25, width, height * 0.4, random() * Math.PI, 0, Math.PI * 2);
      context.fill();
    }
    for (let index = 0; index < 24; index += 1) {
      const x = 40 + random() * 944;
      const y = 80 + random() * 350;
      const radius = 2 + random() * 6;
      const glow = context.createRadialGradient(x, y, 0, x, y, radius * 5);
      glow.addColorStop(0, "rgba(255,212,135,0.8)");
      glow.addColorStop(1, "rgba(255,212,135,0)");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(x, y, radius * 5, 0, Math.PI * 2);
      context.fill();
    }
    const haze = context.createRadialGradient(512, 250, 20, 512, 250, 470);
    haze.addColorStop(0, "rgba(238,184,107,0.18)");
    haze.addColorStop(1, "rgba(238,184,107,0)");
    context.fillStyle = haze;
    context.fillRect(0, 0, 1024, 640);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function seeded(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}
