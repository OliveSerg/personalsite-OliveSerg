import { AnimationClip } from "three";
import { GLTF } from "three-stdlib";

export type ActionNames = "idle" | "jumping_down" | "walking";
export type GLTFActions = AnimationClip & { names: ActionNames };

export type GLTFResult = GLTF & {
	nodes: {
		EyeLeft: THREE.SkinnedMesh;
		EyeRight: THREE.SkinnedMesh;
		Wolf3D_Body: THREE.SkinnedMesh;
		Wolf3D_Hair: THREE.SkinnedMesh;
		Wolf3D_Head: THREE.SkinnedMesh;
		Wolf3D_Outfit_Bottom: THREE.SkinnedMesh;
		Wolf3D_Outfit_Footwear: THREE.SkinnedMesh;
		Wolf3D_Outfit_Top: THREE.SkinnedMesh;
		Wolf3D_Teeth: THREE.SkinnedMesh;
		Hips: THREE.Bone;
	};
	materials: {
		Wolf3D_Eye: THREE.MeshStandardMaterial;
		Wolf3D_Body: THREE.MeshStandardMaterial;
		Wolf3D_Hair: THREE.MeshStandardMaterial;
		Wolf3D_Skin: THREE.MeshStandardMaterial;
		Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial;
		Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial;
		Wolf3D_Outfit_Top: THREE.MeshStandardMaterial;
		Wolf3D_Teeth: THREE.MeshStandardMaterial;
	};
	animations: GLTFActions[];
};
