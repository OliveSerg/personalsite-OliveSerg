import { Vocation } from "@features/experiences/types/vocation";
import { motion } from "framer-motion";
import { useState } from "react";

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
				isSelected ? "order-last" : ""
			}`}
			onClick={() => handleClick([vocation.id, ...vocation.skills])}
			transition={{ layout: { duration: 0.3 } }}
			layout>
			<div
				className={
					selectedId == undefined || isSelected
						? ""
						: "divide-x divide-solid"
				}>
				<motion.img
					src={vocation.logo}
					alt={vocation.company}
					className="w-36 h-16 object-contain"
					layout
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
			</div>
			<motion.div className={`mt-4 ${isSelected ? "" : "hidden"}`} layout>
				<p className="">
					{vocation.city}, {vocation.country}
				</p>
				<p className="">
					{vocation.start_date} -
					{vocation.end_date ? vocation.end_date : "present"}
				</p>
				<p className="">{vocation.description}</p>
			</motion.div>
		</motion.div>
	);
};
const Card = ({ value }) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			open ? (
			<motion.div
				onClick={() => setOpen(false)}
				className="expanded-card"
				layoutId="expandable-card"
				style={{ background: value }}>
				<motion.h2
					className="expanded-card-h"
					layoutId="expandable-card-h">
					Expanded {value}
				</motion.h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing
					elit.Voluptate aliquam molestiae ratione sint magnam sequi
					fugiat ullam earum distinctio fuga iure, ad odit repudiandae
					modi est alias ipsum aperiam.Culpa?
				</p>
			</motion.div>
			) : (
			<motion.div
				onClick={() => setOpen(true)}
				className="normal-card"
				layoutId="expandable-card"
				style={{ background: value }}>
				<motion.h1 layoutId="expandable-card-h">{value}</motion.h1>
			</motion.div>
			);
		</>
	);
};

export default VocationItem;
