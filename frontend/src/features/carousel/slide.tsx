import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	slideId: number;
	offset: number;
	width: number;
};

const Slide = ({ children, slideId, offset, width }: Props) => {
	if (!width) return;

	return (
		<motion.div
			key={slideId}
			className="absolute left-1/2 top-1/2 cursor-pointer transition-colors duration-500 z-0 translate-y-1/2 min-w-min"
			layoutId="slider"
			animate={{
				zIndex: 1,
				opacity: 1,
				x: offset - width / 2,
			}}
			style={{
				width: width,
				originX: "center",
				originY: "center",
				y: "-50%",
			}}
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
