import React, { useRef, useEffect } from 'react';
import type { ICurrencyMultiSelectProps, ICurrency } from '@mkishor/mk-country-kit-core';
import { useMultiSelect } from '@mkishor/mk-country-kit-core';
import { getAllCurrencies, searchCurrencies } from '@mkishor/mk-country-kit-core';
import { SearchInput } from '../shared/SearchInput';
import '../../styles/picker.css';

const MAX_VISIBLE_CHIPS = 3;

function ChipCheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 10 8 14 16 6" />
    </svg>
  );
}

export function CurrencyMultiSelect({
  value,
  onChange,
  placeholder = 'Select currencies...',
  maxItems,
  showSymbol = true,
  searchable = true,
  disabled = false,
  className,
  label,
}: ICurrencyMultiSelectProps) {
  const multi = useMultiSelect<ICurrency>(
    getAllCurrencies(),
    (items, q) => q ? searchCurrencies(q) : items,
    (c) => c.code,
    value,
    onChange,
    maxItems
  );

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!multi.isOpen) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) multi.close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [multi.isOpen, multi.close]);

  useEffect(() => {
    if (!multi.isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') multi.close(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [multi.isOpen, multi.close]);

  const visibleChips = value.slice(0, MAX_VISIBLE_CHIPS);
  const overflow = value.length - MAX_VISIBLE_CHIPS;

  return (
    <div ref={wrapperRef} className={`rck-picker${className ? ` ${className}` : ''}`}>
      {label && <span className="rck-label">{label}</span>}

      <button
        type="button"
        className={`rck-multiselect-trigger${multi.isOpen ? ' rck-open' : ''}`}
        disabled={disabled}
        onClick={multi.toggle}
        aria-haspopup="listbox"
        aria-expanded={multi.isOpen}
      >
        <div className="rck-chips-area">
          {value.length === 0 ? (
            <span style={{ color: 'var(--rck-text-placeholder)', fontSize: '0.9375rem' }}>{placeholder}</span>
          ) : (
            <>
              {visibleChips.map((c) => (
                <span key={c.code} className="rck-chip">
                  {showSymbol && <span>{c.symbol}</span>}
                  <span className="rck-chip-label">{c.code}</span>
                  <button
                    type="button"
                    className="rck-chip-remove"
                    onClick={(e) => { e.stopPropagation(); onChange(value.filter((x) => x.code !== c.code)); }}
                    aria-label={`Remove ${c.code}`}
                  >
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="5" y1="5" x2="15" y2="15" /><line x1="15" y1="5" x2="5" y2="15" />
                    </svg>
                  </button>
                </span>
              ))}
              {overflow > 0 && <span className="rck-chip-overflow">+{overflow} more</span>}
            </>
          )}
        </div>
        {value.length > 0 && (
          <button
            type="button"
            className="rck-multiselect-clear"
            onClick={(e) => { e.stopPropagation(); multi.clearAll(); onChange([]); }}
            aria-label="Clear all"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="5" x2="15" y2="15" /><line x1="15" y1="5" x2="5" y2="15" />
            </svg>
          </button>
        )}
        <svg className="rck-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="5 8 10 13 15 8" />
        </svg>
      </button>

      {multi.isOpen && (
        <div className="rck-dropdown" role="listbox" aria-multiselectable="true">
          {searchable && (
            <SearchInput value={multi.searchQuery} onChange={multi.setSearchQuery} placeholder="Search currencies..." />
          )}
          <ul className="rck-list">
            {multi.filteredItems.length === 0 ? (
              <li className="rck-empty"><span className="rck-empty-icon">💰</span><span>No currencies found</span></li>
            ) : (
              multi.filteredItems.map((currency) => {
                const selected = multi.isSelected(currency);
                return (
                  <li
                    key={currency.code}
                    role="option"
                    aria-selected={selected}
                    className={`rck-item${selected ? ' rck-item-selected' : ''}`}
                    onClick={() => multi.toggleItem(currency)}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && multi.toggleItem(currency)}
                  >
                    <div className={selected ? 'rck-item-check-multi' : 'rck-item-check-empty'}>
                      {selected && <ChipCheckIcon />}
                    </div>
                    {showSymbol && <span className="rck-item-symbol">{currency.symbol}</span>}
                    <div className="rck-item-main">
                      <span className="rck-item-name">{currency.name}</span>
                      <span className="rck-item-sub">{currency.code}</span>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
