import { fetchApiResponse } from "@features/utilities/api";
import { Interview, Message } from "../types/interview";

export const fetchChatHistory = async (token: string): Promise<Interview> => {
	try {
		const response = await fetchApiResponse<Interview>("interviews", {
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		return response;
	} catch (error) {
		const err = error as Error;
		throw new Error(`Failed to fetch chat history: ${err.message}`);
	}
};

export const fetchAIResponse = async (
	message: string,
	token: string
): Promise<Message> => {
	try {
		const response = await fetchApiResponse<Message>("interviews/", {
			method: "POST",
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message: message }),
		});

		return response;
	} catch (error) {
		const err = error as Error;
		throw new Error(`Failed to fetch chat history: ${err.message}`);
	}
};
