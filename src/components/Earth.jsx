import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGlobe } from "../context/GlobeContext";
import earthTexture from "../assets/earth-texture.jpg";
import CountryBorders from "./CountryBorder";
import GlowEffect from "./GlowEffect";
import EventMarker from "./EventMarker";
import events from "../data/historicalEvents.json";

const Earth = () => {
  const earthRef = useRef();
  const {
    selectedEvent, setSelectedEvent,
    isSpinning, setIsSpinning,
    selectedMonth, selectedYear,
  } = useGlobe();

  const [earthMap, setEarthMap] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(earthTexture, (texture) => setEarthMap(texture));
  }, []);

  useFrame(() => {
    if (earthRef.current && isSpinning && !hoveredCountry) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  const handleEventClick = (event) => {
    setIsSpinning(false);
    setSelectedEvent(event);
  };

  // Filter events to only those matching the selected month and year
  const filteredEvents = events.filter((event) => {
    const d = new Date(event.date);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  return (
    <group ref={earthRef}>
      {earthMap && (
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial map={earthMap} />
        </mesh>
      )}
      <GlowEffect />
      <mesh>
        <sphereGeometry args={[1.02, 32, 32]} />
        <meshStandardMaterial color="#4a93c7" transparent opacity={0.2} side={THREE.BackSide} />
      </mesh>
      <CountryBorders />
      {filteredEvents.map((event, index) => (
        <EventMarker
          key={index}
          lat={event.lat}
          lon={event.lon}
          description={event.description}
          date={event.date}
          onClick={() => handleEventClick(event)}
        />
      ))}
    </group>
  );
};

export default Earth;