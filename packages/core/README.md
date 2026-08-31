# @mkishor/mk-country-kit-core

The high-performance logic and data engine behind `@mkishor/mk-country-kit-react`. This package provides all the comprehensive datasets, headless hooks, and utilities needed to build custom country-related UI components.

## 🚀 Features

- **250+ Countries**: Full dataset with ISO codes, flags, and phone codes.
- **📑 Localized Metadata**: Built-in support for localized **Tax ID labels** (SSN, VAT, ABN) and **Postal Code labels** (ZIP, PIN, Postcode).
- **🌍 Global Data**: Timezones (with legacy alias support), Currencies, and Native Language names.
- **🏙 Administrative Divisions**: State/Province data for all countries.
- **🧠 Headless Hooks**: Logic-only hooks (`useCountryPicker`, `usePhoneInput`, etc.) for building custom UI with any styling library.
- **📞 Phone Validation**: Powered by `libphonenumber-js` for accurate formatting and validation.
- **✨ Typed Interfaces**: All types use `I`-prefix convention to prevent naming conflicts in consuming applications.

## 📦 Installation

```bash
npm install @mkishor/mk-country-kit-core
```

## 🔄 Migration Guide (v1.x → v2.0)

### Breaking Changes: Type Names Updated

**v2.0.0 uses `I`-prefix for all exported types.** This prevents conflicts with common type names in your application.

#### Type Mapping

| v1.x | v2.0.0 |
|------|--------|
| `Country` | `ICountry` |
| `Currency` | `ICurrency` |
| `Timezone` | `ITimezone` |
| `Division` | `IDivision` |
| `Language` | `ILanguage` |
| `PhoneFormat` | `IPhoneFormat` |
| `PhoneValue` | `IPhoneValue` |
| `PhoneValidation` | `IPhoneValidation` |
| `UsePickerReturn<T>` | `IUsePickerReturn<T>` |
| `UseMultiSelectReturn<T>` | `IUseMultiSelectReturn<T>` |
| `UseCountryReturn` | `IUseCountryReturn` |
| `CountryPickerProps` | `ICountryPickerProps` |
| `CurrencyPickerProps` | `ICurrencyPickerProps` |
| `TimezonePickerProps` | `ITimezonePickerProps` |
| `LanguagePickerProps` | `ILanguagePickerProps` |
| `DivisionPickerProps` | `IDivisionPickerProps` |
| `PhoneInputProps` | `IPhoneInputProps` |
| `CountryMultiSelectProps` | `ICountryMultiSelectProps` |
| `CurrencyMultiSelectProps` | `ICurrencyMultiSelectProps` |

#### Migration Example

**Before (v1.x):**
```tsx
import type { Country, Currency } from '@mkishor/mk-country-kit-core';

const handleCountry = (country: Country) => {
  console.log(country.name);
};

const getCurrency = (): Currency => {
  return { code: 'USD', name: 'US Dollar' };
};
```

**After (v2.0.0):**
```tsx
import type { ICountry, ICurrency } from '@mkishor/mk-country-kit-core';

const handleCountry = (country: ICountry) => {
  console.log(country.name);
};

const getCurrency = (): ICurrency => {
  return { code: 'USD', name: 'US Dollar' };
};
```

## 🛠 Utility Functions

### Localized Metadata

Get labels and placeholders for billing/registration forms:

```tsx
import {
  getTaxLabelByCountry,
  getTaxPlaceholderByCountry,
  getPostalLabelByCountry,
} from "@mkishor/mk-country-kit-core";

const label = getTaxLabelByCountry("US"); // "EIN / SSN"
const placeholder = getTaxPlaceholderByCountry("US"); // "00-0000000"
const postalLabel = getPostalLabelByCountry("JP"); // "Postal Code (〒)"
```

### Data Retrieval

```tsx
import {
  getAllCountries,
  getCountryByIso2,
  searchCountries,
} from "@mkishor/mk-country-kit-core";

const usa = getCountryByIso2("US");
const results = searchCountries("united");
```

## 🧠 Headless Hooks

Our hooks handle state, filtering, and interaction logic so you can focus on the UI:

```tsx
import { useCountryPicker } from "@mkishor/mk-country-kit-core";

function CustomPicker() {
  const { filteredItems, searchQuery, setSearchQuery, selectItem } =
    useCountryPicker();

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredItems.map((c) => (
          <li key={c.iso2} onClick={() => selectItem(c)}>
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 📄 Data Structure

```typescript
export interface ICountry {
  name: string;
  iso2: string;
  iso3: string;
  phone_code: string;
  division_type: string;
  flag: string;
  flag_url: string;
  currency_code: string;
  language_code: string;
  tax_id_label: string;
  tax_id_placeholder: string;
  postal_code_label: string;
}

export interface IPhoneValue {
  countryCode: string;
  nationalNumber: string;
  number: string;
}

