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

	const isSelected = (vocaitonID: number) => vocationSkills[0] === vocaitonID;

	if (vocationsQuery.isLoading) return <div>Loading...</div>;
	if (vocationsQuery.error)
		return <div>Error: {vocationsQuery.error.message}</div>;

	return (
		<div className="container mx-auto flex flex-row flex-wrap justify-center">
			{vocationsQuery.data
				?.sort((cur, next) => (cur.type > next.type ? -1 : 1))
				.map((vocation: Vocation) => (
					<VocationItem
						key={vocation.id}
						vocation={vocation}
						handleClick={handleClick}
						isSelected={isSelected(vocation.id)}
					/>
				))}
		</div>
	);
};

export default VocationsList;
