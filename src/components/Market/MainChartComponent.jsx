import { Line } from 'react-chartjs-2';

const MainChartComponent = ({ historicData, days, currency, someDaysData }) => {
	const setGraphColor = () => {
		const redColor = '#ef4b09';
		const greenColor = '#00ff1a';

		if (days == 1) {
			if (someDaysData.price_change_percentage_24h_in_currency > 0)
				return greenColor;
			else return redColor;
		} else if (days == 7) {
			if (someDaysData.price_change_percentage_7d_in_currency > 0)
				return greenColor;
			else return redColor;
		} else if (days == 30) {
			if (someDaysData.price_change_percentage_30d_in_currency > 0)
				return greenColor;
			else return redColor;
		} else if (days == 365) {
			if (someDaysData.price_change_percentage_1y_in_currency > 0)
				return greenColor;
			else return redColor;
		}
	};

	console.log(someDaysData);
	const data = {
		labels: historicData.map((coin) => {
			let date = new Date(coin[0]);
			let time =
				date.getHours() > 12
					? `${date.getHours() - 12}:${date.getMinutes()} PM`
					: `${date.getHours()}:${date.getMinutes()} AM`;
			return days === 1 ? time : date.toLocaleDateString();
		}),

		datasets: [
			{
				data: historicData.map((coin) => coin[1]),
				label: `Ethereum Price ( Past ${days} Days ) in ${currency}`,
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
			},
		],
	};

	const options = {
		elements: {
			point: {
				radius: 1,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};
	return (
		<>
			<Line data={data} options={options} width={400} height={150} />
		</>
	);
};

export default MainChartComponent;
