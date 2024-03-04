import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "@features/virtual-assistant/model";
import { useVirtualAssistant } from "./model-context";
import { OrthographicCamera } from "@react-three/drei";

const VirtualAssistant = () => {
	const { animations, setAnimations } = useVirtualAssistant();

	return (
		<div className="absolute h-screen w-full z-10">
			<Canvas>
				<OrthographicCamera />
				<ambientLight intensity={3} />
				<Suspense fallback={null}>
					<Model />
				</Suspense>
			</Canvas>
		</div>
	);
};

export default VirtualAssistant;
