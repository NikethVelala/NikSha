"use client";

import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gardenMoments, type GardenMoment, type GardenMomentId } from "./content";

type StoryGardenSceneProps = {
  activeMoment: GardenMoment | null;
  finale: boolean;
  isMobile: boolean;
  onSelect: (moment: GardenMoment) => void;
};

import { BotanicalPalette, GardenPlant, JasmineSwag, PetalBed } from "./GardenBotanicals";

type CameraMark = { position: [number, number, number]; target: [number, number, number] };

const desktopMarks: Record<"garden" | "finale" | GardenMomentId, CameraMark> = {
  garden: { position: [0.4, 3.5, 15.5], target: [0, 3.1, -4] },
  "school-days": { position: [-5.1, 2.65, 5.5], target: [-3.55, 1.2, -0.5] },
  friendship: { position: [5.0, 2.7, 6.0], target: [3.45, 1.65, -0.5] },
  "something-more": { position: [0.6, 2.9, 4.0], target: [0, 2.4, -4.45] },
  finale: { position: [0, 3.7, 13.2], target: [0, 3.3, -6] },
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
  night: "#091b20",
};

export default function StoryGardenScene({ activeMoment, finale, isMobile, onSelect }: StoryGardenSceneProps) {
  const focalX = isMobile ? 0 : activeMoment?.id === "school-days" ? -3.6 : activeMoment?.id === "friendship" ? 3.45 : 0;
  return (
    <BotanicalPalette>
      <color attach="background" args={[palette.night]} />
      <fog attach="fog" args={[palette.night, 17, 38]} />
      <ambientLight intensity={0.24} color="#bcccd3" />
      <hemisphereLight args={["#8cabbf", "#152c20", 0.85]} />
      <directionalLight position={[-6, 8, -4]} intensity={1.8} color="#aec8dd" />
      <directionalLight position={[2, 7, 5]} intensity={1.1} color="#f4ddb3" castShadow shadow-mapSize-width={isMobile ? 512 : 1024} shadow-mapSize-height={isMobile ? 512 : 1024} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={10} shadow-camera-bottom={-8} shadow-camera-far={30} shadow-bias={-0.0005} shadow-normalBias={0.03} />
      <pointLight position={[focalX, 3.8, isMobile ? 2 : -0.2]} intensity={finale ? 23 : 19} distance={12} decay={2} color="#f8cb87" />

      <CameraDirector activeMoment={activeMoment} finale={finale} isMobile={isMobile} />
      <MaterialReflections />
      <GardenBackdrop isMobile={isMobile} />
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
      {[-1, 1].flatMap((side) => [5.5, 2.5, -1].map((z, i) => <PlantMass key={`${side}-${z}`} position={[side * (2.6 - i * 0.2), 0, z]} scale={[1.6, 0.75 + i * 0.15, 1]} seed={42 + i} />))}

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
      {finale && <FinaleGlow />}
    </BotanicalPalette>
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

const PlantMass = GardenPlant;

function CameraDirector({ activeMoment, finale, isMobile }: Pick<StoryGardenSceneProps, "activeMoment" | "finale" | "isMobile">) {
  const pointer = useThree((state) => state.pointer);
  const size = useThree((state) => state.size);
  const motion = useRef({ key: "", elapsed: 0, from: new THREE.Vector3(), fromTarget: new THREE.Vector3(), target: new THREE.Vector3(), destination: new THREE.Vector3(), look: new THREE.Vector3() });
  const chapter = finale ? "finale" : activeMoment?.id ?? "garden";
  useFrame(({ camera }, delta) => {
    const m = motion.current;
    const mark = (isMobile ? mobileMarks : desktopMarks)[chapter];
    const key = chapter + isMobile + size.width + size.height;
    const extra = Math.max(0, 1.1 - size.width / Math.max(1, size.height)) * (isMobile ? 3 : 7);
    if (key !== m.key) {
      m.destination.set(mark.position[0], mark.position[1], mark.position[2] + extra);
      m.look.set(...mark.target);
      if (!m.key) { camera.position.copy(m.destination); m.target.copy(m.look); }
      m.from.copy(camera.position); m.fromTarget.copy(m.target); m.elapsed = 0; m.key = key;
    }
    m.elapsed = Math.min(1, m.elapsed + Math.min(delta, 0.05) / (isMobile ? 0.85 : 1.65));
    const t = m.elapsed;
    const eased = t * t * t * (t * (t * 6 - 15) + 10);
    camera.position.lerpVectors(m.from, m.destination, eased);
    camera.position.x += Math.sin(t * Math.PI) * (isMobile ? 0.06 : 0.38);
    camera.position.z += Math.sin(t * Math.PI) * (isMobile ? 0.12 : 0.45);
    camera.position.x += isMobile ? 0 : pointer.x * 0.045;
    m.target.lerpVectors(m.fromTarget, m.look, eased);
    camera.lookAt(m.target);
  });
  return null;
}

function GardenBackdrop({ isMobile }: { isMobile: boolean }) {
  const backdrop = useMemo(() => makeBackdropTexture(), []);
  useEffect(() => () => backdrop.dispose(), [backdrop]);
  useEffect(() => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      const canvas = backdrop.image as HTMLCanvasElement;
      canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
      backdrop.needsUpdate = true;
    };
    image.src = isMobile ? "/images/garden/blue-hour-mobile.webp" : "/images/garden/blue-hour.webp";
    return () => { image.onload = null; image.onerror = null; image.src = ""; };
  }, [backdrop, isMobile]);

  return (
    <group>
      <mesh position={[0, 6.8, -13.8]}>
        <planeGeometry args={[36, 24]} />
        <meshBasicMaterial map={backdrop} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0, 8, -12.9]}>
        <planeGeometry args={[30, 15]} />
        <meshBasicMaterial color="#13261a" transparent opacity={0.08} />
      </mesh>
      <HazeSprite position={[-6.8, 4.8, -8.7]} scale={6.5} opacity={0.12} />
      <HazeSprite position={[7.1, 5.5, -9.2]} scale={7.5} opacity={0.1} />
      <HazeSprite position={[0, 7.2, -8.3]} scale={9.5} opacity={0.08} />
    </group>
  );
}

