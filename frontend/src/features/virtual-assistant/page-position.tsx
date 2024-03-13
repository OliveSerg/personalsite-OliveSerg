import { ReactNode } from "react";
import { PagePosition } from "./types/context";
import { motion } from "framer-motion";

type Props = {
	children: ReactNode;
	pagePosition: PagePosition;
	prevPagePosition: PagePosition | undefined;
	duration?: number;
};

const PagePosition = ({
	children,
	pagePosition,
	prevPagePosition,
	duration,
}: Props) => {
	return (
		<motion.div
			className="absolute h-screen w-1/3 z-10 left-1/2"
			style={{
				x: pagePosition?.initialX ?? prevPagePosition?.x,
				y: pagePosition?.initialY ?? prevPagePosition?.y,
			}}
			animate={{
				x: pagePosition?.x,
				y: pagePosition?.y,
			}}
			transition={{
				duration: duration,
				ease: "linear",
			}}>
			{children}
		</motion.div>
	);
};

export default PagePosition;
