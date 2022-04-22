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

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const SelectButton = ({ children, selected, onClick }) => {
	return (
		<>
			<span
				onClick={onClick}
				style={{
					border: '1px solid gold',
					borderRadius: 5,
					padding: 10,
					paddingLeft: 20,
					paddingRight: 20,
					fontFamily: 'Montserrat',
					textAlign: 'center',
					cursor: 'pointer',
					backgroundColor: selected ? 'gold' : '',
					color: selected ? 'black' : 'white',
					fontWeight: selected ? 700 : 500,
					width: '22%',
					'&:hover': {
						backgroundColor: 'gold',
						color: 'black',
					},
				}}
			>
				{children}
			</span>
		</>
	);
};

function MarketChart() {
	const [historicData, sethistoricData] = useState();
	const [days, setDays] = useState(1);
	const [flag, setFlag] = useState(false);
	const currency = 'INR';

	const chartDays = [
		{
			label: '24 Hours',
			value: 1,
		},
		{
			label: '30 Days',
			value: 30,
		},
		{
			label: '3 Months',
			value: 90,
		},
		{
			label: '1 Year',
			value: 365,
		},
	];

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
			<div className="container">
				{!historicData | (flag === false) ? (
					<>loading...</>
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
