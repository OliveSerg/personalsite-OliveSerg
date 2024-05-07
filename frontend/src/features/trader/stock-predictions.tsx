import Carousel from "@features/carousel/carousel";
import Slide from "@features/carousel/slide";
import Spinner from "@features/loading-animations/spinner";
import { useQuery } from "@tanstack/react-query";

const predictions = [
	{
		ticker: "ABCD",
		predictions: [
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
		predictions: [
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
		predictions: [
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
		predictions: [
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
	const { isLoading, error, data } = useQuery({
		queryKey: ["predicitonsData"],
		// queryFn: () => {
		// 	fetch(import.meta.env.VITE_PREDICTIONS_URL).then((res) =>
		// 		res.json()
		// 	);
		// },
		queryFn: () => Promise.resolve(5),
	});

	if (isLoading)
		return (
			<div className="flex w-full justify-center">
				<Spinner />
			</div>
		);

	if (error) return "Error fetching predicitons: " + error.message;

	return (
		<Carousel
			numVisible={3}
			slideIds={[0, 1, 2, 3]}
			renderSlides={(id, index) => {
				const theDate = new Date(predictions[id].predictions[0].date);
				return (
					<div className="bg-white rounded mx-1 p-4">
						<div className="flex justify-between">
							<h4 className="font-bold text-xl">
								{predictions[id].ticker}
							</h4>
							<span>{theDate.toDateString()}</span>
							<span>7 days -&gt;</span>
						</div>
						<div className="flex justify-center text-7xl">
							{predictions[id].predictions[0].value}
							{/* {predictions[id].predictions.map((prediction) => (
								<>
									<p>{prediction.date}</p>
									<p>{prediction.value}</p>
								</>
							))} */}
						</div>
					</div>
				);
			}}></Carousel>
	);
};

export default StockPredictions;
