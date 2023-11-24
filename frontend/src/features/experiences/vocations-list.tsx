import { useQuery } from "@tanstack/react-query";
import { Vocation } from "./types/vocation";
import { fetchApiResponse } from "@features/utilities/api";
import VocationItem from "./vocation-item";

type Props = {
	handleClick: (skillIds: number[]) => void;
};

const VocationsList = ({ handleClick }: Props) => {
	const vocationsQuery = useQuery({
		queryKey: ["experiences", "vocations"],
		queryFn: () => fetchApiResponse<Vocation>("vocations/"),
	});

	if (vocationsQuery.isLoading) return <div>Loading...</div>;
	if (vocationsQuery.error)
		return <div>Error: {vocationsQuery.error.message}</div>;

	return (
		<div>
			{vocationsQuery.data?.map((vocation: Vocation) => (
				<VocationItem
					key={vocation.id}
					vocation={vocation}
					handleClick={handleClick}
				/>
			))}
		</div>
	);
};

export default VocationsList;
