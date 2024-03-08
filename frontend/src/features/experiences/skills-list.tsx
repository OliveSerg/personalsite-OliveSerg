import { Skill } from "@features/experiences/types/skill";
import { useQuery } from "@tanstack/react-query";
import { fetchDBResponse } from "@features/utilities/api";
import SkillItem from "./skill-item";
import { motion, LayoutGroup } from "framer-motion";

type Props = {
	vocationSkills: number[];
};

const SkillsList = ({ vocationSkills }: Props) => {
	const skillsQuery = useQuery({
		queryKey: ["experiences", "skills"],
		queryFn: () => fetchDBResponse<Skill>("/skills"),
	});

	if (skillsQuery.isLoading) return <div>Loading...</div>;
	if (skillsQuery.error) return <div>Error: {skillsQuery.error.message}</div>;
	const skills = skillsQuery.data as Array<Skill>;

	return (
		<div className="container mx-auto relative min-h-[50vh] flex flex-wrap justify-center">
			{skills.map((vocation: Skill) => (
				<LayoutGroup key={vocation.id}>
					<motion.div
						className={`${
							vocationSkills.includes(vocation.id) &&
							"order-first"
						}`}
						transition={{ layout: { duration: 0.5 } }}
						layout>
						<SkillItem
							skill={vocation}
							vocationSkills={vocationSkills}
						/>
					</motion.div>
				</LayoutGroup>
			))}
		</div>
	);
};

export default SkillsList;
