const SuggestsItem = ({ image, title, description, price }) => (
	<div className="suggests">
		<div className="">
			<img 
				src={image} 
				alt={title}
			/>
		</div>
		<div>
			<h3>{title}</h3>
			<p>{description}</p>
			<div className="price">{price}</div>
		</div>
	</div>
);

export default SuggestsItem
