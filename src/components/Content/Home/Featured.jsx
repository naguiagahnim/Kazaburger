import { useEffect, useState, useCallback } from "react";
import useFetch from "../../../services/useFetch";

const Featured = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const [background, setBackground] = useState("");
	const { data, loading, error } = useFetch("http://kazaburger.e-mingo.net/api/featured");

	useEffect(() => {
		let intervalId;
		if (isPlaying && data?.length) {
			intervalId = setInterval(() => {
				setCurrentIndex(prev => (prev < data.length - 1 ? prev + 1 : 0));
			}, 5000);
		}
		return () => clearInterval(intervalId);
	}, [isPlaying, data]);

	useEffect(() => {
		if (data?.length) {
			setBackground(data[currentIndex].product.pictures[0]);
		}
	}, [currentIndex, data]);

	const indexMax = data?.length ? data.length - 1 : 0;

	const nextSlide = () => {
		setCurrentIndex(prev => (prev < indexMax ? prev + 1 : 0));
	};

	const previousSlide = () => {
		setCurrentIndex(prev => (prev > 0 ? prev - 1 : indexMax));
	};

	// Toggle play/pause on hover
	const slideOver = () => setIsPlaying(false);
	const slideOut = () => setIsPlaying(true);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<section 
			className="slide"
			onMouseEnter={slideOver}
			onMouseLeave={slideOut}
			style={{ backgroundImage: `url(${background})` }}
		>
			<h1 className="text-white">{data[currentIndex].product.title}</h1>
			<p className="price">{data[currentIndex].product.price}</p>
			<p>
				<a href="#" className="btn-lg">
					Commander
				</a>
			</p>
			<button 
				className="button-left" 
				onClick={previousSlide}
			>
				&lt;
			</button>
			<button 
				className="button-right" 
				onClick={nextSlide}
			>
				&gt;
			</button>
		</section>
	);
}

export default Featured;