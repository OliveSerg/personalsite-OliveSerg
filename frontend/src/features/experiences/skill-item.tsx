import MotionBlob from "@features/blobs/motion-blob";
import { Skill } from "@features/experiences/types/skill";
import { motion } from "framer-motion";

type Props = {
	skill: Skill;
	vocationSkills: number[];
};

const SkillItem = ({ skill, vocationSkills }: Props) => {
	const isSelected = vocationSkills.includes(skill.id);
	const bgColour = isSelected ? "fill-sunglow-500" : "fill-scarlet-700";
	const blobs: JSX.Element[] = [];
	const titles: JSX.Element[] = [];
	const commonFactor = 60 + skill.level * 15;
	const x = commonFactor;
	const y = commonFactor;
	const radius = commonFactor / 2;
	const offset = radius / 3;
	const path = `M ${radius + offset} ${0} A 1 1 0 0 0 ${-(
		radius + offset
	)} 0 A 1 1 0 0 0 ${radius + offset} 0`;

	skill.subskills?.forEach((subSkill, index) => {
		const position = (index / skill.subskills.length) * 100;
		const offset = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
		const transition = {
			duration: Math.floor(Math.random() * (15 - 10 + 1)) + 10,
			repeat: Infinity,
			repeatType: "reverse",
			ease: "easeInOut",
			delay: Math.random() * 3,
		};

		blobs.push(
			<MotionBlob
				key={subSkill + index}
				path={path}
				offsetDistance={position}
				transition={transition}
				offset={offset}>
				<motion.circle cx={x} cy={y} r={radius / 2} fill="white" />
			</MotionBlob>
		);

		titles.push(
			<MotionBlob
				key={subSkill + index}
				path={path}
				offsetDistance={position}
				transition={transition}
				offset={offset}>
				<foreignObject
					key={subSkill}
					x={x - radius / 2}
					y={y - radius / 2}
					width={radius}
					height={radius}>
					<p
						style={{ fontSize: radius / 2 / 3 }}
						className="flex items-center justify-center h-full leading-none text-center text-white"
						xmlns="http://www.w3.org/1999/xhtml">
						{subSkill}
					</p>
				</foreignObject>
			</MotionBlob>
		);
	});

	return (
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
				<linearGradient
					id="skills-gradient"
					gradientUnits="userSpaceOnUse">
					<stop offset="0%" stopColor="#FF9133" />
					<stop offset="100%" stopColor="#FF0015" />
				</linearGradient>
			</defs>
			<mask id={`mask_${skill.id}`}>
				<g filter="url(#goo)">
					{skill.subskills && blobs}
					<motion.circle cx={x} cy={y} r={radius} fill="white" />
				</g>
			</mask>
			<rect
				x="0"
				y="0"
				mask={`url(#mask_${skill.id})`}
				fill="url(#skills-gradient)"
				width={radius * 4}
				height={radius * 4}></rect>
			{skill.subskills && titles}
			<foreignObject
				x={x - radius}
				y={y - radius}
				width={radius * 2}
				height={radius * 2}>
				<p
					style={{ fontSize: radius / 3 }}
					className="flex items-center justify-center h-full leading-none text-center text-white"
					xmlns="http://www.w3.org/1999/xhtml">
					{skill.name}
				</p>
			</foreignObject>
		</motion.svg>
	);
};

export default SkillItem;
