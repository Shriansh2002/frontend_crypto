import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionsContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const transactionContract = new ethers.Contract(
		contractAddress,
		contractABI,
		signer
	);
	return transactionContract;
};

export const TransactionsProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState('');
	const [formData, setFormData] = useState({
		addressTo: '',
		amount: '',
		keyword: '',
		message: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [transactionCount, setTransactionCount] = useState(
		localStorage.getItem('transactionCount')
	);
	const [transactions, setTransactions] = useState([]);

	const handleChange = (e, name) => {
		setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
	};

	const getAllTransactions = async () => {
		try {
			if (!ethereum) return alert('Please Install Metamask');

			const transactionContract = getEthereumContract();
			const availiableTransactions =
				await transactionContract.getAllTransactions();

			const structuredTransactions = availiableTransactions.map(
				(transaction) => ({
					addressTo: transaction.reciever,
					addressFrom: transaction.sender,
					timestamp: new Date(
						transaction.timestamp.toNumber() * 1000
					).toLocaleString(),
					message: transaction.message,
					keyword: transaction.keyword,
					amount: parseInt(transaction.amount._hex) / 10 ** 18,
				})
			);
			setTransactions(structuredTransactions);
		} catch (error) {
			console.log(error);
			throw new Error('No Eth Object');
		}
	};

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) return alert('Please Install Metamask');

			const accounts = await ethereum.request({ method: 'eth_accounts' });
			console.log(accounts);

			if (accounts.length) {
				setCurrentAccount(accounts[0]);
				getAllTransactions();
			} else {
				console.log('No ACCOUNT Found');
			}
		} catch (error) {
			console.log(error);
			throw new Error('No Eth Object');
		}
	};

	const checkIfTransactionsExists = async () => {
		try {
			const transactionContract = getEthereumContract();
			const transactionCount =
				await transactionContract.getTransactionsCount();

			window.localStorage.setItem('transactionCount', transactionCount);
		} catch (error) {
			console.log(error);
			throw new Error('No Eth Object');
		}
	};

	const connectWallet = async () => {
		try {
			if (!ethereum) return alert('Please Install Metamask');
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			setCurrentAccount(accounts[0]);
		} catch (err) {
			console.log(error);
			throw new Error('No Eth Object');
		}
	};

	const sendTransaction = async () => {
		try {
			if (!ethereum) return alert('Please Install Metamask');

			// get form data
			const { addressTo, amount, keyword, message } = formData;
			const transactionContract = getEthereumContract();
			const parsedAmount = ethers.utils.parseEther(amount);

			await ethereum.request({
				method: 'eth_sendTransaction',
				params: [
					{
						from: currentAccount,
						to: addressTo,
						gas: '0x5208', // 21000 GWEI
						value: parsedAmount._hex, // convert
					},
				],
			});
			const transactionHash = await transactionContract.addToBlockchain(
				addressTo,
				parsedAmount,
				message,
				keyword
			);
			setIsLoading(true);
			console.log(`⏱ Loading... ${transactionHash.hash}`);
			await transactionHash.wait();
			setIsLoading(false);
			console.log(`✅ Sucess... ${transactionHash.hash}`);

			const transactionCount =
				await transactionContract.getTransactionsCount();

			setTransactionCount(transactionCount.toNumber);
		} catch (error) {
			console.log(error);
			throw new Error('No Eth Object');
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
		checkIfTransactionsExists();
	}, []);

	return (
		<TransactionsContext.Provider
			value={{
				connectWallet,
				currentAccount,
				formData,
				setFormData,
				handleChange,
				sendTransaction,
				transactions,
				isLoading,
			}}
		>
			{children}
		</TransactionsContext.Provider>
	);
};
