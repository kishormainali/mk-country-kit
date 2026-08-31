import COUNTRIES, { iso2ToFlag as _iso2ToFlag } from '../data/countries';
import CURRENCIES from '../data/currencies';
import DIVISIONS from '../data/divisions';
import PHONE_FORMATS from '../data/phoneFormats';
import TIMEZONES from '../data/timezones';
import type { ICountry, ICurrency, IDivision, IPhoneFormat, ITimezone } from '../types';

const countries = COUNTRIES;

/**
 * Convert ISO2 code to emoji flag
 * Re-exported from the generated data module.
 */
export { _iso2ToFlag as iso2ToFlag };

// Keep the local alias for internal use
function iso2ToFlagLocal(iso2: string) { return _iso2ToFlag(iso2); }

/**
 * Returns all countries
 */
export function getAllCountries(): ICountry[] {
  return countries;
}

/**
 * Find a country by its ISO2 code (case-insensitive)
 */
export function getCountryByIso2(iso2: string): ICountry | undefined {
  return countries.find((c) => c.iso2.toLowerCase() === iso2.toLowerCase());
}

/**
 * Find a country by its ISO3 code (case-insensitive)
 */
export function getCountryByIso3(iso3: string): ICountry | undefined {
  return countries.find((c) => c.iso3.toLowerCase() === iso3.toLowerCase());
}

/**
 * Find a country by its name (partial, case-insensitive)
 */
export function getCountryByName(name: string): ICountry | undefined {
  return countries.find((c) =>
    c.name.toLowerCase().includes(name.toLowerCase())
  );
}

const searchCountriesCache = new Map<string, ICountry[]>();
const divisionsByCountryCache = new Map<string, IDivision[]>();
const timezonesByCountryCache = new Map<string, ITimezone[]>();

/**
 * Search countries by name, iso2, iso3 or phone code
 */
export function searchCountries(query: string): ICountry[] {
  if (!query.trim()) return countries;
  const q = query.toLowerCase().trim();
  const cached = searchCountriesCache.get(q);
  if (cached) return cached;

  const result = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.iso2.toLowerCase().includes(q) ||
      c.iso3.toLowerCase().includes(q) ||
      c.phone_code.includes(q)
  );
  searchCountriesCache.set(q, result);
  return result;
}

/**
 * Get all divisions for a country
 */
export function getDivisionsByCountry(iso2: string): IDivision[] {
  const normalized = iso2.toLowerCase();
  const cached = divisionsByCountryCache.get(normalized);
  if (cached) return cached;

  const result = DIVISIONS.filter((d) => d.countryCode.toLowerCase() === normalized);
  divisionsByCountryCache.set(normalized, result);
  return result;
}

/**
 * Get all timezones for a country
 */
export function getTimezonesByCountry(iso2: string): ITimezone[] {
  const normalized = iso2.toLowerCase();
  const cached = timezonesByCountryCache.get(normalized);
  if (cached) return cached;

  const result = TIMEZONES.filter((tz) => tz.countryCode.toLowerCase() === normalized);
  timezonesByCountryCache.set(normalized, result);
  return result;
}

/**
 * Get the currency for a country
 */
export function getCurrencyByCountry(iso2: string): ICurrency | undefined {
  return CURRENCIES.find((c) => c.countryCode.toLowerCase() === iso2.toLowerCase());
}

/**
 * Get the phone format for a country
 */
export function getPhoneFormatByCountry(iso2: string): IPhoneFormat | undefined {
  return PHONE_FORMATS.find((f) => f.iso2.toLowerCase() === iso2.toLowerCase());
}

/**
 * Get the min and max phone number lengths for a country
 */
export function getPhoneLengths(iso2: string): { min?: number; max?: number } {
  const format = getPhoneFormatByCountry(iso2);
  if (!format || !format.possibleLengths) {
    return { min: undefined, max: undefined };
  }

  const possibleLengths = format.possibleLengths;

  // Check for range [min-max]
  const rangeMatch = possibleLengths.match(/\[(\d+)-(\d+)\]/);
  if (rangeMatch) {
    return { min: parseInt(rangeMatch[1], 10), max: parseInt(rangeMatch[2], 10) };
  }

  // Check for comma separated 6,9
  if (possibleLengths.includes(',')) {
    const parts = possibleLengths.split(',').map((p) => parseInt(p.trim(), 10)).filter((p) => !isNaN(p));
    return { min: Math.min(...parts), max: Math.max(...parts) };
  }

  // Check for single value 9
  const single = parseInt(possibleLengths, 10);
  if (!isNaN(single)) {
    return { min: single, max: single };
  }

  return { min: undefined, max: undefined };
}

/**
 * Get the localized Tax ID label for a country
 */
export function getTaxLabelByCountry(iso2: string): string {
  const country = getCountryByIso2(iso2);
  return country?.tax_id_label || 'Tax ID';
}

/**
 * Get the localized Tax ID placeholder for a country
 */
export function getTaxPlaceholderByCountry(iso2: string): string {
  const country = getCountryByIso2(iso2);
  return country?.tax_id_placeholder || 'Enter tax ID';
}

/**
 * Get the localized Postal Code label for a country
 */
export function getPostalLabelByCountry(iso2: string): string {
  const country = getCountryByIso2(iso2);
  return country?.postal_code_label || 'Postal Code';
}

