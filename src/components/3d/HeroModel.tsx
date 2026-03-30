"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

export default function HeroModel({ mousePointer }: { mousePointer: React.MutableRefObject<{ x: number, y: number }> }) {
  const headRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (headRef.current) {
      // Smoothly look at cursor
      const targetX = mousePointer.current.x * 0.4;
      const targetY = -mousePointer.current.y * 0.3;
      
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.05);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetY, 0.05);
    }
  });

  return (
    <group position={[0, -1, 0]}>
      <Environment preset="city" />
      
      {/* Robot Torso */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 1.4, 32]} />
        <meshPhysicalMaterial 
          color="#111" 
          roughness={0.1} 
          metalness={0.9} 
          clearcoat={1}
          emissive="#222"
        />
      </mesh>
      
      {/* Decorative Light Strip on Chest */}
      <mesh position={[0, 0.3, 0.61]}>
        <boxGeometry args={[0.4, 0.05, 0.05]} />
        <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} />
      </mesh>
      
      {/* Tech Shoulders */}
      <group position={[0, 0.6, 0]}>
        <mesh position={[-0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.25, 0.4, 16]} />
          <meshPhysicalMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.25, 0.4, 16]} />
          <meshPhysicalMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Head Group (Rotates) */}
      <group ref={headRef} position={[0, 1.2, 0]}>
        {/* Futuristic Tech Helmet/Head */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshPhysicalMaterial 
            color="#050505" 
            roughness={0} 
            metalness={1} 
            clearcoat={1}
          />
        </mesh>
        
        {/* Visor Area */}
        <mesh position={[0, 0.15, 0.35]}>
          <boxGeometry args={[0.6, 0.15, 0.1]} />
          <meshPhysicalMaterial color="#111" roughness={0} metalness={1} />
        </mesh>

        {/* Glowing Eyes */}
        <mesh position={[-0.15, 0.15, 0.41]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={5} />
        </mesh>
        <mesh position={[0.15, 0.15, 0.41]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={5} />
        </mesh>
        
        {/* Tech Details on sides of head */}
        <mesh position={[-0.45, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.12, 0.1, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[0.45, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.12, 0.1, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>
    </group>
  );
}
