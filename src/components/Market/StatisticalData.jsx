import { useEffect, useState } from 'react';
import axios from 'axios';
import { getMarketInfo } from '../../utils/marketChartAPI';

const StatisticalData = () => {
	const [somedata, setSomeData] = useState({});

	useEffect(() => {
		const fetchOneDayPrice = async () => {
			const { data } = await axios.get(getMarketInfo('ethereum'));
			setSomeData(data[0]);
		};

		fetchOneDayPrice();
	}, []);

	const setColor = (pricePer) => {
		if (pricePer < 0) {
			return '#ef4b09';
		} else {
			return '#00ff1a';
		}
	};

	return (
		<>
			<div className="flex flex-col text-white items-start px-3 mb-4 justify-center font-bold">
				{['1 Day', '1 Month', '1 Year'].map((item, id) => (
					<div className="flex flex-row mt-6" key={item + id}>
						<div>
							Change {item}: {'  '} &nbsp;
						</div>
						{item == '1 Day' && (
							<div
								style={{
									color: setColor(
										somedata.price_change_percentage_24h_in_currency
									),
								}}
							>
								{somedata.price_change_percentage_24h_in_currency >
									0 && <>+</>}
								{somedata.price_change_percentage_24h_in_currency?.toLocaleString(
									'en-IN'
								)}{' '}
								%
							</div>
						)}
						{item == '1 Month' && (
							<div
								style={{
									color: setColor(
										somedata.price_change_percentage_30d_in_currency
									),
								}}
							>
								{somedata.price_change_percentage_30d_in_currency >
									0 && <>+</>}
								{somedata.price_change_percentage_30d_in_currency?.toLocaleString(
									'en-IN'
								)}{' '}
								%
							</div>
						)}
						{item == '1 Year' && (
							<div
								style={{
									color: setColor(
										somedata.price_change_percentage_1y_in_currency
									),
								}}
							>
								{somedata.price_change_percentage_1y_in_currency >
									0 && <>+</>}
								{somedata.price_change_percentage_1y_in_currency?.toLocaleString(
									'en-IN'
								)}{' '}
								%
							</div>
						)}
					</div>
				))}
			</div>
		</>
	);
};

export default StatisticalData;
