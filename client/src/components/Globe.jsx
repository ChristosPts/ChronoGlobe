import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Earth from "./Earth";
 
const Globe = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <color attach="background" args={["#010814"]} />
      <Stars radius={300} depth={60} count={5000} factor={4} saturation={0.5} fade />
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} />
      <Earth />
      <OrbitControls enableZoom={true} enablePan={true} minDistance={2} maxDistance={10} rotateSpeed={0.5} />
    </Canvas>
  )
}

export default Globe