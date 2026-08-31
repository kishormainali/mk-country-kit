import React from 'react';
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
  FieldLabel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Flag,
} from './primitives';
import { cn } from '../lib/utils';
import type { IPhoneInputProps } from '@mkishor/mk-country-kit-core';
import { usePhoneInput } from '@mkishor/mk-country-kit-core';

export const PhoneInput = React.forwardRef<HTMLDivElement, IPhoneInputProps>(
  (
    {
      value,
      onChange,
      defaultCountryIso2 = 'US',
      placeholder = 'Phone number',
      showFlag = true,
      disabled = false,
      className,
      label,
    },
    ref
  ) => {
    const phone = usePhoneInput(value, onChange, defaultCountryIso2);

    return (
      <div ref={ref} className={cn('flex flex-col gap-0', className)}>
        {label && <FieldLabel>{label}</FieldLabel>}

        <div
          className={cn(
            'flex h-12 items-stretch overflow-hidden rounded-xl border border-input bg-background ring-offset-background',
            'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
            'transition-shadow',
            disabled && 'opacity-50 pointer-events-none'
          )}
        >
          {/* Country dial button */}
          <Popover
            open={phone.isOpen}
            onOpenChange={(o) => (o ? phone.toggle() : phone.close())}
          >
            <PopoverTrigger asChild>
              <button
                type="button"
                disabled={disabled}
                className={cn(
                  'flex h-full shrink-0 items-center gap-1.5 border-r border-input bg-muted px-3',
                  'text-sm font-semibold text-foreground transition-colors outline-none',
                  'hover:bg-accent/30 focus-visible:bg-accent/30'
                )}
              >
                {showFlag && phone.country && (
                  <Flag iso2={phone.country.iso2} flag={phone.country.flag} flagUrl={phone.country.flag_url} />
                )}
                <span className="tabular-nums text-primary">
                  {phone.country ? `+${phone.country.phone_code}` : '+?'}
                </span>
                <svg
                  className={cn(
                    'h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200',
                    phone.isOpen && 'rotate-180'
                  )}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <polyline points="5 8 10 13 15 8" />
                </svg>
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              side="bottom"
              sideOffset={4}
              className="w-72"
            >
              <CommandRoot>
                <CommandInput
                  placeholder="Search country or code..."
                  value={phone.searchQuery}
                  onValueChange={phone.setSearchQuery}
                />
                <CommandList>
                  {phone.filteredCountries.length === 0 && (
                    <CommandEmpty>
                      <span className="text-2xl opacity-40">🌍</span>
                      <span>No countries found</span>
                    </CommandEmpty>
                  )}
                  {phone.filteredCountries.map((country) => {
                    const isSelected = phone.country?.iso2 === country.iso2;
                    return (
                      <CommandItem
                        key={country.iso2}
                        onSelect={() => phone.selectCountry(country)}
                        selected={isSelected}
                      >
                        <Flag iso2={country.iso2} flag={country.flag} flagUrl={country.flag_url} />
                        <div className="flex flex-1 flex-col min-w-0">
                          <span className="truncate font-medium text-sm">
                            {country.name}
                          </span>
                        </div>
                        <Badge className="ml-auto tabular-nums text-[0.7rem]">
                          +{country.phone_code}
                        </Badge>
                      </CommandItem>
                    );
                  })}
                </CommandList>
              </CommandRoot>
            </PopoverContent>
          </Popover>

          {/* Phone number text input */}
          <input
            type="tel"
            value={phone.number}
            onChange={(e) => phone.setNumber(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            minLength={phone.validation?.minLength}
            maxLength={phone.validation?.maxLength}
            inputMode="numeric"
            autoComplete="tel-national"
            className={cn(
              'flex-1 min-w-0 bg-transparent px-3 text-sm text-foreground',
              'placeholder:text-muted-foreground',
              'focus:outline-none'
            )}
          />
        </div>

        {/* Value preview */}
        {phone.value && (
          <p className="text-[0.7rem] text-muted-foreground tabular-nums pl-0.5">
            Full:{' '}
            <span className="font-mono text-primary">{phone.value.full}</span>
          </p>
        )}
      </div>
    );
  }
);
PhoneInput.displayName = 'PhoneInput';

