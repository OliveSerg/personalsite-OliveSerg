import { StockPrediction } from "./types/prediction";

type Props = {
	prediction: StockPrediction;
};

const PredictionCard = ({ prediction }: Props) => {
	console.log(prediction);
	const getPrecentageDiff = (
		lastPrice: number,
		currentPrice: number
	): number => {
		return ((currentPrice - lastPrice) / lastPrice) * 100;
	};
	const nextValue = prediction.values[0].value;
	const precentDiff = getPrecentageDiff(prediction.lastPrice, nextValue);

	return (
		<div className="bg-white rounded mx-1 p-4 min-h-[250px]">
			<div className="flex justify-between pb-2">
				<h4 className="font-bold text-xl">{prediction.ticker}</h4>
				<span>
					{new Date(prediction.values[0].date).toDateString()}
				</span>
				<span>7 days -&gt;</span>
			</div>
			<div className="grid grid-cols-3 grid-flow-row gap-4">
				<div className="col-span-2">
					<p>Current Price: {prediction.lastPrice.toFixed(2)}</p>
				</div>
				<div>
					<span
						className={`py-1 px-2 rounded font-semibold ${
							precentDiff < 0
								? "text-red-500 bg-red-100"
								: precentDiff > 0
								? "text-green-500 bg-green-100"
								: "bg-slate-100"
						}`}>
						{precentDiff < 0
							? String.fromCharCode(8595)
							: precentDiff > 0
							? String.fromCharCode(8593)
							: ""}{" "}
						{Math.abs(precentDiff).toFixed(2)}%
					</span>
				</div>
				<span className="col-span-full text-8xl text-center">
					{nextValue.toFixed(2)}
				</span>
			</div>
			{/* {prediction.values.map((value) => (
								<>
									<p>{value.date}</p>
									<p>{value.value}</p>
								</>
							))} */}
		</div>
	);
};

export default PredictionCard;
