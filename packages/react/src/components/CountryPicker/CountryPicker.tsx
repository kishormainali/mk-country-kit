import React from 'react';
import type { ICountryPickerProps } from '@mkishor/mk-country-kit-core';
import { useCountryPicker } from '@mkishor/mk-country-kit-core';
import { PickerBase } from '../shared/PickerBase';
import { SearchInput } from '../shared/SearchInput';
import { Flag } from '../shared/Flag';
import '../../styles/picker.css';

const CheckIcon = () => (
  <svg className="rck-item-check" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 10 8 14 16 6" />
  </svg>
);

export function CountryPicker({
  value,
  onChange,
  placeholder = 'Select a country',
  searchable = true,
  showFlag = true,
  showPhoneCode = false,
  disabled = false,
  className,
  label,
}: ICountryPickerProps) {
  const picker = useCountryPicker(value, onChange);

  const triggerContent = (
    <div className="rck-trigger-content">
      {value ? (
        <>
          {showFlag && (
            <span className="rck-flag">
              <Flag iso2={value.iso2} flag={value.flag} flagUrl={value.flag_url} />
            </span>
          )}
          <span className="rck-trigger-text">{value.name}</span>
          {showPhoneCode && <span className="rck-badge">+{value.phone_code}</span>}
        </>
      ) : (
        <span className="rck-trigger-text rck-placeholder">{placeholder}</span>
      )}
    </div>
  );

  return (
    <PickerBase
      isOpen={picker.isOpen}
      onClose={picker.close}
      onToggle={picker.toggle}
      label={label}
      disabled={disabled}
      className={className}
      triggerContent={triggerContent}
      id="rck-country-picker"
    >
      {searchable && (
        <SearchInput
          value={picker.searchQuery}
          onChange={picker.setSearchQuery}
          placeholder="Search country..."
        />
      )}
      <ul className="rck-list" role="listbox" aria-label="Countries">
        {picker.filteredItems.length === 0 ? (
          <li className="rck-empty">
            <span className="rck-empty-icon">🌍</span>
            <span>No countries found</span>
          </li>
        ) : (
          picker.filteredItems.map((country) => {
            const isSelected = value?.iso2 === country.iso2;
            return (
              <li
                key={country.iso2}
                role="option"
                aria-selected={isSelected}
                className={`rck-item${isSelected ? ' rck-item-selected' : ''}`}
                onClick={() => picker.selectItem(country)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && picker.selectItem(country)}
              >
                {showFlag && (
                  <span className="rck-item-flag">
                    <Flag iso2={country.iso2} flag={country.flag} flagUrl={country.flag_url} />
                  </span>
                )}
                <div className="rck-item-main">
                  <span className="rck-item-name">{country.name}</span>
                  <span className="rck-item-sub">{country.iso3} · {country.division_type}</span>
                </div>
                <div className="rck-item-right">
                  {showPhoneCode && (
                    <span className="rck-item-phone">+{country.phone_code}</span>
                  )}
                  {isSelected && <CheckIcon />}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </PickerBase>
  );
}
