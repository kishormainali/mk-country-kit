import React, { useState } from 'react';
import {
  CountryPicker, CurrencyPicker, TimezonePicker, LanguagePicker, DivisionPicker,
  PhoneInput, CountryMultiSelect, CurrencyMultiSelect,
  useCountry, useDateFormat
} from '@mkishor/mk-country-kit-react';
import {
  CountryPicker as UiCountryPicker,
  CurrencyPicker as UiCurrencyPicker,
  TimezonePicker as UiTimezonePicker,
  LanguagePicker as UiLanguagePicker,
  DivisionPicker as UiDivisionPicker,
  PhoneInput as UiPhoneInput,
  CountryMultiSelect as UiCountryMultiSelect,
  CurrencyMultiSelect as UiCurrencyMultiSelect,
} from '@mkishor/mk-country-kit-ui';
import type { ICountry, ICurrency, ITimezone, ILanguage, IDivision, IPhoneValue, IDateFormat } from '@mkishor/mk-country-kit-core';
import { getAllCountries, getAllCurrencies, getAllTimezones, getAllLanguages } from '@mkishor/mk-country-kit';

const CODE_EXAMPLES: Record<string, string> = {
  install: `npm install @mkishor/mk-country-kit-react @mkishor/mk-country-kit-core

# Vanilla CSS (no Tailwind needed):
import '@mkishor/mk-country-kit-react/styles';

# shadcn/Tailwind variant (no CSS import needed):
# npm install @mkishor/mk-country-kit-ui @mkishor/mk-country-kit-core
# Requires @radix-ui/react-popover, cmdk, tailwind-merge, clsx`,

  vanilla: `import {
  CountryPicker, CurrencyPicker,
  TimezonePicker, LanguagePicker, DivisionPicker,
} from '@mkishor/mk-country-kit-react';
import '@mkishor/mk-country-kit-react/styles';

// Self-contained — no Tailwind required
function VanillaForm() {
  const [country, setCountry] = useState<ICountry | null>(null);
  return (
    <CountryPicker
      value={country}
      onChange={setCountry}
      showFlag showPhoneCode searchable
      label="Country"
    />
  );
}`,

  shadcn: `import {
  CountryPicker, CurrencyPicker,
  TimezonePicker, LanguagePicker, DivisionPicker,
} from '@mkishor/mk-country-kit-ui';
// No CSS import — fully Tailwind driven

// Works with shadcn CSS variable tokens:
// --background, --foreground, --primary, --border,
// --accent, --muted, --popover, --ring, --radius

function ShadcnForm() {
  const [country, setCountry] = useState<ICountry | null>(null);
  return (
    <CountryPicker
      value={country}
      onChange={setCountry}
      showFlag showPhoneCode searchable
      label="Country"
      className="w-full"  // any Tailwind class works
    />
  );
}`,

  hooks: `import { useCountryPicker } from '@mkishor/mk-country-kit-core';

function CustomPicker() {
  const {
    isOpen, toggle, close,
    filteredItems, searchQuery,
    setSearchQuery, selectItem, selectedItem,
  } = useCountryPicker();

  return (
    <YourCustomUI
      onOpen={toggle}
      items={filteredItems}
      onSelect={selectItem}
      selected={selectedItem}
    />
  );
}`,

  utils: `import {
  getAllCountries, getCountryByIso2,
  getAllCurrencies, getAllTimezones,
  getAllLanguages, iso2ToFlag,
} from '@mkishor/mk-country-kit';

const us = getCountryByIso2('US');
console.log(us?.currency);  // { code: 'USD', name: '...', symbol: '$' }
console.log(iso2ToFlag('GB')); // '🇬🇧'`,
};

interface PropInfo {
  name: string;
  type: string;
  desc: string;
}

interface ComponentMetadata {
  description: string;
  props: PropInfo[];
  vanillaCode: string;
  uiCode: string;
}

