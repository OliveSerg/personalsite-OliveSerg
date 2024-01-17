import { fetchApiResponse } from "@features/utilities/api";

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
		throw new Error(`Authentication failed: ${error.message}`);
	}
};

const fetchAuthToken = async (
	name: string,
	email: string
): Promise<string | null> => {
	try {
		const response = await fetchApiResponse<string>("get-auth", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: email, password: name }),
		});

		return response.token;
	} catch (error) {
		console.error(`Failed to fetch authentication token: Creating User...`);
		return null;
	}
};

const registerUser = async (name: string, email: string): Promise<string> => {
	try {
		const response = await fetchApiResponse<string>("register", {
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

		return response.token;
	} catch (error) {
		throw new Error(`Registration failed: ${error.message}`);
	}
};
