export type ModelAnimationEvent = {
	animationIndex: number;
	cameraPosition: object;
	pagePosition: object;
};

export type VirtualAssistantState = {
	animations: AnimationEvent[];
};

export type VirtualAssistantAction = {
	pushAnimation: (animation: ModelAnimationEvent) => void;
	popAnimation: () => void;
};

export type ContextType = {
	state: VirtualAssistantState;
	actions: VirtualAssistantAction;
};
