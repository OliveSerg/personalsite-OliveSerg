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
	console.log(stockPredictions);

	return (
		<Carousel
			numVisible={3}
			minWidth={300}
			slideIds={Object.keys(stockPredictions).map(Number)}
			renderSlides={(id) => {
				return <PredictionCard prediction={stockPredictions[id]} />;
			}}></Carousel>
	);
};

export default StockPredictions;
