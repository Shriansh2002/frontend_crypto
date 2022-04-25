import React from 'react';
import { Line } from 'react-chartjs-2';
import SelectButton from './SelectButton';
import { chartDays } from '../../utils/chartDays';

const MainChartComponent = ({
	historicData,
	days,
	setDays,
	setFlag,
	currency,
	currentPrice,
}) => {
	return (
		<>
			{currentPrice && (
				<div className="mb-5">
					<p className="text-white text-center text-xl sm:text-3xl">
						Current Price:{' '}
						{currentPrice.inr && (
							<>
								{currentPrice.inr.toLocaleString('en-IN', {
									maximumSignificantDigits: 3,
									style: 'currency',
									currency: 'INR',
								})}
							</>
						)}
						{currentPrice.usd && (
							<>
								{currentPrice.usd.toLocaleString('de-DE', {
									style: 'currency',
									currency: 'USD',
								})}
							</>
						)}
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
						return days === 1 ? time : date.toLocaleDateString();
					}),

					datasets: [
						{
							data: historicData.map((coin) => coin[1]),
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
	);
};

export default MainChartComponent;
