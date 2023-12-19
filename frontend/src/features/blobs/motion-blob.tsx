import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
	path: string;
	offsetDistance: number;
	children: ReactNode;
};

const MotionBlob = ({ path, offsetDistance, children }: Props) => {
	const transition = {
		duration: Math.floor(Math.random() * (15 - 10 + 1)) + 10,
		repeat: Infinity,
		repeatType: "reverse",
		ease: "easeInOut",
		delay: Math.random() * 3,
	};
	const offset = Math.floor(Math.random() * (25 - 15 + 1)) + 15;

	return (
		<motion.g
			style={{
				offsetPath: `path("${path}")`,
				offsetDistance: "var(--offset)",
				offsetRotate: "0deg",
			}}
			initial={{ "--offset": `${offsetDistance}%` }}
			animate={{ "--offset": `${offsetDistance + offset}%` }}
			transition={transition}>
			{children}
		</motion.g>
	);
};

export default MotionBlob;
