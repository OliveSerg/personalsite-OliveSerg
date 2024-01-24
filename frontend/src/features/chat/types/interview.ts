export type Message = {
	message: string;
	fromUser: boolean;
};

export type Interview = {
	messages: Message[];
	created_at: string;
	updated_at: string;
};
