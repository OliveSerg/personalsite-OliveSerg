import { useCallback, useState } from "react";
import VocationsList from "./vocations-list";
import SkillsList from "./skills-list";

const ExperiencesWrapper = () => {
	const [vocationSkills, setVocationSkills] = useState<number[]>([]);

	const onVocationClick = useCallback(
		(newVocationSkills: number[]) => {
			let nextSet: number[] = [];
			if (
				newVocationSkills.length !== vocationSkills.length ||
				newVocationSkills.some(
					(newSKill, i) => newSKill !== vocationSkills[i]
				)
			) {
				nextSet = newVocationSkills;
			}

			setVocationSkills(nextSet);
		},
		[vocationSkills]
	);

	return (
		<div>
			<VocationsList handleClick={onVocationClick} />
			<SkillsList vocationSkills={vocationSkills} />
		</div>
	);
};

export default ExperiencesWrapper;