function GroundPath() {
  const stone = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1c2d22", roughness: 0.88, metalness: 0.02 }), []);
  const texture = useMemo(() => makeStoneTexture(), []);
  const path = useMemo(() => new THREE.MeshStandardMaterial({ color: "#a29780", roughness: 0.83, metalness: 0.04, map: texture, bumpMap: texture, bumpScale: 0.025 }), [texture]);
  useEffect(() => () => { stone.dispose(); path.dispose(); texture.dispose(); }, [stone, path, texture]);

  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, -2]} material={stone}>
        <planeGeometry args={[35, 36]} />
      </mesh>
      {Array.from({ length: 12 }, (_, index) => {
        const z = 10 - index * 1.7;
        const x = Math.sin(index * 0.32) * 0.2;
        const width = 3.2 - index * 0.085;
        return <group key={index} position={[x, -0.025, z]}>
          {index % 3 === 0 && <PetalBed position={[width * 0.4, 0.065, 0]} width={0.5} seed={index} />}
          <mesh receiveShadow material={path}><boxGeometry args={[width, 0.06, 1.66]} /></mesh>
          {[-1, 1].map((side) => <mesh key={side} position={[side * (width / 2 + 0.05), 0.04, 0]} material={stone}><boxGeometry args={[0.1, 0.13, 1.66]} /></mesh>)}
        </group>;
      })}
      {[-3.6, 3.45].map((x) => <ContactShade key={x} position={[x, 0.013, -0.3]} scale={[3, 1.9, 1]} />)}

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
      <meshStandardMaterial map={texture} color="#e4dac2" roughness={0.86} metalness={0} side={THREE.DoubleSide} transparent opacity={0.92} />
    </mesh>
  );
}

