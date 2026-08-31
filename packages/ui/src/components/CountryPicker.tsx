import React, { useState } from 'react';
import {
  CommandRoot,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  PickerTrigger,
  CheckIcon,
  Badge,
  BasePicker,
  Flag,
} from './primitives';
import { cn } from '../lib/utils';
import type { ICountryPickerProps } from '@mkishor/mk-country-kit-core';
import { getAllCountries, searchCountries } from '@mkishor/mk-country-kit-core';

export function CountryPicker({
  value,
  onChange,
  placeholder = 'Select a country...',
  searchable = true,
  showFlag = true,
  showPhoneCode = false,
  disabled = false,
  className,
  label,
}: ICountryPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const items = query ? searchCountries(query) : getAllCountries();

  const handleSelect = (iso2: string) => {
    const country = getAllCountries().find(
      (c) => c.iso2.toLowerCase() === iso2.toLowerCase()
    );
    if (country) {
      onChange(country);
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <BasePicker
      label={label}
      className={className}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <PickerTrigger
          isOpen={open}
          hasValue={!!value}
          placeholder={placeholder}
          disabled={disabled}
        >
          {value && (
            <>
              {showFlag && <Flag iso2={value.iso2} flag={value.flag} flagUrl={value.flag_url} />}
              <span className="flex-1 text-start truncate">{value.name}</span>
              {showPhoneCode && <Badge>+{value.phone_code}</Badge>}
            </>
          )}
        </PickerTrigger>
      }
    >
      <CommandRoot>
        {searchable && (
          <CommandInput
            placeholder="Search country..."
            value={query}
            onValueChange={setQuery}
          />
        )}
        <CommandList>
          {items.length === 0 && (
            <CommandEmpty>
              <span className="text-2xl opacity-40">🌍</span>
              <span>No countries found</span>
            </CommandEmpty>
          )}
          {items.map((country) => {
            const isSelected = value?.iso2 === country.iso2;
            return (
              <CommandItem
                key={country.iso2}
                onSelect={() => handleSelect(country.iso2)}
                selected={isSelected}
              >
                {showFlag && <Flag iso2={country.iso2} flag={country.flag} flagUrl={country.flag_url} />}
                <div className="flex flex-1 flex-col gap-0 min-w-0">
                  <span className="truncate font-medium">{country.name}</span>
                  <span className="text-[0.7rem] text-muted-foreground">
                    {country.iso3} · {country.division_type}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto shrink-0">
                  {showPhoneCode && (
                    <span className="text-[0.7rem] text-muted-foreground tabular-nums bg-muted px-1.5 py-0.5 rounded">
                      +{country.phone_code}
                    </span>
                  )}
                  {isSelected && <CheckIcon />}
                </div>
              </CommandItem>
            );
          })}
        </CommandList>
      </CommandRoot>
    </BasePicker>
  );
}
