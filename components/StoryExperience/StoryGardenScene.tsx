"use client";

import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gardenMoments, type GardenMoment, type GardenChapter } from "./content";

type StoryGardenSceneProps = {
  activeMoment: GardenMoment | null;
  finale: boolean;
  isMobile: boolean;
  onSelect: (moment: GardenMoment) => void;
  onArrive: (chapter: GardenChapter) => void;
};

import { BotanicalPalette, GardenPlant, JasmineSwag, PetalBed } from "./GardenBotanicals";

import PhysicalMemory, { PhysicalMemoryLibrary } from "./PhysicalMemory";
import { desktopMarks, mobileMarks, portraitPlaces, journeyDuration } from "./journey";

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

export default function StoryGardenScene({ activeMoment, finale, isMobile, onSelect, onArrive }: StoryGardenSceneProps) {
  return (
    <PhysicalMemoryLibrary><BotanicalPalette>
      <color attach="background" args={[palette.night]} />
      <fog attach="fog" args={[palette.night, 17, 38]} />
      <ambientLight intensity={0.24} color="#bcccd3" />
      <hemisphereLight args={["#8cabbf", "#152c20", 0.85]} />
      <directionalLight position={[-6, 8, -4]} intensity={1.8} color="#aec8dd" />
      <directionalLight position={[2, 7, 5]} intensity={1.1} color="#f4ddb3" castShadow shadow-mapSize-width={isMobile ? 512 : 1024} shadow-mapSize-height={isMobile ? 512 : 1024} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={10} shadow-camera-bottom={-8} shadow-camera-far={30} shadow-bias={-0.0005} shadow-normalBias={0.03} />
      <MemoryLighting activeMoment={activeMoment} finale={finale} isMobile={isMobile} />

      <CameraDirector activeMoment={activeMoment} finale={finale} isMobile={isMobile} onArrive={onArrive} />
      <MaterialReflections />
      <GardenBackdrop isMobile={isMobile} />
      <GroundPath />
      {isMobile ? <PortraitStage activeMoment={activeMoment} finale={finale} onSelect={onSelect} /> : <>
      <SilkWing side="left" />
      <SilkWing side="right" />
      <GardenGate finale={finale} />

      <PlantMass position={[-5.9, 0, -2.3]} scale={[1.25, 3.2, 1]} seed={26} />
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
      {finale && <group position={[0, 0, isMobile ? -6 : 0]}><FinaleGlow /></group>}
    </BotanicalPalette></PhysicalMemoryLibrary>
  );
}

/** Persistent portrait route: independently framed destinations share landmarks and path. */
function PortraitStage({ activeMoment, finale, onSelect }: Pick<StoryGardenSceneProps, "activeMoment" | "finale" | "onSelect">) {
  return <>
    <group position={[0, 0, -6.7]} scale={0.65}><GardenGate finale={finale} /></group>
    <SchoolDesk portrait position={portraitPlaces.school} moment={gardenMoments[0]} active={activeMoment?.id === "school-days"} onSelect={onSelect} />
    <FriendshipLanterns position={portraitPlaces.friendship} moment={gardenMoments[1]} active={activeMoment?.id === "friendship"} onSelect={onSelect} />
    <PromiseArch position={portraitPlaces.more} moment={gardenMoments[2]} active={activeMoment?.id === "something-more"} onSelect={onSelect} />
    <PlantMass position={[-5.4, 0, 5.9]} scale={[1.4, 1.7, 1]} seed={46} />
    <PlantMass position={[4.4, 0, 1.4]} scale={[1.2, 2.2, 1]} seed={53} />
    <PlantMass position={[-4.6, 0, -2.7]} scale={[1.4, 1.25, 1]} seed={37} />
    <PlantMass position={[3.7, 0, -9.8]} scale={[1.8, 1.8, 1]} seed={18} />
    <GardenLantern position={[-2.35, 2.1, -8.3]} scale={0.7} phase={0.4} />
    <GardenLantern position={[2.35, 2.1, -8.3]} scale={0.7} phase={1.2} />
  </>;
}

const PlantMass = GardenPlant;

function CameraDirector({ activeMoment, finale, isMobile, onArrive }: Pick<StoryGardenSceneProps, "activeMoment" | "finale" | "isMobile" | "onArrive">) {
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  const motion = useRef({ key: "", chapter: "garden" as GardenChapter, layout: isMobile, elapsed: 0, notified: false, from: new THREE.Vector3(), fromTarget: new THREE.Vector3(), target: new THREE.Vector3(), destination: new THREE.Vector3(), look: new THREE.Vector3(), c1: new THREE.Vector3(), c2: new THREE.Vector3(), position: new THREE.Vector3() });
  const chapter: GardenChapter = finale ? "finale" : activeMoment?.id ?? "garden";
  useFrame(({ camera }, delta) => {
    const m = motion.current;
    const marks = isMobile ? mobileMarks : desktopMarks;
    const mark = marks[chapter];
    const key = chapter + isMobile + size.width + size.height;
    const changed = key !== m.key;
    const extra = Math.max(0, 1.1 - size.width / Math.max(1, size.height)) * (isMobile ? 3 : 7);
    if (key !== m.key) {
      const reframe = !m.key || m.layout !== isMobile || m.chapter === chapter;
      m.destination.set(mark.position[0], mark.position[1], mark.position[2] + extra);
      m.look.set(...mark.target);
      // A responsive layout switch reframes immediately, never flies between two world layouts.
      if (reframe) { camera.position.copy(m.destination); m.target.copy(m.look); }
      m.from.copy(camera.position); m.fromTarget.copy(m.target);
      const reverse = mark.position[2] > marks[m.chapter].position[2];
      m.c1.set(...(reverse ? marks[m.chapter].approach : marks[m.chapter].departure));
      m.c2.set(...(reverse ? mark.departure : mark.approach));
      m.c1.z += extra; m.c2.z += extra;
      // Retarget safely from the actual camera if visitors skip or reverse rapidly.
      m.c1.lerp(m.from, 0.35);
      if (reframe) { m.c1.copy(m.destination); m.c2.copy(m.destination); }
      m.elapsed = reframe ? 1 : 0; m.notified = false; m.key = key; m.chapter = chapter; m.layout = isMobile;
    }
    // Ignore the first demand frame's idle interval; then use real elapsed frame time.
    // A slow device still arrives on time rather than stretching travel below 20fps.
    m.elapsed = Math.min(1, m.elapsed + (changed ? 0 : delta) / journeyDuration(isMobile));
    const t = m.elapsed;
    const u = t * t * t * (t * (t * 6 - 15) + 10);
    const v = 1 - u;
    m.position.copy(m.from).multiplyScalar(v * v * v).addScaledVector(m.c1, 3 * v * v * u).addScaledVector(m.c2, 3 * v * u * u).addScaledVector(m.destination, u * u * u);
    camera.position.copy(m.position);
    m.target.lerpVectors(m.fromTarget, m.look, u);
    camera.lookAt(m.target);
    if (t < 1) invalidate();
    if (t === 1 && !m.notified) { m.notified = true; onArrive(chapter); }
  });
  return null;
}

function MemoryLighting({ activeMoment, finale, isMobile }: Pick<StoryGardenSceneProps, "activeMoment" | "finale" | "isMobile">) {
  const light = useRef<THREE.PointLight>(null);
  const invalidate = useThree((state) => state.invalidate);
  const destination = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, delta) => {
    if (!light.current) return;
    const mark = (isMobile ? mobileMarks : desktopMarks)[finale ? "finale" : activeMoment?.id ?? "garden"];
    destination.set(mark.target[0], 3.8, mark.target[2] + 2);
    light.current.position.lerp(destination, 1 - Math.exp(-Math.min(delta, 0.05) * 2.5));
    light.current.intensity = THREE.MathUtils.damp(light.current.intensity, finale ? 18 : 16, 2, delta);
    if (light.current.position.distanceToSquared(destination) > 0.0004 || Math.abs(light.current.intensity - (finale ? 18 : 16)) > 0.02) invalidate();
  });
  return <pointLight ref={light} position={[0, 3.8, 2]} intensity={16} distance={11} decay={2} color="#f8cb87" />;
}

