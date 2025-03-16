// components/GlowEffect.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GlowEffect = () => {
  const glowRef = useRef();
  
  useFrame(({ clock }) => {
    if (glowRef.current) {
      // Subtle pulsing effect
      const pulse = Math.sin(clock.getElapsedTime() * 0.5) * 0.05 + 0.95;
      glowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <>
 
      {/* Outer glow layer */}
      <mesh scale={[1.08, 1.08, 1.08]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#7aabcf" 
          transparent={true} 
          opacity={0.1} 
          side={THREE.BackSide} 
        />
      </mesh>
    </>
  );
};

export default GlowEffect;