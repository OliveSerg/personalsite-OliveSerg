export type User = {
	name: string;
	email: string;
	company?: string;
	token: string;
};

export type Message = {
	message: string;
	formUser: boolean;
};
