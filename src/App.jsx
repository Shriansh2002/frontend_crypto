import { HomePage, NotFoundPage, MarketPage, ConvertPage } from './Pages/index';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const listOne = ['bitcoin', 'dogecoin', 'litecoin'];

const App = () => {
	return (
		<BrowserRouter>
			<div className="min-h screen">
				<Routes>
					<Route index path="/" element={<HomePage />} />
					<Route
						exact
						path="/Market"
						element={<MarketPage listOne={listOne} />}
					/>
					<Route
						exact
						path="/Convert"
						element={<ConvertPage listOne={listOne} />}
					/>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
