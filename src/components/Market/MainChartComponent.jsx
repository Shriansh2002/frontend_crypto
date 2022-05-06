import { Line } from 'react-chartjs-2';

const MainChartComponent = ({ historicData, days, currency }) => {
	return (
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
							return days === 1 ? time : date.toLocaleDateString();
					}),

					datasets: [
						{
							data: historicData.map((coin) => coin[1]),
							label: `Price ( Past ${days} Days ) in ${currency}`,
							fill: false,
							lineTension: 0.01,
							backgroundColor: '#00ff1a',
							borderColor: '#00ff1a',
							borderCapStyle: 'butt',
							borderDash: [],
							borderDashOffset: 0.0,
							borderJoinStyle: 'miter',
							pointBorderColor: '#00ff1a',
							pointBackgroundColor: '#00ff1a',
							pointBorderWidth: 1,
							pointHoverRadius: 5,
							pointHoverBackgroundColor: '#00ff1a',
							pointHoverBorderColor: '#00ff1a',
							pointHoverBorderWidth: 2,
							pointRadius: 1,
							pointHitRadius: 10,
						},
					],
				}}
				options={{
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
				}}
				width={400}
				height={150}
			/>
		</>
	);
};

export default MainChartComponent;
