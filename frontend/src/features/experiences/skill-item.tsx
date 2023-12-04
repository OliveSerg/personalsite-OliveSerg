import { Skill } from "@features/experiences/types/skill";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

type Props = {
	skill: Skill;
	vocationSkills: number[];
};

const classNameMap = {
	background: ["bg-blue-600", "bg-purple-600", "bg-red-600", "bg-gray-600"],
	size: [
		"w-16 h-16 text-xs",
		"w-20 h-20 text-sm",
		"w-24 h-24 text-base",
		"w-28 h-28 text-lg",
		"w-32 h-32 text-xl",
	],
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
				overflow="hidden">
				{text}
			</motion.text>
		</motion.g>
	);
};

const SkillItem = ({ skill, vocationSkills }: Props) => {
	// let tailwindClasses = `text-gray-100 font-bold aspect-square ${
	// 	classNameMap["background"][skill.id % classNameMap["background"].length]
	// } ${classNameMap["size"][skill.level - 1]}`;
	// if (vocationSkills.includes(skill.id, 1)) {
	// 	tailwindClasses += " bg-green-600";
	// }
	const centralBlob = { x: 300, y: 300, radius: 120 };

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
				centralBlob.radius + centralBlob.radius / 2,
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
		<div className="w-full h-full">
			<motion.svg width="300" height="300" viewBox="0 0 600 600">
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
				<motion.g filter="url(#goo)" fill="black">
					{skill.subskills && surroundingBlobs(skill.subskills)}
					<TextBlob
						cx={centralBlob.x}
						cy={centralBlob.y}
						r={centralBlob.radius}
						text={skill.name}
					/>
				</motion.g>
			</motion.svg>
		</div>
	);
};

export default SkillItem;
