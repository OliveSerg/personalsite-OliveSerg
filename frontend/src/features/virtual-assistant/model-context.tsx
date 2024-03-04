import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

type AnimationEvent = {
	animationIndex: number;
	cameraPosition: object;
	pagePosition: object;
	duration: number;
};

type ContextType = {
	animations: AnimationEvent[];
	setAnimations: Dispatch<SetStateAction<AnimationEvent[]>>;
};

const VirtualAssistantContext = createContext<ContextType>({
	animations: [],
	setAnimations: () => {},
});

type Props = {
	children: ReactNode;
};

const VirtualAssistantProvider = ({ children }: Props) => {
	const [animations, setAnimations] = useState<AnimationEvent[]>([]);

	function addAnimation(animation: AnimationEvent) {
		setAnimations((prevAnimations) => [...prevAnimations, animation]);
	}

	function removeAnimation(animationIndex: number) {
		setAnimations((prevAnimations) =>
			prevAnimations.filter((_, i) => i !== animationIndex)
		);
	}

	return (
		<VirtualAssistantContext.Provider value={{ animations, setAnimations }}>
			{children}
		</VirtualAssistantContext.Provider>
	);
};

const useVirtualAssistant = () => {
	const context = useContext(VirtualAssistantContext);

	if (!context) {
		throw new Error("Method must be used within VisturalAssistantProvider");
	}

	return context;
};

export { VirtualAssistantProvider, useVirtualAssistant };