const COMPONENTS_METADATA: Record<string, ComponentMetadata> = {
  CountryPicker: {
    description: "A searchable dropdown for selecting countries with flag and dial code support.",
    props: [
      { name: "value", type: "Country | null", desc: "Currently selected country object" },
      { name: "onChange", type: "(c: Country) => void", desc: "Selection callback" },
      { name: "showFlag", type: "boolean", desc: "Show emoji flag" },
      { name: "showPhoneCode", type: "boolean", desc: "Show dial code in picker" },
      { name: "searchable", type: "boolean", desc: "Enable search input" },
    ],
    vanillaCode: `<CountryPicker
  value={country}
  onChange={setCountry}
  showFlag showPhoneCode
  searchable label="Country"
/>`,
    uiCode: `<CountryPicker
  value={country}
  onChange={setCountry}
  showFlag showPhoneCode
  searchable label="Country"
  className="w-full"
/>`,
  },
  CurrencyPicker: {
    description: "Pick from 150+ world currencies with symbol and code display. Can auto-select based on country.",
    props: [
      { name: "value", type: "Currency | null", desc: "Selected currency" },
      { name: "countryIso2", type: "string", desc: "Filter and auto-select by country code" },
      { name: "autoSelect", type: "boolean", desc: "Enable auto-selection (default: true)" },
      { name: "showSymbol", type: "boolean", desc: "Show currency symbol" },
    ],
    vanillaCode: `<CurrencyPicker value={currency} onChange={setCurrency} countryIso2={country?.iso2} showSymbol searchable />`,
    uiCode: `<CurrencyPicker value={currency} onChange={setCurrency} countryIso2={country?.iso2} showSymbol searchable />`,
  },
  TimezonePicker: {
    description: "Select timezones by name, offset, or abbreviation. Can be filtered and auto-selected by country.",
    props: [
      { name: "countryIso2", type: "string", desc: "Filter timezones by country code" },
      { name: "autoSelect", type: "boolean", desc: "Enable auto-selection of first timezone (default: true)" },
    ],
    vanillaCode: `<TimezonePicker value={tz} onChange={setTz} countryIso2="US" autoSelect />`,
    uiCode: `<TimezonePicker value={tz} onChange={setTz} countryIso2={country?.iso2} autoSelect />`,
  },
  LanguagePicker: {
    description: "Choose from 180+ languages with optional native name display.",
    props: [
      { name: "showNativeName", type: "boolean", desc: "Show name in original language" },
    ],
    vanillaCode: `<LanguagePicker value={lang} onChange={setLang} showNativeName />`,
    uiCode: `<LanguagePicker value={lang} onChange={setLang} showNativeName />`,
  },
  DivisionPicker: {
    description: "Select states, provinces, or regions based on the parent country.",
    props: [
      { name: "countryIso2", type: "string", desc: "Required. Parent country ISO2 code" },
    ],
    vanillaCode: `<DivisionPicker countryIso2="US" value={state} onChange={setState} />`,
    uiCode: `<DivisionPicker countryIso2={country.iso2} value={state} onChange={setState} />`,
  },
  PhoneInput: {
    description: "A bundled component combining country flag, dial code selection, and input formatting.",
    props: [
      { name: "defaultCountryIso2", type: "string", desc: "Initial country selection" },
    ],
    vanillaCode: `<PhoneInput value={phone} onChange={setPhone} defaultCountryIso2="US" />`,
    uiCode: `<PhoneInput value={phone} onChange={setPhone} defaultCountryIso2="US" />`,
  },
  CountryMultiSelect: {
    description: "Allows selecting multiple countries at once with a chip-based UI and overflow handling.",
    props: [
      { name: "value", type: "Country[]", desc: "Array of selected countries" },
      { name: "maxItems", type: "number", desc: "Max items allowed" },
    ],
    vanillaCode: `<CountryMultiSelect value={selected} onChange={setSelected} maxItems={5} />`,
    uiCode: `<CountryMultiSelect value={selected} onChange={setSelected} maxItems={5} />`,
  },
  CurrencyMultiSelect: {
    description: "Allows selecting multiple currencies with a chip-based UI.",
    props: [
      { name: "value", type: "Currency[]", desc: "Array of selected currencies" },
    ],
    vanillaCode: `<CurrencyMultiSelect value={selected} onChange={setSelected} />`,
    uiCode: `<CurrencyMultiSelect value={selected} onChange={setSelected} />`,
  },
  useDateFormat: {
    description: "A hook providing localized date format patterns, separators, week start day, and formatDate/parseDate helpers.",
    props: [
      { name: "countryIso2", type: "string | null", desc: "ISO2 country code" },
    ],
    vanillaCode: `const {
  dateFormat, formatDate,
  parseDate, placeholder, weekStart
} = useDateFormat(country?.iso2);`,
    uiCode: `const {
  dateFormat, formatDate,
  parseDate, placeholder, weekStart
} = useDateFormat(uiCountry?.iso2);`,
  },
};

