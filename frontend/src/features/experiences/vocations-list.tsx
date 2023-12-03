import { useQuery } from "@tanstack/react-query";
import { Vocation } from "./types/vocation";
import { fetchApiResponse } from "@features/utilities/api";
import VocationItem from "./vocation-item";

type Props = {
	vocationSkills: number[];
	handleClick: (skillIds: number[]) => void;
};

const VocationsList = ({ vocationSkills, handleClick }: Props) => {
	const vocationsQuery = useQuery({
		queryKey: ["experiences", "vocations"],
		queryFn: () => fetchApiResponse<Vocation>("vocations/"),
	});

	if (vocationsQuery.isLoading) return <div>Loading...</div>;
	if (vocationsQuery.error)
		return <div>Error: {vocationsQuery.error.message}</div>;

	return (
		<div className="container mx-auto px-6">
			{/* <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 relative"> */}
			<div className="flex flex-wrap gap-2 relative bg-slate-300">
				{vocationsQuery.data
					?.sort((cur, next) => (cur.type > next.type ? -1 : 1))
					.map((vocation: Vocation) => (
						<VocationItem
							key={vocation.id}
							vocation={vocation}
							handleClick={handleClick}
							selectedId={vocationSkills[0]}
						/>
					))}
			</div>
		</div>
	);
};

export default VocationsList;
