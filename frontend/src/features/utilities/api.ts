export const fetchApiResponse = async <T>(
	path: string,
	init?: RequestInit | undefined
): Promise<T[]> => {
	try {
		const response = await fetch(import.meta.env.VITE_API_URL + path, init);

		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		const err = error as Error;
		throw new Error(`Error fetching data: ${err.message}`);
	}
};
