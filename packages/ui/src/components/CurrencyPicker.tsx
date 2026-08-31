import React, { useState, useEffect } from 'react';
import {
  CommandRoot,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  PickerTrigger,
  CheckIcon,
  BasePicker,
} from './primitives';
import { cn } from '../lib/utils';
import type { ICurrencyPickerProps } from '@mkishor/mk-country-kit-core';
import { getAllCurrencies, searchCurrencies } from '@mkishor/mk-country-kit-core';
import { getCurrencyByCountry } from '@mkishor/mk-country-kit-core';

export function CurrencyPicker({
  value,
  onChange,
  placeholder = 'Select a currency...',
  searchable = true,
  showSymbol = true,
  countryIso2,
  autoSelect = true,
  disabled = false,
  className,
  label,
}: ICurrencyPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (countryIso2 && autoSelect && !value) {
      const currency = getCurrencyByCountry(countryIso2);
      if (currency) {
        onChange(currency);
      }
    }
  }, [countryIso2, autoSelect, value, onChange]);

  const getInitialPool = () => {
    if (countryIso2) {
      const countryCurrency = getCurrencyByCountry(countryIso2);
      return countryCurrency ? [countryCurrency] : [];
    }
    return getAllCurrencies();
  };

  const items = query ? searchCurrencies(query, countryIso2) : getInitialPool();

  const handleSelect = (code: string) => {
    const currency = getAllCurrencies().find(
      (c) => c.code.toLowerCase() === code.toLowerCase()
    );
    if (currency) {
      onChange(currency);
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
              {showSymbol && (
                <span className="min-w-[1.5rem] text-center font-bold text-primary text-base">
                  {value.symbol}
                </span>
              )}
              <span className="flex-1 text-start truncate">
                {value.code} — {value.name}
              </span>
            </>
          )}
        </PickerTrigger>
      }
    >
      <CommandRoot>
        {searchable && (
          <CommandInput
            placeholder="Search currency..."
            value={query}
            onValueChange={setQuery}
          />
        )}
        <CommandList>
          {items.length === 0 && (
            <CommandEmpty>
              <span className="text-2xl opacity-40">💰</span>
              <span>No currencies found</span>
            </CommandEmpty>
          )}
          {items.map((currency) => {
            const isSelected = value?.code === currency.code;
            return (
              <CommandItem
                key={currency.code}
                onSelect={() => handleSelect(currency.code)}
                selected={isSelected}
              >
                {showSymbol && (
                  <span className="min-w-[1.5rem] text-center font-bold text-primary">
                    {currency.symbol}
                  </span>
                )}
                <div className="flex flex-1 flex-col gap-0 min-w-0">
                  <span className="truncate font-medium">{currency.name}</span>
                  <span className="text-[0.7rem] text-muted-foreground">{currency.code}</span>
                </div>
                {isSelected && <CheckIcon className="ml-auto shrink-0" />}
              </CommandItem>
            );
          })}
        </CommandList>
      </CommandRoot>
    </BasePicker>
  );
}
