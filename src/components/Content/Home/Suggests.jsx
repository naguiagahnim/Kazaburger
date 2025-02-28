import SuggestsItem from "../Suggests/SuggestsItem";
import useFetch from "../../../services/useFetch";
import { shuffleArray } from "../../../services/shuffleArray";



const Suggests = () => {
	const { data, loading, error } = useFetch("http://kazaburger.e-mingo.net/api/suggest");
	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	var dataShuffled = shuffleArray(data);
	return (
		<section className="suggests">
			<h2>Nos suggestions</h2>
			<div className="content">
				{dataShuffled.map((item, i) => {
					if (i < 3) {
						return <SuggestsItem image={item.product.pictures == undefined ? "/src/assets/images/notAvaible.png" : item.product.pictures[0]} title={item.product.title} description={item.description} price={item.product.price} key={i} />
					}
				})}
			</div>
		</section>
	);
}

export default Suggests