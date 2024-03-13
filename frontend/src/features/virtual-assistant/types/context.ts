export type PagePosition = {
	initialX?: string | number;
	initialY?: string | number;
	x?: string | number;
	y?: string | number;
};

export type ModelAnimationEvent = {
	animationIndex: number;
	cameraPosition: number[];
	pagePosition: PagePosition;
	duration?: number;
	rotation?: number;
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
