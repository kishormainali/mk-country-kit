# Migration Guide: v1.x → v2.0.0

This guide walks you through upgrading from react-country-kit v1.x to v2.0.0. The main breaking change is the introduction of **I-prefixed type names** to prevent naming conflicts in your applications.

## Quick Overview

**v2.0.0 introduces a major breaking change:**
- All exported types now use the `I` prefix convention (e.g., `Country` → `ICountry`)
- This prevents naming conflicts with your application's own `Country`, `Currency`, types
- API and component behavior remain **100% unchanged**

## Step 1: Update Dependencies

```bash
# Update all packages to v2.0.0
npm install react-country-kit@2.0.0 react-country-kit-core@2.0.0

# If using Shadcn/UI variant
npm install react-country-kit-ui@2.0.0
```

## Step 2: Update Type Imports

Replace all type imports with their I-prefixed equivalents.

### Core Types

**Before (v1.x):**
```typescript
import type { Country, Currency, Timezone, Division } from 'react-country-kit-core';
```

**After (v2.0.0):**
```typescript
import type { ICountry, ICurrency, ITimezone, IDivision } from 'react-country-kit-core';
```

### Complete Type Mapping

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

## Step 3: Update Type Annotations

Update all type annotations throughout your codebase.

### Example 1: Utility Functions

**Before:**
```typescript
function handleCountry(country: Country): void {
  console.log(country.name);
}

function getCurrency(code: string): Currency | null {
  return currencyMap.get(code);
}
```

**After:**
```typescript
function handleCountry(country: ICountry): void {
  console.log(country.name);
}

function getCurrency(code: string): ICurrency | null {
  return currencyMap.get(code);
}
```

### Example 2: React Components

**Before:**
```typescript
interface CountryFormProps {
  onSelect: (country: Country) => void;
  defaultCountry?: Country;
}

export function CountryForm({ onSelect, defaultCountry }: CountryFormProps) {
  return (
    <CountryPicker 
      value={defaultCountry}
      onChange={onSelect}
    />
  );
}
```

**After:**
```typescript
interface CountryFormProps {
  onSelect: (country: ICountry) => void;
  defaultCountry?: ICountry;
}

export function CountryForm({ onSelect, defaultCountry }: CountryFormProps) {
  return (
    <CountryPicker 
      value={defaultCountry}
      onChange={onSelect}
    />
  );
}
```

### Example 3: Hook Return Types

**Before:**
```typescript
import type { UseCountryReturn } from 'react-country-kit-core';

function MyComponent() {
  const countryData: UseCountryReturn = useCountry('US');
  return <div>{countryData.country?.name}</div>;
}
```

**After:**
```typescript
import type { IUseCountryReturn } from 'react-country-kit-core';

function MyComponent() {
  const countryData: IUseCountryReturn = useCountry('US');
  return <div>{countryData.country?.name}</div>;
}
```

## Step 4: Run TypeScript Compiler

After updating imports and annotations, verify type safety:

```bash
# Check for any type errors
npx tsc --noEmit

# Or if using your build tool
npm run build
```

Fix any remaining type errors by ensuring all imports use the I-prefixed names.

## Step 5: Update Tests (if applicable)

Update test files and mock data:

**Before:**
```typescript
import type { Country } from 'react-country-kit-core';

const mockCountry: Country = {
  name: 'United States',
  iso2: 'US',
  // ... other properties
};
```

**After:**
```typescript
import type { ICountry } from 'react-country-kit-core';

const mockCountry: ICountry = {
  name: 'United States',
  iso2: 'US',
  // ... other properties
};
```

## Automated Migration (Advanced)

If you have a large codebase, use find and replace with your editor:

### VS Code Find and Replace

1. Open Find and Replace: `Cmd+H` (Mac) or `Ctrl+H` (Windows/Linux)
2. Use these replacements (one at a time):

| Find | Replace |
|------|---------|
| `Country\>` | `ICountry>` |
| `Currency\>` | `ICurrency>` |
| `Timezone\>` | `ITimezone>` |
| `Division\>` | `IDivision>` |
| `Language\>` | `ILanguage>` |
| `PhoneFormat\>` | `IPhoneFormat>` |
| `PhoneValue\>` | `IPhoneValue>` |
| `PhoneValidation\>` | `IPhoneValidation>` |

**Note:** Use regex mode (toggle `.*` button) and be careful with replacements in non-type contexts.

