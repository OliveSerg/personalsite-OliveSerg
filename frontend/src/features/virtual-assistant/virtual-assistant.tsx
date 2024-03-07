import { Suspense, useEffect } from "react";
import Model from "@features/virtual-assistant/model";
import { useVirtualAssistant } from "./model-context";
import { ModelAnimationEvent } from "./types/context";

type ScrollEvents = {
	[key: string]: ModelAnimationEvent;
};

const VirtualAssistant = () => {
	const { pushAnimation } = useVirtualAssistant();

	const animationEvents: ScrollEvents = {
		hero: {
			animationIndex: 2,
			cameraPosition: [0, 0, 7],
			pagePosition: {
				initialX: "100%",
				initialY: 150,
				x: "25%",
				y: 150,
			},
			duration: 6,
		},
		"about-me": {
			animationIndex: 1,
			cameraPosition: [0, 0, 9],
			pagePosition: {
				x: "25%",
				y: 500,
			},
			duration: 3,
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
		<group>
			<Suspense fallback={null}>
				<Model />
			</Suspense>
		</group>
	);
};

export default VirtualAssistant;
