import React from 'react';

import { Footer, Navbar } from '../index';

const ExchangePage = () => {
	return (
		<div>
			<div className="gradient-bg-welcome">
				<Navbar />
				<h1 className="text-3xl sm:text-5xl text-white text-center text-gradient py-1">
					Exchange coins with <br /> the current Market rate.
				</h1>
			</div>
			<Footer />
		</div>
	);
};

export default ExchangePage;
