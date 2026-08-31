import React from 'react';
import type { IDivisionPickerProps } from '@mkishor/mk-country-kit-core';
import { useDivisionPicker } from '@mkishor/mk-country-kit-core';
import { PickerBase } from '../shared/PickerBase';
import { SearchInput } from '../shared/SearchInput';
import '../../styles/picker.css';

const CheckIcon = () => (
  <svg className="rck-item-check" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 10 8 14 16 6" />
  </svg>
);

export function DivisionPicker({
  countryIso2,
  value,
  onChange,
  placeholder = 'Select a division',
  searchable = true,
  disabled = false,
  className,
  label,
}: IDivisionPickerProps) {
  const picker = useDivisionPicker(countryIso2, value, onChange);

  const triggerContent = (
    <div className="rck-trigger-content">
      {value ? (
        <>
          <span className="rck-trigger-text">{value.name}</span>
          <span className="rck-badge">{value.iso2}</span>
        </>
      ) : (
        <span className="rck-trigger-text rck-placeholder">{placeholder}</span>
      )}
    </div>
  );

  const isDisabled = disabled || !countryIso2;

  return (
    <PickerBase
      isOpen={picker.isOpen}
      onClose={picker.close}
      onToggle={picker.toggle}
      label={label}
      disabled={isDisabled}
      className={className}
      triggerContent={triggerContent}
      id="rck-division-picker"
    >
      {searchable && (
        <SearchInput
          value={picker.searchQuery}
          onChange={picker.setSearchQuery}
          placeholder="Search division..."
        />
      )}
      <ul className="rck-list" role="listbox" aria-label="Divisions">
        {picker.filteredItems.length === 0 ? (
          <li className="rck-empty">
            <span className="rck-empty-icon">🗺️</span>
            <span>No divisions found</span>
          </li>
        ) : (
          picker.filteredItems.map((division) => {
            const isSelected = value?.iso2 === division.iso2 && value?.name === division.name;
            return (
              <li
                key={`${division.iso2}-${division.name}`}
                role="option"
                aria-selected={isSelected}
                className={`rck-item${isSelected ? ' rck-item-selected' : ''}`}
                onClick={() => picker.selectItem(division)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && picker.selectItem(division)}
              >
                <div className="rck-item-main">
                  <span className="rck-item-name">{division.name}</span>
                  <span className="rck-item-sub">{division.timezone}</span>
                </div>
                <div className="rck-item-right">
                  <span className="rck-badge">{division.iso2}</span>
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
