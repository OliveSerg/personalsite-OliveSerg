import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useVirtualAssistant } from "./model-context";
import { OrthographicCamera, Stats } from "@react-three/drei";
import { ModelAnimationEvent } from "./types/context";
import VirtualAssistant from "./virtual-assistant";
import PagePosition from "./page-position";

const VirtualAssistantContainer = () => {
	const { animations } = useVirtualAssistant();
	const prevPagePosition = useRef<PagePosition>();

	const currentAnimationEvent: ModelAnimationEvent = animations[0] ?? {
		animationIndex: 0,
		cameraPosition: [],
		pagePosition: prevPagePosition.current,
	};

	useEffect(() => {
		prevPagePosition.current = currentAnimationEvent.pagePosition;
	});

	return (
		<PagePosition
			pagePosition={currentAnimationEvent.pagePosition}
			prevPagePosition={prevPagePosition.current}
			duration={currentAnimationEvent.duration}>
			<Canvas>
				<OrthographicCamera />
				<ambientLight intensity={5} />
				<VirtualAssistant />
				<Stats />
			</Canvas>
		</PagePosition>
	);
};

export default VirtualAssistantContainer;
