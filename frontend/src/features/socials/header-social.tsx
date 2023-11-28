type Props = {
	icon: JSX.Element;
	text: string;
	link?: string;
};

const HeaderSocial = ({ icon, text, link }: Props) => {
	const textClasses =
		"duration-700 transition-all opacity-0 group-hover:opacity-100 xl:text-base font-bold";
	return (
		<div className="group flex gap-2 items-center cursor-pointer duration-700 overflow-hidden transition-all max-w-[2.25rem] hover:max-w-[15rem]">
			<span className="text-2xl xl:text-4xl text-scarlet-700">
				{icon}
			</span>
			{link ? (
				<a
					className={textClasses}
					href={link}
					target="_blank"
					rel="noopener noreferrer">
					{text}
				</a>
			) : (
				<span className={textClasses}>{text}</span>
			)}
		</div>
	);
};

export default HeaderSocial;
