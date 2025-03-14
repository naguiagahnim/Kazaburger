import Rating from "./Rating";

const Testimony = (props) => (
	<div className="testimony">
		<div className="avatar">
			<img 
				src={props.image}
				alt={props.name}
			/>
		</div>
		<h3>{props.name}</h3>
		<Rating rating={props.rating} />
		<div>{props.review}</div>
	</div>
);

export default Testimony