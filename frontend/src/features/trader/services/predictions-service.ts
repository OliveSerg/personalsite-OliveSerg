import { Prediction, Quote } from "../types/prediction";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const fetchResponse = async (path: string): Promise<Prediction[] | Quote[]> => {
	return await fetch(path)
		.then((response) => response.json())
		.catch((err) => err);
};

export const usePredictions = (): UseQueryResult<Prediction[]> => {
	return useQuery({
		queryKey: ["predictions"],
		queryFn: () => fetchResponse(import.meta.env.VITE_PREDICTIONS_URL),
	});
};

export const useQuotes = (
	tickers: string[] | undefined
): UseQueryResult<Quote[]> => {
	let path = import.meta.env.VITE_QUOTE_URL;
	if (tickers?.length) path += `?tickers=${tickers}`;

	return useQuery({
		queryKey: ["quotes", tickers],
		queryFn: () => fetchResponse(path),
		enabled: !!tickers,
	});
};
