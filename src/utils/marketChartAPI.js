export const HistoricalChart = (days = 365, currency) =>
	`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=${currency}&days=${days}`;
