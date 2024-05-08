import { Prediction, Quote } from "../types/prediction";

export const fetchPredictionsResponse = async (): Promise<Prediction[]> => {
	const response = await fetch(import.meta.env.VITE_PREDICTIONS_URL);

	if (!response.ok) {
		throw new Error(`Failed to fetch data: ${response.statusText}`);
	}

	return await response.json();
};

export const fetchQuoteResponse = async (tickers: string): Promise<Quote[]> => {
	const response = await fetch(
		import.meta.env.VITE_QUOTE_URL + `?tickers=${tickers}`
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch data: ${response.statusText}`);
	}

	return await response.json();
};
