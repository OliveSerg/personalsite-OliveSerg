import { Skill } from "@features/experiences/types/skill";

type Props = {
	skill: Skill;
	vocationSkills: number[];
};

const SkillItem = ({ skill, vocationSkills }: Props) => {
	const tailwindClasses =
		"rounded-full p-2 m-1 bg-gray-600 text-gray-100  w-24 h-24 flex items-center justify-center text-xl font-bold";
	if (vocationSkills.includes(skill.id, 1)) {
		console.log(skill);
	}
	return (
		<div className={tailwindClasses}>
			<p>{skill.name}</p>
			<p>{skill.level}</p>
		</div>
	);
};

export default SkillItem;
