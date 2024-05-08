export type Prediction = {
	ticker: string;
	values: { date: string; value: number }[];
};

export type Quote = {
	companyName: string;
	lastPrice: number;
	open: number;
	ticker: string;
};

export type StockPrediction = Prediction & Quote;
