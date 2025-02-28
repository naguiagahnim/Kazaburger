const Rating = (props) => {
	var test = [];
	for (var i = 0; i < 5; i++) {
		test.push(<i key={i} className={"fa-solid fa-star " + (i > props.rating ? "" : "text-secondary")}></i>);
	}
	return (
		<span>			
			{test}
		</span>
	);
}

export default Rating