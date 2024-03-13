import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useState,
} from "react";
import { ModelAnimationEvent, ContextType } from "./types/context";

const VirtualAssistantContext = createContext<ContextType>({
	state: { animations: [] },
	actions: {
		pushAnimation: () => {},
		popAnimation: () => {},
	},
});

type Props = {
	children: ReactNode;
};

const VirtualAssistantProvider = ({ children }: Props) => {
	const [animations, setAnimations] = useState<ModelAnimationEvent[]>([]);

	const pushAnimation = useCallback(
		(animation: ModelAnimationEvent) =>
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
