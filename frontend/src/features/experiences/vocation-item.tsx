import { Vocation } from "@features/experiences/types/vocation";
import { motion } from "framer-motion";

type Props = {
	vocation: Vocation;
	handleClick: (skillIds: number[]) => void;
	selectedId: number;
};

const VocationItem = ({ vocation, handleClick, selectedId }: Props) => {
	const isSelected = selectedId === vocation.id;

	return (
		<motion.div
			className={`cursor-pointer overflow-hidden p-6 w-auto ${
				isSelected ? "order-last w-full" : ""
			}`}
			onClick={() => handleClick([vocation.id, ...vocation.skills])}
			transition={{
				layout: { duration: 0.5 },
				width: { duration: 0.5 },
			}}
			layout>
			<div className="max-w-3xl m-auto">
				<div>
					<motion.img
						src={vocation.logo}
						alt={vocation.company}
						className="w-36 h-16 object-contain"
						layout
					/>
					<a
						className={`hover:text-gray-600 ${
							selectedId == undefined || isSelected
								? ""
								: "hidden"
						}`}
						href={vocation.url}
						target="_blank"
						rel="noopener noreferrer">
						{vocation.company} - {vocation.title}
					</a>
				</div>
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
			</div>
		</motion.div>
	);
};

export default VocationItem;
