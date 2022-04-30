export const HistoricalChart = (days = 365, currency) =>
	`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=${currency}&days=${days}`;

export const getCurrentPrice = (
	currency
) => `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${currency}&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=false
	`;

export const getMarketInfo = (
	availiableItem
) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&ids=${availiableItem}&order=market_cap_desc&per_page=100&page=1&sparkline=false
	`;
