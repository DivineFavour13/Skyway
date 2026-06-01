// Exchange rates relative to USD (approximate, static for demo)
const RATES: Record<string, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  NGN: 1550,
  AED: 3.67,
  CAD: 1.36,
  GHS: 15.2,
};

export function convertPrice(
  amount: string,
  fromCurrency: string,
  toCurrency: string
): string {
  if (fromCurrency === toCurrency) return amount;

  const fromRate = RATES[fromCurrency] ?? 1;
  const toRate = RATES[toCurrency] ?? 1;

  const inUSD = Number(amount) / fromRate;
  const converted = inUSD * toRate;

  return converted.toFixed(2);
}

export function formatConverted(amount: string, symbol: string): string {
  const num = Number(amount);
  if (num >= 1000) {
    return `${symbol}${num.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  }
  return `${symbol}${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}