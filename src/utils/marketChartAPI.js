export const HistoricalChart = (
	days = 365,
	currency,
	blockchain = 'ethereum'
) =>
	`https://api.coingecko.com/api/v3/coins/${blockchain}/market_chart?vs_currency=${currency}&days=${days}`;

export const getCurrentPrice = (
	currency,
	blockchain = 'ethereum'
) => `https://api.coingecko.com/api/v3/simple/price?ids=${blockchain}&vs_currencies=${currency}&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=false
	`;

export const getMarketInfo = (
	availiableItem
) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&ids=${availiableItem}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C30d%2C1y
	`;
