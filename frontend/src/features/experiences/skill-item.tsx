import { Skill } from "@features/experiences/types/skill";

type Props = {
	skill: Skill;
	vocationSkills: number[];
};

const classNameMap = {
	background: ["bg-blue-600", "bg-purple-600", "bg-red-600", "bg-gray-600"],
	size: [
		"w-14 h-14 text-xs",
		"w-16 h-16 text-sm",
		"w-20 h-20 text-base",
		"w-24 h-24 text-lg",
		"w-28 h-28 text-xl",
	],
};

const SkillItem = ({ skill, vocationSkills }: Props) => {
	let tailwindClasses = `rounded-full p-2 m-1 text-gray-100 flex items-center justify-center font-bold ${
		classNameMap["background"][skill.id % classNameMap["background"].length]
	} ${classNameMap["size"][skill.level - 1]}`;
	if (vocationSkills.includes(skill.id, 1)) {
		tailwindClasses += " bg-green-600";
	}
	return (
		<div className={tailwindClasses}>
			<p>{skill.name}</p>
		</div>
	);
};

export default SkillItem;
