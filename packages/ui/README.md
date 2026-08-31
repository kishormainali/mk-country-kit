# @mkishor/mk-country-kit-ui

Premium, accessible, and highly customizable React components for countries, currencies, timezones, and more. Built on top of **Radix UI** and styled with **Tailwind CSS**.

Part of the [@mkishor/mk-country-kit-react](https://github.com/kishormainali/@mkishor/mk-country-kit-react) ecosystem.

## 🚀 Installation

```bash
npm install @mkishor/mk-country-kit-ui @mkishor/mk-country-kit-core
```

### Peer Dependencies
Ensure you have the following installed in your project:
```bash
npm install lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-popover
```

## 🎨 Components

### CountryPicker
A searchable country selection component with flag support.

```tsx
import { CountryPicker } from '@mkishor/mk-country-kit-ui';

function App() {
  return (
    <CountryPicker
      label="Country"
      placeholder="Select a country..."
      showFlag={true}
      showPhoneCode={true}
      onChange={(country) => console.log(country)}
    />
  );
}
```

### PhoneInput
International phone number input with automatic formatting and country detection.

```tsx
import { PhoneInput } from '@mkishor/mk-country-kit-ui';

function App() {
  return (
    <PhoneInput
      label="Phone Number"
      defaultCountryIso2="US"
      onChange={(value) => console.log(value)}
    />
  );
}
```

### Other Components
- `CurrencyPicker`: Select currencies with localized symbols.
- `TimezonePicker`: Search and select timezones by IANA name or offset.
- `LanguagePicker`: Support for 180+ languages with native names.
- `DivisionPicker`: State/Province picker filtered by country.
- `CountryMultiSelect`: Select multiple countries with chips/badges.

## 🛠 Primitives

You can also use the underlying primitives to build your own custom pickers:

```tsx
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger,
  CommandRoot,
  CommandInput,
  CommandList,
  CommandItem,
  Flag
} from '@mkishor/mk-country-kit-ui';
```

## 📄 License

MIT
