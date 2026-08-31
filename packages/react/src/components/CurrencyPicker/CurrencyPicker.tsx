import React from 'react';
import type { ICurrencyPickerProps } from '@mkishor/mk-country-kit-core';
import { useCurrencyPicker } from '@mkishor/mk-country-kit-core';
import { PickerBase } from '../shared/PickerBase';
import { SearchInput } from '../shared/SearchInput';
import '../../styles/picker.css';

const CheckIcon = () => (
  <svg className="rck-item-check" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 10 8 14 16 6" />
  </svg>
);

export function CurrencyPicker({
  value,
  onChange,
  placeholder = 'Select a currency',
  searchable = true,
  showSymbol = true,
  disabled = false,
  className,
  label,
}: ICurrencyPickerProps) {
  const picker = useCurrencyPicker(value, onChange);

  const triggerContent = (
    <div className="rck-trigger-content">
      {value ? (
        <>
          {showSymbol && <span className="rck-item-symbol">{value.symbol}</span>}
          <span className="rck-trigger-text">{value.code} — {value.name}</span>
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
      id="rck-currency-picker"
    >
      {searchable && (
        <SearchInput
          value={picker.searchQuery}
          onChange={picker.setSearchQuery}
          placeholder="Search currency..."
        />
      )}
      <ul className="rck-list" role="listbox" aria-label="Currencies">
        {picker.filteredItems.length === 0 ? (
          <li className="rck-empty">
            <span className="rck-empty-icon">💰</span>
            <span>No currencies found</span>
          </li>
        ) : (
          picker.filteredItems.map((currency) => {
            const isSelected = value?.code === currency.code;
            return (
              <li
                key={currency.code}
                role="option"
                aria-selected={isSelected}
                className={`rck-item${isSelected ? ' rck-item-selected' : ''}`}
                onClick={() => picker.selectItem(currency)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && picker.selectItem(currency)}
              >
                {showSymbol && <span className="rck-item-symbol">{currency.symbol}</span>}
                <div className="rck-item-main">
                  <span className="rck-item-name">{currency.name}</span>
                  <span className="rck-item-sub">{currency.code}</span>
                </div>
                {isSelected && <CheckIcon />}
              </li>
            );
          })
        )}
      </ul>
    </PickerBase>
  );
}