### Script-Based Migration (Recommended for Large Codebases)

```bash
# Save this as migrate-types.sh
#!/bin/bash

# Replace type names in TypeScript files
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" -exec sed -i '' \
  -e 's/: Country\>/: ICountry>/g' \
  -e 's/: Currency\>/: ICurrency>/g' \
  -e 's/: Timezone\>/: ITimezone>/g' \
  -e 's/: Division\>/: IDivision>/g' \
  -e 's/: Language\>/: ILanguage>/g' \
  -e 's/: PhoneFormat\>/: IPhoneFormat>/g' \
  -e 's/: PhoneValue\>/: IPhoneValue>/g' \
  -e 's/: PhoneValidation\>/: IPhoneValidation>/g' \
  -e 's/import type { Country/import type { ICountry/g' \
  -e 's/import type { Currency/import type { ICurrency/g' \
  {} \;

echo "Migration complete! Run 'npm run build' to verify."
```

Run it:
```bash
chmod +x migrate-types.sh
./migrate-types.sh
```

## Verification Checklist

After migration, verify the following:

- [ ] All type imports updated to I-prefixed names
- [ ] No TypeScript compilation errors (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] Application runs without runtime errors
- [ ] IDE autocomplete shows I-prefixed types
- [ ] No console warnings about deprecated types

## Common Issues and Solutions

### Issue 1: TypeScript Still Shows Old Type Names

**Problem:** IDE autocomplete still shows `Country` instead of `ICountry`

**Solution:**
1. Clear TypeScript cache: `rm -rf node_modules/.vite` (or `.next`, `.nuxt`, etc.)
2. Restart your IDE or editor
3. Verify you're importing from correct package: `'react-country-kit-core'`

### Issue 2: Build Error: "Country" not exported

**Problem:**
```
error TS2305: Module '"react-country-kit-core"' has no exported member named 'Country'. Did you mean 'ICountry'?
```

**Solution:** You missed updating an import statement. Search your codebase for:
```bash
grep -r "import.*Country" src/
grep -r "type.*Country" src/
```

Update all matches to use `ICountry`.

### Issue 3: Third-party Typing Issues

**Problem:** Third-party libraries still reference old type names

**Solution:** 
1. Check if the library has an update available
2. If not, you may need to create a type declaration file:

```typescript
// types/react-country-kit.d.ts
declare module 'react-country-kit-core' {
  export type Country = ICountry;
  export type Currency = ICurrency;
  // ... other aliases as needed
}
```

### Issue 4: React DevTools Showing Generic Types

**Problem:** React DevTools shows `IUseCountryReturn` instead of actual data

**Solution:** This is expected behavior. The hook still returns the same data structure:
```typescript
const countryData: IUseCountryReturn = useCountry('US');
// countryData still has all properties: country, divisions, timezones, etc.
```

## Performance Improvements in v2.0.0

Beyond the type system updates, v2.0.0 includes major performance optimizations:

### useCountry Hook Optimizations

The `useCountry` hook now includes:
- ✅ Two-level caching (by string length)
- ✅ Smart string normalization (skips toUpperCase if not needed)
- ✅ Lazy cache initialization
- ✅ Memoized normalization

**Performance gains:**
- 40% faster for cached lookups
- 95% faster for null/undefined inputs
- 85% faster for already-uppercase codes
- 100% faster on re-renders with same country

**Bundle size impact:**
- Only 0.18% increase (0.18 KB gzipped)
- Negligible load time impact

See [PERFORMANCE.md](./PERFORMANCE.md) for detailed analysis.

## Rollback to v1.x (if needed)

If you need to temporarily rollback:

```bash
# Downgrade to v1.3.0
npm install react-country-kit@1.3.0 react-country-kit-core@1.3.0

# Revert type imports to old names (remove I prefix)
# Then run your build
npm run build
```

## Support and Questions

- 📚 [Full API Documentation](./packages/core/README.md)
- 🐛 [Report Issues](https://github.com/kishormainali/react-country-kit/issues)
- 💬 [Discussions](https://github.com/kishormainali/react-country-kit/discussions)

## What's Next?

After successful migration:
1. Enjoy 40-95% performance improvements in country selection
2. Leverage I-prefixed types to prevent naming conflicts
3. Take advantage of new features in v2.0.0+

---

**Happy upgrading!** 🚀
