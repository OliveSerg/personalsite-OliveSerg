import Carousel from "@features/carousel/carousel";
import Spinner from "@features/loading-animations/spinner";
import { Prediction, Quote, StockPrediction } from "./types/prediction";
import { usePredictions, useQuotes } from "./services/predictions-service";
import PredictionCard from "./prediction";

const StockPredictions = () => {
	const {
		isLoading: isPredictionsLoading,
		error: predictionsError,
		data: predictions,
	} = usePredictions();

	const tickers = predictions?.map((prediction: Prediction) => {
		return prediction.ticker;
	});

	const { isLoading, error, data: quotes } = useQuotes(tickers);

	const combineQuotePrediction = (
		quotes: Quote[],
		predicitons: Prediction[]
	): StockPrediction[] => {
		return predicitons.map((prediction) => {
			const quote = quotes.filter((quote) => {
				return quote.ticker == prediction.ticker;
			})[0];
			return { ...prediction, ...quote };
		});
	};

	if (isPredictionsLoading || isLoading)
		return (
			<div className="flex w-full justify-center">
				<Spinner />
			</div>
		);

	if (predictionsError)
		return "Error fetching predicitons: " + predictionsError.message;
	if (error) return "Error fetching quotes: " + error.message;

	const stockPredictions =
		quotes?.length && predictions?.length
			? combineQuotePrediction(quotes, predictions)
			: [];
	if (!stockPredictions.length) return;

	return (
		<div className="">
			<h3 className="text-xl font-bold mb-2">Stock Prediction</h3>
			<p className="">
				The classic "I can predict the stock market and get rich"
				idea... Well kind of~ this was made to understand timeseries
				analysis and prediction, and what better place to try it then
				<b>STONKS</b>. The following data is pulled from a program
				created with a customly trained machine learning model to
				predict a set of stock market tickers. It is a no brainer to
				say:
				<blockquote>
					No financial advice or recommendations should be inferred
					from any content, and it is not recommended to make
					investment decisions based solely on the information
					provided, as personalized financial planning requires
					professional expertise and consideration of individual
					circumstances.
				</blockquote>
			</p>
			<Carousel
				numVisible={3}
				minWidth={300}
				slideIds={Object.keys(stockPredictions).map(Number)}
				renderSlides={(id) => {
					return <PredictionCard prediction={stockPredictions[id]} />;
				}}></Carousel>
		</div>
	);
};

export default StockPredictions;
