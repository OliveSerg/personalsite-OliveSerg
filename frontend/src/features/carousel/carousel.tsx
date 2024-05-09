import { AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import Slide from "./slide";

type Props = {
	numVisible: number;
	minWidth: number;
	slideIds: number[];
	renderSlides: (id: number, index: number) => ReactNode;
};

const offsetDirection = (max: number, start: number, end: number) => {
	const diff = end - start;
	const absDiff = Math.abs(diff);
	if (absDiff < max - absDiff) {
		return diff;
	} else {
		if (diff > 0) {
			return diff - max;
		} else {
			return max + diff;
		}
	}
};

const wrap = (min: number, max: number, v: number) => {
	const rangeSize = max - min;
	return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const Carousel = ({ numVisible, minWidth, slideIds, renderSlides }: Props) => {
	const carousel = useRef<HTMLDivElement>(null);
	const [itemWidth, setItemWidth] = useState<number>(0);
	const [page, setPage] = useState<number>(0);
	const itemIndex = wrap(0, slideIds.length, page);

	useLayoutEffect(() => {
		const width = carousel.current?.offsetWidth ?? 0;
		setItemWidth(width / numVisible);
	}, [numVisible]);

	useEffect(() => {
		function handleWindowResize() {
			const width = carousel.current?.offsetWidth ?? 0;
			setItemWidth(width / numVisible);
		}

		window.addEventListener("resize", handleWindowResize);
		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	});

	const handleSlideChange = (newDirection: number) => {
		setPage(page + newDirection);
	};

	if (!slideIds.length) return;
	if (slideIds.length < numVisible) return;
	const width = itemWidth > minWidth ? itemWidth : minWidth;
	return (
		<>
			<AnimatePresence initial={false} custom={page}>
				<div
					ref={carousel}
					className="relative w-full overflow-hidden h-[400px]">
					{slideIds.map((slideId, index) => (
						<Slide
							key={slideId}
							slideId={slideId}
							width={width}
							offset={
								offsetDirection(
									slideIds.length,
									itemIndex,
									slideId
								) * width
							}>
							{renderSlides(slideId, index)}
						</Slide>
					))}
				</div>
			</AnimatePresence>
			<div className="next" onClick={() => handleSlideChange(1)}>
				{"‣"}
			</div>
			<div
				className="prev -scale-100"
				onClick={() => handleSlideChange(-1)}>
				{"‣"}
			</div>
		</>
	);
};

export default Carousel;
