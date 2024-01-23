import { fetchApiResponse } from "@features/utilities/api";
import { Message } from "@features/chat/types/interviews";

export const fetchChatHistory = async (token: string): Promise<Message[]> => {
	try {
		const response = await fetchApiResponse<Message[]>("interviews", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response;
	} catch (error) {
		const err = error as Error;
		throw new Error(`Failed to fetch chat history: ${err.message}`);
	}
};
