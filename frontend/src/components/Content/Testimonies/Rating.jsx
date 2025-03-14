const Rating = (props) => (
	<div className="flex gap-x-1 text-lg">
		{[...Array(5)].map((_, i) => (
			<i 
				key={i}
				className={`fa-solid fa-star ${i < props.rating ? 'text-secondary' : 'text-gray-300'}`}
			/>
		))}
	</div>
);
export default Rating