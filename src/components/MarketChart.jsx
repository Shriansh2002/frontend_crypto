import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { HistoricalChart, getCurrentPrice } from '../utils/marketChartAPI';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import SelectButton from './SelectButton';
import { chartDays } from '../utils/chartDays';
import Loader from './Loader';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

function MarketChart() {
	const [historicData, sethistoricData] = useState();
	const [currentPrice, setCurrentPrice] = useState({});
	const [days, setDays] = useState(1);
	const [flag, setFlag] = useState(false);
	const [currency, setCurrency] = useState('INR');

	const fetchHistoricData = async () => {
		const { data } = await axios.get(HistoricalChart(days, currency));
		setFlag(true);
		sethistoricData(data.prices);
	};
	const fetchCurrentPrice = async () => {
		const { data } = await axios.get(getCurrentPrice(currency));
		setCurrentPrice(data.ethereum);
		console.log(data.ethereum);
	};

	useEffect(() => {
		fetchHistoricData();
		fetchCurrentPrice();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [days, currency]);

	return (
		<>
			<div className="container mx-auto">
				{!historicData | (flag === false) ? (
					<div className="text-white text-center">
						<Loader />
						Loading...
					</div>
				) : (
					<>
						{currentPrice && (
							<div className="mb-5">
								<p className="text-white text-center text-xl sm:text-3xl">
									Current Price:{' '}
									{currentPrice.inr && (
										<>{currentPrice.inr.toLocaleString()}</>
									)}
									{currentPrice.usd && (
										<>{currentPrice.usd.toLocaleString()}</>
									)}
									{'  '}
									{currency}
								</p>
								<p className="text-gray-400 text-center text-sm">
									Updated at:&nbsp;
									{Date(currentPrice.last_updated_at)
										.toLocaleString()
										.slice(3, 24)}
								</p>
							</div>
						)}
						<Line
							data={{
								labels: historicData.map((coin) => {
									let date = new Date(coin[0]);
									let time =
										date.getHours() > 12
											? `${
													date.getHours() - 12
											  }:${date.getMinutes()} PM`
											: `${date.getHours()}:${date.getMinutes()} AM`;
									return days === 1
										? time
										: date.toLocaleDateString();
								}),

								datasets: [
									{
										data: historicData.map(
											(coin) => coin[1]
										),
										label: `Price ( Past ${days} Days ) in ${currency}`,
										borderColor: '#EEBC1D',
									},
								],
							}}
							options={{
								elements: {
									point: {
										radius: 1,
									},
								},
							}}
						/>
						<div
							style={{
								display: 'flex',
								marginTop: 20,
								justifyContent: 'space-around',
								width: '100%',
							}}
						>
							{chartDays.map((day) => (
								<SelectButton
									key={day.value}
									onClick={() => {
										setDays(day.value);
										setFlag(false);
									}}
									selected={day.value === days}
								>
									{day.label}
								</SelectButton>
							))}
						</div>
						<div className="flex justify-center">
							<b className="text-white mr-4 text-center text-2xl">
								Set Currency:{' '}
							</b>
							<select
								value={currency}
								onChange={(e) => {
									setCurrency(e.target.value);
								}}
								className="
								form-select
								block
								px-3
								py-1.5
								text-base
								text-gray-700"
							>
								<option value="INR">INR</option>
								<option value="USD">USD</option>
							</select>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default MarketChart;
