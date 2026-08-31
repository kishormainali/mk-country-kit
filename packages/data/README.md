# @mkishor/mk-country-kit

Comprehensive country datasets, currencies, timezones, languages, administrative divisions, and utility helper functions. 

This package is completely standalone, has zero dependencies (other than `libphonenumber-js` for phone formatting), and contains no React or UI code. It is designed to be used in backend APIs, node scripts, cli tools, and non-React frontend projects.

## 📦 Installation

```bash
npm install @mkishor/mk-country-kit
```

## ✨ Datasets Included

This package exports raw TypeScript/JSON datasets:
- `COUNTRIES`: 250+ countries with ISO codes, flag URLs, localized Billing fields metadata, tax types, and default formats.
- `CURRENCIES`: Global currency details (symbols, decimal precision, codes).
- `TIMEZONES`: Comprehensive timezone lists with GMT offsets and abbreviations.
- `LANGUAGES`: ISO 639-1 language names (both native and English).
- `DIVISIONS`: Complete state/province lists for all countries.
- `PHONE_FORMATS`: Dynamic telephone length and validation metadata.
- `DATE_FORMATS`: CLDR-compliant date formatting and separator rules.

## 🛠 Utilities Included

### Phone Validation & Formatting
Uses `libphonenumber-js` internally to format and validate national/international numbers:
```typescript
import { validatePhoneNumber, getPhoneValidation } from '@mkishor/mk-country-kit';

const isValid = validatePhoneNumber('2025550199', 'US'); // true
```

### Date Formatting
Format dates according to localized CLDR standards:
```typescript
import { formatDateWithPattern } from '@mkishor/mk-country-kit';

// Format Date object to "MM/DD/YYYY"
const formatted = formatDateWithPattern(new Date(), 'MM/DD/YYYY', '/');
```

### Data Lookups & Searches
Efficient search helpers for select/picker interfaces:
```typescript
import { searchCountries, searchCurrencies, getCountryByIso2 } from '@mkishor/mk-country-kit';

const results = searchCountries('united');
const currency = searchCurrencies('USD');
```

## 📄 License

MIT © [Kishor Mainali](https://github.com/kishormainali)
