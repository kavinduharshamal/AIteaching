import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const animationSequence = ["Idle", "Talking_1", "Talking_2", "Idle"];

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};
const currentPath = window.location.pathname;
const segments = currentPath.split("/");
const currentSegment = segments[segments.length - 1];
console.log("hi");
console.log(currentSegment);
const script = currentSegment;

export function Avtera(props) {
  const { playAudio, headFlw } = useControls({
    playAudio: false,
    headFlw: false,
  });

  const audio = useMemo(() => new Audio(`/audio/${script}.mp3`), [script]);
  const jsonFile = useLoader(THREE.FileLoader, `audio/${script}.json`);
  const lipsync = JSON.parse(jsonFile);
  console.log(lipsync);

  useFrame(() => {
    const currentAudioTime = audio.currentTime;
    Object.values(corresponding).forEach((value) => {
      nodes.Wolf3D_Head.morphTargetInfluences[
        nodes.Wolf3D_Head.morphTargetDictionary[value]
      ] = 0;
      nodes.Wolf3D_Teeth.morphTargetInfluences[
        nodes.Wolf3D_Teeth.morphTargetDictionary[value]
      ] = 0;
    });

    for (let i = 0; i < lipsync.mouthCues.length; i++) {
      const mouthCue = lipsync.mouthCues[i];
      if (
        currentAudioTime >= mouthCue.start &&
        currentAudioTime <= mouthCue.end
      ) {
        console.log(mouthCue.value);
        nodes.Wolf3D_Head.morphTargetInfluences[
          nodes.Wolf3D_Head.morphTargetDictionary[corresponding[mouthCue.value]]
        ] = 1;
        nodes.Wolf3D_Teeth.morphTargetInfluences[
          nodes.Wolf3D_Teeth.morphTargetDictionary[
            corresponding[mouthCue.value]
          ]
        ] = 1;
        break;
      }
    }
  });

  useEffect(() => {
    if (playAudio) {
      audio.play();

      setAnimation("Talking_1");

      audio.onended = () => {
        setAnimation("Idle");
      };
    } else {
      audio.pause();
      setAnimation("Idle");
    }
  }, [playAudio]);

  const { nodes, materials } = useGLTF("models/6565ab44e0834c9ab37a141c.glb");
  const { animations: idleAnimation } = useFBX("/animation/Idle.fbx");
  const { animations: talkingAnimation } = useFBX("animation/Talking.fbx");
  const { animations: talkingAnimation_1 } = useFBX("animation/Talking_1.fbx");

  idleAnimation[0].name = "Idle";
  talkingAnimation[0].name = "Talking";
  talkingAnimation_1[0].name = "Talking_1";

  const [animation, setAnimation] = useState("Idle");

  const group = useRef();
  const { actions } = useAnimations(
    [idleAnimation[0], talkingAnimation[0], talkingAnimation_1[0]],
    group
  );

  useFrame((state) => {
    if (headFlw) {
      group.current.getObjectByName("Head").lookAt(state.camera.position);
    }
  });

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation].fadeOut(0.5);
  }, [animation]);

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
    </group>
  );
}

useGLTF.preload("models/6565ab44e0834c9ab37a141c.glb");
