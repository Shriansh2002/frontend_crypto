import React from 'react';
import logo from '../../../images/logo.png';

const Footer = () => {
	return (
		<div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
			<div className="flex justify-center items-center flex-col">
				<p className="text-white text-sm text-center">
					Made With ❤️ by Shriansh Agarwal
				</p>
			</div>

			<div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5" />
			<div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
				<p className="text-white text-sm text-center">
					@krypt-shriansh.netlify.app 2022
				</p>
				<p className="text-white text-sm text-center">
					All Right Reserved
				</p>
			</div>
		</div>
	);
};

export default Footer;
