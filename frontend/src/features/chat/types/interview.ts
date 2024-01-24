export type Message = {
	id: number;
	message: string;
	from_user: boolean;
};

export type Interview = {
	messages: Message[];
	created_at: string;
	updated_at: string;
};
