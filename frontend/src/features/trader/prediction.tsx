import { StockPrediction } from "./types/prediction";

type Props = {
	prediction: StockPrediction;
};

const PredictionCard = ({ prediction }: Props) => {
	console.log(prediction);

	return (
		<div className="bg-white rounded mx-1 p-4">
			<div className="flex justify-between">
				<h4 className="font-bold text-xl">{prediction.ticker}</h4>
				<span>
					{new Date(prediction.values[0].date).toDateString()}
				</span>
				<span>7 days -&gt;</span>
			</div>
			<div className="flex justify-center text-7xl">
				{prediction.values[0].value}
				{/* {prediction.values.map((value) => (
								<>
									<p>{value.date}</p>
									<p>{value.value}</p>
								</>
							))} */}
			</div>
		</div>
	);
};

export default PredictionCard;
