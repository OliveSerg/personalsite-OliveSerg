import { motion } from "framer-motion";

type Props = {
	text: string;
	r: number;
	cx: number;
	cy: number;
};

const TextBlob = ({ cx, cy, r, text }: Props) => {
	return (
		<>
			<motion.circle cx={cx} cy={cy} r={r} />
			<foreignObject x={cx - r} y={cy - r} width={r * 2} height={r * 2}>
				<p
					style={{ fontSize: r / 3 }}
					className="flex items-center justify-center h-full leading-none text-center text-white"
					xmlns="http://www.w3.org/1999/xhtml">
					{text}
				</p>
			</foreignObject>
		</>
	);
};

export default TextBlob;
