export const fetchApiResponse = async <T>(path: string): Promise<T[]> => {
	try {
		const response = await fetch(import.meta.env.VITE_API_URL + path);

		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		throw new Error(`Error fetching data: ${error.message}`);
	}
};
