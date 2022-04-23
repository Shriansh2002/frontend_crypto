import React from 'react';

import { Footer, Navbar, MarketChart } from '../index';
import { SiEthereum } from 'react-icons/si';

const MarketPage = () => {
	return (
		<div>
			<div className="gradient-bg-welcome">
				<Navbar />
				<h1 className="flex text-center text-3xl sm:text-5xl text-white text-gradient py-1 mt-3 justify-center">
					Eth <SiEthereum /> Market
				</h1>
				<div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
					<MarketChart />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default MarketPage;
