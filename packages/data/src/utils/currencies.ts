import CURRENCIES from '../data/currencies';
import type { ICurrency } from '../types';

let cachedUniqueCurrencies: ICurrency[] | null = null;
const searchCurrenciesCache = new Map<string, ICurrency[]>();

/**
 * Returns all unique currencies across all countries
 */
export function getAllCurrencies(): ICurrency[] {
  if (cachedUniqueCurrencies) return cachedUniqueCurrencies;

  const seen = new Set<string>();
  const result: ICurrency[] = [];
  for (const currency of CURRENCIES) {
    if (!seen.has(currency.code)) {
      seen.add(currency.code);
      result.push(currency);
    }
  }
  cachedUniqueCurrencies = result.sort((a, b) => a.code.localeCompare(b.code));
  return cachedUniqueCurrencies;
}

/**
 * Find a currency by its code (e.g. "USD")
 */
export function getCurrencyByCode(code: string): ICurrency | undefined {
  const targetCode = code.toLowerCase();
  return getAllCurrencies().find(
    (c) => c.code.toLowerCase() === targetCode
  );
}

/**
 * Search currencies by code, name, or symbol
 */
export function searchCurrencies(query: string, countryIso2?: string): ICurrency[] {
  let pool = getAllCurrencies();

  if (countryIso2) {
    pool = CURRENCIES.filter(c => c.countryCode.toLowerCase() === countryIso2.toLowerCase());
  }

  if (!query.trim()) return pool;
  const q = query.toLowerCase().trim();
  const cacheKey = `${countryIso2 || ''}:${q}`;
  const cached = searchCurrenciesCache.get(cacheKey);
  if (cached) return cached;

  const result = pool.filter(
    (c) =>
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.symbol.toLowerCase().includes(q)
  );
  searchCurrenciesCache.set(cacheKey, result);
  return result;
}
