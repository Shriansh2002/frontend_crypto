import axios from 'axios';
import { useState, useEffect } from 'react';
import { HistoricalChart, getMarketInfo } from '../../utils/marketChartAPI';
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
import { Loader, SetCurrency, MainChartComponent } from '../';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

function MarketChart({ days, setDays }) {
	const [historicData, sethistoricData] = useState();
	const [someDaysData, setSomeDaysData] = useState();
	const [flag, setFlag] = useState(false);
	const currency = 'INR';

	const fetchHistoricData = async () => {
		const { data } = await axios.get(HistoricalChart(days, currency));
		setFlag(true);
		sethistoricData(data.prices);
	};

	const fetchDataPrice = async () => {
		const { data } = await axios.get(getMarketInfo('ethereum'));
		setSomeDaysData(data[0]);
	};
	useEffect(() => {
		fetchHistoricData();
		fetchDataPrice();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [days, currency]);

	return (
		<>
			{!historicData | (flag === false) ? (
				<div className="text-white text-center">
					<Loader />
					Loading...
				</div>
			) : (
				<>
					<MainChartComponent
						historicData={historicData}
						days={days}
						setDays={setDays}
						someDaysData={someDaysData}
						setFlag={setFlag}
						currency={currency}
					/>
				</>
			)}
		</>
	);
}

export default MarketChart;
