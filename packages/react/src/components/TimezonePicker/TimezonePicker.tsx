import React from 'react';
import type { ITimezonePickerProps } from '@mkishor/mk-country-kit-core';
import { useTimezonePicker } from '@mkishor/mk-country-kit-core';
import { PickerBase } from '../shared/PickerBase';
import { SearchInput } from '../shared/SearchInput';
import '../../styles/picker.css';

const CheckIcon = () => (
  <svg className="rck-item-check" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 10 8 14 16 6" />
  </svg>
);

export function TimezonePicker({
  value,
  onChange,
  placeholder = 'Select a timezone',
  searchable = true,
  countryIso2,
  disabled = false,
  className,
  label,
}: ITimezonePickerProps) {
  const picker = useTimezonePicker(value, onChange, countryIso2);

  const triggerContent = (
    <div className="rck-trigger-content">
      {value ? (
        <>
          <span className="rck-trigger-text">{value.name}</span>
          <span className="rck-badge">{value.offset_name}</span>
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
      id="rck-timezone-picker"
    >
      {searchable && (
        <SearchInput
          value={picker.searchQuery}
          onChange={picker.setSearchQuery}
          placeholder="Search timezone..."
        />
      )}
      <ul className="rck-list" role="listbox" aria-label="Timezones">
        {picker.filteredItems.length === 0 ? (
          <li className="rck-empty">
            <span className="rck-empty-icon">🕐</span>
            <span>No timezones found</span>
          </li>
        ) : (
          picker.filteredItems.map((tz) => {
            const isSelected = value?.name === tz.name;
            return (
              <li
                key={tz.name}
                role="option"
                aria-selected={isSelected}
                className={`rck-item${isSelected ? ' rck-item-selected' : ''}`}
                onClick={() => picker.selectItem(tz)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && picker.selectItem(tz)}
              >
                <div className="rck-item-main">
                  <span className="rck-item-name">{tz.name}</span>
                  <span className="rck-item-sub">{tz.tzName} · {tz.abbreviation}</span>
                </div>
                <div className="rck-item-right">
                  <span className="rck-offset-badge">{tz.offset_name}</span>
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
