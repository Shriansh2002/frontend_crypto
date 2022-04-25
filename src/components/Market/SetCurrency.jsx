import React from 'react';

const SetCurrency = ({ setCurrency, currency }) => {
	return (
		<>
			<div className="flex justify-center">
				<b className="text-white mr-4 text-center text-2xl">
					Set Currency:{' '}
				</b>
				<select
					value={currency}
					onChange={(e) => {
						setCurrency(e.target.value);
					}}
					className="
            form-select
            block
            px-3
            py-1.5
            text-base
            text-gray-700"
				>
					<option value="INR">INR</option>
					<option value="USD">USD</option>
				</select>
			</div>
		</>
	);
};

export default SetCurrency;
