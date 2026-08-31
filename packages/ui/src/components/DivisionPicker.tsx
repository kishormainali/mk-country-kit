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
} from './primitives';
import { cn } from '../lib/utils';
import type { IDivisionPickerProps } from '@mkishor/mk-country-kit-core';
import { getDivisionsByCountry } from '@mkishor/mk-country-kit-core';

export function DivisionPicker({
  countryIso2,
  value,
  onChange,
  placeholder = 'Select a division...',
  searchable = true,
  disabled = false,
  className,
  label,
}: IDivisionPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const allDivisions = getDivisionsByCountry(countryIso2);
  const items = query
    ? allDivisions.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.iso2.toLowerCase().includes(query.toLowerCase()) ||
          d.timezone.toLowerCase().includes(query.toLowerCase())
      )
    : allDivisions;

  const isDisabled = disabled || !countryIso2 || allDivisions.length === 0;

  const handleSelect = (name: string) => {
    const division = allDivisions.find((d) => d.name === name);
    if (division) {
      onChange(division);
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <BasePicker
      label={label}
      className={className}
      open={open}
      onOpenChange={(o) => !isDisabled && setOpen(o)}
      trigger={
        <PickerTrigger
          isOpen={open}
          hasValue={!!value}
          placeholder={
            !countryIso2
              ? 'Select a country first'
              : placeholder
          }
          disabled={isDisabled}
        >
          {value && (
            <>
              <span className="flex-1 text-start truncate">{value.name}</span>
              <Badge>{value.iso2}</Badge>
            </>
          )}
        </PickerTrigger>
      }
    >
      <CommandRoot>
        {searchable && (
          <CommandInput
            placeholder="Search division..."
            value={query}
            onValueChange={setQuery}
          />
        )}
        <CommandList>
          {items.length === 0 && (
            <CommandEmpty>
              <span className="text-2xl opacity-40">🗺️</span>
              <span>No divisions found</span>
            </CommandEmpty>
          )}
          {items.map((division) => {
            const isSelected =
              value?.iso2 === division.iso2 && value?.name === division.name;
            return (
              <CommandItem
                key={`${division.iso2}-${division.name}`}
                onSelect={() => handleSelect(division.name)}
                selected={isSelected}
              >
                <div className="flex flex-1 flex-col gap-0 min-w-0">
                  <span className="truncate font-medium">{division.name}</span>
                  <span className="text-[0.7rem] text-muted-foreground truncate">
                    {division.timezone}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto shrink-0">
                  <Badge>{division.iso2}</Badge>
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
