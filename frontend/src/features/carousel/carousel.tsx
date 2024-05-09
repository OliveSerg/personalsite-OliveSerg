import { AnimatePresence } from "framer-motion";
import {
	ReactNode,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
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

	const handleWindowResize = useCallback(() => {
		const resizedWidth = (carousel.current?.offsetWidth ?? 0) / numVisible;
		const width = resizedWidth > minWidth ? resizedWidth : minWidth;

		setItemWidth(width);
	}, [numVisible, minWidth, carousel]);

	useLayoutEffect(handleWindowResize, [handleWindowResize]);

	useEffect(() => {
		window.addEventListener("resize", handleWindowResize);
		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, [handleWindowResize]);

	const handleSlideChange = (newDirection: number) => {
		setPage(page + newDirection);
	};

	if (!slideIds.length) return;
	if (slideIds.length < numVisible) return;

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
							width={itemWidth}
							offset={
								offsetDirection(
									slideIds.length,
									itemIndex,
									slideId
								) * itemWidth
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
