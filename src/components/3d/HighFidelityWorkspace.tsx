"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, Float, Sparkles, ContactShadows, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Predefined work states as requested by the user
const WORK_STATES = [
  { name: "Coding", color: "#A8DDFD", intensity: 3.5 },    // Cool blue glow
  { name: "Analysis", color: "#DAF7A6", intensity: 3.0 },  // Soft green glow
  { name: "Productivity", color: "#FFC300", intensity: 2.8 }, // Warm amber glow
  { name: "Focus", color: "#F0F0F0", intensity: 3.2 }      // Neutral white
];

// Custom component to generate an IDE-style code screen texture
function CodeScreen({ glowColor }: { glowColor: THREE.Color }) {
  const canvasRef = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // IDE Background
      ctx.fillStyle = "#0d0d0d";
      ctx.fillRect(0, 0, 512, 320);
      
      // Sidebar / Explorer
      ctx.fillStyle = "#151515";
      ctx.fillRect(0, 0, 80, 320);
      
      // Code lines (Procedural IDE look)
      const colors = ["#ff79c6", "#bd93f9", "#50fa7b", "#f1fa8c", "#8be9fd"];
      for (let i = 0; i < 20; i++) {
        const y = 20 + i * 15;
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = color;
        const width = 50 + Math.random() * 200;
        ctx.fillRect(100, y, width, 8);
        
        // Indented lines
        if (Math.random() > 0.5) {
          ctx.fillRect(130, y + 15, width * 0.7, 8);
          i++;
        }
      }
    }
    return canvas;
  }, []);

  const texture = useMemo(() => new THREE.CanvasTexture(canvasRef), [canvasRef]);

  return (
    <meshStandardMaterial 
      map={texture}
      emissive={glowColor}
      emissiveIntensity={1.5}
      toneMapped={false}
    />
  );
}

function Monitor({ position, rotation, glowColor, isIDE = false }: { position: [number, number, number], rotation: [number, number, number], glowColor: THREE.Color, isIDE?: boolean }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Monitor Frame */}
      <mesh>
        <boxGeometry args={[1.1, 0.65, 0.04]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[1.08, 0.62]} />
        {isIDE ? <CodeScreen glowColor={glowColor} /> : (
          <meshStandardMaterial 
            emissive={glowColor}
            emissiveIntensity={2}
            color={glowColor}
            toneMapped={false}
          />
        )}
      </mesh>
      {/* Stand */}
      <mesh position={[0, -0.4, -0.1]}>
        <boxGeometry args={[0.04, 0.3, 0.04]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.2]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} />
      </mesh>
    </group>
  );
}

function GamingChair() {
  return (
    <group position={[0, -0.8, 0.8]}>
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.65, 0.12, 0.6]} />
        <meshStandardMaterial color="#080808" roughness={0.7} />
      </mesh>
      <group position={[0, 0.65, 0.25]} rotation={[-0.1, 0, 0]}>
         <mesh castShadow>
          <boxGeometry args={[0.6, 1.1, 0.15]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.6, 0.05]}>
          <boxGeometry args={[0.4, 0.25, 0.1]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </group>
      {[[-0.38, 0.4, 0], [0.38, 0.4, 0]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.12, 0.05, 0.45]} />
          <meshStandardMaterial color="#050505" metalness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8]} />
        <meshStandardMaterial color="#111" metalness={0.9} />
      </mesh>
    </group>
  );
}

function StandingDesk() {
  return (
    <group>
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.2, 0.06, 1.8]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.2} />
      </mesh>
      {[[-1.2, -0.4, 0], [1.2, -0.4, 0]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.1, 0.8, 0.15]} />
            <meshStandardMaterial color="#050505" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[0.15, 0.05, 1.2]} />
            <meshStandardMaterial color="#050505" metalness={0.9} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.035, 0.2]} receiveShadow>
        <boxGeometry args={[1.2, 0.01, 0.7]} />
        <meshStandardMaterial color="#050505" roughness={1} />
      </mesh>
      <mesh position={[0, 0.065, 0.35]} castShadow>
        <boxGeometry args={[0.6, 0.05, 0.22]} />
        <meshStandardMaterial color="#111" metalness={0.5} />
      </mesh>
    </group>
  );
}

function AtmosphericBokeh() {
  return (
    <group>
      <Sparkles count={60} scale={[10, 8, 10]} size={4} speed={0.4} color="#7000ff" opacity={0.3} />
      {[...Array(15)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[(Math.random() - 0.5) * 15, Math.random() * 8, (Math.random() - 0.5) * 15 - 5]}>
            <sphereGeometry args={[0.1 + Math.random() * 0.2, 16, 16]} />
            <meshBasicMaterial color="#a020f0" transparent opacity={0.15} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function GirlModel() {
  const { scene, animations } = useGLTF("/models/girl.glb");
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  
  useEffect(() => {
    if (animations.length > 0) {
      const action = mixer.clipAction(animations[0]);
      action.play();
    }
  }, [animations, mixer]);

  useFrame((state, delta) => mixer.update(delta));

  return (
    <primitive 
      object={scene} 
      scale={1.25} 
      position={[0, -0.4, 0.35]} 
      rotation={[0, Math.PI, 0]} 
    />
  );
}

export default function HighFidelityWorkspace() {
  const [stateIndex, setStateIndex] = useState(0);
  const glowColor = useMemo(() => new THREE.Color(WORK_STATES[stateIndex].color), [stateIndex]);
  const lightRef = useRef<THREE.SpotLight>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStateIndex((prev) => (prev + 1) % WORK_STATES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (lightRef.current) {
        const targetIntensity = WORK_STATES[stateIndex].intensity;
        lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetIntensity, 0.05);
    }
  });

  return (
    <group position={[0, -0.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
      <Environment preset="night" />
      <AtmosphericBokeh />
      
      <spotLight
        ref={lightRef}
        position={[0, 1.2, -0.6]}
        angle={0.8}
        penumbra={0.7}
        intensity={3}
        color={glowColor}
        castShadow
        shadow-bias={-0.0001}
      />
      
      {/* Cinematic Rim Light */}
      <pointLight 
        position={[0, 2, 3]} 
        intensity={4.5} 
        color="#ff00ff" 
        distance={10}
        decay={2}
      />

      <ambientLight intensity={0.15} />

      {/* Triple Monitor Setup */}
      <Monitor position={[0, 0.5, -0.5]} rotation={[0, 0, 0]} glowColor={glowColor} isIDE />
      <Monitor position={[-1.15, 0.5, -0.35]} rotation={[0, 0.4, 0]} glowColor={glowColor} />
      <Monitor position={[1.15, 0.5, -0.35]} rotation={[0, -0.4, 0]} glowColor={glowColor} />

      <StandingDesk />
      <GamingChair />
      <GirlModel />

      <ContactShadows position={[0, -0.85, 0]} opacity={0.65} scale={10} blur={2} far={1.5} color="#000000" />

      <OrbitControls 
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        minDistance={3.5}
        maxDistance={7}
        makeDefault
      />
    </group>
  );
}
