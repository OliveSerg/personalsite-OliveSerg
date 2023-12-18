type Props = {
	top: string;
	left: string;
	width: string;
	height: string;
	color?: string;
};

const Glow = ({
	top,
	left,
	width,
	height,
	color = "from-scarlet-600 to-sunglow-500",
}: Props) => {
	return (
		<div
			className={`absolute bg-gradient-radial ${color} -z-20 rounded-full blur-3xl`}
			style={{
				top: top,
				left: left,
				width: width,
				height: height,
			}}></div>
	);
};

export default Glow;
