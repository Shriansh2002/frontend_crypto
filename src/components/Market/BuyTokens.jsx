import React, { useContext } from 'react';

const styles = {
	inputAmount: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
	formContainer: `flex items-center`,
	select: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
	options: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-black mt-6 text-white placeholder:text-white`,
	noticeCTA: 'font-bold text-green-500 cursor-pointer mt-5',
};

const BuyTokens = ({ list, avaiilableCurr }) => {
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
					// value={toCoin}
					onChange={(e) => setToCoin(e.target.value)}
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
				<input
					placeholder="Amount..."
					className={styles.inputAmount}
					type="text"
					// value={amount}
					// onChange={(e) => setAmount(e.target.value)}
				/>

				<button
					className={styles.noticeCTA}
					type="button"
					// disabled={!isAuthenticated}
					// onClick={() => mint()}
				>
					Compare
				</button>
			</div>
		</form>
	);
};

export default BuyTokens;