function GardenBackdrop({ isMobile }: { isMobile: boolean }) {
  const invalidate = useThree((state) => state.invalidate);
  const backdrop = useMemo(() => makeBackdropTexture(), []);
  useEffect(() => () => backdrop.dispose(), [backdrop]);
  useEffect(() => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      const canvas = backdrop.image as HTMLCanvasElement;
      canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
      backdrop.needsUpdate = true;
      invalidate();
    };
    image.src = isMobile ? "/images/garden/blue-hour-mobile.webp" : "/images/garden/blue-hour.webp";
    return () => { image.onload = null; image.onerror = null; image.src = ""; };
  }, [backdrop, isMobile, invalidate]);

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
  const texture = useMemo(() => makeStoneTexture(), []);
  const stone = useMemo(() => new THREE.MeshStandardMaterial({ color: "#12251c", roughness: 1, metalness: 0, map: texture }), [texture]);
  const path = useMemo(() => new THREE.MeshStandardMaterial({ color: "#a29780", roughness: 0.83, metalness: 0.04, map: texture, bumpMap: texture, bumpScale: 0.025 }), [texture]);
  useEffect(() => () => { stone.dispose(); path.dispose(); texture.dispose(); }, [stone, path, texture]);

  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, -2]} material={stone}>
        <planeGeometry args={[35, 36]} />
      </mesh>
      {Array.from({ length: 14 }, (_, index) => {
        const z = 10 - index * 1.7;
        const x = Math.sin(index * 0.32) * 0.2;
        const width = 3.2 - index * 0.085;
        return <group key={index} position={[x, -0.025, z]}>
          {index % 3 === 0 && <PetalBed position={[width * 0.4, 0.065, 0]} width={0.5} seed={index} />}
          <mesh receiveShadow material={path}><boxGeometry args={[width, 0.06, 1.66]} /></mesh>
          {[-1, 1].map((side) => <mesh key={side} position={[side * (width / 2 + 0.035), 0.015, 0]} material={stone}><boxGeometry args={[0.07, 0.065, 1.66]} /></mesh>)}
        </group>;
      })}

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
  const pillar = useMemo(() => new THREE.LatheGeometry([[0.5, 0], [0.54, 0.14], [0.43, 0.25], [0.4, 0.43], [0.32, 0.52], [0.27, 4.43], [0.4, 4.52], [0.46, 4.68], [0.42, 4.85]].map(([x, y]) => new THREE.Vector2(x, y)), 12), []);
  const canopy = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(1, 1, 32, 8);
    const arch = new THREE.CubicBezierCurve(new THREE.Vector2(-5.5, 4.8), new THREE.Vector2(-5.5, 8.15), new THREE.Vector2(5.5, 8.15), new THREE.Vector2(5.5, 4.8));
    const p = geometry.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const u = p.getX(i) + 0.5, v = p.getY(i) + 0.5;
      const edge = arch.getPoint(u);
      p.setXYZ(i, edge.x, edge.y - 0.12 - Math.sin(v * Math.PI) * 0.12, -2.1 + v * 2.65);
    }
    geometry.computeVertexNormals(); return geometry;
  }, []);
  useEffect(() => () => { pillar.dispose(); canopy.dispose(); }, [pillar, canopy]);
  const vineGeometry = useMemo(() => makeVineGeometry(), []);
  useEffect(() => () => { archGeometry.dispose(); vineGeometry.dispose(); }, [archGeometry, vineGeometry]);

  const plaster = useMemo(() => makeStoneTexture(), []);
  useEffect(() => () => plaster.dispose(), [plaster]);
  const stone = useMemo(() => new THREE.MeshStandardMaterial({ color: "#b6ad96", roughness: 0.94, metalness: 0, map: plaster, bumpMap: plaster, bumpScale: 0.035 }), [plaster]);
  const gold = useMemo(() => new THREE.MeshStandardMaterial({ color: "#bc9b66", roughness: 0.57, metalness: 0.5, emissive: finale ? "#594320" : "#1e1209", emissiveIntensity: 0.04 }), [finale]);
  useEffect(() => () => stone.dispose(), [stone]);
  useEffect(() => () => gold.dispose(), [gold]);

  return (
    <group position={[0, 0, -5.1]}>
      {[-5.1, 5.1].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh castShadow receiveShadow geometry={pillar} material={stone} />
          <mesh position={[0, 0.32, 0]} material={stone}><boxGeometry args={[0.96, 0.64, 1.05]} /></mesh>
          <mesh position={[0, 4.75, 0]} material={stone}><boxGeometry args={[1, 0.2, 1.1]} /></mesh>
          <mesh position={[0, 5.48, 0]} material={gold}><cylinderGeometry args={[0.55, 0.48, 0.25, 12]} /></mesh>
          <mesh position={[0, 0.18, 0]} material={gold}><cylinderGeometry args={[0.7, 0.82, 0.3, 12]} /></mesh>
        </group>
      ))}
      <mesh castShadow receiveShadow geometry={archGeometry} material={stone} />
      <mesh geometry={archGeometry} material={stone} position={[0, 0, -2.1]} />
      {[-5.1, 5.1].map((x) => <mesh key={x} position={[x, 0, -2.1]} geometry={pillar} material={stone} castShadow />)}
      <mesh geometry={canopy} receiveShadow><meshStandardMaterial color="#d9cdb0" side={THREE.DoubleSide} roughness={0.95} /></mesh>
      <mesh receiveShadow position={[0, 0.08, -0.8]} material={stone}><boxGeometry args={[10.9, 0.16, 3]} /></mesh>
      <mesh geometry={vineGeometry} position={[0, 0, 0.12]}>
        <meshStandardMaterial color="#264832" roughness={0.7} metalness={0.02} />
      </mesh>
      <FlowerGarland position={[0, 6.25, 0.5]} scale={1.85} />
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
  const glow = useMemo(() => makeGlowTexture(), []);
  useEffect(() => () => glow.dispose(), [glow]);

  return (
    <group position={position} scale={scale} rotation={[0, 0, Math.sin(phase) * 0.006]}>
      <mesh position={[0, -0.12, 0]}><cylinderGeometry args={[0.26, 0.29, 0.065, 12]} /><meshStandardMaterial color="#ab864e" roughness={0.57} metalness={0.56} /></mesh>
      <mesh position={[0, 0.28, 0]}><cylinderGeometry args={[0.32, 0.24, 0.18, 10]} /><meshStandardMaterial color="#b49560" roughness={0.6} metalness={0.58} /></mesh>
      <mesh position={[0, 0.43, 0]}><coneGeometry args={[0.3, 0.25, 10]} /><meshStandardMaterial color="#a88550" roughness={0.55} metalness={0.58} /></mesh>
      <mesh position={[0, 1.23, 0]}><cylinderGeometry args={[0.013, 0.013, 1.4, 4]} /><meshStandardMaterial color="#786b4e" metalness={0.4} roughness={0.72} /></mesh>
      {[-1, 1].flatMap((x) => [-1, 1].map((z) => <mesh key={`${x}-${z}`} position={[x * 0.16, 0.08, z * 0.16]}><boxGeometry args={[0.026, 0.39, 0.026]} /><meshStandardMaterial color="#ad9669" metalness={0.5} roughness={0.6} /></mesh>))}
      <mesh position={[0, 0.12, 0]}><cylinderGeometry args={[0.09, 0.09, 0.28, 10]} /><meshStandardMaterial color="#ffd98a" emissive="#f6a943" emissiveIntensity={1.4} transparent opacity={0.93} /></mesh>
      <sprite position={[0, 0.12, 0]} scale={[1.6, 1.6, 1]}><spriteMaterial map={glow} color="#f5b45e" transparent opacity={0.18} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>
      {lit && <pointLight position={[0, 0.15, 0.35]} intensity={3.5} distance={6.5} decay={2} color="#f4c58b" />}
    </group>
  );
}

