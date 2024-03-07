import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useVirtualAssistant } from "./model-context";
import { OrthographicCamera, Stats } from "@react-three/drei";
import { ModelAnimationEvent } from "./types/context";
import { motion } from "framer-motion";
import VirtualAssistant from "./virtual-assistant";

const VirtualAssistantContainer = () => {
	const { animations } = useVirtualAssistant();
	const currentAnimationEvent: ModelAnimationEvent = animations[0] ?? {
		animationIndex: 0,
		cameraPosition: [],
		pagePosition: {},
	};
	const prevAnimationEvent = useRef<ModelAnimationEvent>({
		animationIndex: 0,
		cameraPosition: [],
		pagePosition: {},
	});

	useEffect(() => {
		prevAnimationEvent.current = currentAnimationEvent;
	}, [currentAnimationEvent]);

	return (
		<motion.div
			className="absolute h-screen w-1/3 z-10 left-1/2"
			style={{
				x:
					currentAnimationEvent.pagePosition?.initialX ??
					prevAnimationEvent.current.pagePosition.x,
				y:
					currentAnimationEvent.pagePosition?.initialY ??
					prevAnimationEvent.current.pagePosition.y,
			}}
			animate={{
				x: currentAnimationEvent.pagePosition?.x,
				y: currentAnimationEvent.pagePosition?.y,
			}}
			transition={{ duration: currentAnimationEvent.duration }}>
			<Canvas>
				<OrthographicCamera />
				<ambientLight intensity={3} />
				<VirtualAssistant />
				<Stats />
			</Canvas>
		</motion.div>
	);
};

export default VirtualAssistantContainer;
