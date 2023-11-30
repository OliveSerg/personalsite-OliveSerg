type Props = {
	skew: string;
	offset: string;
	color: string;
};

const DiagonalLine = ({ skew, offset, color }: Props) => {
	return (
		<div
			className={`absolute bg-gradient-to-r ${color} h-1 w-full opacity-25 ${skew} ${offset} -z-10`}></div>
	);
};

export default DiagonalLine;
