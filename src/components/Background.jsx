import { Environment, Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";
import * as THREE from "three";

export const Background = () => {
  return (
    <>
      <Environment preset="sunset" />
      <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2}>
        <LayerMaterial
          lighting="physical"
          transmission={1}
          side={THREE.BackSide} // Renders the inside of the sphere
        >
          <Gradient
            colorA="#7FC7D9"
            colorB="#DCF2F1"
            axes="y"
            start={0}
            end={-0.5}
          />
        </LayerMaterial>
      </Sphere>
    </>
  );
};
