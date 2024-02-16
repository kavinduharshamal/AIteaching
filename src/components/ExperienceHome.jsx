import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sky,
  Text, // Import Text from Drei
} from "@react-three/drei";
import { FirstPage } from "./FirstPage";
import { useThree } from "@react-three/fiber";
import { MeshStandardMaterial, PlaneBufferGeometry } from "three";
import { Background } from "./Background";
import { MainMenu } from "./MainSetup";

export const ExperienceHome = () => {
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <Background />

      <Environment preset="sunset" />
      <group position-y={-1}>
        <ContactShadows
          opacity={0.42}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
        {/* Avatar mesh */}
        <mesh rotation-x={-Math.PI / 2}>
          <FirstPage />
        </mesh>

        {/* Adding "new experience of teaching text */}

        <Text
          position={[-2, 2, 0]} // Adjust position as needed
          color="black" // Text color
          fontSize={0.1} // Adjust font size as needed
          anchorX="center" // Centers the text horizontally
          anchorY="middle" // Centers the text vertically
        >
          New Experience of Teaching
        </Text>
        {/* add welcome */}

        <Text
          position={[-2, 1.5, 0]} // Adjust position as needed
          color="black" // Text color
          fontSize={0.2} // Adjust font size as needed
          anchorX="center" // Centers the text horizontally
          anchorY="middle" // Centers the text vertically
        >
          WELCOME!
        </Text>
      </group>
    </>
  );
};
