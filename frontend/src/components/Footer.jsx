import Logo from "./Logo";

const Footer = () => {
	return (<section className="footer">
		<div className="content">
			<Logo />
			<div className="links">
				<h3>Informations</h3>
				<a href="#">Mentions légales</a>
				<a href="#">Conditions de vente</a>
				<a href="#">Contact</a>
			</div>
			<div>
				<h3>Suivez nous</h3>
				<p>
					<a href="#">
						<i className="fa-brands fa-instagram"></i>
					</a>
					<a href="#">
						<i className="fa-brands fa-facebook"></i>
					</a>
					<a href="#">
						<i className="fa-brands fa-x"></i>
					</a>
					<a href="#">
						<i className="fa-brands fa-youtube"></i>
					</a>
				</p>
			</div>
		</div>
		<div className="copy">&copy; 2025 - Kazaburger - Tous droits réservés</div>
	</section>);
}

export default Footer