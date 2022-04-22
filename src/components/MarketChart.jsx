import React from 'react';

function MarketChart() {
	return (
		<>
			<h2
				id="last-price"
				className="text-center text-white animate__animated"
			>
				$ {latestPrice}
			</h2>
		</>
	);
}

export default MarketChart;