function GardenGate({ finale }: { finale: boolean }) {
  const archGeometry = useMemo(() => makeArchGeometry(), []);
  const vineGeometry = useMemo(() => makeVineGeometry(), []);
  useEffect(() => () => { archGeometry.dispose(); vineGeometry.dispose(); }, [archGeometry, vineGeometry]);

  const plaster = useMemo(() => makeStoneTexture(), []);
  useEffect(() => () => plaster.dispose(), [plaster]);
  const stone = useMemo(() => new THREE.MeshStandardMaterial({ color: "#c4b898", roughness: 0.91, metalness: 0, map: plaster, bumpMap: plaster, bumpScale: 0.012 }), [plaster]);
  const gold = useMemo(() => new THREE.MeshStandardMaterial({ color: "#d9ad6e", roughness: 0.38, metalness: 0.62, emissive: finale ? "#7d4f1b" : "#1e1209", emissiveIntensity: 0.08 }), [finale]);
  useEffect(() => () => stone.dispose(), [stone]);
  useEffect(() => () => gold.dispose(), [gold]);

  return (
    <group position={[0, 0, -5.1]}>
      {[-5.1, 5.1].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh castShadow receiveShadow position={[0, 2.5, 0]} material={stone}><boxGeometry args={[0.72, 5, 0.85]} /></mesh>
          <mesh position={[0, 0.32, 0]} material={stone}><boxGeometry args={[0.96, 0.64, 1.05]} /></mesh>
          <mesh position={[0, 4.75, 0]} material={stone}><boxGeometry args={[1, 0.2, 1.1]} /></mesh>
          <mesh position={[0, 5.48, 0]} material={gold}><cylinderGeometry args={[0.55, 0.48, 0.25, 12]} /></mesh>
          <mesh position={[0, 0.18, 0]} material={gold}><cylinderGeometry args={[0.7, 0.82, 0.3, 12]} /></mesh>
        </group>
      ))}
      <mesh castShadow receiveShadow geometry={archGeometry} material={stone} />
      <mesh geometry={archGeometry} material={stone} position={[0, 0, -2.1]} />
      <mesh position={[0, 7.36, -0.8]} material={stone}><boxGeometry args={[10.8, 0.22, 2.8]} /></mesh>
      <mesh receiveShadow position={[0, 0.08, -0.8]} material={stone}><boxGeometry args={[10.9, 0.16, 3]} /></mesh>
      <mesh geometry={vineGeometry} position={[0, 0, 0.12]}>
        <meshStandardMaterial color="#264832" roughness={0.7} metalness={0.02} />
      </mesh>
      <FlowerGarland position={[0, 6.75, 0.5]} scale={1.9} />
      <GardenPlant position={[-4.9, 0.1, 0.5]} scale={[1.6, 4.8, 1]} seed={21} />
      <GardenPlant position={[4.9, 0.1, 0.5]} scale={[1.7, 4.5, 1]} seed={24} />
      <PavilionSilk finale={finale} />
      <PetalBed position={[0, 0.18, 0]} width={3.5} />
      <pointLight position={[0, 4.7, -0.7]} intensity={14} distance={9} decay={2} color="#f7d2a0" />
    </group>
  );
}

const FlowerGarland = JasmineSwag;

