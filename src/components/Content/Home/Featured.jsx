import { useEffect, useRef, useState } from "react";

import useFetch from "../../../services/useFetch";

const Featured = () => {
	var [currentIndex, setCurrentIndex] = useState(0);
	var [isPlaying, setIsPlaying] = useState(true);
	var [background, setBackground] = useState("");
	const { data, loading, error } = useFetch("http://kazaburger.e-mingo.net/api/featured");
	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	useEffect(() => {
		setBackground(data[currentIndex].product.pictures[0]);
	}, [])

	var indexMax = data.length - 1;

	function slideOver() {
		if (!isPlaying) {
			setIsPlaying(true);
		}
	}

	function slideOut() {
		if (isPlaying) {
			setIsPlaying(false);
		}
	}

	function nextSlide() {
		if (currentIndex < indexMax) {
			setCurrentIndex(currentIndex + 1);
		} else if (currentIndex == indexMax) {
			setCurrentIndex(0)
		}
		setBackground(data[currentIndex].product.pictures[0])
	}

	function previousSlide() {
		if (currentIndex != 0) {
			setCurrentIndex(currentIndex - 1);
		} else if (currentIndex == 0) {
			setCurrentIndex(indexMax)
		}
		setBackground(data[currentIndex].product.pictures[0])
	}

	

	return (
		<section className="slide object-contain" onMouseEnter={slideOver} onMouseLeave={slideOut} style={{ backgroundImage: "url(" + background + ")" }}>
			<h1 className="text-white">{data[currentIndex].product.title}</h1>
			<p className="price">{data[currentIndex].product.price}</p>
			<p>
				<a href="#" className="btn-lg">
					Commander
				</a>
			</p>
			<button className="absolute left-0 cursor-pointer top-1/2 transform -translate-y-1/2 text-
white/20 hover:text-secondary/50 text-7xl mx-10" onClick={previousSlide}>&lt;</button>
			<button className="absolute right-0 cursor-pointer top-1/2 transform -translate-y-1/2 text-
white/20 hover:text-secondary/50 text-7xl mx-10" onClick={nextSlide}>&gt;</button>
		</section>
	);
}

export default Featured