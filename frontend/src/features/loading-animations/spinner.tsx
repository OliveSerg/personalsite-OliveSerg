import { motion } from "framer-motion";
import "@features/loading-animations/css/index.css";

const Spinner = () => {
	return (
		<motion.div
			className="spinner h-24 w-24 rounded-full"
			animate={{
				rotate: [0, 360],
				transition: {
					duration: 1,
					ease: "linear",
					repeat: Infinity,
				},
			}}></motion.div>
	);
};

export default Spinner;
