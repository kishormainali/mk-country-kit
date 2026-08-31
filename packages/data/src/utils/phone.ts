import { parsePhoneNumber, isValidPhoneNumber, getExampleNumber } from 'libphonenumber-js';
import type { IPhoneValidation } from '../types';
import { getCountryByIso2, getPhoneFormatByCountry, getPhoneLengths } from './countries';

/**
 * Get phone number validation rules for a country
 * Combines libphonenumber-js data with custom formatting rules
 */
export function getPhoneValidation(countryIso2: string): IPhoneValidation {
  const country = getCountryByIso2(countryIso2);
  if (!country) {
    return {};
  }

  const phoneLengths = getPhoneLengths(countryIso2);
  const phoneFormat = getPhoneFormatByCountry(countryIso2);
  
  // Get example number from libphonenumber-js
  let example = phoneFormat?.example ? String(phoneFormat.example) : undefined;
  if (example?.startsWith('+')) {
    example = example.slice(1 + country.phone_code.length);
  }

  // Generate placeholder from example (e.g., "201-555-0123" -> "(201) 555-0123")
  const placeholder = example ? formatPhoneExample(example, countryIso2) : undefined;

  return {
    minLength: phoneLengths.min,
    maxLength: phoneLengths.max,
    pattern: phoneFormat?.patterns,
    example,
    placeholder,
    nationalPrefix: phoneFormat?.nationalPrefix,
  };
}

/**
 * Format phone example as a user-friendly placeholder
 */
export function formatPhoneExample(example: string, countryIso2: string): string {
  const digits = example.replace(/\D/g, '');
  
  // Country-specific formatting
  if (countryIso2.toUpperCase() === 'US' || countryIso2.toUpperCase() === 'CA') {
    // Format as (XXX) XXX-XXXX
    if (digits.length >= 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  } else if (countryIso2.toUpperCase() === 'GB') {
    // Format as +44 XXXX XXXX XXXX
    if (digits.length >= 10) {
      return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
    }
  } else if (countryIso2.toUpperCase() === 'DE') {
    // Format as +49 XXX XXXXXXX
    if (digits.length >= 10) {
      return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    }
  } else if (countryIso2.toUpperCase() === 'FR') {
    // Format as +33 X XXXX XXXX
    if (digits.length >= 9) {
      return `${digits.slice(0, 1)} ${digits.slice(1, 5)} ${digits.slice(5)}`;
    }
  }
  
  // Default: space-separated groups of 3-4
  const match = digits.match(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{0,4})?/);
  if (match) {
    return [match[1], match[2], match[3], match[4]]
      .filter(Boolean)
      .join(' ');
  }
  
  return digits;
}

/**
 * Validate phone number against country-specific rules
 */
export function validatePhoneNumber(
  dialCode: string,
  number: string,
  countryIso2: string
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  let digits = number.replace(/\D/g, '');
  const validation = getPhoneValidation(countryIso2);

  // Strip national prefix if present
  if (validation.nationalPrefix && digits.startsWith(validation.nationalPrefix)) {
    digits = digits.slice(validation.nationalPrefix.length);
  }

  // Check minimum length
  if (validation.minLength && digits.length < validation.minLength) {
    errors.push(`Phone number must be at least ${validation.minLength} digits`);
  }

  // Check maximum length
  if (validation.maxLength && digits.length > validation.maxLength) {
    errors.push(`Phone number must be at most ${validation.maxLength} digits`);
  }

  // Check pattern if available
  if (validation.pattern && digits.length > 0) {
    // Pattern is typically a regex string like "[1-9]\\d{9}"
    try {
      const pattern = new RegExp(`^${validation.pattern}$`);
      if (!pattern.test(digits)) {
        errors.push('Phone number format is invalid');
      }
    } catch (e) {
      // Silently ignore pattern errors
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Format phone number for display based on country conventions
 */
export function formatPhoneNumber(
  number: string,
  countryIso2: string
): string {
  const digits = number.replace(/\D/g, '');
  
  // Country-specific formatting
  if (countryIso2.toUpperCase() === 'US' || countryIso2.toUpperCase() === 'CA') {
    if (digits.length >= 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  } else if (countryIso2.toUpperCase() === 'GB') {
    if (digits.length >= 10) {
      return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
    }
  } else if (countryIso2.toUpperCase() === 'DE') {
    if (digits.length >= 10) {
      return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    }
  }
  
  return number;
}