type MemoryProp = { moment: GardenMoment; active: boolean; position?: [number, number, number]; onSelect: (moment: GardenMoment) => void };

function SchoolDesk({ moment, active, position = [-4.5, 0.16, 1], onSelect, portrait = false }: MemoryProp & { portrait?: boolean }) {
  const grain = useMemo(() => makeWoodTexture(), []);
  useEffect(() => () => grain.dispose(), [grain]);
  return (
    <group position={position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(moment); }}>
      <mesh castShadow receiveShadow position={[0, 0.75, 0]}><boxGeometry args={[2.35, 0.16, 1.22]} /><meshStandardMaterial map={grain} bumpMap={grain} bumpScale={0.008} color="#99744c" roughness={0.68} metalness={0} /></mesh>
      {[-0.92, 0.92].flatMap((x) => [-0.4, 0.4].map((z) => <mesh key={`${x}-${z}`} position={[x, 0.28, z]}><boxGeometry args={[0.15, 0.88, 0.15]} /><meshStandardMaterial color="#5b3825" roughness={0.62} /></mesh>))}
      <group position={[0, 0.86, -0.34]} rotation={[-0.92, 0, 0.015]}>
        <mesh position={[0, 0.51, -0.06]}><boxGeometry args={[1.65, 1.06, 0.045]} /><meshStandardMaterial color="#6e4e37" roughness={0.82} /></mesh>
        {[-1, 1].map((side) => <group key={side} position={[side * 0.405, 0.51, 0]} rotation={[0, side * -0.025, 0]}>
          <mesh><boxGeometry args={[0.79, 1.02, 0.055]} /><meshStandardMaterial color="#d5c8aa" roughness={0.98} /></mesh>
          <mesh position={[0, 0, 0.03]}><planeGeometry args={[0.77, 1]} /><meshStandardMaterial color="#efe5d0" roughness={1} /></mesh>
        </group>)}
        <PhysicalMemory id={moment.id} active={active} position={[0.41, 0.52, 0.045]} width={0.64} treatment="album" />
        <mesh position={[0, 0.51, 0.031]}><boxGeometry args={[0.018, 1.02, 0.005]} /><meshStandardMaterial color="#a38a58" roughness={0.85} /></mesh>
        {[0.36, 0.44, 0.52, 0.68].map((y, i) => <mesh key={y} position={[-0.4, y, 0.035]}><planeGeometry args={[i === 3 ? 0.26 : 0.48, 0.006]} /><meshBasicMaterial color="#b5a382" /></mesh>)}
      </group>
      <GardenLantern position={[-1.1, 1.55, -0.5]} scale={0.48} phase={0} lit={active} />
      <GardenPlant position={[-1.25, -0.15, -0.9]} scale={[1.5, portrait ? 3 : 2.4, 1.2]} seed={32} />
      <group position={[portrait ? 2.6 : 2.1, -0.15, -1]} rotation={[0, 0.4, 0]}><GardenPlant position={[0, 0, 0]} scale={[1.35, portrait ? 3 : 2.05, 1]} seed={61} /></group>
      <ContactShade position={[0, -0.145, 0]} scale={[3, 2.1, 1]} />
    </group>
  );
}

