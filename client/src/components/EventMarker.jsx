import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Replace with your actual event image/icon
import eventImage from "../assets/event-icon.png"; 

const EventMarker = ({ lat, lon, onClick }) => {
  const markerRef = useRef();
  const { camera } = useThree(); // Get camera to rotate towards it
  const [texture, setTexture] = useState(null); // State for the image texture

  // Load the texture asynchronously
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(eventImage, (loadedTexture) => {
      setTexture(loadedTexture); // Set the loaded texture
    });
  }, []);

  // Convert lat/lon to 3D coordinates on the globe with a slight offset
  const convertTo3D = ([lon, lat], radius = 1.03) => {
    // radius is slightly increased to ensure pins don't clip into the Earth
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (-lon) * (Math.PI / 180);
    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  const position = convertTo3D([lon, lat]);

  // Ensure marker always faces the camera
  useFrame(() => {
    if (markerRef.current) {
      markerRef.current.lookAt(camera.position);
    }
  });

  return (
    <group ref={markerRef} position={position} scale={[0.25, 0.25, 0.25]} onClick={onClick}>
      {/* Combined Image and Border in One Mesh */}
      {texture && (
        <mesh position={[0, 0.05, 0]}>
          <circleGeometry args={[0.1, 32]} /> {/* Single circle geometry */}
          <meshBasicMaterial 
            map={texture} // Apply the image texture
            side={THREE.DoubleSide} // Make sure it's visible from all angles
            transparent={true}
            opacity={1}
            alphaTest={0.5}
          />
        </mesh>
      )}

      {/* Add the white border using a ring shape */}
      <mesh position={[0, 0.05, 0]}>
        <ringGeometry args={[0.1, 0.12, 32]} /> {/* Ring geometry for border */}
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};

export default EventMarker;
