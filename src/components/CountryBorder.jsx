import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import geoData from "../assets/borders.json"

const CountryBorders = () => {
  const borderRef = useRef();

  // Convert lat/lon to 3D sphere coordinates
  const convertTo3D = ([lon, lat], radius = 1.002) => {
    const phi = (90 - lat) * (Math.PI / 180); // Convert latitude
    const theta = (-lon) * (Math.PI / 180); // Convert longitude (negate to fix mirroring)

    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta), // X
      radius * Math.cos(phi), // Y
      radius * Math.sin(phi) * Math.sin(theta) // Z
    );
  };

  // Generate border lines (single buffer)
  const borderGeometry = useMemo(() => {
    const positions = [];

    geoData.features.forEach((feature) => {
      const { geometry } = feature;
      if (!geometry || !geometry.coordinates) return;

      let paths = [];
      if (geometry.type === "Polygon") {
        paths = geometry.coordinates;
      } else if (geometry.type === "MultiPolygon") {
        paths = geometry.coordinates.flat();
      }

      paths.forEach((coords) => {
        for (let i = 0; i < coords.length - 1; i++) {
          const start = convertTo3D(coords[i]);
          const end = convertTo3D(coords[i + 1]);

          // Store positions as pairs
          positions.push(start.x, start.y, start.z);
          positions.push(end.x, end.y, end.z);
        }
      });
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);

  // Adding performance optimizations:
  useMemo(() => {
    if (borderRef.current) {
      borderRef.current.geometry.computeBoundingSphere();
    }
  }, [borderGeometry]);

  return (
    <lineSegments ref={borderRef} geometry={borderGeometry}>
      <lineBasicMaterial color="white" linewidth={1} />
    </lineSegments>
  );
};

export default CountryBorders;
