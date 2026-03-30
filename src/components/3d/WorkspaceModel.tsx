"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

export default function WorkspaceModel() {
  const groupRef = useRef<THREE.Group>(null);
  
  // A slow rotating or floating effect
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05 - 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} rotation={[0, -Math.PI / 6, 0]}>
      <Environment preset="city" />
      
      {/* Table */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.05, 1]} />
        <meshStandardMaterial color="#333" roughness={0.7} />
      </mesh>
      
      {/* Table Legs */}
      {[[-0.9, -0.4, -0.4], [0.9, -0.4, -0.4], [-0.9, -0.4, 0.4], [0.9, -0.4, 0.4]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.02, 0.02, 0.8]} />
          <meshStandardMaterial color="#555" metalness={0.5} />
        </mesh>
      ))}
      
      {/* Laptop */}
      <group position={[0, 0.025, 0]}>
        {/* Base */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.5, 0.02, 0.3]} />
          <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.15, -0.15]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.02]} />
          <meshStandardMaterial color="#888" metalness={0.8} />
        </mesh>
        {/* Screen Glow */}
        <mesh position={[0, 0.15, -0.138]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[0.46, 0.26]} />
          <meshBasicMaterial color="#00ffcc" />
        </mesh>
      </group>
      
      {/* Chair */}
      <group position={[0, -0.2, 0.6]}>
        {/* Seat */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.05, 0.4]} />
          <meshStandardMaterial color="#111" roughness={0.9} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.25, 0.18]}>
          <boxGeometry args={[0.4, 0.5, 0.05]} />
          <meshStandardMaterial color="#111" roughness={0.9} />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4]} />
          <meshStandardMaterial color="#555" metalness={0.8} />
        </mesh>
      </group>

      {/* Person (Abstract representation) */}
      <group position={[0, 0.1, 0.5]}>
        {/* Body */}
        <mesh position={[0, 0.2, 0]}>
          <capsuleGeometry args={[0.15, 0.3, 4, 16]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#fcd5ce" />
        </mesh>
      </group>
    </group>
  );
}
