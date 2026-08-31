export * from '@mkishor/mk-country-kit';

import type {
  ICountry,
  ICurrency,
  ITimezone,
  IDivision,
  ILanguage,
  IPhoneFormat,
  IPhoneValidation,
  IDateFormat
} from '@mkishor/mk-country-kit';


// ---- Picker prop types ----

export interface ICountryPickerProps {
  /** Currently selected country */
  value?: ICountry | null;
  /** Callback when user selects a country */
  onChange: (country: ICountry) => void;
  placeholder?: string;
  /** Enable search input */
  searchable?: boolean;
  /** Show emoji flag next to country name */
  showFlag?: boolean;
  /** Show phone dial code */
  showPhoneCode?: boolean;
  /** Disable the picker */
  disabled?: boolean;
  /** Additional wrapper class */
  className?: string;
  /** aria-label */
  label?: string;
}

export interface ICurrencyPickerProps {
  value?: ICurrency | null;
  onChange: (currency: ICurrency) => void;
  placeholder?: string;
  searchable?: boolean;
  /** Filter currencies to a specific country (iso2) and enable auto-selection */
  countryIso2?: string;
  /** Auto-select the first currency if countryIso2 is provided. Defaults to true if countryIso2 is present and value is empty. */
  autoSelect?: boolean;
  /** Show currency symbol alongside code */
  showSymbol?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export interface ITimezonePickerProps {
  value?: ITimezone | null;
  onChange: (timezone: ITimezone) => void;
  placeholder?: string;
  searchable?: boolean;
  /** Filter timezones to a specific country (iso2) and enable auto-selection */
  countryIso2?: string;
  /** Auto-select the first timezone if countryIso2 is provided. Defaults to true if countryIso2 is present and value is empty. */
  autoSelect?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export interface ILanguagePickerProps {
  value?: ILanguage | null;
  onChange: (language: ILanguage) => void;
  placeholder?: string;
  searchable?: boolean;
  /** Show native language name alongside english name */
  showNativeName?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export interface IDivisionPickerProps {
  /** ISO2 code of the parent country (required) */
  countryIso2: string;
  value?: IDivision | null;
  onChange: (division: IDivision) => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
}

// ---- Hook return types ----

export interface IUsePickerReturn<T> {
  isOpen: boolean;
  searchQuery: string;
  filteredItems: T[];
  selectedItem: T | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setSearchQuery: (query: string) => void;
  selectItem: (item: T) => void;
  clearSelection: () => void;
}




/**
 * Value object returned by PhoneInput.
 */
export interface IPhoneValue {
  /** Full Country object of the selected country */
  country: ICountry;
  /** Dial code with + prefix, e.g. "+1" */
  dialCode: string;
  /** Raw phone number without dial code, e.g. "4155551234" */
  number: string;
  /** Full number with dial code, e.g. "+14155551234" */
  full: string;
  /** Validation rules and metadata for the phone number */
  validation?: IPhoneValidation;
}

export interface IPhoneInputProps {
  value?: IPhoneValue | null;
  onChange: (value: IPhoneValue) => void;
  /** Pre-select a country by ISO2 on first render */
  defaultCountryIso2?: string;
  placeholder?: string;
  showFlag?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
}

// ---- Multi-select ----

export interface ICountryMultiSelectProps {
  value: ICountry[];
  onChange: (countries: ICountry[]) => void;
  placeholder?: string;
  /** Maximum number of selections (undefined = unlimited) */
  maxItems?: number;
  showFlags?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export interface ICurrencyMultiSelectProps {
  value: ICurrency[];
  onChange: (currencies: ICurrency[]) => void;
  placeholder?: string;
  maxItems?: number;
  showSymbol?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export interface IUseMultiSelectReturn<T> {
  isOpen: boolean;
  searchQuery: string;
  filteredItems: T[];
  selectedItems: T[];
  open: () => void;
  close: () => void;
  toggle: () => void;
  setSearchQuery: (query: string) => void;
  toggleItem: (item: T) => void;
  isSelected: (item: T) => boolean;
  removeItem: (item: T) => void;
  clearAll: () => void;
}




export interface IUseCountryReturn {
  country: ICountry | null;
  divisions: IDivision[];
  timezones: ITimezone[];
  currency: ICurrency | null;
  phoneFormat: IPhoneFormat | null;
  phoneLengths: { min?: number; max?: number };
  exampleNumber?: string;
  tax: { label: string; placeholder: string };
  postalCode: { label: string };
  dateFormat: IDateFormat | null;
}


