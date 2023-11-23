import { Vocation } from "@features/experiences/types/vocation";
import { MouseEventHandler } from "react";

type Props = {
	vocation: Vocation;
	onClick?: MouseEventHandler;
};

const VocationItem = ({ vocation, onClick }: Props) => {
	return (
		<div>
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