function DemoCard({
  icon, title, subtitle, metadata, demoTab, children, result, className = ""
}: {
  icon: string;
  title: string;
  subtitle: string;
  metadata: ComponentMetadata;
  demoTab: DemoTab;
  children: React.ReactNode;
  result: React.ReactNode;
  className?: string;
}) {
  const [showCode, setShowCode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const code = demoTab === 'vanilla' ? metadata.vanillaCode : metadata.uiCode;

  return (
    <div className={`card ${className}`} style={{ position: 'relative' }}>
      <div className="doc-controls">
        <button
          className={`icon-btn ${showInfo ? 'active' : ''}`}
          onClick={() => { setShowInfo(!showInfo); setShowCode(false); }}
          title="Component Info"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
        </button>
        <button
          className={`icon-btn ${showCode ? 'active' : ''}`}
          onClick={() => { setShowCode(!showCode); setShowInfo(false); }}
          title="View Code"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
        </button>
      </div>

      <div className="card-header">
        <div className="card-icon">{icon}</div>
        <div>
          <div className="card-title">{title}</div>
          <div className="card-subtitle">{subtitle}</div>
        </div>
      </div>

      <div style={{ padding: '8px 0' }}>{children}</div>

      {showInfo && (
        <div className="doc-section">
          <p className="card-subtitle" style={{ marginBottom: 12 }}>{metadata.description}</p>
          <div className="prop-table-wrapper">
            <table className="prop-table">
              <thead>
                <tr><th>Prop</th><th>Type</th><th>Description</th></tr>
              </thead>
              <tbody>
                {metadata.props.map(p => (
                  <tr key={p.name}>
                    <td className="prop-name">{p.name}</td>
                    <td className="prop-type">{p.type}</td>
                    <td className="prop-desc">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showCode && (
        <div className="doc-section">
          <div className="card-docs-code">
            <CopyButton text={code} />
            <pre dangerouslySetInnerHTML={{ __html: highlight(code) }} />
          </div>
        </div>
      )}

      <div className="result">{result}</div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`copy-btn ${copied ? 'copied' : ''}`}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="w-4 h-4 text-green-400" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="w-4 h-4 opacity-70" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
}

function highlight(code: string): string {
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/(import|export|from|const|function|return|null|undefined|true|false)\b/g, '<span class="token-purple">$1</span>')
    .replace(/('.*?'|".*?")/g, '<span class="token-yellow">$1</span>')
    .replace(/(\/\/.*)/g, '<span class="token-gray">$1</span>')
    .replace(/\b(CountryPicker|CurrencyPicker|TimezonePicker|LanguagePicker|DivisionPicker|useCountryPicker|getAllCountries|getCountryByIso2|getAllCurrencies|getAllTimezones|getAllLanguages|iso2ToFlag|Country|Currency|Timezone|Language|Division|useCountry|useDateFormat|IDateFormat)\b/g, '<span class="token-blue">$1</span>');
}

type DemoTab = 'vanilla' | 'shadcn';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [demoTab, setDemoTab] = useState<DemoTab>('vanilla');
  const [activeCodeTab, setActiveCodeTab] = useState<keyof typeof CODE_EXAMPLES>('install');

  // Vanilla picker state
  const [country, setCountry] = useState<ICountry | null>(null);
  const [currency, setCurrency] = useState<ICurrency | null>(null);
  const [timezone, setTimezone] = useState<ITimezone | null>(null);
  const [language, setLanguage] = useState<ILanguage | null>(null);
  const [division, setDivision] = useState<IDivision | null>(null);
  const [phone, setPhone] = useState<IPhoneValue | null>(null);
  const [multiCountries, setMultiCountries] = useState<ICountry[]>([]);
  const [multiCurrencies, setMultiCurrencies] = useState<ICurrency[]>([]);
  const [parseInput, setParseInput] = useState('');

  // shadcn/ui picker state (separate)
  const [uiCountry, setUiCountry] = useState<ICountry | null>(null);
  const [uiCurrency, setUiCurrency] = useState<ICurrency | null>(null);
  const [uiTimezone, setUiTimezone] = useState<ITimezone | null>(null);
  const [uiLanguage, setUiLanguage] = useState<ILanguage | null>(null);
  const [uiDivision, setUiDivision] = useState<IDivision | null>(null);
  const [uiPhone, setUiPhone] = useState<IPhoneValue | null>(null);
  const [uiMultiCountries, setUiMultiCountries] = useState<ICountry[]>([]);
  const [uiMultiCurrencies, setUiMultiCurrencies] = useState<ICurrency[]>([]);
  const [uiParseInput, setUiParseInput] = useState('');

  // Date format hooks
  const dateInfo = useDateFormat(country?.iso2);
  const uiDateInfo = useDateFormat(uiCountry?.iso2);

  const allCountries = getAllCountries();
  const allCurrencies = getAllCurrencies();
  const allTimezones = getAllTimezones();
  const allLanguages = getAllLanguages();

  // Used for shadcn picker demo cards background
  const uiCardBg = darkMode
    ? 'bg-[hsl(224,42%,10%)] border border-[hsl(216,34%,17%)] rounded-2xl p-7'
    : 'bg-white border border-gray-200 rounded-2xl p-7 shadow-sm';

  return (
    <div className={darkMode ? '' : 'light-theme'} data-theme={darkMode ? 'dark' : 'light'} style={{ minHeight: '100vh' }}>
      <div className="page">
        {/* Hero */}
        <div className="hero">
          <div className="hero-badge">🌍 npm package</div>
          <h1>react-country-kit</h1>
          <p>
            A comprehensive React picker library for countries, currencies, timezones,
            languages &amp; divisions — with both <strong>vanilla CSS</strong> and{' '}
            <strong>shadcn/Tailwind</strong> variants.
          </p>
          <div className="hero-pills">
            <span className="pill">⚛️ React 17+</span>
            <span className="pill">🔷 TypeScript</span>
            <span className="pill">🌙 Dark Mode</span>
            <span className="pill">♿ Accessible</span>
            <span className="pill">🎣 Headless Hooks</span>
            <span className="pill">🎨 shadcn/Tailwind</span>
            <span className="pill">📦 Zero Runtime Deps*</span>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-num">{allCountries.length}+</div>
            <div className="stat-label">Countries</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{allCurrencies.length}+</div>
            <div className="stat-label">Currencies</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{allTimezones.length}+</div>
            <div className="stat-label">Timezones</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{allLanguages.length}+</div>
            <div className="stat-label">Languages</div>
          </div>
        </div>

        {/* Tab bar (vanilla vs shadcn) + dark mode toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className={`toggle${demoTab === 'vanilla' ? ' active-tab' : ''}`}
              style={demoTab === 'vanilla' ? { borderColor: '#6366f1', color: '#a5b4fc' } : {}}
              onClick={() => setDemoTab('vanilla')}
            >
              🎨 Vanilla CSS
            </button>
            <button
              className={`toggle${demoTab === 'shadcn' ? ' active-tab' : ''}`}
              style={demoTab === 'shadcn' ? { borderColor: '#6366f1', color: '#a5b4fc' } : {}}
              onClick={() => setDemoTab('shadcn')}
            >
              ✨ shadcn / Tailwind
            </button>
          </div>
          <button className="toggle" onClick={() => setDarkMode((d) => !d)}>
            {darkMode ? '☀️' : '🌙'} {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        {/* ── Vanilla CSS Tab ── */}
        {demoTab === 'vanilla' && (
          <div className="pickers-grid">
            <DemoCard
              icon="🌍" title="CountryPicker" subtitle="Vanilla CSS"
              metadata={COMPONENTS_METADATA.CountryPicker} demoTab={demoTab}
              result={
                country ? (
                  <>
                    <div className="result-row"><span className="result-key">Name</span><span className="result-val">{country.flag} {country.name}</span></div>
                    <div className="result-row"><span className="result-key">ISO2/3</span><span className="result-val">{country.iso2} / {country.iso3}</span></div>
                    <div className="result-row"><span className="result-key">Date Format</span><span className="result-val">{country.date_format} (separator: "{country.date_separator}", weekStart: {country.week_start})</span></div>
                  </>
                ) : <div className="result-empty">Select a country</div>
              }
            >
              <CountryPicker
                value={country}
                onChange={(c) => {
                  setCountry(c);
                  setDivision(null);
                  setCurrency(null); // Triggers auto-select
                  setTimezone(null); // Triggers auto-select
                }}
                label="Country" showFlag showPhoneCode searchable
                placeholder="Select a country..."
              />
            </DemoCard>

            <DemoCard
              icon="💱" title="CurrencyPicker" subtitle="Vanilla CSS"
              metadata={COMPONENTS_METADATA.CurrencyPicker} demoTab={demoTab}
              result={
                currency ? (
                  <>
                    <div className="result-row"><span className="result-key">Code</span><span className="result-val">{currency.code}</span></div>
                    <div className="result-row"><span className="result-key">Name</span><span className="result-val">{currency.name}</span></div>
                  </>
                ) : <div className="result-empty">Select a currency</div>
              }
            >
              <CurrencyPicker value={currency} onChange={setCurrency} label="Currency" countryIso2={country?.iso2} showSymbol searchable />
            </DemoCard>

            <DemoCard
              icon="🕐" title="TimezonePicker" subtitle="Vanilla CSS"
              metadata={COMPONENTS_METADATA.TimezonePicker} demoTab={demoTab}
              result={
                timezone ? (
                  <>
                    <div className="result-row"><span className="result-key">Name</span><span className="result-val">{timezone.name}</span></div>
                    <div className="result-row"><span className="result-key">Offset</span><span className="result-val">{timezone.offset_name}</span></div>
                  </>
                ) : <div className="result-empty">Select a timezone</div>
              }
            >
              <TimezonePicker value={timezone} onChange={setTimezone} label="Timezone" countryIso2={country?.iso2} searchable />
            </DemoCard>

            <DemoCard
              icon="🗣️" title="LanguagePicker" subtitle="Vanilla CSS"
              metadata={COMPONENTS_METADATA.LanguagePicker} demoTab={demoTab}
              result={
                language ? (
                  <>
                    <div className="result-row"><span className="result-key">English</span><span className="result-val">{language.english_name}</span></div>
                    <div className="result-row"><span className="result-key">Native</span><span className="result-val">{language.native_name}</span></div>
                  </>
                ) : <div className="result-empty">Select a language</div>
              }
            >
              <LanguagePicker value={language} onChange={setLanguage} label="Language" showNativeName searchable />
            </DemoCard>

            <DemoCard
              icon="🗺️" title="DivisionPicker" subtitle="Vanilla CSS"
              className="full" metadata={COMPONENTS_METADATA.DivisionPicker} demoTab={demoTab}
              result={
                division ? (
                  <>
                    <div className="result-row"><span className="result-key">Name</span><span className="result-val">{division.name}</span></div>
                    <div className="result-row"><span className="result-key">Code</span><span className="result-val">{division.iso2}</span></div>
                  </>
                ) : <div className="result-empty">{country ? `Select a ${country.division_type}` : 'Select a country first'}</div>
              }
            >
              <DivisionPicker
                countryIso2={country?.iso2 ?? ''} value={division} onChange={setDivision}
                label={country ? country.division_type : 'Division'} searchable disabled={!country}
              />
            </DemoCard>

            <DemoCard
              icon="📞" title="PhoneInput" subtitle="Vanilla CSS"
              className="full" metadata={COMPONENTS_METADATA.PhoneInput} demoTab={demoTab}
              result={
                phone ? (
                  <div className="result-row"><span className="result-key">Full</span><span className="result-val">{phone.full}</span></div>
                ) : <div className="result-empty">Enter a phone number</div>
              }
            >
              <PhoneInput value={phone} onChange={setPhone} label="Phone" defaultCountryIso2="US" showFlag />
            </DemoCard>

            <DemoCard
              icon="🌍" title="CountryMultiSelect" subtitle="Vanilla CSS"
              metadata={COMPONENTS_METADATA.CountryMultiSelect} demoTab={demoTab}
              result={
                multiCountries.length > 0 ? (
                  multiCountries.map(c => (
                    <div key={c.iso2} className="result-row"><span className="result-key">{c.iso2}</span><span className="result-val">{c.flag} {c.name}</span></div>
                  ))
                ) : <div className="result-empty">Select countries</div>
              }
            >
              <CountryMultiSelect value={multiCountries} onChange={setMultiCountries} label="Countries" showFlags searchable />
            </DemoCard>

             <DemoCard
              icon="💱" title="CurrencyMultiSelect" subtitle="Vanilla CSS"
              metadata={COMPONENTS_METADATA.CurrencyMultiSelect} demoTab={demoTab}
              result={
                multiCurrencies.length > 0 ? (
                  multiCurrencies.map(c => (
                    <div key={c.code} className="result-row"><span className="result-key">{c.code}</span><span className="result-val">{c.symbol} {c.name}</span></div>
                  ))
                ) : <div className="result-empty">Select currencies</div>
              }
            >
              <CurrencyMultiSelect value={multiCurrencies} onChange={setMultiCurrencies} label="Currencies" showSymbol searchable />
            </DemoCard>

            <DemoCard
              icon="📅" title="useDateFormat (Utility Hook)" subtitle="Vanilla CSS"
              className="full" metadata={COMPONENTS_METADATA.useDateFormat} demoTab={demoTab}
              result={
                country ? (
                  <>
                    <div className="result-row"><span className="result-key">Format Pattern</span><span className="result-val">{dateInfo.placeholder}</span></div>
                    <div className="result-row"><span className="result-key">Separator</span><span className="result-val">"{dateInfo.dateFormat?.separator}"</span></div>
                    <div className="result-row"><span className="result-key">Week Start</span><span className="result-val">{dateInfo.weekStart} ({dateInfo.weekStart === 0 ? 'Sunday' : dateInfo.weekStart === 6 ? 'Saturday' : dateInfo.weekStart === 5 ? 'Friday' : 'Monday'})</span></div>
                    <div className="result-row"><span className="result-key">Formatted Today</span><span className="result-val">{dateInfo.formatDate(new Date())}</span></div>
                    <div className="result-row">
                      <span className="result-key">Parse Output</span>
                      <span className="result-val">
                        {parseInput ? (
                          dateInfo.parseDate(parseInput) ? `Valid Date: ${dateInfo.parseDate(parseInput)?.toDateString()}` : 'Invalid format'
                        ) : 'Type a date matching the pattern to parse'}
                      </span>
                    </div>
                  </>
                ) : <div className="result-empty">Select a country above to see date formatting info</div>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 500, opacity: 0.7 }}>Test parseDate (pattern: {dateInfo.placeholder || 'select country'})</label>
                <input
                  type="text"
                  value={parseInput}
                  onChange={(e) => setParseInput(e.target.value)}
                  placeholder={dateInfo.placeholder || "Enter date string"}
                  disabled={!country}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 6,
                    padding: '8px 12px',
                    color: 'inherit',
                    fontSize: '0.875rem',
                    width: '100%',
                  }}
                />
              </div>
            </DemoCard>
          </div>
        )}


        {/* ── shadcn / Tailwind Tab ── */}
        {demoTab === 'shadcn' && (
          <>
            {/* Info banner */}
            <div style={{
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: 12,
              padding: '14px 18px',
              marginBottom: 24,
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              fontSize: '0.85rem',
              color: '#a5b4fc',
            }}>
              <span style={{ fontSize: '1.1rem' }}>✨</span>
              <div>
                <strong>react-country-kit/ui</strong> — Built on{' '}
                <code style={{ background: 'rgba(99,102,241,0.18)', padding: '1px 6px', borderRadius: 4 }}>@radix-ui/react-popover</code>
                {' + '}
                <code style={{ background: 'rgba(99,102,241,0.18)', padding: '1px 6px', borderRadius: 4 }}>cmdk</code>.
                Uses <strong>CSS variables</strong> from shadcn/ui.
                No CSS file import needed — fully controlled by Tailwind.
              </div>
            </div>

            <div className="pickers-grid">
              <DemoCard
                icon="🌍" title="CountryPicker" subtitle="shadcn / UI"
                metadata={COMPONENTS_METADATA.CountryPicker} demoTab={demoTab}
                result={
                  uiCountry ? (
                    <>
                      <div className="result-row"><span className="result-key">Name</span><span className="result-val">{uiCountry.flag} {uiCountry.name}</span></div>
                      <div className="result-row"><span className="result-key">ISO2</span><span className="result-val">{uiCountry.iso2}</span></div>
                      <div className="result-row"><span className="result-key">Date Format</span><span className="result-val">{uiCountry.date_format} (separator: "{uiCountry.date_separator}", weekStart: {uiCountry.week_start})</span></div>
                    </>
                  ) : <div className="result-empty">Select a country</div>
                }
              >
                <UiCountryPicker
                  value={uiCountry}
                  onChange={(c) => {
                    setUiCountry(c);
                    setUiDivision(null);
                    setUiCurrency(null); // Triggers auto-select
                    setUiTimezone(null); // Triggers auto-select
                  }}
                  label="Country" showFlag showPhoneCode searchable
                  placeholder="Select a country..."
                />
              </DemoCard>

              <DemoCard
                icon="💱" title="CurrencyPicker" subtitle="shadcn / UI"
                metadata={COMPONENTS_METADATA.CurrencyPicker} demoTab={demoTab}
                result={
                  uiCurrency ? (
                    <>
                      <div className="result-row"><span className="result-key">Code</span><span className="result-val">{uiCurrency.code}</span></div>
                      <div className="result-row"><span className="result-key">Name</span><span className="result-val">{uiCurrency.name}</span></div>
                    </>
                  ) : <div className="result-empty">Select a currency</div>
                }
              >
                <UiCurrencyPicker value={uiCurrency} onChange={setUiCurrency} label="Currency" countryIso2={uiCountry?.iso2} showSymbol searchable />
              </DemoCard>

              <DemoCard
                icon="🕐" title="TimezonePicker" subtitle="shadcn / UI"
                metadata={COMPONENTS_METADATA.TimezonePicker} demoTab={demoTab}
                result={
                  uiTimezone ? (
                    <>
                      <div className="result-row"><span className="result-key">Name</span><span className="result-val">{uiTimezone.name}</span></div>
                      <div className="result-row"><span className="result-key">Offset</span><span className="result-val">{uiTimezone.offset_name}</span></div>
                    </>
                  ) : <div className="result-empty">Select a timezone</div>
                }
              >
                <UiTimezonePicker value={uiTimezone} onChange={setUiTimezone} label="Timezone" countryIso2={uiCountry?.iso2} searchable />
              </DemoCard>

              <DemoCard
                icon="🗣️" title="LanguagePicker" subtitle="shadcn / UI"
                metadata={COMPONENTS_METADATA.LanguagePicker} demoTab={demoTab}
                result={
                  uiLanguage ? (
                    <>
                      <div className="result-row"><span className="result-key">English</span><span className="result-val">{uiLanguage.english_name}</span></div>
                      <div className="result-row"><span className="result-key">Native</span><span className="result-val">{uiLanguage.native_name}</span></div>
                    </>
                  ) : <div className="result-empty">Select a language</div>
                }
              >
                <UiLanguagePicker value={uiLanguage} onChange={setUiLanguage} label="Language" showNativeName searchable />
              </DemoCard>

              <DemoCard
                icon="🗺️" title="DivisionPicker" subtitle="shadcn / UI"
                className="full" metadata={COMPONENTS_METADATA.DivisionPicker} demoTab={demoTab}
                result={
                  uiDivision ? (
                    <>
                      <div className="result-row"><span className="result-key">Name</span><span className="result-val">{uiDivision.name}</span></div>
                      <div className="result-row"><span className="result-key">Code</span><span className="result-val">{uiDivision.iso2}</span></div>
                    </>
                  ) : <div className="result-empty">Select a division</div>
                }
              >
                <UiDivisionPicker
                  countryIso2={uiCountry?.iso2 ?? ''} value={uiDivision} onChange={setUiDivision}
                  label={uiCountry ? uiCountry.division_type : 'Division'} searchable disabled={!uiCountry}
                />
              </DemoCard>

              <DemoCard
                icon="📞" title="PhoneInput" subtitle="shadcn / UI"
                className="full" metadata={COMPONENTS_METADATA.PhoneInput} demoTab={demoTab}
                result={
                  uiPhone ? (
                    <div className="result-row"><span className="result-key">Full</span><span className="result-val">{uiPhone.full}</span></div>
                  ) : <div className="result-empty">Enter a phone number</div>
                }
              >
                <UiPhoneInput value={uiPhone} onChange={setUiPhone} label="Phone" defaultCountryIso2="US" showFlag />
              </DemoCard>

              <DemoCard
                icon="🌍" title="CountryMultiSelect" subtitle="shadcn / UI"
                metadata={COMPONENTS_METADATA.CountryMultiSelect} demoTab={demoTab}
                result={
                  uiMultiCountries.length > 0 ? (
                    uiMultiCountries.map(c => (
                      <div key={c.iso2} className="result-row"><span className="result-key">{c.iso2}</span><span className="result-val">{c.flag} {c.name}</span></div>
                    ))
                  ) : <div className="result-empty">Select countries</div>
                }
              >
                <UiCountryMultiSelect value={uiMultiCountries} onChange={setUiMultiCountries} label="Countries" showFlags searchable />
              </DemoCard>

               <DemoCard
                icon="💱" title="CurrencyMultiSelect" subtitle="shadcn / UI"
                metadata={COMPONENTS_METADATA.CurrencyMultiSelect} demoTab={demoTab}
                result={
                  uiMultiCurrencies.length > 0 ? (
                    uiMultiCurrencies.map(c => (
                      <div key={c.code} className="result-row"><span className="result-key">{c.code}</span><span className="result-val">{c.symbol} {c.name}</span></div>
                    ))
                  ) : <div className="result-empty">Select currencies</div>
                }
              >
                <UiCurrencyMultiSelect value={uiMultiCurrencies} onChange={setUiMultiCurrencies} label="Currencies" showSymbol searchable />
              </DemoCard>

              <DemoCard
                icon="📅" title="useDateFormat (Utility Hook)" subtitle="shadcn / UI"
                className="full" metadata={COMPONENTS_METADATA.useDateFormat} demoTab={demoTab}
                result={
                  uiCountry ? (
                    <>
                      <div className="result-row"><span className="result-key">Format Pattern</span><span className="result-val">{uiDateInfo.placeholder}</span></div>
                      <div className="result-row"><span className="result-key">Separator</span><span className="result-val">"{uiDateInfo.dateFormat?.separator}"</span></div>
                      <div className="result-row"><span className="result-key">Week Start</span><span className="result-val">{uiDateInfo.weekStart} ({uiDateInfo.weekStart === 0 ? 'Sunday' : uiDateInfo.weekStart === 6 ? 'Saturday' : uiDateInfo.weekStart === 5 ? 'Friday' : 'Monday'})</span></div>
                      <div className="result-row"><span className="result-key">Formatted Today</span><span className="result-val">{uiDateInfo.formatDate(new Date())}</span></div>
                      <div className="result-row">
                        <span className="result-key">Parse Output</span>
                        <span className="result-val">
                          {uiParseInput ? (
                            uiDateInfo.parseDate(uiParseInput) ? `Valid Date: ${uiDateInfo.parseDate(uiParseInput)?.toDateString()}` : 'Invalid format'
                          ) : 'Type a date matching the pattern to parse'}
                        </span>
                      </div>
                    </>
                  ) : <div className="result-empty">Select a country above to see date formatting info</div>
                }
              >
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-muted-foreground">Test parseDate (pattern: {uiDateInfo.placeholder || 'select country'})</label>
                  <input
                    type="text"
                    value={uiParseInput}
                    onChange={(e) => setUiParseInput(e.target.value)}
                    placeholder={uiDateInfo.placeholder || "Enter date string"}
                    disabled={!uiCountry}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </DemoCard>
            </div>
          </>
        )}


        {/* Code section */}
        <div className="code-section">
          <div className="code-tabs">
            {(Object.keys(CODE_EXAMPLES) as (keyof typeof CODE_EXAMPLES)[]).map((tab) => (
              <button
                key={tab}
                className={`code-tab${activeCodeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveCodeTab(tab)}
              >
                {tab === 'install' ? '📦 Install'
                  : tab === 'vanilla' ? '🎨 Vanilla'
                    : tab === 'shadcn' ? '✨ shadcn/UI'
                      : tab === 'hooks' ? '🎣 Hooks'
                        : '🛠️ Utils'}
              </button>
            ))}
          </div>
          <div className="code-wrapper">
            <CopyButton text={CODE_EXAMPLES[activeCodeTab]} />
            <pre dangerouslySetInnerHTML={{ __html: highlight(CODE_EXAMPLES[activeCodeTab]) }} />
          </div>
        </div>
      </div>
    </div>
  );
}
