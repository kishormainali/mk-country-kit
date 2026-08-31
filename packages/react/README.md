# @mkishor/mk-country-kit-react

Simple, accessible, and high-performance React components for choosing countries, currencies, timezones, and more. This package provides the **Vanilla CSS** version of the components, which are zero-dependency (other than React and core data).

## 🚀 Features

- **Zero-Config**: Works out of the box with any React project.
- **Accessible**: Full keyboard navigation and ARIA support.
- **Responsive**: Optimized for both mobile and desktop views.
- **Reliable Flags**: Automatic image fallback for Windows and older systems.
- **Lightweight**: Tree-shakeable and optimized for bundle size.

## 📦 Installation

```bash
npm install @mkishor/mk-country-kit-react @mkishor/mk-country-kit-core
```

## 🛠 Usage

### Import Styles
To use the vanilla components, you must import the bundled CSS:

```tsx
import '@mkishor/mk-country-kit-react/dist/style.css';
```

### Basic Component Usage

```tsx
import { CountryPicker, PhoneInput } from '@mkishor/mk-country-kit-react';

function App() {
  return (
    <div className="form-group">
      <CountryPicker 
        label="Select Country" 
        onChange={(c) => console.log(c)} 
      />
      
      <PhoneInput 
        label="Phone Number"
        onChange={(v) => console.log(v)} 
      />
    </div>
  );
}
```

## 🎨 Available Components

- `CountryPicker`: Single country selector.
- `CountryMultiSelect`: Multiple country selector with badges.
- `PhoneInput`: Localized phone input with country selector.
- `CurrencyPicker`: Currency selector with symbols.
- `CurrencyMultiSelect`: Multiple currency selector.
- `TimezonePicker`: Searchable timezone selector.
- `LanguagePicker`: Language selector (supports native names).
- `DivisionPicker`: State/Province selector filtered by country.

## 📄 License

MIT
