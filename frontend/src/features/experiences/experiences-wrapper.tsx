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
		<>
			<h2 className="text-center text-4xl font-bold uppercase">
				Professional Experiences
			</h2>
			<VocationsList
				handleClick={onVocationClick}
				vocationSkills={vocationSkills}
			/>
			<hr className="mb-12 mx-auto w-1/2 border-scarlet-700 border-t-2" />
			<h3 className="text-center text-2xl font-bold mb-2">
				Languages, Frameworks, and Tools
			</h3>
			<p className="max-w-2xl m-auto">
				Explore the arsenal of skills that fuel my journey in software
				development. From seamlessly orchestrating code to harnessing
				the power of cutting-edge technologies, I specialize in crafting
				digital solutions that stand out.
			</p>
			<SkillsList vocationSkills={vocationSkills} />
		</>
	);
};

export default ExperiencesWrapper;
