import { Suspense, useEffect } from "react";
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

	type ScrollEvents = {
		[key: string]: ModelAnimationEvent;
	};

	const animationEvents: ScrollEvents = {
		hero: {
			animationIndex: 2,
			cameraPosition: [],
			pagePosition: {
				initialX: "300%",
				initialY: 0,
				x: "50%",
				y: 0,
			},
			duration: 6,
		},
		"about-me": {
			animationIndex: 1,
			cameraPosition: [],
			pagePosition: {
				initialX: "50%",
				initialY: 0,
				x: "50%",
				y: 0,
			},
		},
	};

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
			className="absolute h-screen w-1/3 z-10"
			style={{
				x: currentAnimationEvent.pagePosition?.initialX,
				y: currentAnimationEvent.pagePosition?.initialY,
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
