import { useCallback } from 'react';
import type { ICountry, IUsePickerReturn } from '../types';
import { getAllCountries, searchCountries } from '@mkishor/mk-country-kit';
import { useBasePicker } from './useBasePicker';

export function useCountryPicker(
  initialValue?: ICountry | null,
  onChange?: (country: ICountry) => void
): IUsePickerReturn<ICountry> {
  const filterFn = useCallback(
    (items: ICountry[], query: string) => searchCountries(query),
    []
  );
  return useBasePicker<ICountry>(getAllCountries(), filterFn, initialValue, onChange);
}
