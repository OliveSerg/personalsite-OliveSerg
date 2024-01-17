import { ReactNode } from "react";

type Props = {
	label: string;
	children: ReactNode;
};

const Tab = ({ children }: Props) => {
	return <>{children}</>;
};

export default Tab;