function FriendshipLanterns({ moment, active, position = [3.45, 0.1, -0.5], onSelect }: MemoryProp) {
  return (
    <group position={position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(moment); }}>
      <mesh receiveShadow position={[0, 0, 0]}><boxGeometry args={[2.1, 0.07, 1.1]} /><meshStandardMaterial color="#304637" roughness={0.98} /></mesh>
      <mesh castShadow position={[0, 0.085, 0.3]}><boxGeometry args={[1.25, 0.1, 0.56]} /><meshStandardMaterial color="#82745b" roughness={0.9} /></mesh>
      <PhysicalMemory id={moment.id} active={active} position={[0, 1, 0.5]} rotation={[-0.08, -0.08, 0]} width={1.08} treatment="brass" />
      <GardenLantern position={[-1.2, 1.7, 0.2]} scale={1.2} phase={1.4} lit={active} />
      <GardenLantern position={[1.2, 2, -0.25]} scale={1.2} phase={2.4} />
      <GardenPlant position={[-1.3, 0, -0.5]} scale={[1.6, 1.8, 1]} seed={17} />
      <GardenPlant position={[1.2, 0, -0.7]} scale={[1.2, 2.1, 1]} seed={19} />
      <FlowerGarland position={[0, 3.15, -0.5]} scale={0.64} />
      <ContactShade position={[0, 0.001, 0]} scale={[3.3, 2, 1]} />
    </group>
  );
}

