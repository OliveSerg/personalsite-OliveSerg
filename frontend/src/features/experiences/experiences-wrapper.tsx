import { useQuery } from "@tanstack/react-query";
import { Vocation } from "./types/vocation";
import { Skill } from "./types/skill";
import VocationItem from "./vocation-item";
import SkillItem from "./skill-item";
import { useState } from "react";

type ApiReponse = Skill | Vocation;

const ExperiencesWrapper = () => {
	const [vocationSkills, setVocationSkills] = useState<number[]>([]);

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

	const onVocationClick = (newVocationSkills: number[]) => {
		let nextSet: number[] = [];
		if (
			newVocationSkills.length !== vocationSkills.length &&
			newVocationSkills.every(
				(newSKill, i) => newSKill !== vocationSkills[i]
			)
		) {
			nextSet = newVocationSkills;
		}
		console.log(vocationSkills);
		setVocationSkills(nextSet);
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
		return (
			<SkillItem
				key={skill.id}
				skill={skill}
				vocationSkills={vocationSkills}
			/>
		);
	});
	return (
		<>
			{vocationsList}
			{skillsList}
		</>
	);
};

export default ExperiencesWrapper;
