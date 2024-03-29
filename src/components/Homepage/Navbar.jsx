import { useState, useContext } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../../../images/logo.png';
import { TransactionsContext } from '../../context/TransactionsContext';
import { shortenAddress } from '../../utils/shortenAddress';

const NavBarItem = ({ title, classprops }) => (
	<a href={`/${title.toLowerCase()}`}>
		<li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
	</a>
);

const listOfFunctions = ['Market', 'Convert', 'Tutorials'];

const Navbar = ({ withAccDetails }) => {
	const [toggleMenu, setToggleMenu] = useState(false);
	const { currentAccount, connectWallet } = useContext(TransactionsContext);

	return (
		<nav className="w-full flex md:justify-center justify-between items-center p-4">
			<div className="md:flex-[0.5] flex-initial justify-center items-center">
				<a href="/">
					<img
						src={logo}
						alt="logo"
						className="w-32 cursor-pointer"
					/>
				</a>
			</div>
			<ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
				{listOfFunctions.map((item, index) => (
					<NavBarItem key={item + index} title={item} />
				))}

				{!currentAccount && (
					<button type="button" onClick={connectWallet}>
						<li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
							Login
						</li>
					</button>
				)}

				{withAccDetails && currentAccount && (
					<div className="cursor-pointer font-bold hover:text-green-500 duration-300">
						{shortenAddress(currentAccount)}
					</div>
				)}
			</ul>
			<div className="flex relative">
				{toggleMenu ? (
					<AiOutlineClose
						fontSize={28}
						className="text-white md:hidden cursor-pointer"
						onClick={() => setToggleMenu(false)}
					/>
				) : (
					<HiMenuAlt4
						fontSize={28}
						className="text-white md:hidden cursor-pointer"
						onClick={() => setToggleMenu(true)}
					/>
				)}

				{toggleMenu && (
					<ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
						<li className="text-xl w-full my-2">
							<AiOutlineClose
								onClick={() => setToggleMenu(false)}
							/>
						</li>

						{listOfFunctions.map((item, index) => (
							<NavBarItem
								key={item + index}
								title={item}
								classprops="my-2 text-lg"
							/>
						))}
					</ul>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
