import { Skill } from "@features/experiences/types/skill";

type Props = {
	skill: Skill;
	vocationSkills: number[];
};

const SkillItem = ({ skill, vocationSkills }: Props) => {
	if (vocationSkills.includes(skill.id)) {
		console.log(skill);
	}
	return (
		<div>
			<p>{skill.name}</p>
			<p>{skill.level}</p>
		</div>
	);
};

export default SkillItem;
