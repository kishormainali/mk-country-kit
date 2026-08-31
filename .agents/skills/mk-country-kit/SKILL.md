---
name: mk-country-kit
description: >-
  Integration guide and best practices for consuming MK Country Kit packages
  (@mkishor/mk-country-kit, @mkishor/mk-country-kit-core, @mkishor/mk-country-kit-ui, @mkishor/mk-country-kit-react)
  in React, Next.js, Node.js, and web applications. Use whenever adding country pickers, international phone inputs
  with validation, currency selectors, timezone pickers, native language selectors, cascading state/division dropdowns,
  or localized billing and address forms (tax ID labels, postal code formats).
---

# MK Country Kit Integration

Integration runbook for `@mkishor/mk-country-kit-*` packages in React, Next.js, and Node.js applications.

---

## ⚡ Quick Decision Matrix

| Stack / Requirement                    | Package to Install                                                 | Peer Dependencies                                                               |
| :------------------------------------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **Standard React (No Tailwind)**       | `npm i @mkishor/mk-country-kit-react @mkishor/mk-country-kit-core` | `react >= 17`                                                                   |
| **Shadcn / Tailwind CSS**              | `npm i @mkishor/mk-country-kit-ui @mkishor/mk-country-kit-core`    | `@radix-ui/react-popover`, `clsx`, `tailwind-merge`, `class-variance-authority` |
| **Headless Hooks / Custom UI**         | `npm i @mkishor/mk-country-kit-core`                               | `react >= 17`                                                                   |
| **Node.js / Server / SSR / Non-React** | `npm i @mkishor/mk-country-kit`                                    | None                                                                            |

For deeper configuration and bundler setup, see [Packages Reference](./references/packages.md).

---

## ⚠️ Critical Rules for AI Agents

1. **`I`-Prefixed Types**: ALL exported types use `I`-prefix (`ICountry`, `ICurrency`, `ITimezone`, `IDivision`, `ILanguage`, `IPhoneValue`, `IPhoneValidation`, `ICountryPickerProps`, etc.). Never import unprefixed `Country` or `Currency`. See [Types Reference](./references/types.md).
2. **Vanilla CSS Requirement**: When using `@mkishor/mk-country-kit-react`, you MUST import the CSS once:
   ```tsx
   import "@mkishor/mk-country-kit-react/styles";
   ```
3. **Next.js App Router**: Components using pickers or hooks must include `'use client';` at the top. Server Components should import pure data functions directly from `@mkishor/mk-country-kit`.

---

## 🚀 Quick Patterns

### 1. Vanilla React (Country + State/Division + Phone)

```tsx
"use client";
import React, { useState } from "react";
import {
  CountryPicker,
  DivisionPicker,
  PhoneInput,
} from "@mkishor/mk-country-kit-react";
import type {
  ICountry,
  IDivision,
  IPhoneValue,
} from "@mkishor/mk-country-kit-core";
import "@mkishor/mk-country-kit-react/styles";

export function UserForm() {
  const [country, setCountry] = useState<ICountry | null>(null);
  const [division, setDivision] = useState<IDivision | null>(null);
  const [phone, setPhone] = useState<IPhoneValue | null>(null);

  return (
    <>
      <CountryPicker
        value={country}
        onChange={(c) => {
          setCountry(c);
          setDivision(null);
        }}
        showFlag
        showPhoneCode
        searchable
      />
      <DivisionPicker
        countryIso2={country?.iso2}
        value={division}
        onChange={setDivision}
        disabled={!country}
        searchable
      />
      <PhoneInput
        value={phone}
        onChange={setPhone}
        defaultCountryIso2={country?.iso2 || "US"}
      />
    </>
  );
}
```

### 2. Unified Metadata Hook (`useCountry`)

Fetches localized billing metadata, tax ID labels (SSN/VAT/ABN), postal labels, timezones, and states in one call:

```tsx
import { useCountry } from "@mkishor/mk-country-kit-core";

function BillingInfo({ countryIso2 = "US" }) {
  const { country, divisions, currency, tax, postalCode, timezones } =
    useCountry(countryIso2);
  return (
    <div>
      <p>
        {country?.name} ({currency?.code})
      </p>
      <input placeholder={tax.placeholder} aria-label={tax.label} />
      <input placeholder={`Enter ${postalCode.label}`} />
    </div>
  );
}
```

For complete hook signatures, see [Hooks Reference](./references/hooks.md).

### 3. Server-Side / Node.js

```typescript
import {
  getCountryByIso2,
  validatePhoneNumber,
  searchCountries,
} from "@mkishor/mk-country-kit";

const country = getCountryByIso2("US");
const isValid = validatePhoneNumber("+12025550199", "US"); // true
const searchResults = searchCountries("japan");
```

---

## 📚 Deep Dive References

For detailed specifications, open the following guides as needed:

- 📦 **[Packages & Setup Guide](./references/packages.md)**: Bundler tips, peer dependency details, and Next.js setup.
- 🏷 **[TypeScript Types Guide](./references/types.md)**: Full interfaces for `ICountry`, `ICurrency`, `ITimezone`, `IDivision`, `IPhoneValue`, etc.
- 🧠 **[Hooks Reference](./references/hooks.md)**: Signatures and return schemas for `useCountry`, `useCountryPicker`, `usePhoneInput`, `useDivisionPicker`.
- 📋 **[Integration Recipes](./references/recipes.md)**: Full checkout forms, multi-select pickers, and server-side validation routines.
