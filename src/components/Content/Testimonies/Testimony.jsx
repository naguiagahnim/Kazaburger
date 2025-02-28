import Rating from "./Rating";

const Testimony = (props) => {
	return (
		<div>
			<img src={props.image} />
			<h3>{props.name}</h3>
			<Rating rating={props.rating} />
			<div>{props.review}</div>
		</div>
	);
}

export default Testimony