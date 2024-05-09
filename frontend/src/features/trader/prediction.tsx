import { useState } from "react";
import { StockPrediction } from "./types/prediction";
import { VscGraph } from "react-icons/vsc";

type Props = {
	prediction: StockPrediction;
};

const PredictionCard = ({ prediction }: Props) => {
	const [isModelOpen, setIsModalOpen] = useState<boolean>(false);
	const getPrecentageDiff = (
		lastPrice: number,
		currentPrice: number
	): number => {
		return ((currentPrice - lastPrice) / lastPrice) * 100;
	};

	const nextValue = prediction.values[0].value;
	const precentDiff = Number(
		getPrecentageDiff(prediction.lastPrice, nextValue).toFixed(2)
	);

	return (
		<div className="bg-white rounded mx-1 p-4 min-h-[250px]">
			<div className="flex justify-between pb-1">
				<div className="flex gap-2">
					<h4 className="font-bold text-xl">{prediction.ticker}</h4>
					<span>({prediction.companyName})</span>
				</div>

				<span
					className="cursor-pointer"
					onClick={() => {
						setIsModalOpen(!isModelOpen);
					}}>
					<VscGraph />
				</span>
			</div>
			<div className="mb-6">
				<span className="mr-2">{prediction.lastPrice.toFixed(2)}</span>
				<span
					className={`py-1 px-2 rounded font-semibold whitespace-nowrap ${
						precentDiff < 0
							? "text-red-500 bg-red-100"
							: precentDiff > 0
							? "text-green-500 bg-green-100"
							: "bg-slate-100"
					}`}>
					{precentDiff < 0
						? String.fromCharCode(8595) + " "
						: precentDiff > 0
						? String.fromCharCode(8593) + " "
						: ""}
					{Math.abs(precentDiff).toFixed(2)}%
				</span>
			</div>
			<div className="">
				{isModelOpen ? (
					<>
						{prediction.values.map((value) => (
							<div>
								<p>
									{value.date} {value.value}
								</p>
							</div>
						))}
					</>
				) : (
					<>
						<p className="text-8xl text-center">
							{nextValue.toFixed(2)}
						</p>
						<p className="text-right">
							{new Date(prediction.values[0].date).toDateString()}
						</p>
					</>
				)}
			</div>
		</div>
	);
};

export default PredictionCard;