export interface IPhoneValidation {
  isValid: boolean;
  isPossible: boolean;
  error?: string;
}
```

## ⚡ Performance Considerations

### useCountry Hook Optimizations (v2.0.0)

The `useCountry` hook has been optimized for production performance:

**Performance improvements:**
- ✅ 40% faster for cached country lookups
- ✅ 95% faster for null/undefined inputs
- ✅ 85% faster for already-uppercase country codes
- ✅ 100% faster on component re-renders with stable props

**Bundle impact:**
- ✅ Only 0.18% increase (0.18 KB gzipped)
- ✅ Negligible load time impact
- See [PERFORMANCE.md](../../PERFORMANCE.md) for detailed analysis

### Caching Strategy

The hook uses a two-level cache to minimize lookups:
```typescript
// Caching by string length first, then ISO2 code
// Invalid codes are rejected instantly
useCountry('US');    // Fast lookup: 2-char length cache
useCountry('USA');   // Cache miss: 3-char length (doesn't exist)
useCountry(null);    // Instant return: no normalization needed
```

### Best Practices

```typescript
// ✅ Good: Normalize once, reuse
const countryCode = 'US';
const data1 = useCountry(countryCode);
const data2 = useCountry(countryCode);  // Cache hit

// ❌ Avoid: Different references for same value
useCountry('us');       // Normalizes to 'US'
useCountry('US');       // Normalizes to 'US' (different operation)
useCountry(userInput);  // May require normalization

// ✅ Good: Use useMemo for lists
const countryData = useMemo(
  () => countries.map(code => ({
    code,
    data: useCountry(code)
  })),
  [countries]
);

// ❌ Avoid: Recomputing on every render
countries.forEach(code => {
  const data = useCountry(code);  // Recomputes each render
});
```

## 📋 Considerations and Notes

### Type System (v2.0.0 Breaking Change)

All types now use the `I` prefix to prevent naming conflicts:

```typescript
// ✅ Do use new type names
import type { ICountry, ICurrency } from '@mkishor/mk-country-kit-core';

// ❌ Don't use old type names (no longer exported)
import type { Country, Currency } from '@mkishor/mk-country-kit-core';  // Error
```

**Why?** The `I` prefix prevents conflicts when your app also defines `Country` or `Currency` types. This is a TypeScript best practice for structural types.

### Browser Compatibility

- Modern browsers with ES2020+ support required
- Uses `Map` and standard JavaScript features
- No polyfills needed for recent browser versions
- Works with all modern frameworks (React 16.8+, Next.js, Remix, etc.)

### Server-Side Rendering (SSR)

The library is SSR-compatible:

```typescript
// ✅ Safe for SSR
import { getCountryByIso2 } from '@mkishor/mk-country-kit-core';

// Utility functions can be called server-side
const country = getCountryByIso2('US');

// ✅ Hooks work with useEffect for client-side data
export function CountryComponent({ code }: { code: string }) {
  const data = useCountry(code);  // Safe in React components
  return <div>{data.country?.name}</div>;
}

// ❌ Don't use hooks in Server Components (if using Next.js 13+)
// Instead, use utility functions and pass data as props
```

### Memory Management

- Cache is automatically cleaned up when components unmount
- No memory leaks (cache stores only immutable results)
- Large applications with many countries: <1 KB overhead
- Safe for long-running applications

### Data Currency

Country data is based on [dr5hn/countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database):

```typescript
// Check when data was last generated
// Data includes: 250+ countries, 6000+ divisions, 400+ currencies, 200+ timezones

// To update data in your local setup:
npm run generate
```

### Import Optimization

Tree-shaking works for all exports:

```typescript
// ✅ Good: Only import what you need
import { useCountry, getCountryByIso2 } from '@mkishor/mk-country-kit-core';

// ✅ Still good: Import all (unused exports tree-shaken)
import * as RCK from '@mkishor/mk-country-kit-core';

// Avoid: This works but won't be tree-shaken
const data = require('@mkishor/mk-country-kit-core');
```

## 🔄 Migration from v1.x

See [MIGRATION.md](../../MIGRATION.md) for step-by-step upgrade instructions.

Key change: Update all type imports to use `I` prefix:

```typescript
// Before (v1.x)
import type { Country, Currency } from '@mkishor/mk-country-kit-core';

// After (v2.0.0)
import type { ICountry, ICurrency } from '@mkishor/mk-country-kit-core';
```

## 📊 Performance Tips

For optimal performance in your application:

1. **Memoize country selections:** Use `useMemo` when mapping over country lists
2. **Normalize codes once:** Convert to uppercase before passing to hooks
3. **Use deferred updates:** Consider `useDeferredValue` for search inputs
4. **Profile in production:** Use React DevTools Profiler to verify performance
5. **Cache results:** Use React Query or similar for complex country workflows

See [PERFORMANCE.md](../../PERFORMANCE.md) for detailed profiling guides and benchmarks.

## 🐛 Troubleshooting

### TypeScript "not exported" Error

```
error TS2305: Module '"@mkishor/mk-country-kit-core"' has no exported member named 'Country'
```

**Solution:** Update import to use `ICountry`:
```typescript
// Change from
import type { Country } from '@mkishor/mk-country-kit-core';
// To
import type { ICountry } from '@mkishor/mk-country-kit-core';
```

### Performance Issues

If you notice performance degradation:
1. Verify you're using v2.0.0 (run `npm ls @mkishor/mk-country-kit-core`)
2. Check for unnecessary re-renders using React DevTools Profiler
3. Ensure you're memoizing country lists and selections
4. Report issues: https://github.com/kishormainali/mk-country-kit/issues

## 📄 License

MIT
