import {
	MarketChart,
	Header,
	Asset,
	BuyTokens,
	SelectButton,
} from '../components/index';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

import { getCurrentPrice, getMarketInfo } from '../utils/marketChartAPI';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { chartDays } from '../utils/chartDays';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';

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
		'flex flex-col  h-4/5 bg-[#1E2123] mt-6 rounded-lg overflow-y-scroll noScroll',
	rightMainItem: 'flex items-center text-white p-5 border-b border-[#30363b]',
	ItemTitle: 'flex-1 font-bold',
	moreOptions: 'cursor-pointer text-xl',
};

const MarketPage = () => {
	const [currentPrice, setCurrentPrice] = useState({});
	const [somedata, setSomeData] = useState({});
	const [avaiilableCurr, setAvaiilableCurr] = useState([]);
	const [days, setDays] = useState(1);

	const listOne = ['bitcoin', 'dogecoin', 'litecoin'];
	useEffect(() => {
		const fetchCurrentPrice = async () => {
			const { data } = await axios.get(getCurrentPrice('INR'));
			setCurrentPrice(data.ethereum);
		};

		const fetchDataPrice = async () => {
			const { data } = await axios.get(getMarketInfo('ethereum'));
			setSomeData(data[0]);
		};

		const fetchListData = async (item) => {
			const { data } = await axios.get(getMarketInfo(item));
			setAvaiilableCurr((avaiilableCurr) => [...avaiilableCurr, ...data]);
		};

		fetchCurrentPrice();
		fetchDataPrice();

		listOne.map((item, id) => {
			fetchListData(item);
		});
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
								<span className="bg-gray-100 text-gray-800 text-sm font-medium ml-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
									Rank #{somedata.market_cap_rank}
								</span>
								{somedata.price_change_24h > 0 ? (
									<AiFillCaretUp
										style={{ color: '#00ff1a' }}
									/>
								) : (
									<AiFillCaretDown
										style={{ color: '#ef4b09' }}
									/>
								)}
							</div>
							<div className={styles.portfolioPercent}>
								<>
									{somedata.price_change_24h > 0 && <>+ </>}
									{somedata.price_change_24h?.toLocaleString(
										'en-IN',
										{
											maximumSignificantDigits: 5,
											style: 'currency',
											currency: 'INR',
										}
									)}
								</>
								{'  '}
								<>
									(
									{somedata.price_change_percentage_24h >
										0 && <>+ </>}
									{somedata.price_change_percentage_24h?.toLocaleString(
										'en-IN',
										{
											maximumSignificantDigits: 3,
										}
									)}{' '}
								</>
								%)
								<span className={styles.pastHour}>
									{'  '}Past 1 Day
								</span>
							</div>
						</div>
						<div>
							<div className={styles.chartContainer}>
								<MarketChart days={days} setDays={setDays} />
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-around',
									width: '100%',
								}}
							>
								{chartDays.map((day) => (
									<SelectButton
										key={day.value}
										onClick={() => {
											setDays(day.value);
										}}
										selected={day.value === days}
									>
										{day.label}
									</SelectButton>
								))}
							</div>
						</div>
						<div className={styles.buyingPowerContainer}>
							<div className={styles.buyingPowerTitle}>
								Current Ethereum Price
							</div>
							<div className={styles.buyingPowerAmount}>
								{currentPrice.inr?.toLocaleString('en-IN', {
									maximumSignificantDigits: 6,
									style: 'currency',
									currency: 'INR',
								})}
							</div>
						</div>
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

						{avaiilableCurr.map((ele, index) => (
							<Asset coin={ele} key={ele + index} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default MarketPage;
