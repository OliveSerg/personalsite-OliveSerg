import { ReactNode, useState, Children, isValidElement } from "react";
import { motion } from "framer-motion";

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
						className={`cursor-pointer relative p-2 transition ${
							activeTab === index ? "" : "hover:text-white/60"
						}`}
						onClick={() => handleTabClick(index)}>
						{child.props.label}
						{activeTab === index && (
							<motion.span
								layoutId="bubble"
								className="absolute inset-0 z-10 bg-white mix-blend-difference rounded-t"
								transition={{
									type: "spring",
									bounce: 0.2,
									duration: 0.6,
								}}
							/>
						)}
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
