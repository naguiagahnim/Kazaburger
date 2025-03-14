const Newsletter = () => {
	return (
		<section className="newsletter">
			<h2>Inscrivez-vous à la KazaLetter</h2>
			<div className="content">
				<form>
					<input type="text" placeholder="Nom" />
					<input type="email" placeholder="Email" />
					<button className="btn-md">S'inscrire</button>
				</form>
			</div>
		</section>
	);
}

export default Newsletter