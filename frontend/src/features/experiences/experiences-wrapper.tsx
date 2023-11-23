import { useQuery } from "@tanstack/react-query";
import { Vocation } from "./types/vocation";
import { Skill } from "./types/skill";
import VocationItem from "./vocation-item";
import SkillItem from "./skill-item";
import { useState } from "react";
import { MouseEventHandler } from "react";

type ApiReponse = Skill | Vocation;

const ExperiencesWrapper = () => {
	const [vocationClicked, setVocationClicked] = useState<number>(-1);
	const fetchExperience = (path: string): Promise<ApiReponse[]> => {
		return fetch(import.meta.env.VITE_API_URL + path).then((response) =>
			response.json()
		);
	};

	const useVocaitons = () => {
		return useQuery({
			queryKey: ["vocations"],
			queryFn: () => fetchExperience("vocations/"),
		});
	};

	const useSkills = () => {
		return useQuery({
			queryKey: ["skills"],
			queryFn: () => fetchExperience("skills/"),
		});
	};

	const vocaitonsQuery = useVocaitons();
	const skillsQuery = useSkills();

	const onVocationClick = (vocationID: number) => {
		let newId = vocationID;
		if (vocationID == vocationClicked) {
			newId = -1;
		}

		setVocationClicked(newId);
	};

	if (vocaitonsQuery.isLoading || skillsQuery.isLoading) return "Loading...";
	if (vocaitonsQuery.error) return "Error" + vocaitonsQuery.error.message;
	if (skillsQuery.error) return "Error" + skillsQuery.error.message;

	const vocationsList = vocaitonsQuery.data?.map((vocation: Vocation) => {
		return (
			<VocationItem
				key={vocation.id}
				vocation={vocation}
				handleClick={onVocationClick}
			/>
		);
	});
	const skillsList = skillsQuery.data?.map((skill: Skill) => {
		return <SkillItem key={skill.id} skill={skill} />;
	});
	return (
		<>
			{vocationsList}
			{skillsList}
		</>
	);
};

export default ExperiencesWrapper;
