import { useCallback, useMemo } from 'react';
import type { IDivision, IUsePickerReturn } from '../types';
import { useBasePicker } from './useBasePicker';
import { useCountry } from './useCountry';

export function useDivisionPicker(
  countryIso2: string,
  initialValue?: IDivision | null,
  onChange?: (division: IDivision) => void
): IUsePickerReturn<IDivision> {
  const countryData = useCountry(countryIso2);
  const divisions = countryData.divisions;

  const filterFn = useCallback(
    (items: IDivision[], query: string) => {
      if (!query.trim()) return items;
      const q = query.toLowerCase().trim();
      return items.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.iso2.toLowerCase().includes(q)
      );
    },
    []
  );

  return useBasePicker<IDivision>(divisions, filterFn, initialValue, onChange);
}
