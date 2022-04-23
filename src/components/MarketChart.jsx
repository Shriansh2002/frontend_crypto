import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../utils/marketChartAPI';
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
	const [days, setDays] = useState(1);
	const [flag, setFlag] = useState(false);
	const currency = 'INR';

	const fetchHistoricData = async () => {
		const { data } = await axios.get(HistoricalChart(days, currency));
		setFlag(true);
		sethistoricData(data.prices);
	};

	useEffect(() => {
		fetchHistoricData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [days]);

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
					</>
				)}
			</div>
		</>
	);
}

export default MarketChart;
