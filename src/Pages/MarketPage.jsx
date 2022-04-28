import { MarketChart } from '../components/index';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import Header from '../components/Market/Header';
import Asset from '../components/Market/Asset';
import Notice from '../components/Market/Notice';
import BuyTokens from '../components/Market/BuyTokens';

import { getCurrentPrice, getMarketInfo } from '../utils/marketChartAPI';
import axios from 'axios';
import { useState, useEffect } from 'react';

const styles = {
	wrapper: 'w-screen flex flex-col bg-black',
	mainContainer: 'w-2/3 h-full m-auto flex mt-16',
	leftMain: 'flex flex-col w-3/4 h-full  p-6 overflow-y-scroll',
	portfolioAmountContainer: 'flex flex-col ',
	portfolioAmount: 'text-white text-4xl',
	portfolioPercent: 'text-white font-bold text-sm',
	pastHour: 'text-gray-400',
	chartContainer:
		'text-5xl flex justify-center w-full h-1/3 text-white mt-11 mb-11',
	buyingPowerContainer:
		'w-full border-t mb-15 border-b h-16 border-[#30363b] flex justify-between items-center p-4',
	buyingPowerTitle: 'text-white font-bolder text-lg',
	buyingPowerAmount: 'text-white font-bolder text-xl',
	notice: 'flex border border-[#30363b] mx-11 my-4 p-5 flex-col flex-1',
	noticeContainer: 'flex-1',
	noticeTitle: 'text-gray-500',
	noticeMessage: 'text-white font-bold',
	noticeCTA: 'font-bold text-green-500 cursor-pointer mt-5',
	rightMain:
		'flex flex-col flex-1 h-4/5 bg-[#1E2123] mt-6 rounded-lg overflow-y-scroll noScroll',
	rightMainItem: 'flex items-center text-white p-5 border-b border-[#30363b]',
	ItemTitle: 'flex-1 font-bold',
	moreOptions: 'cursor-pointer text-xl',
};

const MarketPage = () => {
	const [currentPrice, setCurrentPrice] = useState({});
	const [somedata, setSomeData] = useState({});
	let temp_data;

	const fetchCurrentPrice = async () => {
		const { data } = await axios.get(getCurrentPrice('INR'));
		setCurrentPrice(data.ethereum);
	};
	console.log(temp_data);

	const fetchDataPrice = async () => {
		const { data } = await axios.get(getMarketInfo());
		setSomeData(data[0]);
	};

	// console.log(somedata);

	useEffect(() => {
		fetchCurrentPrice();
		fetchDataPrice();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className={styles.wrapper}>
				<Header />
				<div className={styles.mainContainer}>
					<div className={styles.leftMain}>
						<div className={styles.portfolioAmountContainer}>
							<div className={styles.portfolioAmount}>
								ETHEREUM
							</div>
							<div className={styles.portfolioPercent}>
								+{' '}
								{somedata.price_change_24h?.toLocaleString(
									'en-IN',
									{
										maximumSignificantDigits: 3,
										style: 'currency',
										currency: 'INR',
									}
								)}{' '}
								( +{somedata.price_change_percentage_24h} %)
								<span className={styles.pastHour}>
									{' '}
									Past Day
								</span>
							</div>
						</div>
						<div>
							<div className={styles.chartContainer}>
								<MarketChart />
							</div>
						</div>
						<div className={styles.buyingPowerContainer}>
							<div className={styles.buyingPowerTitle}>
								Current Ethereum Price
							</div>
							<div className={styles.buyingPowerAmount}>
								{currentPrice.inr?.toLocaleString('en-IN', {
									maximumSignificantDigits: 3,
									style: 'currency',
									currency: 'INR',
								})}
							</div>
						</div>
						<div className={styles.notice}>
							<div className={styles.noticeContainer}>
								<div className={styles.noticeTitle}>
									Compare Funds
								</div>
								<div className={styles.noticeMessage}>
									Compare your funds here.
								</div>
								<BuyTokens />
							</div>
						</div>
						<Notice />
					</div>
					<div className={styles.rightMain}>
						<div className={styles.rightMainItem}>
							<div className={styles.ItemTitle}>
								Crypto Currencies
							</div>

							<BiDotsHorizontalRounded
								className={styles.moreOptions}
							/>
						</div>

						{['1', '2', '3'].map((ele, index) => (
							<Asset
								coin={'ETH'}
								price={227000}
								key={ele + index}
							/>
						))}

						<div className={styles.rightMainItem}>
							<div className={styles.ItemTitle}>Lists</div>
							<AiOutlinePlus className={styles.moreOptions} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MarketPage;
