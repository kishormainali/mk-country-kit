# Headless React Hooks Reference

Import all hooks from `@mkishor/mk-country-kit-core`:

```typescript
import {
  useCountry,
  useCountryPicker,
  useCurrencyPicker,
  useTimezonePicker,
  useLanguagePicker,
  useDivisionPicker,
  usePhoneInput,
  useMultiSelect,
  useDateFormat
} from '@mkishor/mk-country-kit-core';
```

---

## 1. `useCountry(countryCode?: string | null)`

Returns all metadata associated with a country in a single optimized, cached call:

```typescript
const {
  country,          // ICountry | null
  divisions,        // IDivision[] (States/Provinces)
  timezones,        // ITimezone[] (Available timezones)
  currency,         // ICurrency | null
  phoneFormat,      // IPhoneFormat | null
  phoneLengths,     // number[] (Valid telephone lengths)
  tax,              // { label: string, placeholder: string } (Localized Tax ID)
  postalCode,       // { label: string } (Localized Postal Code)
  dateFormat,       // IDateFormat | null (CLDR date format)
} = useCountry('US');
```

---

## 2. `useCountryPicker(value?, onChange?)` / `useCurrencyPicker` / `useTimezonePicker` / `useLanguagePicker`

Standard picker hook for list filtering, search state, and keyboard/focus management:

```typescript
const {
  isOpen,           // boolean
  searchQuery,      // string
  setSearchQuery,   // (query: string) => void
  filteredItems,    // T[] (Filtered items based on search)
  selectedItem,     // T | null
  selectItem,       // (item: T) => void
  toggle,           // () => void
  open,             // () => void
  close,            // () => void
} = useCountryPicker(value, onChange);
```

---

## 3. `useDivisionPicker(countryIso2?, value?, onChange?)`

Automatically scopes divisions (states/provinces) to the given `countryIso2`:

```typescript
const {
  filteredItems,    // IDivision[] filtered to countryIso2 & search query
  selectedItem,     // IDivision | null
  selectItem,
  searchQuery,
  setSearchQuery,
  isOpen,
  toggle,
  close
} = useDivisionPicker('US', selectedDivision, setSelectedDivision);
```

---

## 4. `usePhoneInput(value?, onChange?, defaultCountryIso2?)`

Handles phone input state, dynamic country detection, formatting, and validation:

```typescript
const {
  country,          // ICountry (Currently selected phone country)
  setCountry,       // (country: ICountry) => void
  phoneNumber,      // string (Formatted national number)
  setPhoneNumber,   // (val: string) => void
  isValid,          // boolean (libphonenumber-js validation status)
  isPossible,       // boolean
  formattedValue,   // IPhoneValue ({ countryCode, nationalNumber, number })
  isOpen,           // boolean (Country dropdown open state)
  toggle,           // () => void
  close             // () => void
} = usePhoneInput(phoneValue, setPhoneValue, 'US');
```
