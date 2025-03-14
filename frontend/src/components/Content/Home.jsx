import Featured from "./Home/Featured";
import Suggests from "./Home/Suggests";
import Newsletter from "./Home/Newsletter";
import Testimonies from "./Home/Testimonies";

const Home = () => {
	return (
		<section className="content">
			<Featured />
			<Suggests />
			<Newsletter />
			<Testimonies />
		</section>);
}

export default Home