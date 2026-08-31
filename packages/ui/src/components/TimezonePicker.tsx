import React, { useState, useEffect } from 'react';
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
} from './primitives';
import { cn } from '../lib/utils';
import type { ITimezonePickerProps } from '@mkishor/mk-country-kit-core';
import { getAllTimezones, searchTimezones } from '@mkishor/mk-country-kit-core';
import { getTimezonesByCountry } from '@mkishor/mk-country-kit-core';

export function TimezonePicker({
  value,
  onChange,
  placeholder = 'Select a timezone...',
  searchable = true,
  countryIso2,
  autoSelect = true,
  disabled = false,
  className,
  label,
}: ITimezonePickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (countryIso2 && autoSelect && !value) {
      const tzs = getTimezonesByCountry(countryIso2);
      if (tzs && tzs.length > 0) {
        onChange(tzs[0]);
      }
    }
  }, [countryIso2, autoSelect, value, onChange]);

  const pool = countryIso2 ? getTimezonesByCountry(countryIso2) : getAllTimezones();
  const items = query ? searchTimezones(query, countryIso2) : pool;

  const handleSelect = (name: string) => {
    const tz = pool.find((t) => t.name === name);
    if (tz) {
      onChange(tz);
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
              <span className="flex-1 text-start truncate">{value.name}</span>
              <Badge>{value.offset_name}</Badge>
            </>
          )}
        </PickerTrigger>
      }
    >
      <CommandRoot>
        {searchable && (
          <CommandInput
            placeholder="Search timezone..."
            value={query}
            onValueChange={setQuery}
          />
        )}
        <CommandList>
          {items.length === 0 && (
            <CommandEmpty>
              <span className="text-2xl opacity-40">🕐</span>
              <span>No timezones found</span>
            </CommandEmpty>
          )}
          {items.map((tz) => {
            const isSelected = value?.name === tz.name;
            return (
              <CommandItem
                key={tz.name}
                onSelect={() => handleSelect(tz.name)}
                selected={isSelected}
              >
                <div className="flex flex-1 flex-col gap-0 min-w-0">
                  <span className="truncate font-medium">{tz.name}</span>
                  <span className="text-[0.7rem] text-muted-foreground">
                    {tz.tzName} · {tz.abbreviation}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto shrink-0">
                  <Badge className="tabular-nums text-[0.65rem]">{tz.offset_name}</Badge>
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
