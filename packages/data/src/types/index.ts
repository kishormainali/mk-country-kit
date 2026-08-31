export interface IPhoneFormat {
  iso2: string;
  dialCode: string;
  patterns: string;
  possibleLengths: string;
  example: string | number;
  countryCode: string;
  nationalPrefix?: string;
}

export interface ICurrency {
  code: string;
  name: string;
  symbol: string;
  countryCode: string;
  precision: number;
}

export interface ITimezone {
  name: string;
  offset: number;
  offset_name: string;
  abbreviation: string;
  tzName: string;
  countryCode: string;
}

export interface IDivision {
  name: string;
  iso2: string;
  timezone: string;
  countryCode: string;
}

export interface ICountry {
  name: string;
  iso2: string;
  iso3: string;
  phone_code: string;
  division_type: string;
  /** Emoji flag computed from iso2 */
  flag: string;
  /** SVG/Image URL for the country flag */
  flag_url: string;
  /** Default language code for the country */
  language_code: string;
  /** Default currency code for the country */
  currency_code: string;
  /** Label for tax identification number (e.g. "VAT", "SSN", "ABN") */
  tax_id_label: string;
  /** Placeholder for tax identification number */
  tax_id_placeholder: string;
  /** Label for postal/zip code (e.g. "ZIP Code", "Postcode", "PIN Code") */
  postal_code_label: string;
  /** Preferred date format, e.g. "DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD" */
  date_format: string;
  /** Preferred date separator, e.g. "/", "-", "." */
  date_separator: string;
  /** First day of the week (0 = Sunday, 1 = Monday, 6 = Saturday) */
  week_start: number;
}

export interface ILanguage {
  code: string;
  english_name: string;
  native_name: string;
}

/**
 * Phone number validation rules and metadata for a country
 */
export interface IPhoneValidation {
  /** Min phone number length (without dial code) */
  minLength?: number;
  /** Max phone number length (without dial code) */
  maxLength?: number;
  /** Regex pattern for validation */
  pattern?: string;
  /** Example phone number without dial code */
  example?: string;
  /** Placeholder text for the phone input */
  placeholder?: string;
  /** National prefix that can optionally be typed in front, e.g. "0" */
  nationalPrefix?: string;
}

export interface IDateFormat {
  countryCode: string;
  format: string; // e.g. "MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"
  separator: string; // e.g. "/", "-", "."
  weekStart: number; // 0 = Sunday, 1 = Monday, 6 = Saturday
}
