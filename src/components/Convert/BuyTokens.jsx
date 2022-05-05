import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentPrice } from '../../utils/marketChartAPI';

const styles = {
	inputAmount: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
	formContainer: `flex items-center`,
	select: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
	options: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-black mt-6 text-white placeholder:text-white`,
	noticeCTA:
		'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5',
};

const BuyTokens = ({ avaiilableCurr, currentEthPrice }) => {
	const [amount, setAmount] = useState();
	const [currencyPrice, setCurrencyPrice] = useState('');
	const [toCoin, setToCoin] = useState('bitcoin');
	const [currencySelected, setCurrencySelected] = useState('BTC');

	//
	const fetchListData = async () => {
		const { data } = await axios.get(getCurrentPrice('INR', toCoin));

		if (data?.bitcoin?.inr) {
			setCurrencyPrice(data?.bitcoin.inr);
			setCurrencySelected('BTC');
		}
		if (data?.dogecoin?.inr) {
			setCurrencyPrice(data?.dogecoin.inr);
			setCurrencySelected('DOGE');
		}
		if (data?.litecoin?.inr) {
			setCurrencyPrice(data?.litecoin.inr);
			setCurrencySelected('LTC');
		}

		setAmount(currentEthPrice / currencyPrice);
	};

	useEffect(() => {
		fetchListData();
	}, [toCoin]);

	return (
		<form className={styles.formContainer}>
			<div className="flex h-full w-full flex-col items-center">
				<select className={styles.select}>
					<option className={styles.options} value="ETH">
						ETH
					</option>
				</select>
				<select
					className={styles.select}
					defaultValue="bitcoin"
					onChange={(e) => {
						setToCoin(e.target.value);
					}}
				>
					{avaiilableCurr.map((ele, index) => (
						<option
							className={styles.options}
							value={ele.id}
							key={ele + index}
						>
							{ele.id.toUpperCase()}
						</option>
					))}
				</select>

				<button
					className={styles.noticeCTA}
					type="button"
					onClick={fetchListData}
				>
					Compare
				</button>

				<input
					className={styles.inputAmount}
					type="text"
					disabled
					value={
						amount
							? `${amount.toLocaleString('en-IN')}`
							: `Amount ...`
					}
					onChange={(e) => {}}
				/>
			</div>
		</form>
	);
};

export default BuyTokens;
