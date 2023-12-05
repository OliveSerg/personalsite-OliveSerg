import { Skill } from "@features/experiences/types/skill";
import { useQuery } from "@tanstack/react-query";
import { fetchApiResponse } from "@features/utilities/api";
import SkillItem from "./skill-item";

type Props = {
	vocationSkills: number[];
};

const SkillsList = ({ vocationSkills }: Props) => {
	const skillsQuery = useQuery({
		queryKey: ["experiences", "skills"],
		queryFn: () => fetchApiResponse<Skill>("skills/"),
	});

	if (skillsQuery.isLoading) return <div>Loading...</div>;
	if (skillsQuery.error) return <div>Error: {skillsQuery.error.message}</div>;

	return (
		<div className="container mx-auto relative min-h-[50vh] flex flex-wrap justify-center">
			{skillsQuery.data?.map((vocation: Skill) => (
				<SkillItem
					key={vocation.id}
					skill={vocation}
					vocationSkills={vocationSkills}
				/>
			))}
		</div>
	);
};

export default SkillsList;
