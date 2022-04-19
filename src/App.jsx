import React from 'react';
import {
	Navbar,
	Welcome,
	Footer,
	Services,
	Transactions,
	NotFoundPage,
	MarketPage,
} from './components/index';

import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HomePage = () => {
	return (
		<>
			<div className="gradient-bg-welcome">
				<Navbar />
				<Welcome />
			</div>
			<Services />
			<Transactions />
			<Footer />
		</>
	);
};

const App = () => {
	return (
		<BrowserRouter>
			<div className="min-h screen">
				<Routes>
					<Route index path="/" element={<HomePage />} />
					<Route exact path="/market" element={<MarketPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