function PromiseArch({ moment, active, position = [-7.5, 0, -6], onSelect }: MemoryProp) {
  return (
    <group position={position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(moment); }}>
      <mesh castShadow receiveShadow position={[0, 0.18, 0.45]}><boxGeometry args={[2.3, 0.32, 1.1]} /><meshStandardMaterial color="#b8ad91" roughness={0.9} metalness={0} /></mesh>
      <PhysicalMemory id={moment.id} active={active} position={[0, 1.31, 0.74]} rotation={[-0.04, 0.03, 0]} width={1.28} treatment="ivory" />
      <FlowerGarland position={[-0.1, 2.85, -0.12]} scale={0.68} rotation={-0.09} />
      <GardenPlant position={[-1.55, 0, -0.1]} scale={[1.25, 3.1, 1.2]} seed={29} />
      <group rotation={[0, -0.35, 0]}><GardenPlant position={[1.5, 0, -0.6]} scale={[1.7, 2.35, 1.1]} seed={62} /></group>
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
  const invalidate = useThree((state) => state.invalidate);
  const fabric = useMemo(() => makeFabricTexture(), []);
  useEffect(() => () => fabric.dispose(), [fabric]);
  const geometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(2.8, 5.6, 24, 12);
    const p = geometry.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i), y = p.getY(i);
        const gather = Math.exp(-Math.pow((y + 0.25) / 0.95, 2));
        p.setXYZ(i, x * (1 - gather * 0.34), y, Math.cos(x * 8) * (0.1 + gather * 0.045) + Math.sin(y) * 0.05);
      }
    geometry.computeVertexNormals(); return geometry;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const destination = (i === 0 ? -1 : 1) * (finale ? 4.05 : 3.45);
      child.position.x = THREE.MathUtils.damp(child.position.x, destination, 2.4, Math.min(delta, 0.05));
      if (Math.abs(child.position.x - destination) > 0.003) invalidate();
    });
  });
  return <group ref={group}>{[-1, 1].map((side) => <mesh key={side} position={[side * 3.45, 3, -0.9]} geometry={geometry} rotation={[0, side * 0.1, side * -0.04]}><meshStandardMaterial color="#dfd4bd" map={fabric} bumpMap={fabric} bumpScale={0.012} roughness={0.96} side={THREE.DoubleSide} /></mesh>)}</group>;
}

