import { fetchApiResponse } from "@features/utilities/api";
import { Interview, Message } from "../types/interview";

export const fetchChatHistory = async (token: string): Promise<Interview> => {
	try {
		const response = await fetchApiResponse<Interview>("interviews", {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		if (Array.isArray(response)) {
			return response[0];
		}

		return response;
	} catch (error) {
		const err = error as Error;
		throw new Error(`Failed to fetch chat history: ${err.message}`);
	}
};

export const fetchAIResponseFromAPI = async (
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
		if (Array.isArray(response)) {
			return response[0];
		}

		return response;
	} catch (error) {
		const err = error as Error;
		throw new Error(`Failed to fetch chat history: ${err.message}`);
	}
};

export const fetchAIResponse = async (
	messages: Message[],
	worker: Worker
): Promise<ReadableStream> => {
	try {
		return new ReadableStream({
			start(controller) {
				if (!worker) {
					controller.close();
					return;
				}
				worker.postMessage({ messages });
				const onMessageReceived = (e: any) => {
					const error = new Error(e.data.error);
					switch (e.data.type) {
						case "log":
							console.log(e.data);
							break;
						case "chunk":
							controller.enqueue(e.data.data);
							break;
						case "error":
							worker.removeEventListener(
								"message",
								onMessageReceived
							);
							console.log(e.data.error);
							controller.error(error);
							break;
						case "complete":
							worker.removeEventListener(
								"message",
								onMessageReceived
							);
							controller.close();
							break;
					}
				};
				worker.addEventListener("message", onMessageReceived);
			},
		});
	} catch (error) {
		const err = error as Error;
		throw new Error(`Failed to fetch chat history: ${err.message}`);
	}
};
