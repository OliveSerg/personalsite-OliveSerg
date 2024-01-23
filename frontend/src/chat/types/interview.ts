export type Message = {
	message: string;
	formUser: boolean;
};

export type Interview = {
	messages: Message[];
	created_at: string;
	updated_at: string;
};
