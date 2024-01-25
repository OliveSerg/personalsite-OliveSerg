export type Message = {
	id: number | string;
	message: string;
	from_user: boolean;
};

export type Interview = {
	messages: Message[];
	created_at: string;
	updated_at: string;
};
