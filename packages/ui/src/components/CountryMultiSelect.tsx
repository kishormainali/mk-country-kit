import React, { useState } from 'react';
import {
  CommandRoot,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  BasePicker,
  MultiSelectTrigger,
  Flag,
} from './primitives';
import { cn } from '../lib/utils';
import type { ICountryMultiSelectProps, ICountry } from '@mkishor/mk-country-kit-core';
import { getAllCountries, searchCountries } from '@mkishor/mk-country-kit-core';

const MAX_VISIBLE = 3;

export function CountryMultiSelect({
  value,
  onChange,
  placeholder = 'Select countries...',
  maxItems,
  showFlags = true,
  searchable = true,
  disabled = false,
  className,
  label,
}: ICountryMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const items = query ? searchCountries(query) : getAllCountries();

  const isSelected = (c: ICountry) => value.some((s) => s.iso2 === c.iso2);

  const toggle = (country: ICountry) => {
    if (isSelected(country)) {
      onChange(value.filter((c) => c.iso2 !== country.iso2));
    } else {
      if (maxItems !== undefined && value.length >= maxItems) return;
      onChange([...value, country]);
    }
  };

  const remove = (country: ICountry, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((c) => c.iso2 !== country.iso2));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const visibleChips = value.slice(0, MAX_VISIBLE);
  const overflow = value.length - MAX_VISIBLE;

  return (
    <BasePicker
      label={label}
      className={className}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <MultiSelectTrigger
          value={value}
          onRemove={remove}
          onClear={clearAll}
          isOpen={open}
          placeholder={placeholder}
          disabled={disabled}
          renderChip={(c) => (
            <>
              {showFlags && <Flag iso2={c.iso2} flag={c.flag} flagUrl={c.flag_url} />}
              <span className="max-w-[80px] truncate">{c.name}</span>
            </>
          )}
        />
      }
    >
      <CommandRoot>
        {searchable && (
          <CommandInput placeholder="Search countries..." value={query} onValueChange={setQuery} />
        )}
        <CommandList>
          {items.length === 0 && (
            <CommandEmpty>
              <span className="text-2xl opacity-40">🌍</span><span>No countries found</span>
            </CommandEmpty>
          )}
          {items.map((country) => {
            const selected = isSelected(country);
            return (
              <CommandItem
                key={country.iso2}
                onSelect={() => toggle(country)}
                selected={selected}
              >
                {/* Checkbox indicator */}
                <div className={cn(
                  'h-4 w-4 shrink-0 rounded-full border border-border flex items-center justify-center',
                  selected && 'bg-primary border-primary'
                )}>
                  {selected && (
                    <svg className="h-2.5 w-2.5 stroke-white" viewBox="0 0 20 20" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="4 10 8 14 16 6" />
                    </svg>
                  )}
                </div>
                {showFlags && <Flag iso2={country.iso2} flag={country.flag} flagUrl={country.flag_url} />}
                <div className="flex flex-1 flex-col min-w-0">
                  <span className="truncate font-medium">{country.name}</span>
                  <span className="text-[0.7rem] text-muted-foreground">{country.iso3} · +{country.phone_code}</span>
                </div>
              </CommandItem>
            );
          })}
        </CommandList>
      </CommandRoot>
      {value.length > 0 && (
        <div className="flex items-center justify-between border-t border-border px-3 py-2 text-xs text-muted-foreground">
          <span>{value.length} selected{maxItems ? ` / ${maxItems}` : ''}</span>
          <button
            type="button"
            onClick={() => { onChange([]); setOpen(false); }}
            className="text-destructive hover:underline font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </BasePicker>
  );
}
