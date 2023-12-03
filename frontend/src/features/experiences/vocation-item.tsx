import { Vocation } from "@features/experiences/types/vocation";
import { motion } from "framer-motion";

type Props = {
	vocation: Vocation;
	handleClick: (skillIds: number[]) => void;
	selectedId: number;
};

const classNameMap = {
	background: {
		VOLU: "bg-scarlet-600",
		NONP: "bg-slate-300",
		WORK: "bg-sunglow-600",
	},
};

const VocationItem = ({ vocation, handleClick, selectedId }: Props) => {
	const isSelected = selectedId === vocation.id;

	return (
		<motion.div
			className={`cursor-pointer overflow-hidden p-6  ${
				isSelected ? "order-last w-full" : ""
			}`}
			onClick={() => handleClick([vocation.id, ...vocation.skills])}
			layout>
			<motion.div className="">
				<img
					src={vocation.logo}
					alt={vocation.company}
					className="w-36 h-16 object-contain"
				/>
				<a
					className={`hover:text-gray-600 ${
						selectedId == undefined || isSelected ? "" : "hidden"
					}`}
					href={vocation.url}
					target="_blank"
					rel="noopener noreferrer">
					{vocation.company} - {vocation.title}
				</a>
				<div className={`mt-4 ${isSelected ? "" : "hidden"}`}>
					<p className="">
						{vocation.city}, {vocation.country}
					</p>
					<p className="">
						{vocation.start_date} -
						{vocation.end_date ? vocation.end_date : "present"}
					</p>
					<p className="">{vocation.description}</p>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default VocationItem;
