import { Vocation } from "@features/experiences/types/vocation";
import { motion } from "framer-motion";

type Props = {
	vocation: Vocation;
	handleClick: (skillIds: number[]) => void;
	selectedId: number;
};

const VOCATION_TYPES = {
	NONP: {
		text: "non-profit",
		bgColor: "bg-scarlet-400",
	},
	VOLU: {
		text: "volunteering",
		bgColor: "bg-scarlet-600",
	},
	WORK: {
		text: "employed",
		bgColor: "bg-scarlet-800",
	},
};

const VocationItem = ({ vocation, handleClick, selectedId }: Props) => {
	const isSelected = selectedId === vocation.id;

	return (
		<motion.div
			className={`relative cursor-pointer overflow-hidden p-6 w-auto backdrop-blur-sm rounded-lg bg-white ${
				isSelected ? "order-last w-3/4" : ""
			}`}
			onClick={() => handleClick([vocation.id, ...vocation.skills])}
			transition={{
				layout: { duration: 0.5 },
			}}
			layout>
			<div className="max-w-3xl m-auto">
				<motion.img
					src={vocation.logo}
					alt={vocation.company}
					className="w-36 h-16 object-contain"
					transition={{
						layout: { duration: 0.5 },
					}}
					layout
				/>
				<a
					className={`mt-2 hover:text-scarlet-600 font-semibold text-sunglow-600 transition-colors ${
						selectedId == undefined || isSelected ? "" : "hidden"
					}`}
					href={vocation.url}
					target="_blank"
					rel="noopener noreferrer">
					{vocation.company} - {vocation.title}
				</a>
				<div className={`mt-2 ${isSelected ? "" : "hidden"}`}>
					<p>
						{vocation.city}, {vocation.country}
					</p>
					<p className="text-scarlet-700">
						{vocation.start_date} -
						{vocation.end_date ? vocation.end_date : "present"}
					</p>
					<p className="mt-4">{vocation.description}</p>
					<p
						className={`${
							VOCATION_TYPES[vocation.type].bgColor
						} absolute right-0 top-0 text-white rounded-bl-lg p-1 capitalize`}>
						{VOCATION_TYPES[vocation.type].text}
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default VocationItem;
