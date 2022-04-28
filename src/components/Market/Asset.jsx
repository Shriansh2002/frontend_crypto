import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../../utils/marketChartAPI';
import axios from 'axios';

const styles = {
	wrapper: 'flex justify-between p-5  hover:bg-[#30363B] duration-300',
	container: 'flex flex-col text-white items-center justify-center',
	name: 'font-bold',
	chart: 'w-36 h-full',
	price: 'flex flex-col text-white',
	percent: 'text-green-400',
};

const Asset = ({ coin, price }) => {
	const [historicData, sethistoricData] = useState();
	const [flag, setFlag] = useState(false);
	const days = 1;

	const fetchHistoricData = async () => {
		const { data } = await axios.get(HistoricalChart(days, 'INR'));
		setFlag(true);
		sethistoricData(data.prices);
	};

	const setGraphColor = () => {
		if (coin.change < 0) {
			return '#ef4b09';
		} else {
			return '#00ff1a';
		}
	};
	useEffect(() => {
		fetchHistoricData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const data = {
		labels: [
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
			'.',
		],

		datasets: [
			{
				fill: false,
				lineTension: 0.01,
				backgroundColor: setGraphColor(),
				borderColor: setGraphColor(),
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: setGraphColor(),
				pointBackgroundColor: setGraphColor(),
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: setGraphColor(),
				pointHoverBorderColor: setGraphColor(),
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: historicData?.map((coin) => coin[1]),
				label: `INR`,
			},
		],
	};
	const options = {
		plugins: {
			legend: {
				display: false,
			},
			callbacks: {
				label: function (tooltipItem) {
					return tooltipItem.yLabel;
				},
			},
		},
		elements: {
			point: {
				radius: 1,
			},
		},
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.name}>{coin.symbol}</div>
			</div>
			<div>
				<div className={styles.chart}>
					<Line
						data={data}
						options={options}
						width={400}
						height={150}
					/>
				</div>
			</div>

			<div className={styles.price}>
				<div>
					{price.toLocaleString('en-IN', {
						maximumSignificantDigits: 3,
						style: 'currency',
						currency: 'INR',
					})}
				</div>
				<div
					className={styles.percent}
					style={{ color: coin.change < 0 ? '#ef4b09' : 'green' }}
				>
					{coin.change}%
				</div>
			</div>
		</div>
	);
};

export default Asset;