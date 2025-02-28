import Testimony from "../Testimonies/Testimony";
import { shuffleArray } from "../../../services/shuffleArray";
import useFetch from "../../../services/useFetch";

const Testimonies = () => {
	const { data, loading, error } = useFetch("http://kazaburger.e-mingo.net/api/testimony");
	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	var dataShuffled = shuffleArray(data);
	return (
		<section className="testimony">
			<h2>Nos clients témoignent</h2>
			<div className="content">
				{dataShuffled.map((item, i) => {
					if (i < 4) {
						return <Testimony image={"https://i.pravatar.cc/300?u=" + item._id} name={item.name} rating={item.rating} review={item.review} key={i} />
					}
				})}
			</div>
		</section>
	);
}

export default Testimonies