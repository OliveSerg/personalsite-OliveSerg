import * as THREE from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useVirtualAssistant } from "./model-context";
import { GLTFActions, GLTFResult } from "./types/model";

const Model = (props: JSX.IntrinsicElements["group"]) => {
	const model = useRef<THREE.Group>();
	const { nodes, materials, animations } = useGLTF(
		"/3d/avatar.glb"
	) as GLTFResult;
	const { actions, names } = useAnimations<GLTFActions>(animations, model);
	const { animations: animationsEvents, popAnimation } =
		useVirtualAssistant();
	const animationIndex = animationsEvents[0]?.animationIndex ?? 0;

	useEffect(() => {
		if (names[animationIndex]) {
			const animationName = names[animationIndex];
			actions[animationName]?.reset().fadeIn(0.5).play();
			if (animationName !== "idle") {
				const duration =
					animationsEvents[0]?.duration ??
					actions[animationName]?._clip.duration;
				setTimeout(popAnimation, duration * 1000);
			}
			return () => {
				actions[animationName]?.fadeOut(0.5);
			};
		}
	}, [animationIndex, names]);

	return (
		<group ref={model} {...props} dispose={null} position={[0, -1, 0]}>
			<group name="Scene">
				<group name="Armature">
					<skinnedMesh
						name="EyeLeft"
						geometry={nodes.EyeLeft.geometry}
						material={materials.Wolf3D_Eye}
						skeleton={nodes.EyeLeft.skeleton}
						morphTargetDictionary={
							nodes.EyeLeft.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.EyeLeft.morphTargetInfluences
						}
					/>
					<skinnedMesh
						name="EyeRight"
						geometry={nodes.EyeRight.geometry}
						material={materials.Wolf3D_Eye}
						skeleton={nodes.EyeRight.skeleton}
						morphTargetDictionary={
							nodes.EyeRight.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.EyeRight.morphTargetInfluences
						}
					/>
					<skinnedMesh
						name="Wolf3D_Body"
						geometry={nodes.Wolf3D_Body.geometry}
						material={materials.Wolf3D_Body}
						skeleton={nodes.Wolf3D_Body.skeleton}
					/>
					<skinnedMesh
						name="Wolf3D_Hair"
						geometry={nodes.Wolf3D_Hair.geometry}
						material={materials.Wolf3D_Hair}
						skeleton={nodes.Wolf3D_Hair.skeleton}
					/>
					<skinnedMesh
						name="Wolf3D_Head"
						geometry={nodes.Wolf3D_Head.geometry}
						material={materials.Wolf3D_Skin}
						skeleton={nodes.Wolf3D_Head.skeleton}
						morphTargetDictionary={
							nodes.Wolf3D_Head.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.Wolf3D_Head.morphTargetInfluences
						}
					/>
					<skinnedMesh
						name="Wolf3D_Outfit_Bottom"
						geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
						material={materials.Wolf3D_Outfit_Bottom}
						skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
					/>
					<skinnedMesh
						name="Wolf3D_Outfit_Footwear"
						geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
						material={materials.Wolf3D_Outfit_Footwear}
						skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
					/>
					<skinnedMesh
						name="Wolf3D_Outfit_Top"
						geometry={nodes.Wolf3D_Outfit_Top.geometry}
						material={materials.Wolf3D_Outfit_Top}
						skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
					/>
					<skinnedMesh
						name="Wolf3D_Teeth"
						geometry={nodes.Wolf3D_Teeth.geometry}
						material={materials.Wolf3D_Teeth}
						skeleton={nodes.Wolf3D_Teeth.skeleton}
						morphTargetDictionary={
							nodes.Wolf3D_Teeth.morphTargetDictionary
						}
						morphTargetInfluences={
							nodes.Wolf3D_Teeth.morphTargetInfluences
						}
					/>
					<primitive object={nodes.Hips} />
				</group>
			</group>
		</group>
	);
};

useGLTF.preload("/3d/avatar.glb");
export default Model;
