import { ReactNode, useState, Children, isValidElement } from "react";

type Props = {
	children: ReactNode;
	containerClassName?: string;
	headerClassName?: string;
	contentClassName?: string;
};

const Tabs = ({
	children,
	containerClassName = "",
	headerClassName = "",
	contentClassName = "",
}: Props) => {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabClick = (index: number) => {
		setActiveTab(index);
	};

	const renderTabs = () => {
		return Children.map(children, (child, index) => {
			if (isValidElement(child)) {
				return (
					<div
						className={`p-2 cursor-pointer ${
							activeTab === index ? "bg-white" : ""
						}`}
						onClick={() => handleTabClick(index)}>
						{child.props.label}
					</div>
				);
			}
			return null;
		});
	};

	const renderTabContent = () => {
		const activeChild = Children.toArray(children)[activeTab];
		return activeChild || null;
	};

	return (
		<div className={containerClassName}>
			<div className={headerClassName}>{renderTabs()}</div>
			<div className={contentClassName}>{renderTabContent()}</div>
		</div>
	);
};

export default Tabs;
