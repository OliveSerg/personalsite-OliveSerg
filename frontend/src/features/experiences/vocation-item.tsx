import { Vocation } from "@features/experiences/types/vocation";

type Props = {
	vocation: Vocation;
	handleClick: (skillIds: number[]) => void;
};

const VocationItem = ({ vocation, handleClick }: Props) => {
	return (
		<div onClick={() => handleClick([vocation.id, ...vocation.skills])}>
			<img src={vocation.logo} alt="" />
			<p>{vocation.company}</p>
		</div>
	);
};

export default VocationItem;
