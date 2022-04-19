import React from 'react';

import { Footer, Navbar, MarketChart } from '../index';

const MarketPage = () => {
	const fetchData = async () => {
		let data = { index: [], price: [], volumes: [] };
		let result = await callAPI(
			'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1&interval=1m'
		);
		for (const item of result.prices) {
			data.index.push(item[0]);
			data.price.push(item[1]);
		}
		for (const item of result.total_volumes) data.volumes.push(item[1]);
		return data;
	};

	return (
		<div>
			<div className="gradient-bg-welcome">
				<Navbar />
				<h1 className=" text-center text-3xl sm:text-5xl text-white text-gradient py-1 mt-3">
					Eth Market
				</h1>
				<MarketChart className="my-3" />
			</div>
			<Footer />
		</div>
	);
};

export default MarketPage;
