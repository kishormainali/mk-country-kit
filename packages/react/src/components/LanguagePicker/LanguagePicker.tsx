import React from 'react';
import type { ILanguagePickerProps } from '@mkishor/mk-country-kit-core';
import { useLanguagePicker } from '@mkishor/mk-country-kit-core';
import { PickerBase } from '../shared/PickerBase';
import { SearchInput } from '../shared/SearchInput';
import '../../styles/picker.css';

const CheckIcon = () => (
  <svg className="rck-item-check" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 10 8 14 16 6" />
  </svg>
);

export function LanguagePicker({
  value,
  onChange,
  placeholder = 'Select a language',
  searchable = true,
  showNativeName = true,
  disabled = false,
  className,
  label,
}: ILanguagePickerProps) {
  const picker = useLanguagePicker(value, onChange);

  const triggerContent = (
    <div className="rck-trigger-content">
      {value ? (
        <>
          <span className="rck-trigger-text">{value.english_name}</span>
          {showNativeName && value.native_name !== value.english_name && (
            <span className="rck-native-name">{value.native_name}</span>
          )}
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
      id="rck-language-picker"
    >
      {searchable && (
        <SearchInput
          value={picker.searchQuery}
          onChange={picker.setSearchQuery}
          placeholder="Search language..."
        />
      )}
      <ul className="rck-list" role="listbox" aria-label="Languages">
        {picker.filteredItems.length === 0 ? (
          <li className="rck-empty">
            <span className="rck-empty-icon">🌐</span>
            <span>No languages found</span>
          </li>
        ) : (
          picker.filteredItems.map((lang) => {
            const isSelected = value?.code === lang.code;
            return (
              <li
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                className={`rck-item${isSelected ? ' rck-item-selected' : ''}`}
                onClick={() => picker.selectItem(lang)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && picker.selectItem(lang)}
              >
                <div className="rck-item-main">
                  <span className="rck-item-name">{lang.english_name}</span>
                  {showNativeName && lang.native_name !== lang.english_name && (
                    <span className="rck-item-sub">{lang.native_name}</span>
                  )}
                </div>
                <div className="rck-item-right">
                  <span className="rck-badge" style={{ fontSize: '0.68rem' }}>{lang.code}</span>
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
