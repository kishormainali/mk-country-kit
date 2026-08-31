import { useCallback, useMemo } from 'react';
import type { ITimezone, IUsePickerReturn } from '../types';
import { getAllTimezones, searchTimezones } from '@mkishor/mk-country-kit';
import { useBasePicker } from './useBasePicker';
import { useCountry } from './useCountry';

export function useTimezonePicker(
  initialValue?: ITimezone | null,
  onChange?: (timezone: ITimezone) => void,
  countryIso2?: string
): IUsePickerReturn<ITimezone> {
  const countryData = useCountry(countryIso2);

  const allTimezones = useMemo(
    () => (countryIso2 ? countryData.timezones : getAllTimezones()),
    [countryIso2, countryData.timezones]
  );
  const filterFn = useCallback(
    (_items: ITimezone[], query: string) => searchTimezones(query, countryIso2),
    [countryIso2]
  );
  return useBasePicker<ITimezone>(allTimezones, filterFn, initialValue, onChange);
}
