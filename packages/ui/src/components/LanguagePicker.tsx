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
import type { ILanguagePickerProps } from '@mkishor/mk-country-kit-core';
import { getAllLanguages, searchLanguages } from '@mkishor/mk-country-kit-core';

export function LanguagePicker({
  value,
  onChange,
  placeholder = 'Select a language...',
  searchable = true,
  showNativeName = true,
  disabled = false,
  className,
  label,
}: ILanguagePickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const items = query ? searchLanguages(query) : getAllLanguages();

  const handleSelect = (code: string) => {
    const lang = getAllLanguages().find(
      (l) => l.code.toLowerCase() === code.toLowerCase()
    );
    if (lang) {
      onChange(lang);
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
              <span className="flex-1 text-start truncate">{value.english_name}</span>
              {showNativeName && value.native_name !== value.english_name && (
                <span className="text-xs italic text-muted-foreground shrink-0">
                  {value.native_name}
                </span>
              )}
            </>
          )}
        </PickerTrigger>
      }
    >
      <CommandRoot>
        {searchable && (
          <CommandInput
            placeholder="Search language..."
            value={query}
            onValueChange={setQuery}
          />
        )}
        <CommandList>
          {items.length === 0 && (
            <CommandEmpty>
              <span className="text-2xl opacity-40">🌐</span>
              <span>No languages found</span>
            </CommandEmpty>
          )}
          {items.map((lang) => {
            const isSelected = value?.code === lang.code;
            return (
              <CommandItem
                key={lang.code}
                onSelect={() => handleSelect(lang.code)}
                selected={isSelected}
              >
                <div className="flex flex-1 flex-col gap-0 min-w-0">
                  <span className="truncate font-medium">{lang.english_name}</span>
                  {showNativeName && lang.native_name !== lang.english_name && (
                    <span className="text-[0.7rem] text-muted-foreground italic">
                      {lang.native_name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 ml-auto shrink-0">
                  <Badge className="text-[0.6rem]">{lang.code}</Badge>
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
