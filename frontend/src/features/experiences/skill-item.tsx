import MotionBlob from "@features/blobs/motion-blob";
import TextBlob from "@features/blobs/text-blob";
import { Skill } from "@features/experiences/types/skill";
import { motion } from "framer-motion";

type Props = {
	skill: Skill;
	vocationSkills: number[];
};

const BGCOLORS = [
	"fill-scarlet-300",
	"fill-scarlet-400",
	"fill-scarlet-500",
	"fill-scarlet-600",
	"fill-scarlet-700",
];

const SkillItem = ({ skill, vocationSkills }: Props) => {
	const isSelected = vocationSkills.includes(skill.id);
	const bgColour = isSelected ? "fill-sunglow-500" : BGCOLORS[skill.id % 5];
	const commonFactor = 60 + skill.level * 15;
	const x = commonFactor;
	const y = commonFactor;
	const radius = commonFactor / 2;
	const offset = 30;
	const path = `M ${x} ${y - radius - offset} a ${radius + offset} ${
		radius + offset
	} 0 1 1 0 ${(radius + offset) * 2} a ${radius + offset} ${
		radius + offset
	} 0 1 1 0 ${-(radius + offset) * 2}`;

	const surroundingBlobs = (subSkills: string[]) => {
		return subSkills.map((subSkill, index) => {
			const position = (index / subSkills.length) * 100;

			return (
				<MotionBlob key={index} path={path} offsetDistance={position}>
					<TextBlob
						key={index}
						cx={0}
						cy={0}
						r={radius / 2}
						text={subSkill}
					/>
				</MotionBlob>
			);
		});
	};

	return (
		<>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={radius * 4}
				height={radius * 4}
				viewBox={`0 0 ${radius * 4} ${radius * 4}`}
				className="overflow-visible">
				<defs>
					<filter id="goo">
						<feGaussianBlur
							in="SourceGraphic"
							result="blur"
							stdDeviation="10"
						/>
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
							result="goo"
						/>
						<feBlend in2="goo" in="SourceGraphic" result="mix" />
					</filter>
				</defs>
				<motion.g
					className={`${bgColour} transition-colors duration-500`}
					filter="url(#goo)">
					{skill.subskills && surroundingBlobs(skill.subskills)}
					<TextBlob cx={x} cy={y} r={radius} text={skill.name} />
				</motion.g>
			</motion.svg>
		</>
	);
};

export default SkillItem;
