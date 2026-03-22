import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const EventMarker = ({ lat, lon, onClick }) => {
  const groupRef = useRef();
  const ringRef = useRef();
  const { camera } = useThree();
  const [hovered, setHovered] = useState(false);

  // Convert lat/lon to 3D position on globe surface
  const convertTo3D = (lon, lat, radius = 1.035) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = -lon * (Math.PI / 180);
    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  const position = convertTo3D(lon, lat);

  // Cursor style on hover
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered]);

  // Face camera + pulse the outer ring
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.lookAt(camera.position);
    if (ringRef.current) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.15;
      ringRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const scale = hovered ? 0.28 : 0.23;

  return (
    <group
      ref={groupRef}
      position={position}
      scale={[scale, scale, scale]}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer pulsing glow ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.13, 0.18, 32]} />
        <meshBasicMaterial color="#fd9e10" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Mid ring border */}
      <mesh>
        <ringGeometry args={[0.1, 0.13, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Core dot — bright orange/amber */}
      <mesh>
        <circleGeometry args={[0.1, 32]} />
        <meshBasicMaterial color={hovered ? "#fd9e10" : "#c57f16"} side={THREE.DoubleSide} />
      </mesh>

      {/* Center dot for depth */}
      <mesh position={[0, 0, 0.001]}>
        <circleGeometry args={[0.04, 32]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default EventMarker;