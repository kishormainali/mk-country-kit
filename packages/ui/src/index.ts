/**
 * react-country-kit-ui
 *
 * shadcn/Tailwind CSS variants of all pickers.
 * Built on @radix-ui/react-popover with native search/list primitives.
 */

// ── Components ────────────────────────────────────────────────────────────────
export { CountryMultiSelect } from './components/CountryMultiSelect';
export { CountryPicker } from './components/CountryPicker';
export { CurrencyMultiSelect } from './components/CurrencyMultiSelect';
export { CurrencyPicker } from './components/CurrencyPicker';
export { DivisionPicker } from './components/DivisionPicker';
export { LanguagePicker } from './components/LanguagePicker';
export { PhoneInput } from './components/PhoneInput';
export { TimezonePicker } from './components/TimezonePicker';

// ── Primitives (for building custom pickers) ──────────────────────────────────
export {
  Badge,
  CheckIcon,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandRoot,
  Flag,
  PickerTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger
} from './components/primitives';

// ── Utilities ─────────────────────────────────────────────────────────────────
export { cn } from './lib/utils';

// ── Re-export everything from core (hooks, utils, types) ───────────────────────
export * from '@mkishor/mk-country-kit-core';

