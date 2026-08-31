import React, { useRef, useEffect } from 'react';
import type { IPhoneInputProps } from '@mkishor/mk-country-kit-core';
import { usePhoneInput } from '@mkishor/mk-country-kit-core';
import { SearchInput } from '../shared/SearchInput';
import { Flag } from '../shared/Flag';
import '../../styles/picker.css';

export function PhoneInput({
  value,
  onChange,
  defaultCountryIso2 = 'US',
  placeholder = 'Phone number',
  showFlag = true,
  disabled = false,
  className,
  label,
}: IPhoneInputProps) {
  const phone = usePhoneInput(value, onChange, defaultCountryIso2);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!phone.isOpen) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        phone.close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [phone.isOpen, phone.close]);

  // Close on Escape
  useEffect(() => {
    if (!phone.isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') phone.close(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [phone.isOpen, phone.close]);

  return (
    <div ref={wrapperRef} className={`rck-phone-wrapper${className ? ` ${className}` : ''}`}>
      {label && <span className="rck-label">{label}</span>}

      <div className={`rck-phone-field${disabled ? ' rck-phone-disabled' : ''}`}>
        {/* Country selector */}
        <button
          type="button"
          className="rck-phone-country-btn"
          onClick={phone.toggle}
          aria-expanded={phone.isOpen}
          aria-label="Select country code"
          disabled={disabled}
        >
          {showFlag && phone.country && (
            <span className="rck-phone-flag">
              <Flag iso2={phone.country.iso2} flag={phone.country.flag} flagUrl={phone.country.flag_url} />
            </span>
          )}
          <span className="rck-phone-dial">
            {phone.country ? `+${phone.country.phone_code}` : '+?'}
          </span>
          <svg className="rck-phone-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="5 8 10 13 15 8" />
          </svg>
        </button>

        {/* Phone number input */}
        <input
          type="tel"
          className="rck-phone-input"
          value={phone.number}
          onChange={(e) => phone.setNumber(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          inputMode="numeric"
          autoComplete="tel-national"
        />

        {/* Country dropdown */}
        {phone.isOpen && (
          <div className="rck-phone-dropdown">
            <SearchInput
              value={phone.searchQuery}
              onChange={phone.setSearchQuery}
              placeholder="Search country or dial code..."
            />
            <ul className="rck-list" role="listbox" aria-label="Countries">
              {phone.filteredCountries.length === 0 ? (
                <li className="rck-empty">
                  <span className="rck-empty-icon">🌍</span>
                  <span>No countries found</span>
                </li>
              ) : (
                phone.filteredCountries.map((country) => {
                  const isSelected = phone.country?.iso2 === country.iso2;
                  return (
                    <li
                      key={country.iso2}
                      role="option"
                      aria-selected={isSelected}
                      className={`rck-item${isSelected ? ' rck-item-selected' : ''}`}
                      onClick={() => phone.selectCountry(country)}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && phone.selectCountry(country)}
                    >
                      <span className="rck-item-flag">
                        <Flag iso2={country.iso2} flag={country.flag} flagUrl={country.flag_url} />
                      </span>
                      <div className="rck-item-main">
                        <span className="rck-item-name">{country.name}</span>
                        <span className="rck-item-sub">{country.iso2}</span>
                      </div>
                      <span className="rck-item-phone">+{country.phone_code}</span>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
