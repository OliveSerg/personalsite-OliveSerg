import { AnimatePresence } from "framer-motion";
import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import Slide from "./slide";

type Props = {
	numVisible: number;
	slideIds: number[];
	renderSlides: (id: number, index: number) => ReactNode;
};

const wrap = (min: number, max: number, v: number) => {
	const rangeSize = max - min;
	return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const Carousel = ({ numVisible, slideIds, renderSlides }: Props) => {
	const carousel = useRef<HTMLDivElement>(null);
	const [itemWidth, setItemWidth] = useState<number>(0);
	const [[page, direction], setPage] = useState<number[]>([
		slideIds.length / 2,
		0,
	]);

	const itemIndex = wrap(0, slideIds.length, page);

	useLayoutEffect(() => {
		const width = carousel.current?.offsetWidth ?? 0;
		setItemWidth(width / numVisible);
	}, [numVisible]);

	const handleSlideChange = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};

	if (!slideIds.length) return;
	console.log(itemWidth);

	return (
		<>
			<AnimatePresence initial={false} custom={direction}>
				<div
					ref={carousel}
					className="relative w-full overflow-hidden h-[400px]">
					{slideIds.map((slideId, index) => (
						<Slide
							key={slideId}
							slideId={slideId}
							direction={direction}
							width={itemWidth}
							offset={(slideId - itemIndex) * itemWidth}>
							{renderSlides(slideId, index)}
						</Slide>
					))}
				</div>
			</AnimatePresence>
			<div className="next" onClick={() => handleSlideChange(1)}>
				{"‣"}
			</div>
			<div className="prev" onClick={() => handleSlideChange(-1)}>
				{"‣"}
			</div>
		</>
	);
};

export default Carousel;
