export type ModelAnimationEvent = {
	animationIndex: number;
	cameraPosition: number[];
	pagePosition: object;
	duration?: number;
};

export type VirtualAssistantState = {
	animations: ModelAnimationEvent[];
};

export type VirtualAssistantAction = {
	pushAnimation: (animation: ModelAnimationEvent) => void;
	popAnimation: () => void;
};

export type ContextType = {
	state: VirtualAssistantState;
	actions: VirtualAssistantAction;
};
