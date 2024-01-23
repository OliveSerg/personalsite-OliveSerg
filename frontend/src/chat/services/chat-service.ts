import { fetchApiResponse } from "@features/utilities/api";
import { Interview } from "../types/interview";

export const fetchChatHistory = async (token: string): Promise<Interview> => {
	try {
		const response = await fetchApiResponse<Interview[]>("interviews", {
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
