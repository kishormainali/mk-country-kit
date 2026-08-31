import { useCallback } from 'react';
import type { ICurrency, IUsePickerReturn } from '../types';
import { getAllCurrencies, searchCurrencies } from '@mkishor/mk-country-kit';
import { useBasePicker } from './useBasePicker';

export function useCurrencyPicker(
  initialValue?: ICurrency | null,
  onChange?: (currency: ICurrency) => void
): IUsePickerReturn<ICurrency> {
  const filterFn = useCallback(
    (_items: ICurrency[], query: string) => searchCurrencies(query),
    []
  );
  return useBasePicker<ICurrency>(getAllCurrencies(), filterFn, initialValue, onChange);
}
