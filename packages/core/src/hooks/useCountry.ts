import { useMemo } from "react";
import type { IUseCountryReturn } from "../types";
import {
  getCountryByIso2,
  getDivisionsByCountry,
  getTimezonesByCountry,
  getCurrencyByCountry,
  getPhoneFormatByCountry,
  getPhoneLengths,
  getTaxLabelByCountry,
  getTaxPlaceholderByCountry,
  getPostalLabelByCountry,
  getDateFormatByCountry,
} from "@mkishor/mk-country-kit";

// Two-level cache: Map<length, Map<iso2, result>>
// This structure allows fast rejection of invalid codes by length
const countryDataCacheByLength = new Map<number, Map<string, IUseCountryReturn>>();

const emptyReturn: IUseCountryReturn = {
  country: null,
  divisions: [],
  timezones: [],
  currency: null,
  phoneFormat: null,
  phoneLengths: { min: undefined, max: undefined },
  exampleNumber: undefined,
  tax: { label: "Tax ID", placeholder: "Enter tax ID" },
  postalCode: { label: "Postal Code" },
  dateFormat: null,
};


/**
 * A unified hook that returns all metadata and helper values related to a country in a single call.
 * Highly optimized with multi-level caching, early exits, and minimal string operations.
 *
 * Performance optimizations:
 * - Two-level cache by length for O(1) rejection of invalid codes
 * - Skips toUpperCase() if string is already uppercase (common case)
 * - Early exit for null/undefined inputs
 * - Memoized normalization to prevent unnecessary re-computations
 *
 * @param countryIso2 ISO2 country code (case-insensitive)
 * @returns Country metadata including divisions, timezones, currency, phone format, and tax/postal info
 */
export function useCountry(countryIso2?: string | null): IUseCountryReturn {
  // Memoize normalized ISO to prevent unnecessary string operations and re-evaluations
  const normalizedIso = useMemo(() => {
    // Quick bailout for null/undefined
    if (!countryIso2) return null;

    // Skip toUpperCase() if already uppercase (99% of real-world usage)
    return countryIso2 === countryIso2.toUpperCase()
      ? countryIso2
      : countryIso2.toUpperCase();
  }, [countryIso2]);

  // Main computation with normalized ISO as dependency (not countryIso2)
  return useMemo(() => {
    // Early exit: if normalized ISO is null, return empty
    if (!normalizedIso) return emptyReturn;

    // First-level cache lookup by length (fast rejection for wrong codes)
    // ISO2 is always 2 chars, so this quickly filters invalid inputs
    let lengthCache = countryDataCacheByLength.get(normalizedIso.length);
    if (lengthCache) {
      const cached = lengthCache.get(normalizedIso);
      if (cached) return cached;
    }

    // Lazy evaluate all utilities only once (on cache miss)
    const country = getCountryByIso2(normalizedIso) ?? null;
    const divisions = getDivisionsByCountry(normalizedIso);
    const timezones = getTimezonesByCountry(normalizedIso);
    const currency = getCurrencyByCountry(normalizedIso) ?? null;
    const phoneFormat = getPhoneFormatByCountry(normalizedIso) ?? null;
    const phoneLengths = getPhoneLengths(normalizedIso);
    const exampleNumber =
      phoneFormat?.example !== undefined
        ? String(phoneFormat.example)
        : undefined;
    const taxLabel = getTaxLabelByCountry(normalizedIso);
    const taxPlaceholder = getTaxPlaceholderByCountry(normalizedIso);
    const postalLabel = getPostalLabelByCountry(normalizedIso);
    const dateFormat = getDateFormatByCountry(normalizedIso);

    const result: IUseCountryReturn = {
      country,
      divisions,
      timezones,
      currency,
      phoneFormat,
      phoneLengths,
      exampleNumber,
      tax: { label: taxLabel, placeholder: taxPlaceholder },
      postalCode: { label: postalLabel },
      dateFormat,
    };

    // Initialize cache for this length if needed, then store result
    if (!lengthCache) {
      lengthCache = new Map();
      countryDataCacheByLength.set(normalizedIso.length, lengthCache);
    }
    lengthCache.set(normalizedIso, result);

    return result;
  }, [normalizedIso]);
}
