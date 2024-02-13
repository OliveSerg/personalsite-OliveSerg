import * as THREE from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useVirtualAssistant } from "./model-context";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
	nodes: {
		Cube000: THREE.SkinnedMesh;
		Cube000_1: THREE.SkinnedMesh;
		Cube000_2: THREE.SkinnedMesh;
		Cube000_3: THREE.SkinnedMesh;
		Badan: THREE.Bone;
		Pinggul_L: THREE.Bone;
		Pinggul_R: THREE.Bone;
		neutral_bone: THREE.Bone;
	};
	materials: {
		["Material.000"]: THREE.MeshStandardMaterial;
		["Material.017"]: THREE.MeshStandardMaterial;
		["Material.019"]: THREE.MeshStandardMaterial;
		["Material.020"]: THREE.MeshStandardMaterial;
	};
};

const Model = (props: JSX.IntrinsicElements["group"]) => {
	const model = useRef();
	const { nodes, materials, animations } = useGLTF(
		"/3d/Amazon danbo.glb"
	) as GLTFResult;
	const { actions, names } = useAnimations(animations, model);
	const { setAnimations, animationIndex } = useVirtualAssistant();

	useEffect(() => {
		setAnimations(names);
	}, [names]);

	useEffect(() => {
		return () => {};
	}, [animationIndex]);

	return (
		<group ref={model} {...props} dispose={null}>
			<group name="Scene">
				<group
					name="Armature"
					scale={0.75}
					userData={{ name: "Armature" }}>
					<group name="body001" userData={{ name: "body.001" }}>
						<skinnedMesh
							name="Cube000"
							geometry={nodes.Cube000.geometry}
							material={materials["Material.000"]}
							skeleton={nodes.Cube000.skeleton}
						/>
						<skinnedMesh
							name="Cube000_1"
							geometry={nodes.Cube000_1.geometry}
							material={materials["Material.017"]}
							skeleton={nodes.Cube000_1.skeleton}
						/>
						<skinnedMesh
							name="Cube000_2"
							geometry={nodes.Cube000_2.geometry}
							material={materials["Material.019"]}
							skeleton={nodes.Cube000_2.skeleton}
						/>
						<skinnedMesh
							name="Cube000_3"
							geometry={nodes.Cube000_3.geometry}
							material={materials["Material.020"]}
							skeleton={nodes.Cube000_3.skeleton}
						/>
					</group>
					<primitive object={nodes.Badan} />
					<primitive object={nodes.Pinggul_L} />
					<primitive object={nodes.Pinggul_R} />
					<primitive object={nodes.neutral_bone} />
				</group>
			</group>
		</group>
	);
};

useGLTF.preload("/3d/Amazon danbo.glb");
export default Model;
