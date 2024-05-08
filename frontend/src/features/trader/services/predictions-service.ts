export const fetchPredictionsResponse = async <T>(): Promise<T | T[]> => {
	try {
		const response = await fetch(import.meta.env.VITE_PREDICTIONS_URL);

		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		const err = error as Error;
		throw new Error(`Error fetching data: ${err.message}`);
	}
};

export const fetchQuoteResponse = async <T>(
	tickers: string | string[],
	init?: RequestInit | undefined
): Promise<T | T[]> => {
	if (tickers instanceof Array) tickers = tickers.toString();
	try {
		const response = await fetch(
			import.meta.env.VITE_QUOTE_URL + `?tickers=${tickers}`,
			init
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		const err = error as Error;
		throw new Error(`Error fetching data: ${err.message}`);
	}
};
