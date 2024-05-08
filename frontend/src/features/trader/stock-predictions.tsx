import Carousel from "@features/carousel/carousel";
import Spinner from "@features/loading-animations/spinner";
import { useQuery } from "@tanstack/react-query";
import { Prediction, Quote, StockPrediction } from "./types/prediction";
import {
	fetchPredictionsResponse,
	fetchQuoteResponse,
} from "./services/predictions-service";
import PredictionCard from "./prediction";

const predictions = [
	{
		ticker: "ABCD",
		companyName: "ABC Company",
		lastPrice: 32.44,
		open: 31.19,
		values: [
			{ date: "2022-02-15T14:30:00Z", value: 32.44 },
			{ date: "2022-02-16T10:45:00Z", value: 33.21 },
			{ date: "2022-02-17T12:15:00Z", value: 31.19 },
			{ date: "2022-02-18T14:30:00Z", value: 32.67 },
			{ date: "2022-02-19T10:45:00Z", value: 34.11 },
			{ date: "2022-02-20T12:15:00Z", value: 33.89 },
			{ date: "2022-02-21T14:30:00Z", value: 35.44 },
		],
	},
	{
		ticker: "EFGH",
		companyName: "EFG Company",
		lastPrice: 28.11,
		open: 26.44,
		values: [
			{ date: "2021-11-17T08:30:00Z", value: 24.98 },
			{ date: "2021-11-18T10:45:00Z", value: 26.53 },
			{ date: "2021-11-19T12:15:00Z", value: 25.17 },
			{ date: "2021-11-20T14:30:00Z", value: 27.89 },
			{ date: "2021-11-21T10:45:00Z", value: 26.44 },
			{ date: "2021-11-22T12:15:00Z", value: 28.11 },
			{ date: "2021-11-23T14:30:00Z", value: 29.67 },
		],
	},
	{
		ticker: "IJKL",
		companyName: "IJ Company",
		lastPrice: 48.67,
		open: 45.89,
		values: [
			{ date: "2021-08-24T12:15:00Z", value: 41.92 },
			{ date: "2021-08-25T10:45:00Z", value: 43.81 },
			{ date: "2021-08-26T14:30:00Z", value: 42.67 },
			{ date: "2021-08-27T12:15:00Z", value: 44.11 },
			{ date: "2021-08-28T10:45:00Z", value: 45.89 },
			{ date: "2021-08-29T14:30:00Z", value: 47.33 },
			{ date: "2021-08-30T12:15:00Z", value: 48.67 },
		],
	},
	{
		ticker: "MNOP",
		companyName: "MNO Company",
		lastPrice: 62.33,
		open: 60.89,
		values: [
			{ date: "2021-09-15T10:00:00Z", value: 53.11 },
			{ date: "2021-09-16T12:30:00Z", value: 54.89 },
			{ date: "2021-09-17T14:45:00Z", value: 56.23 },
			{ date: "2021-09-18T10:15:00Z", value: 57.67 },
			{ date: "2021-09-19T12:30:00Z", value: 59.11 },
			{ date: "2021-09-20T14:45:00Z", value: 60.89 },
			{ date: "2021-09-21T10:15:00Z", value: 62.33 },
		],
	},
];

const StockPredictions = () => {
	// const {
	// 	isLoading: isPredictionsLoading,
	// 	error: predictionsError,
	// 	data: predictions,
	// } = useQuery({
	// 	queryKey: ["predictions"],
	// 	queryFn: fetchPredictionsResponse,
	// });

	// const tickers = predictions?.map((prediction: Prediction) => {
	// 	return prediction.ticker;
	// });

	// const {
	// 	isLoading,
	// 	error,
	// 	data: quotes,
	// } = useQuery({
	// 	queryKey: ["stockPredictions", tickers],
	// 	queryFn: fetchQuoteResponse,
	// 	enabled: !!tickers,
	// });

	// const combineQuotePrediction = (
	// 	quotes: Quote[],
	// 	predicitons: Prediction[]
	// ): StockPrediction[] => {
	// 	return predicitons.map((prediction) => {
	// 		const quote = quotes.filter((quote) => {
	// 			return quote.ticker == prediction.ticker;
	// 		})[0];
	// 		return { ...prediction, ...quote };
	// 	});
	// };

	// if (isPredictionsLoading || isLoading)
	// 	return (
	// 		<div className="flex w-full justify-center">
	// 			<Spinner />
	// 		</div>
	// 	);

	// if (predictionsError)
	// 	return "Error fetching predicitons: " + predictionsError.message;
	// if (error) return "Error fetching quotes: " + error.message;

	// const stockPredictions =
	// 	quotes?.length && predictions?.length
	// 		? combineQuotePrediction(quotes, predictions)
	// 		: [];
	const stockPredictions = predictions;
	return (
		<Carousel
			numVisible={3}
			slideIds={Object.keys(stockPredictions).map(Number)}
			renderSlides={(id, index) => {
				return <PredictionCard prediction={stockPredictions[id]} />;
			}}></Carousel>
	);
};

export default StockPredictions;
