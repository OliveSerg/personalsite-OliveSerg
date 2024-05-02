import { motion } from "framer-motion";
import "@features/loading-animations/css/index.css";

const Spinner = () => {
	return (
		<motion.span
			className="spinner h-24 w-24 rounded-full"
			animate={{
				rotate: [0, 360],
				transition: {
					duration: 1,
					ease: "linear",
					repeat: Infinity,
				},
			}}></motion.span>
	);
};

export default Spinner;
