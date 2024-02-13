import { ReactNode, createContext, useContext, useState } from "react";

type Props = {
	children: ReactNode;
};

const VirtualAssistantContext = createContext({});

const VirtualAssistantProvider = ({ children }: Props) => {
	const [animationIndex, setAnimationIndex] = useState(0);
	const [animations, setAnimations] = useState([]);

	return (
		<VirtualAssistantContext.Provider
			value={{
				animationIndex,
				setAnimationIndex,
				animations,
				setAnimations,
			}}>
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
