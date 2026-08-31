import { useCallback } from 'react';
import type { ILanguage, IUsePickerReturn } from '../types';
import { getAllLanguages, searchLanguages } from '@mkishor/mk-country-kit';
import { useBasePicker } from './useBasePicker';

export function useLanguagePicker(
  initialValue?: ILanguage | null,
  onChange?: (language: ILanguage) => void
): IUsePickerReturn<ILanguage> {
  const filterFn = useCallback(
    (_items: ILanguage[], query: string) => searchLanguages(query),
    []
  );
  return useBasePicker<ILanguage>(getAllLanguages(), filterFn, initialValue, onChange);
}
