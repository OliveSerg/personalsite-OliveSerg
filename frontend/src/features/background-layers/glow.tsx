type Props = {
	top: string;
	left: string;
	width: string;
	height: string;
};

const Glow = ({ top, left, width, height }: Props) => {
	return (
		<div
			className="absolute bg-gradient-to-r -z-20 from-scarlet-600 to-sunglow-500 rounded-full blur-3xl"
			style={{
				top: top,
				left: left,
				width: width,
				height: height,
			}}></div>
	);
};

export default Glow;
