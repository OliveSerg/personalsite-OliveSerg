import { Skill } from "@features/experiences/types/skill";
import { motion } from "framer-motion";
import { useRef } from "react";

type Props = {
	skill: Skill;
	vocationSkills: number[];
};

const TextBlob = ({ cx, cy, r, text }) => {
	return (
		<motion.g>
			<motion.circle cx={cx} cy={cy} r={r} custom={1} />
			<motion.text
				x={cx}
				y={cy}
				textAnchor="middle"
				dominantBaseline="middle"
				fill="#fff"
				overflow="hidden"
				fontSize={r / 4}>
				{text}
			</motion.text>
		</motion.g>
	);
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
	const centralBlob = {
		x: commonFactor,
		y: commonFactor,
		radius: commonFactor / 2,
	};

	const calculateBlobPosition = (
		centerX: number,
		centerY: number,
		radius: number,
		angleInDegrees: number
	) => {
		const angleInRadians = (angleInDegrees * Math.PI) / 180;

		const x = centerX + radius * Math.cos(angleInRadians);
		const y = centerY + radius * Math.sin(angleInRadians);

		return { x, y };
	};

	const surroundingBlobs = (subSkills: string[]) => {
		const angleIncrement = (Math.PI * 120) / subSkills.length;

		return subSkills.map((skill, index) => {
			const angle = index * angleIncrement;
			const { x, y } = calculateBlobPosition(
				centralBlob.x,
				centralBlob.y,
				centralBlob.radius + centralBlob.radius / 2 - 10,
				angle
			);
			return (
				<TextBlob
					key={index}
					cx={x}
					cy={y}
					r={centralBlob.radius / 2}
					text={skill}
				/>
			);
		});
	};

	return (
		<motion.svg
			width={centralBlob.radius * 4}
			height={centralBlob.radius * 4}
			viewBox={`0 0 ${centralBlob.radius * 4} ${centralBlob.radius * 4}`}
			className="">
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
				className={`${bgColour} transition-colors`}
				filter="url(#goo)">
				{skill.subskills && surroundingBlobs(skill.subskills)}
				<TextBlob
					cx={centralBlob.x}
					cy={centralBlob.y}
					r={centralBlob.radius}
					text={skill.name}
				/>
			</motion.g>
		</motion.svg>
	);
};

export default SkillItem;
