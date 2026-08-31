# Common Integration Recipes

## Recipe 1: Localized Checkout / Address Form (React / Next.js)

```tsx
'use client';

import React, { useState } from 'react';
import { CountryPicker, DivisionPicker, PhoneInput } from '@mkishor/mk-country-kit-react';
import { useCountry } from '@mkishor/mk-country-kit-core';
import type { ICountry, IDivision, IPhoneValue } from '@mkishor/mk-country-kit-core';
import '@mkishor/mk-country-kit-react/styles';

export function CheckoutAddressForm() {
  const [country, setCountry] = useState<ICountry | null>(null);
  const [division, setDivision] = useState<IDivision | null>(null);
  const [phone, setPhone] = useState<IPhoneValue | null>(null);
  const [taxId, setTaxId] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Dynamically retrieve localized billing labels & rules for selected country
  const { tax, postalCode: postalMeta } = useCountry(country?.iso2);

  return (
    <form className="space-y-4">
      {/* 1. Country Selection */}
      <CountryPicker
        label="Country / Region"
        value={country}
        onChange={(c) => {
          setCountry(c);
          setDivision(null); // Reset sub-division when country changes
        }}
        showFlag
        searchable
      />

      {/* 2. Cascading State / Province Dropdown */}
      <DivisionPicker
        label="State / Province"
        countryIso2={country?.iso2}
        value={division}
        onChange={setDivision}
        disabled={!country}
        searchable
      />

      {/* 3. Localized Postal Code */}
      <div>
        <label>{postalMeta.label || 'Postal Code'}</label>
        <input
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder={`Enter ${postalMeta.label || 'Postal Code'}`}
        />
      </div>

      {/* 4. Localized Tax ID (SSN/EIN in US, VAT in EU, ABN in AU) */}
      {tax.label && (
        <div>
          <label>{tax.label}</label>
          <input
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
            placeholder={tax.placeholder}
          />
        </div>
      )}

      {/* 5. International Phone Number with validation */}
      <PhoneInput
        label="Phone Number"
        value={phone}
        onChange={setPhone}
        defaultCountryIso2={country?.iso2 || 'US'}
      />
    </form>
  );
}
```

---

## Recipe 2: Node.js / Server-Side Phone & Address Validation

```typescript
import {
  getCountryByIso2,
  searchCountries,
  validatePhoneNumber,
  getPhoneValidation,
  formatDateWithPattern
} from '@mkishor/mk-country-kit';

export async function validateCustomerInput(input: {
  countryCode: string;
  phone: string;
}) {
  // 1. Verify country
  const country = getCountryByIso2(input.countryCode);
  if (!country) {
    throw new Error(`Invalid ISO-2 country code: ${input.countryCode}`);
  }

  // 2. Validate phone number using libphonenumber-js engine
  const phoneCheck = getPhoneValidation(input.phone, input.countryCode);
  if (!phoneCheck.isValid) {
    throw new Error(`Invalid phone number for ${country.name}`);
  }

  return {
    countryName: country.name,
    currency: country.currency_code,
    phoneE164: input.phone,
  };
}
```

---

## Recipe 3: Multi-Select Country Filter

```tsx
import React, { useState } from 'react';
import { CountryMultiSelect } from '@mkishor/mk-country-kit-react';
import type { ICountry } from '@mkishor/mk-country-kit-core';
import '@mkishor/mk-country-kit-react/styles';

export function RegionFilter() {
  const [selected, setSelected] = useState<ICountry[]>([]);

  return (
    <CountryMultiSelect
      label="Allowed Countries"
      placeholder="Select one or more countries..."
      values={selected}
      onChange={setSelected}
      showFlag
      searchable
    />
  );
}
```
