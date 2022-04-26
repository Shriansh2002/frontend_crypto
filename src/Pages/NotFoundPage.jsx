const NotFoundPage = () => {
	const sectionStyle = {
		padding: '40px 0',
		background: '#fff',
		fontFamily: 'Arvo, serif',
	};

	const Imagesection = {
		backgroundImage:
			'url(https://cdn.dribbble.com/users/1138587/screenshots/3533772/media/0a1bbe82fdae32ba8401531908e74874.gif)',
		height: '400px',
		backgroundPosition: 'center',
	};
	const anchorTag = {
		color: '#fff',
		padding: '10px 20px',
		background: '#0f0e13',
		margin: '20px 0',
		display: 'inline-block',
	};

	return (
		<section
			className="flex w-full justify-center items-center"
			style={sectionStyle}
		>
			<div className="container">
				<div className="row">
					<div className="col-sm-12 ">
						<div className="col-sm-10 col-sm-offset-1  text-center">
							<div style={Imagesection}>
								<h1 style={{ fontSize: '80px' }}>404</h1>
							</div>

							<div style={{ marginTop: '-50px' }}>
								<h3 style={{ fontSize: '80px' }}>
									Look like you're lost
								</h3>

								<p>the page you are looking for not avaible!</p>

								<a href="/" style={anchorTag}>
									Go to Home
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFoundPage;
