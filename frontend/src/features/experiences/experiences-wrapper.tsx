import { useCallback, useState } from "react";
import VocationsList from "./vocations-list";
import SkillsList from "./skills-list";

const ExperiencesWrapper = () => {
	const [vocationSkills, setVocationSkills] = useState<number[]>([]);

	const onVocationClick = useCallback(
		(newVocationSkills: number[]) => {
			let nextSet: number[] = [];
			if (newVocationSkills[0] !== vocationSkills[0]) {
				nextSet = newVocationSkills;
			}
			setVocationSkills(nextSet);
		},
		[vocationSkills]
	);

	return (
		<div>
			<VocationsList
				handleClick={onVocationClick}
				vocationSkills={vocationSkills}
			/>
			<SkillsList vocationSkills={vocationSkills} />
		</div>
	);
};

export default ExperiencesWrapper;
