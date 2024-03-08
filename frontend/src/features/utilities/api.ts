import { db } from "./db";
import { ref, child, get } from "firebase/database";

export const fetchApiResponse = async <T>(
	path: string,
	init?: RequestInit | undefined
): Promise<T | T[]> => {
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

export const fetchDBResponse = async <T>(path: string): Promise<T | T[]> => {
	const dbRef = ref(db);
	return await get(child(dbRef, path))
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			} else {
				throw new Error(`No data available`);
			}
		})
		.catch((error) => {
			throw new Error(error);
		});
};
