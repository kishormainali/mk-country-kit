# MK Country Kit

A professional, modular ecosystem of React components and datasets for handling countries, currencies, timezones, languages, and administrative divisions.

## 📦 Packages

| Package | Purpose | Stack |
| :--- | :--- | :--- |
| [`@mkishor/mk-country-kit`](./packages/data) | Standalone datasets, type definitions, and pure utility functions. Zero dependencies. | Pure TS |
| [`@mkishor/mk-country-kit-core`](./packages/core) | Core React hooks and picking logic. | React + TS |
| [`@mkishor/mk-country-kit-react`](./packages/react) | High-level Vanilla CSS components. | React + CSS |
| [`@mkishor/mk-country-kit-ui`](./packages/ui) | Premium Shadcn/UI (Tailwind + Radix) components. | Tailwind + Radix |

## ✨ Features

- **🚀 Standalone Data Package**: The core datasets and utilities are completely decoupled into `@mkishor/mk-country-kit` (no React peer dependency), allowing use in backend APIs, scripting, or non-React web apps.
- **⚡ Tree-Shakable**: Built with ESM support and `"sideEffects": false` so modern bundlers can easily prune unused files.
- **🌍 Comprehensive Data**: 250+ countries with currencies, timezones, native language names, and sub-divisions (powered by [dr5hn/countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database)).
- **📑 Localized Metadata**: Built-in support for localized **Tax ID labels** (SSN, VAT, ABN) and **Postal Code labels** (ZIP, PIN, Postcode).
- **🎨 UI Flexibility**: Choose between zero-config Vanilla components or highly-customizable Shadcn/Tailwind variants.
- **🚩 Reliable Flags**: Integrated image-based flag rendering (FlagCDN) with emoji fallbacks for perfect cross-platform support.
- **📞 Smart Phone Inputs**: Localized formatting and validation powered by `libphonenumber-js`.
- **🎯 Unified Country Hooks**: Single `useCountry()` hook returns all metadata (divisions, timezones, currency, phone info, tax, postal codes) in one call.

## 🚀 Quick Start

### 1. Vanilla (Standard)
Best for React projects without Tailwind CSS or when you want zero configuration.

```bash
npm install @mkishor/mk-country-kit-react @mkishor/mk-country-kit-core
```

```tsx
import { CountryPicker } from '@mkishor/mk-country-kit-react';
import '@mkishor/mk-country-kit-react/dist/style.css'; 

export default () => (
  <CountryPicker onChange={(c) => console.log(c)} />
);
```

### 2. Shadcn/UI (Premium)
Best for modern React projects using Tailwind CSS and Radix UI.

```bash
npm install @mkishor/mk-country-kit-ui @mkishor/mk-country-kit-core
```

```tsx
import { CountryPicker } from '@mkishor/mk-country-kit-ui';

export default () => (
  <CountryPicker 
    label="Select Country" 
    placeholder="Search..." 
    onChange={(c) => console.log(c)} 
  />
);
```

### 3. Server-side / Raw Datasets (Non-React)
Best for Node.js backends, scripting, or command-line tools where you do not need React.

```bash
npm install @mkishor/mk-country-kit
```

```typescript
import { getAllCountries, getCountryByIso2 } from '@mkishor/mk-country-kit';

const country = getCountryByIso2('US');
console.log(country?.name); // "United States"
```

## 🛠 Localized Metadata

The core hook package provides localized labels and placeholders for billing and registration forms:

```tsx
import { getTaxLabelByCountry, getTaxPlaceholderByCountry } from '@mkishor/mk-country-kit-core';

const label = getTaxLabelByCountry('US'); // "EIN / SSN"
const placeholder = getTaxPlaceholderByCountry('US'); // "00-0000000"
```

## 🎯 Unified Country Hook

Get all country metadata in a single hook call:

```tsx
import { useCountry } from '@mkishor/mk-country-kit-core';

export default () => {
  const {
    country,          // Country object with name, flags, etc.
    divisions,        // Administrative divisions
    timezones,        // Available timezones
    currency,         // Currency info
    phoneFormat,      // Phone number format
    phoneLengths,     // Min/max phone lengths
    tax,              // Tax ID label & placeholder
    postalCode,       // Postal code label
  } = useCountry('US');

  return <div>{country?.name}</div>;
};
```

## 📚 Detailed Documentation

For detailed API references, please refer to the individual package READMEs:
- [Data Package API](./packages/data/README.md)
- [Core API & Hooks Documentation](./packages/core/README.md)
- [Vanilla Components Documentation](./packages/react/README.md)
- [Shadcn/UI Components Documentation](./packages/ui/README.md)

## 📄 License

MIT © [Kishor Mainali](https://github.com/kishormainali)
