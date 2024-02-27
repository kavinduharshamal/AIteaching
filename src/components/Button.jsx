/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Button(props) {
  const { nodes, materials } = useGLTF("models/button.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials["Material.002"]}
        position={[-0.967, 0.025, 0.007]}
        rotation={[1.591, 0, 0.001]}
        scale={[1, 1, 1.015]}
      />
    </group>
  );
}

useGLTF.preload("models/button.glb");