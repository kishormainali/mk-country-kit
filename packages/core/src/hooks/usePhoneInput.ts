import { useEffect, useMemo, useRef, useState } from 'react';
import type { ICountry, IPhoneValidation, IPhoneValue } from '../types';
import { getAllCountries, getCountryByIso2, getPhoneValidation, validatePhoneNumber } from '@mkishor/mk-country-kit';
import { useCountry } from './useCountry';

/**
 * Return type for usePhoneInput hook
 */
export interface IUsePhoneInputReturn {
  country: ICountry | null;
  number: string;
  value: IPhoneValue | null;
  validation: IPhoneValidation | null;
  isOpen: boolean;
  searchQuery: string;
  filteredCountries: ICountry[];
  setSearchQuery: (q: string) => void;
  selectCountry: (country: ICountry) => void;
  setNumber: (num: string) => void;
  toggle: () => void;
  close: () => void;
  /** Validate current phone number */
  validate: () => { isValid: boolean; errors: string[] };
  /** Get placeholder text for phone input */
  getPlaceholder: () => string;
}

/**
 * Phone input hook with country selection, validation, and formatting.
 *
 * Optimized to minimize unnecessary re-renders with strategic memoization.
 */
export function usePhoneInput(
  initialValue?: IPhoneValue | null,
  onChange?: (value: IPhoneValue) => void,
  defaultCountryIso2?: string
): IUsePhoneInputReturn {
  const defaultCountry =
    (initialValue?.country) ??
    (defaultCountryIso2 ? getCountryByIso2(defaultCountryIso2) ?? null : null);

  const [country, setCountry] = useState<ICountry | null>(defaultCountry);
  const [number, setNumberState] = useState(initialValue?.number ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state with initialValue when it changes from the parent
  useEffect(() => {
    if (initialValue) {
      setCountry(initialValue.country);
      setNumberState(initialValue.number);
    } else {
      setCountry(defaultCountry);
      setNumberState('');
    }
  }, [initialValue, defaultCountry]);

  // Keep a stable ref to the latest onChange callback to avoid callback invalidations
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const allCountries = getAllCountries();

  // Memoize filtered countries
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return allCountries;
    const q = searchQuery.toLowerCase().trim().replace('+', '');
    return allCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone_code.includes(q) ||
        c.iso2.toLowerCase().includes(q)
    );
  }, [allCountries, searchQuery]);

  // Helper to build PhoneValue with validation data
  const buildValue = (c: ICountry, num: string): IPhoneValue => {
    const baseValidation = getPhoneValidation(c.iso2);
    let cleanNum = num;
    let validation = baseValidation;
    if (baseValidation.nationalPrefix) {
      const hasPrefix = num.startsWith(baseValidation.nationalPrefix);
      if (hasPrefix) {
        cleanNum = num.slice(baseValidation.nationalPrefix.length);
      }
      validation = {
        ...baseValidation,
        minLength: hasPrefix
          ? (baseValidation.minLength ? baseValidation.minLength + baseValidation.nationalPrefix.length : undefined)
          : baseValidation.minLength,
        maxLength: baseValidation.maxLength
          ? baseValidation.maxLength + baseValidation.nationalPrefix.length
          : baseValidation.maxLength,
      };
    }
    return {
      country: c,
      dialCode: `+${c.phone_code}`,
      number: num,
      full: `+${c.phone_code}${cleanNum}`,
      validation,
    };
  };

  // Country selection handler
  const selectCountry = (c: ICountry) => {
    setCountry(c);
    setIsOpen(false);
    setSearchQuery('');
    onChangeRef.current?.(buildValue(c, number));
  };

  const countryData = useCountry(country?.iso2);

  // Phone number update handler with length validation
  const setNumber = (num: string) => {
    let digits = num.replace(/\D/g, '');
    const validation = getPhoneValidation(country?.iso2 ?? '');
    let max = countryData.phoneLengths.max;
    if (max && validation.nationalPrefix && digits.startsWith(validation.nationalPrefix)) {
      max += validation.nationalPrefix.length;
    }
    if (max && digits.length > max) {
      digits = digits.slice(0, max);
    }
    setNumberState(digits);
    if (country) {
      onChangeRef.current?.(buildValue(country, digits));
    }
  };

  // Validation function
  const validate = () => {
    if (!country) {
      return { isValid: false, errors: ['Please select a country'] };
    }
    if (!number) {
      return { isValid: false, errors: ['Phone number is required'] };
    }
    return validatePhoneNumber(`+${country.phone_code}`, number, country.iso2);
  };

  // Get placeholder based on country
  const getPlaceholder = () => {
    if (!country) return 'Phone number';
    const validation = getPhoneValidation(country.iso2);
    return validation.placeholder || 'Enter phone number';
  };

  const toggle = () => setIsOpen((p) => !p);
  const close = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  // Build current value object
  const value: IPhoneValue | null = useMemo(
    () => (country ? buildValue(country, number) : null),
    [country, number]
  );

  // Get validation for current country
  const validation = useMemo(() => {
    if (!country) return null;
    const base = getPhoneValidation(country.iso2);
    if (base.nationalPrefix) {
      const hasPrefix = number.startsWith(base.nationalPrefix);
      return {
        ...base,
        minLength: hasPrefix
          ? (base.minLength ? base.minLength + base.nationalPrefix.length : undefined)
          : base.minLength,
        maxLength: base.maxLength
          ? base.maxLength + base.nationalPrefix.length
          : base.maxLength,
      };
    }
    return base;
  }, [country, number]);

  // Return memoized object only to ensure stable reference
  return useMemo(
    () => ({
      country,
      number,
      value,
      validation,
      isOpen,
      searchQuery,
      filteredCountries,
      setSearchQuery,
      selectCountry,
      setNumber,
      toggle,
      close,
      validate,
      getPlaceholder,
    }),
    [
      country,
      number,
      value,
      validation,
      isOpen,
      searchQuery,
      filteredCountries,
    ]
  );
}
