import { Prediction, Quote } from "../types/prediction";
import { useQuery } from "@tanstack/react-query";

export const fetchResponse = async <T>(
	path: string,
	init?: RequestInit | undefined
): Promise<T[]> => {
	const response = await fetch(path, init);

	if (!response.ok) {
		throw new Error(`Failed to fetch data: ${response.statusText}`);
	}

	return await response.json();
};

export const usePredictions = () => {
	return useQuery({
		queryKey: ["predictions"],
		queryFn: () =>
			fetchResponse<Prediction>(import.meta.env.VITE_PREDICTIONS_URL),
	});
};

export const useQuotes = (tickers: string[] | undefined) => {
	let path = import.meta.env.VITE_QUOTE_URL;
	if (tickers?.length) path += `?tickers=${tickers}`;

	return useQuery({
		queryKey: ["quotes", tickers],
		queryFn: () => fetchResponse<Quote>(path),
		enabled: !!tickers,
	});
};
