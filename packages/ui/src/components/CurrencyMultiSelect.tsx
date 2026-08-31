import React, { useState } from 'react';
import {
  CommandRoot,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  BasePicker,
  MultiSelectTrigger,
} from './primitives';
import { cn } from '../lib/utils';
import type { ICurrencyMultiSelectProps, ICurrency } from '@mkishor/mk-country-kit-core';
import { getAllCurrencies, searchCurrencies } from '@mkishor/mk-country-kit-core';

const MAX_VISIBLE = 3;

export function CurrencyMultiSelect({
  value,
  onChange,
  placeholder = 'Select currencies...',
  maxItems,
  showSymbol = true,
  searchable = true,
  disabled = false,
  className,
  label,
}: ICurrencyMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const items = query ? searchCurrencies(query) : getAllCurrencies();
  const isSelected = (c: ICurrency) => value.some((s) => s.code === c.code);

  const toggle = (currency: ICurrency) => {
    if (isSelected(currency)) {
      onChange(value.filter((c) => c.code !== currency.code));
    } else {
      if (maxItems !== undefined && value.length >= maxItems) return;
      onChange([...value, currency]);
    }
  };

  const remove = (currency: ICurrency, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((c) => c.code !== currency.code));
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
              {showSymbol && <span className="font-bold">{c.symbol}</span>}
              <span>{c.code}</span>
            </>
          )}
        />
      }
    >
      <CommandRoot>
        {searchable && (
          <CommandInput placeholder="Search currencies..." value={query} onValueChange={setQuery} />
        )}
        <CommandList>
          {items.length === 0 && (
            <CommandEmpty>
              <span className="text-2xl opacity-40">💰</span><span>No currencies found</span>
            </CommandEmpty>
          )}
          {items.map((currency) => {
            const selected = isSelected(currency);
            return (
              <CommandItem
                key={currency.code}
                onSelect={() => toggle(currency)}
                selected={selected}
              >
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
                {showSymbol && (
                  <span className="min-w-[1.5rem] text-center font-bold text-primary">{currency.symbol}</span>
                )}
                <div className="flex flex-1 flex-col min-w-0">
                  <span className="truncate font-medium">{currency.name}</span>
                  <span className="text-[0.7rem] text-muted-foreground">{currency.code}</span>
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
