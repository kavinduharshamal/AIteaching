/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function MainMenu(props) {
  const { nodes, materials } = useGLTF("models/MainMenu.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall_corkboard_with_post_it_notes.geometry}
        material={materials["Material.001"]}
        position={[0, 0.723, -1.096]}
        scale={303.477}
      />
      <group
        position={[-1.15, 0.873, -0.126]}
        rotation={[0, 0.464, 0]}
        scale={0.563}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh271774997.geometry}
          material={materials.mat20}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh271774997_1.geometry}
          material={materials.mat24}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh271774997_2.geometry}
          material={materials.mat10}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh271774997_3.geometry}
          material={materials.mat5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh271774997_4.geometry}
          material={materials.mat18}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh271774997_5.geometry}
          material={materials.mat11}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh271774997_6.geometry}
          material={materials.mat22}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh271774997_7.geometry}
          material={materials.mat12}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh271774997_8.geometry}
          material={materials.mat21}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh271774997_9.geometry}
          material={materials.mat23}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh271774997_10.geometry}
          material={materials.mat13}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh271774997_11.geometry}
          material={materials.mat8}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh271774997_12.geometry}
          material={materials.mat16}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[0, -0.025, 0.151]}
        scale={[2.164, 0.021, 1.322]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials["Material.002"]}
        position={[0, 1.284, -1.158]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[2.165, 0.021, 1.322]}
      />
    </group>
  );
}

useGLTF.preload("models/MainMenu.glb");

