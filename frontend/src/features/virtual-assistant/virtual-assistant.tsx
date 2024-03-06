import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "@features/virtual-assistant/model";
import { useVirtualAssistant } from "./model-context";
import { OrthographicCamera } from "@react-three/drei";
import { ModelAnimationEvent } from "./types/context";
import { motion } from "framer-motion";

const VirtualAssistant = () => {
	const { animations, pushAnimation } = useVirtualAssistant();
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

	type ScrollEvents = {
		[key: string]: ModelAnimationEvent;
	};

	const animationEvents: ScrollEvents = {
		hero: {
			animationIndex: 2,
			cameraPosition: [],
			pagePosition: {
				initialX: "100%",
				initialY: 200,
				x: "25%",
				y: 200,
			},
			duration: 6,
		},
		"about-me": {
			animationIndex: 1,
			cameraPosition: [],
			pagePosition: {
				x: "25%",
				y: 500,
			},
			duration: 3,
		},
	};

	useEffect(() => {
		prevAnimationEvent.current = currentAnimationEvent;
	}, [currentAnimationEvent]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const modelAnimation = animationEvents[entry.target.id];
						pushAnimation(modelAnimation);
						observer.unobserve(entry.target);
					}
				});
			},
			{ root: null, rootMargin: "0%", threshold: 1.0 }
		);

		const hero = document.querySelector("#hero");
		if (hero) {
			observer.observe(hero);
		}

		const about = document.querySelector("#about-me");
		if (about) {
			observer.observe(about);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

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
				<Suspense fallback={null}>
					<Model />
				</Suspense>
			</Canvas>
		</motion.div>
	);
};

export default VirtualAssistant;
