import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useState,
} from "react";

type AnimationEvent = {
	animationIndex: number;
	cameraPosition: object;
	pagePosition: object;
	duration: number;
};

type VirtualAssistantState = {
	animations: AnimationEvent[];
};

type VirtualAssistantAction = {
	pushAnimation: (animation: AnimationEvent) => void;
	popAnimation: () => void;
};

type ContextType = {
	state: VirtualAssistantState;
	actions: VirtualAssistantAction;
};

const VirtualAssistantContext = createContext<ContextType>({
	state: { animations: [] },
	actions: {
		pushAnimation: (animation: AnimationEvent) => {},
		popAnimation: () => {},
	},
});

type Props = {
	children: ReactNode;
};

const VirtualAssistantProvider = ({ children }: Props) => {
	const [animations, setAnimations] = useState<AnimationEvent[]>([]);

	const pushAnimation = useCallback(
		(animation: AnimationEvent) =>
			setAnimations((prevAnimations) => [...prevAnimations, animation]),
		[]
	);

	const popAnimation = useCallback(
		() => setAnimations((prevAnimations) => prevAnimations.slice(1)),
		[]
	);

	const value = {
		state: { animations },
		actions: { pushAnimation, popAnimation },
	};

	return (
		<VirtualAssistantContext.Provider value={value}>
			{children}
		</VirtualAssistantContext.Provider>
	);
};

const useVirtualAssistant = () => {
	const context = useContext(VirtualAssistantContext);

	if (!context) {
		throw new Error("Method must be used within VisturalAssistantProvider");
	}

	return { ...context.state, ...context.actions };
};

export { VirtualAssistantProvider, useVirtualAssistant };
