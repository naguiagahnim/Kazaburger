const SuggestsItem = (props) => {
	return (
		<div>
			<img className="" src={props.image} alt={props.imageAlt} />
			<h3>{props.title}</h3>
			<p>{props.description}</p>
			<span className="price h-3/3">{props.price}</span>
		</div>
	);
}

export default SuggestsItem
