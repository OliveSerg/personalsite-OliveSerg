import { motion } from "framer-motion";

const loadingCircle = "block w-2 h-2 bg-scarlet-600 rounded-lg";

const loadingContainerVariants = {
	start: {
		transition: {
			staggerChildren: 0.2,
		},
	},
	end: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const loadingCircleVariants = {
	start: {
		y: "50%",
	},
	end: {
		y: "150%",
	},
};

const loadingCircleTransition = {
	duration: 0.75,
	repeat: Infinity,
	repeatType: "reverse" as const,
};

const JumpingDots = () => {
	return (
		<motion.div
			className="flex w-10 h-4 justify-around mx-auto"
			variants={loadingContainerVariants}
			initial="start"
			animate="end">
			<motion.span
				className={loadingCircle}
				variants={loadingCircleVariants}
				transition={loadingCircleTransition}
			/>
			<motion.span
				className={loadingCircle}
				variants={loadingCircleVariants}
				transition={loadingCircleTransition}
			/>
			<motion.span
				className={loadingCircle}
				variants={loadingCircleVariants}
				transition={loadingCircleTransition}
			/>
		</motion.div>
	);
};

export default JumpingDots;
