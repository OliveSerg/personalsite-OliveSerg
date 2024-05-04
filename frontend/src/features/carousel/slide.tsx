import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	slideId: number;
	direction: number;
	offset: number;
	width: number;
};

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
};

const Slide = ({ children, slideId, direction, offset, width }: Props) => {
	if (!width) return;

	return (
		<motion.div
			key={slideId}
			className="absolute left-1/2 top-1/2 cursor-pointer border-black p-8 text-black transition-colors duration-500 z-0 bg-white"
			layoutId="slider"
			custom={direction}
			variants={variants}
			initial="enter"
			animate={{
				zIndex: 1,
				opacity: 1,
				x: offset,
			}}
			style={{ width: width }}
			exit="exit"
			transition={{
				x: {
					type: "spring",
					stiffness: 300,
					damping: 30,
				},
				opacity: { duration: 0.2 },
			}}>
			{children}
		</motion.div>
	);
};

export default Slide;