function makeFabricTexture() {
  const canvas = document.createElement("canvas"); canvas.width = 128; canvas.height = 256;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = "#eee8da"; context.fillRect(0, 0, 128, 256);
    const random = seeded(714);
    for (let x = 0; x < 128; x += 2) {
      context.fillStyle = `rgba(94,82,62,${0.025 + random() * 0.075})`;
      context.fillRect(x, 0, 1, 256);
    }
    for (let y = 0; y < 256; y += 3) {
      context.fillStyle = "rgba(255,255,244,.12)"; context.fillRect(0, y, 128, 1);
    }
    const hem = context.createLinearGradient(0, 220, 0, 256);
    hem.addColorStop(0, "rgba(94,82,62,0)"); hem.addColorStop(1, "rgba(94,82,62,.12)");
    context.fillStyle = hem; context.fillRect(0, 220, 128, 36);
  }
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
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
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    const { gl, scene } = get();
    const room = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const previous = scene.environment;
    const intensity = scene.environmentIntensity;
    const target = generator.fromScene(room, 0.08, 0.1, 100, { size: 128 });
    scene.environment = target.texture;
    scene.environmentIntensity = 0.22;
    invalidate();
    room.dispose(); generator.dispose();
    return () => { scene.environment = previous; scene.environmentIntensity = intensity; target.dispose(); };
  }, [get, invalidate]);
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
