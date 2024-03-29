import { fetchApiResponse } from "@features/utilities/api";

type Token = {
	token: string;
};

export const authenticateUser = async (
	name: string,
	email: string
): Promise<string> => {
	try {
		const token = await fetchAuthToken(name, email);

		if (token) {
			return token;
		}

		return await registerUser(name, email);
	} catch (error) {
		const err = error as Error;
		throw new Error(`Authentication failed: ${err.message}`);
	}
};

const fetchAuthToken = async (
	name: string,
	email: string
): Promise<string | null> => {
	try {
		const response = await fetchApiResponse<Token>("get-auth", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: email, password: name }),
		});
		if (Array.isArray(response)) {
			return response[0].token;
		}

		return response.token;
	} catch (error) {
		console.error(`Failed to fetch authentication token: Creating User...`);
		return null;
	}
};

const registerUser = async (name: string, email: string): Promise<string> => {
	try {
		const response = await fetchApiResponse<Token>("register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: email,
				password: name,
				email: email,
			}),
		});
		if (Array.isArray(response)) {
			return response[0].token;
		}

		return response.token;
	} catch (error) {
		const err = error as Error;
		throw new Error(`Registration failed: ${err.message}`);
	}
};
