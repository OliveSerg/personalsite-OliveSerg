import { Vocation } from "@features/experiences/types/vocation";

type Props = {
	vocation: Vocation;
	handleClick: (skillIds: number[]) => void;
	isSelected: boolean;
};

const classNameMap = {
	background: {
		VOLU: "bg-blue",
		NONP: "bg-purple",
		WORK: "bg-red",
	},
};

const VocationItem = ({ vocation, handleClick, isSelected }: Props) => {
	return (
		<div
			className={`cursor-pointer w-1/3 mb-4 transition-all overflow-hidden ${
				isSelected
					? classNameMap["background"][vocation.type]
					: "bg-slate"
			} ${isSelected ? "w-full order-first" : "w-1/3 p-4"}`}
			onClick={() => handleClick([vocation.id, ...vocation.skills])}>
			<img
				src={vocation.logo}
				alt={vocation.company}
				className="w-36 h-16 object-contain"
			/>
			<a
				className="hover:text-gray-600"
				href={vocation.url}
				target="_blank"
				rel="noopener noreferrer">
				{vocation.company} - {vocation.title}
			</a>
			{isSelected && (
				<div className="mt-4">
					<p className="">
						{vocation.city}, {vocation.country}
					</p>
					<p className="">
						{vocation.start_date} -{" "}
						{vocation.end_date ? vocation.end_date : "present"}
					</p>
					<p className="">{vocation.description}</p>
				</div>
			)}
		</div>
	);
};

export default VocationItem;
