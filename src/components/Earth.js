import React, { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

import EarthDayMap from "../assets/img/4299.jpg";

export function Earth(props) {
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
        TextureLoader,
        [EarthDayMap]
    );

    const earthRef = useRef();
    const cloudsRef = useRef();

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        earthRef.current.rotation.y = elapsedTime / 6;
        cloudsRef.current.rotation.y = elapsedTime / 6;
    });

    return (
        <>
            {/* <ambientLight intensity={1} /> */}
            <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />
            <Stars
                radius={300}
                depth={60}
                count={20000}
                factor={7}
                saturation={0}
                fade={true}
            />
            <mesh ref={cloudsRef} position={[0, 0, 3]}>
                <sphereGeometry args={[1.005, 32, 32]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    opacity={0.1}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh ref={earthRef} position={[0, 0, 3]}>
                < sphereGeometry args={[1, 32, 32]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    metalness={0.4}
                    roughness={0.7}
                />
                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    zoomSpeed={0.6}
                    panSpeed={0.5}
                    rotateSpeed={0.4}
                />
            </mesh>
        </>
    );
}