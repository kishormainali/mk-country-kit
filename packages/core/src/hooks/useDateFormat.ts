import { useMemo } from 'react';
import type { IDateFormat } from '../types';
import {
  getDateFormatByCountry,
  formatDateWithPattern,
  parseDateWithPattern,
} from '@mkishor/mk-country-kit';

export interface IUseDateFormatReturn {
  dateFormat: IDateFormat | null;
  formatDate: (date: Date) => string;
  parseDate: (dateString: string) => Date | null;
  placeholder: string;
  weekStart: number;
}

/**
 * A hook that provides country-specific date formatting details, placeholders, first day of the week,
 * and format/parse utilities.
 *
 * @param countryIso2 ISO2 country code (case-insensitive)
 * @returns Date formatting information and helper functions
 */
export function useDateFormat(countryIso2?: string | null): IUseDateFormatReturn {
  // Normalize ISO2 input
  const normalizedIso = useMemo(() => {
    if (!countryIso2) return null;
    return countryIso2 === countryIso2.toUpperCase()
      ? countryIso2
      : countryIso2.toUpperCase();
  }, [countryIso2]);

  // Resolve country date format settings
  const dateFormat = useMemo(() => {
    if (!normalizedIso) return null;
    return getDateFormatByCountry(normalizedIso);
  }, [normalizedIso]);

  // Memoize the formatDate helper function
  const formatDate = useMemo(() => {
    return (date: Date) => {
      if (!dateFormat) return '';
      return formatDateWithPattern(date, dateFormat.format);
    };
  }, [dateFormat]);

  // Memoize the parseDate helper function
  const parseDate = useMemo(() => {
    return (dateString: string) => {
      if (!dateFormat) return null;
      return parseDateWithPattern(dateString, dateFormat.format);
    };
  }, [dateFormat]);

  const placeholder = dateFormat?.format ?? '';
  const weekStart = dateFormat?.weekStart ?? 1;

  return {
    dateFormat,
    formatDate,
    parseDate,
    placeholder,
    weekStart,
  };
}
