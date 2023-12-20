type Props = {
	top: string;
	left: string;
	width: string;
	height: string;
	color?: string;
	blur?: string;
};

const Glow = ({
	top,
	left,
	width,
	height,
	color = "from-scarlet-300 to-sunglow-200",
	blur = "blur-[30rem]",
}: Props) => {
	return (
		<div
			className={`absolute bg-gradient-radial ${color} -z-20 rounded-full ${blur}`}
			style={{
				top: top,
				left: left,
				width: width,
				height: height,
			}}></div>
	);
};

export default Glow;
