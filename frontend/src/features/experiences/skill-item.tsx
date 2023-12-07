import { Skill } from "@features/experiences/types/skill";
import { motion } from "framer-motion";
import { Children } from "react";

type Props = {
	skill: Skill;
	vocationSkills: number[];
};

type Blob = {
	text: string;
	r: number;
	cx: number;
	cy: number;
	path?: string;
};

const MotionBlob = ({ path, position, children }) => {
	const transition = {
		duration: 4,
		repeat: Infinity,
		repeatType: "reverse",
		ease: "easeInOut",
	};

	let pathProps;
	if (path) {
		const offset = Math.random() * 20 + 10;
		pathProps = {
			style: {
				offsetPath: `path("${path}")`,
				offsetDistance: "var(--offset)",
				offsetRotate: "0deg",
			},
			initial: { "--offset": `${position}%` },
			animate: { "--offset": `${position + offset}%` },
			transition: transition,
		};
	}
	return <motion.g {...pathProps}>{children}</motion.g>;
};

const TextBlob = ({ cx = 0, cy = 0, r, text }: Blob) => {
	return (
		<>
			<motion.circle cx={cx} cy={cy} r={r} />
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
		</>
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
	const x = commonFactor;
	const y = commonFactor;
	const radius = commonFactor / 2;
	const offset = 10;
	const path = `M ${x} ${y - radius - offset} a ${radius + offset} ${
		radius + offset
	} 0 1 1 0 ${(radius + offset) * 2} a ${radius + offset} ${
		radius + offset
	} 0 1 1 0 ${-(radius + offset) * 2}`;

	const surroundingBlobs = (subSkills: string[]) => {
		return subSkills.map((skill, index) => {
			const position = (index / subSkills.length) * 80;

			return (
				<MotionBlob key={index} path={path} position={position}>
					<TextBlob
						key={index}
						cx={0}
						cy={0}
						r={radius / 2}
						text={skill}
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
					className={`${bgColour} transition-colors`}
					filter="url(#goo)">
					{skill.subskills && surroundingBlobs(skill.subskills)}
					<TextBlob cx={x} cy={y} r={radius} text={skill.name} />
				</motion.g>
			</motion.svg>
		</>
	);
};

export default SkillItem;
