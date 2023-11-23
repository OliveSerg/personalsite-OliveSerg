import { Skill } from "@features/experiences/types/skill";

type Props = {
	skill: Skill;
};

const SkillItem = ({ skill }: Props) => {
	return (
		<div>
			<p>{skill.name}</p>
			<p>{skill.level}</p>
			<p></p>
			<p></p>
		</div>
	);
};

export default SkillItem;
