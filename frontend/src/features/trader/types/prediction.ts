export type Prediction = {
	ticker: string;
	values: { date: string; value: number }[];
};

export type Quote = {
	companyName: string;
	current: number;
	open: number;
};

export type StockPrediction = Prediction & Quote;
