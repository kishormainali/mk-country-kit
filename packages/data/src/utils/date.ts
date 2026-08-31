import DATE_FORMATS from '../data/dateFormats';
import type { IDateFormat } from '../types';

/**
 * Returns all country date format mappings.
 */
export function getAllDateFormats(): IDateFormat[] {
  return DATE_FORMATS;
}

/**
 * Fallback date format when a country is not found or has invalid configuration.
 * Default is: DD/MM/YYYY, separator: '/', weekStart: 1 (Monday)
 */
const DEFAULT_DATE_FORMAT: IDateFormat = {
  countryCode: 'DEFAULT',
  format: 'DD/MM/YYYY',
  separator: '/',
  weekStart: 1,
};

/**
 * Finds the date format configurations for a country by its ISO2 code (case-insensitive).
 */
export function getDateFormatByCountry(iso2: string): IDateFormat {
  if (!iso2) return DEFAULT_DATE_FORMAT;
  const normalized = iso2.toUpperCase();
  return (
    DATE_FORMATS.find((df) => df.countryCode === normalized) ?? {
      ...DEFAULT_DATE_FORMAT,
      countryCode: normalized,
    }
  );
}

/**
 * Formats a Date object using a specified pattern (e.g. 'YYYY-MM-DD', 'DD/MM/YYYY').
 * Only supports standard YYYY, MM, DD placeholders.
 */
export function formatDateWithPattern(date: Date, pattern: string): string {
  if (!date || isNaN(date.getTime()) || !pattern) {
    return '';
  }

  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return pattern
    .replace(/YYYY/g, yyyy)
    .replace(/MM/g, mm)
    .replace(/DD/g, dd);
}

/**
 * Formats a Date object based on the country's default date format.
 */
export function formatDateByCountry(date: Date, iso2: string): string {
  const df = getDateFormatByCountry(iso2);
  return formatDateWithPattern(date, df.format);
}

/**
 * Parses a date string matching a specific pattern (e.g. 'YYYY-MM-DD', 'DD/MM/YYYY') and returns a Date object.
 * Returns null if the string is invalid or does not match the pattern.
 */
export function parseDateWithPattern(dateString: string, pattern: string): Date | null {
  if (!dateString || !pattern || dateString.length !== pattern.length) {
    return null;
  }

  const yIndex = pattern.indexOf('YYYY');
  const mIndex = pattern.indexOf('MM');
  const dIndex = pattern.indexOf('DD');

  if (yIndex === -1 || mIndex === -1 || dIndex === -1) {
    return null;
  }

  const year = parseInt(dateString.slice(yIndex, yIndex + 4), 10);
  const month = parseInt(dateString.slice(mIndex, mIndex + 2), 10) - 1; // 0-indexed month
  const day = parseInt(dateString.slice(dIndex, dIndex + 2), 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }

  // Validate range
  if (month < 0 || month > 11 || day < 1 || day > 31) {
    return null;
  }

  const parsedDate = new Date(year, month, day);

  // Verify that JS Date autoconversion did not happen (e.g. Feb 30 -> March 2)
  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }

  return parsedDate;
}

/**
 * Parses a date string based on the country's default date format.
 */
export function parseDateByCountry(dateString: string, iso2: string): Date | null {
  const df = getDateFormatByCountry(iso2);
  return parseDateWithPattern(dateString, df.format);
}