function GardenLantern({ position, scale, phase, lit = false }: { position: [number, number, number]; scale: number; phase: number; lit?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const glow = useMemo(() => makeGlowTexture(), []);
  useEffect(() => () => glow.dispose(), [glow]);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.45 + phase) * 0.008;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh position={[0, -0.12, 0]}><cylinderGeometry args={[0.26, 0.29, 0.065, 12]} /><meshStandardMaterial color="#b98243" roughness={0.34} metalness={0.68} /></mesh>
      <mesh position={[0, 0.28, 0]}><cylinderGeometry args={[0.32, 0.24, 0.18, 10]} /><meshStandardMaterial color="#c89553" roughness={0.32} metalness={0.7} /></mesh>
      <mesh position={[0, 0.43, 0]}><coneGeometry args={[0.3, 0.25, 10]} /><meshStandardMaterial color="#b67b39" roughness={0.32} metalness={0.72} /></mesh>
      <mesh position={[0, 1.23, 0]}><cylinderGeometry args={[0.009, 0.009, 1.4, 4]} /><meshStandardMaterial color="#9d8452" metalness={0.55} roughness={0.46} /></mesh>
      {[-1, 1].flatMap((x) => [-1, 1].map((z) => <mesh key={`${x}-${z}`} position={[x * 0.16, 0.08, z * 0.16]}><boxGeometry args={[0.022, 0.39, 0.022]} /><meshStandardMaterial color="#b99861" metalness={0.65} roughness={0.35} /></mesh>))}
      <mesh position={[0, 0.12, 0]}><cylinderGeometry args={[0.09, 0.09, 0.28, 10]} /><meshStandardMaterial color="#ffd98a" emissive="#f6a943" emissiveIntensity={1.4} transparent opacity={0.93} /></mesh>
      <sprite position={[0, 0.12, 0]} scale={[1.6, 1.6, 1]}><spriteMaterial map={glow} color="#f5b45e" transparent opacity={0.18} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>
      {lit && <pointLight position={[0, 0.15, 0.35]} intensity={3.5} distance={6.5} decay={2} color="#f4c58b" />}
    </group>
  );
}

type MemoryProp = { moment: GardenMoment; active: boolean; position?: [number, number, number]; onSelect: (moment: GardenMoment) => void };

function SchoolDesk({ moment, active, position = [-3.6, 0.16, -0.3], onSelect }: MemoryProp) {
  const grain = useMemo(() => makeWoodTexture(), []);
  useEffect(() => () => grain.dispose(), [grain]);
  return (
    <group position={position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(moment); }}>
      <mesh castShadow receiveShadow position={[0, 0.75, 0]}><boxGeometry args={[2.35, 0.16, 1.22]} /><meshStandardMaterial map={grain} bumpMap={grain} bumpScale={0.008} color="#99744c" roughness={0.68} metalness={0} /></mesh>
      {[-0.92, 0.92].flatMap((x) => [-0.4, 0.4].map((z) => <mesh key={`${x}-${z}`} position={[x, 0.28, z]}><boxGeometry args={[0.15, 0.88, 0.15]} /><meshStandardMaterial color="#5b3825" roughness={0.62} /></mesh>))}
      <mesh position={[0, 0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.48, 0.9]} /><meshStandardMaterial color="#efe3c7" roughness={0.72} /></mesh>
      {[-1, 1].map((side) => <mesh key={side} position={[side * 0.3, 0.869, 0.01]} rotation={[0, 0, side * 0.035]}><boxGeometry args={[0.6, 0.024, 0.7]} /><meshStandardMaterial color="#eee6d3" roughness={0.98} /></mesh>)}
      <mesh position={[0, 0.875, -0.02]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.02, 0.67]} /><meshStandardMaterial color="#b58042" metalness={0.4} roughness={0.44} /></mesh>
      <GardenLantern position={[-1.1, 1.55, -0.5]} scale={0.48} phase={0} lit={active} />
      <GardenPlant position={[-1.8, -0.15, -0.7]} scale={[1.4, 2.2, 1.2]} seed={32} />
      <GardenPlant position={[1.6, -0.15, -1]} scale={[1.1, 1.4, 1]} seed={36} />
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
      <GardenPlant position={[-1.3, 0, -0.5]} scale={[1.6, 1.8, 1]} seed={17} />
      <GardenPlant position={[1.2, 0, -0.7]} scale={[1.2, 2.1, 1]} seed={19} />
      <FlowerGarland position={[0, 3.15, -0.5]} scale={0.64} />
      <ContactShade position={[0, 0.001, 0]} scale={[3.3, 2, 1]} />
    </group>
  );
}

