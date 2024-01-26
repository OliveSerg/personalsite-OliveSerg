import { Transition, motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
	path: string;
	offsetDistance: number;
	transition: Transition;
	offset: number;
	children: ReactNode;
};

const MotionBlob = ({
	path,
	offsetDistance,
	transition,
	offset,
	children,
}: Props) => {
	return (
		<motion.g
			style={{
				offsetPath: `path("${path}")`,
				offsetDistance: "var(--offset)",
				offsetRotate: "0deg",
			}}
			//@ts-ignore
			initial={{ "--offset": `${offsetDistance}%` }}
			//@ts-ignore
			animate={{ "--offset": `${offsetDistance + offset}%` }}
			transition={transition}>
			{children}
		</motion.g>
	);
};

export default MotionBlob;
