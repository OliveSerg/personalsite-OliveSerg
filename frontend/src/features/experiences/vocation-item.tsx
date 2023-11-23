import { Vocation } from "@features/experiences/types/vocation";
import { MouseEventHandler } from "react";

type Props = {
	vocation: Vocation;
	handleClick: (vocaitonID: number) => void;
};

const VocationItem = ({ vocation, handleClick }: Props) => {
	return (
		<div onClick={() => handleClick(vocation.id)}>
			<img src={vocation.logo} alt="" />
			<p>{vocation.company}</p>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
		</div>
	);
};

export default VocationItem;
