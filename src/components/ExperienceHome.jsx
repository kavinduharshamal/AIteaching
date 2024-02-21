import React from "react";
import {
  ContactShadows,
  Environment,
  Text,
  Text3D,
  useTexture,
} from "@react-three/drei";
import { FirstPage } from "./FirstPage";
import { useThree } from "@react-three/fiber";
import { Background } from "./Background";

export const ExperienceHome = () => {
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <Background />
      <Environment preset="sunset" />

      <group position={[0, -1, 0]}>
        <ContactShadows
          opacity={0.42}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
        {/* Avatar mesh */}
        <mesh rotation-x={-Math.PI / 16}>
          <FirstPage />
        </mesh>
        <mesh
          rotation={[0, Math.PI / 3, 0]}
          position={[-1.9, 0, 0]}
          rotation-x={-Math.PI / 16}
        >
          <FirstPage castShadow />
        </mesh>
        <mesh position={[0, 0, 1]} />
      </group>
    </>
  );
};