function PromiseArch({ moment, active, position = [0, 0, -4.45], onSelect }: MemoryProp) {
  return (
    <group position={position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(moment); }}>
      <mesh castShadow receiveShadow position={[0, 0.18, 0.45]}><boxGeometry args={[2.3, 0.32, 1.1]} /><meshStandardMaterial color="#b8ad91" roughness={0.9} metalness={0} /></mesh>
      <FlowerGarland position={[0, 3.55, 0]} scale={0.9} />
      <GardenPlant position={[-1.6, 0, 0]} scale={[1.5, 3.2, 1.4]} seed={29} />
      <GardenPlant position={[1.6, 0, -0.25]} scale={[1.6, 3.5, 1.3]} seed={31} />
      <FlowerGarland position={[0, 0.49, 0.95]} scale={0.38} />
      <PetalBed position={[0, 0.015, 1]} width={1.5} />
      {active && <pointLight position={[0, 2.2, 1.5]} intensity={6} distance={4} color="#f7d9ae" />}
    </group>
  );
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
    <sprite scale={[8.2, 8.2, 1]}><spriteMaterial map={glow} color="#f1bd68" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>
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
    gradient.addColorStop(0, "#706b5d");
    gradient.addColorStop(0.2, "#b0a88e");
    gradient.addColorStop(0.48, "#efe6cb");
    gradient.addColorStop(0.7, "#b8ad92");
    gradient.addColorStop(1, "#706951");
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

function PavilionSilk({ finale }: { finale: boolean }) {
  const geometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(2.8, 5.6, 24, 12);
    const p = geometry.attributes.position;
    for (let i = 0; i < p.count; i++) p.setZ(i, Math.cos(p.getX(i) * 8) * 0.12 + Math.sin(p.getY(i)) * 0.05);
    geometry.computeVertexNormals(); return geometry;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const destination = (i === 0 ? -1 : 1) * (finale ? 4.05 : 3.45);
      child.position.x = THREE.MathUtils.damp(child.position.x, destination, 2.4, Math.min(delta, 0.05));
    });
  });
  return <group ref={group}>{[-1, 1].map((side) => <mesh key={side} position={[side * 3.45, 3, -0.9]} geometry={geometry} rotation={[0, side * 0.1, side * -0.04]}><meshStandardMaterial color="#dfd4b7" roughness={0.93} side={THREE.DoubleSide} /></mesh>)}</group>;
}

function makeStoneTexture() {
  const canvas = document.createElement("canvas"); canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#c9c1b0"; ctx.fillRect(0, 0, 256, 256);
    const random = seeded(920);
    for (let i = 0; i < 5500; i++) {
      ctx.fillStyle = i % 2 ? "rgba(60,48,35,.035)" : "rgba(255,255,240,.09)";
      ctx.fillRect(random() * 256, random() * 256, random() * 7 + 1, random() * 2 + 1);
    }
    for (let i = 0; i < 12; i++) {
      const x = random() * 256, y = random() * 256;
      const g = ctx.createRadialGradient(x, y, 1, x, y, 45);
      g.addColorStop(0, "rgba(101,83,59,.1)"); g.addColorStop(1, "rgba(101,83,59,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
    }
  }
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; return texture;
}

/** A small local reflection probe adds brass highlights without another network asset. */
function MaterialReflections() {
  const get = useThree((state) => state.get);
  useEffect(() => {
    const { gl, scene } = get();
    const room = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const previous = scene.environment;
    const intensity = scene.environmentIntensity;
    const target = generator.fromScene(room, 0.08, 0.1, 100, { size: 128 });
    scene.environment = target.texture;
    scene.environmentIntensity = 0.22;
    room.dispose(); generator.dispose();
    return () => { scene.environment = previous; scene.environmentIntensity = intensity; target.dispose(); };
  }, [get]);
  return null;
}

function makeWoodTexture() {
  const canvas = document.createElement("canvas"); canvas.width = 256; canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#9c7757"; ctx.fillRect(0, 0, 256, 128);
    const random = seeded(192);
    for (let row = 0; row < 190; row++) {
      const y = random() * 128;
      ctx.strokeStyle = row % 3 === 0 ? "rgba(233,195,135,.13)" : "rgba(42,22,14,.14)";
      ctx.lineWidth = random() * 0.7 + 0.2;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.bezierCurveTo(80, y + Math.sin(row) * 6, 160, y - 3, 256, y + Math.cos(row) * 4); ctx.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; return texture;
}
