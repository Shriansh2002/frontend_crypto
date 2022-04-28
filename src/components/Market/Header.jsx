import React, { useContext } from 'react';
import logo from '../../../images/logo.png';
import { TransactionsContext } from '../../context/TransactionsContext';
import { shortenAddress } from '../../utils/shortenAddress';

const styles = {
	container: 'flex w-screen h-16 bg-black px-24 py-3 mb-5 fixed',
	leftHeader: 'flex flex-1',
	logo: 'object-cover cursor-pointer',
	searchWrapper: 'flex flex-1',
	searchInputContainer:
		'text-white items-center flex  flex-1 -ml-64 border border-gray-400 mr-64 hover:bg-[#1E2123] duration-300 p-3 rounded-lg',
	searchIcon: 'text-gray-400 text-3xl mr-3',
	searchInputWrapper: 'text-gray-400 text-lg w-full',
	searchInput: 'bg-transparent outline-none w-full',
	rightHeader: 'flex items-center justify-end text-white gap-8',
	menuItem: 'cursor-pointer font-bold hover:text-green-500 duration-300',
};
// Make Dyanmic
const isAuthenticated = true;
const formattedAccount = '0x951...f464';

const Header = () => {
	const { currentAccount, connectWallet } = useContext(TransactionsContext);

	return (
		<div className={styles.container}>
			<div className={styles.leftHeader}>
				<a href="/">
					<img src={logo} className="w-32" alt="logo" />
				</a>
			</div>

			<div className={styles.rightHeader}>
				{currentAccount ? (
					<>
						<div className={styles.menuItem}>
							{shortenAddress(currentAccount)}
						</div>
					</>
				) : (
					<div
						className={styles.menuItem}
						onClick={() => connectWallet()}
					>
						Login
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
