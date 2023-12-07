import { motion } from "framer-motion";

type Props = {
	text: string;
	r: number;
	cx: number;
	cy: number;
};

const TextBlob = ({ cx = 0, cy = 0, r, text }: Props) => {
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

export default TextBlob;
