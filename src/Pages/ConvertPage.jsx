import { getCurrentPrice, getMarketInfo } from '../utils/marketChartAPI';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BuyTokens, Navbar } from '../components/index';

const styles = {
	wrapper: 'w-screen flex flex-col bg-black',
	mainContainer: 'w-2/3 h-full m-auto  mt-16',
	notice: 'flex border border-[#30363b] mx-11 my-4 p-5 flex-col flex-1',
	noticeContainer: 'flex-1',
	noticeTitle: 'text-gray-500',
	noticeMessage: 'text-white font-bold',
	noticeCTA: 'font-bold text-green-500 cursor-pointer mt-5',
};

const ConvertPage = () => {
	const [currentPrice, setCurrentPrice] = useState({});
	const [avaiilableCurr, setAvaiilableCurr] = useState([]);

	const listOne = ['bitcoin', 'dogecoin', 'litecoin'];
	useEffect(() => {
		const fetchCurrentPrice = async () => {
			const { data } = await axios.get(getCurrentPrice('INR'));
			setCurrentPrice(data.ethereum);
		};

		const fetchListData = async (item) => {
			const { data } = await axios.get(getMarketInfo(item));
			setAvaiilableCurr((avaiilableCurr) => [...avaiilableCurr, ...data]);
		};

		fetchCurrentPrice();

		listOne.map((item, id) => {
			fetchListData(item);
		});
	}, []);

	const imagesData = [
		'https://cryptologos.cc/logos/ethereum-eth-logo.png',
		'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
		'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
		'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
	];

	return (
		<>
			<div className={styles.wrapper}>
				<Navbar />

				<div className={styles.mainContainer}>
					<div className={styles.notice}>
						<div className={styles.noticeContainer}>
							<div className={styles.noticeTitle}>
								Compare Funds
							</div>
							<div className={styles.noticeMessage}>
								Compare your funds here.
							</div>
							<BuyTokens
								avaiilableCurr={avaiilableCurr}
								currentEthPrice={currentPrice.inr}
							/>
						</div>
					</div>
					<div className="mx-11">
						<p className="text-white font-bold text-xl ">
							For Market Status: {'  '} &nbsp;
							<a href="/market" className="text-blue-600">
								View Market Page
							</a>
						</p>
					</div>
				</div>
			</div>

			<marquee
				behavior="scroll"
				direction="left"
				scrollamount="15"
				style={{ marginTop: '50px' }}
			>
				{imagesData.map((doc) => (
					<img
						src={doc}
						width="125"
						height="82"
						alt="Flying Bat"
						style={{
							float: 'left',
							marginRight: 100,
							marginLeft: 50,
						}}
					/>
				))}
			</marquee>
		</>
	);
};

export default ConvertPage;
