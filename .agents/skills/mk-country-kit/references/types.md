# TypeScript Type Definitions

All types across the ecosystem use the `I`-prefix convention.

```typescript
import type {
  ICountry,
  ICurrency,
  ITimezone,
  IDivision,
  ILanguage,
  IPhoneFormat,
  IPhoneValue,
  IPhoneValidation,
  IDateFormat,
  ICountryPickerProps,
  ICurrencyPickerProps,
  ITimezonePickerProps,
  ILanguagePickerProps,
  IDivisionPickerProps,
  IPhoneInputProps,
  ICountryMultiSelectProps,
  ICurrencyMultiSelectProps,
  IUseCountryReturn,
  IUsePickerReturn,
  IUseMultiSelectReturn
} from '@mkishor/mk-country-kit-core';
```

---

## Core Data Interfaces

### `ICountry`
```typescript
interface ICountry {
  name: string;
  iso2: string;                 // e.g. "US"
  iso3: string;                 // e.g. "USA"
  phone_code: string;           // e.g. "1"
  division_type: string;        // e.g. "state", "province"
  flag: string;                 // Emoji flag e.g. "🇺🇸"
  flag_url: string;             // FlagCDN SVG/PNG URL for cross-platform reliability
  currency_code: string;        // e.g. "USD"
  language_code: string;        // e.g. "en"
  tax_id_label: string;         // e.g. "EIN / SSN", "VAT", "ABN"
  tax_id_placeholder: string;   // e.g. "00-0000000"
  postal_code_label: string;    // e.g. "ZIP Code", "Postal Code", "PIN Code"
  date_format: string;          // e.g. "MM/DD/YYYY"
  date_separator: string;       // e.g. "/"
  week_start: string;           // e.g. "sunday"
}
```

### `ICurrency`
```typescript
interface ICurrency {
  code: string;                 // e.g. "USD"
  name: string;                 // e.g. "US Dollar"
  symbol: string;               // e.g. "$"
  symbol_native: string;
  decimal_digits: number;
}
```

### `ITimezone`
```typescript
interface ITimezone {
  name: string;                 // e.g. "America/New_York"
  gmt_offset: string;           // e.g. "GMT-05:00"
  offset_minutes: number;
  abbr: string;                 // e.g. "EST"
}
```

### `IDivision` (State / Province)
```typescript
interface IDivision {
  name: string;                 // e.g. "California"
  code: string;                 // e.g. "CA"
  country_iso2: string;         // e.g. "US"
}
```

### `IPhoneValue` & `IPhoneValidation`
```typescript
interface IPhoneValue {
  countryCode: string;          // e.g. "US"
  nationalNumber: string;       // e.g. "2025550199"
  number: string;               // e.g. "+12025550199"
}

interface IPhoneValidation {
  isValid: boolean;
  isPossible: boolean;
  error?: string;
  countryCode?: string;
}
```
