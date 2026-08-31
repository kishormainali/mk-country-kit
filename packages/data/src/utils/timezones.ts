import { TIMEZONES } from '../data/timezones';
import type { ITimezone } from '../types';
import { getTimezonesByCountry } from './countries';

let cachedUniqueTimezones: ITimezone[] | null = null;

/**
 * Returns all unique timezones across all countries
 */
export function getAllTimezones(): ITimezone[] {
  if (cachedUniqueTimezones) return cachedUniqueTimezones;

  const seen = new Set<string>();
  const result: ITimezone[] = [];

  for (const tz of TIMEZONES) {
    if (!seen.has(tz.name)) {
      seen.add(tz.name);
      result.push(tz);
    }
  }

  cachedUniqueTimezones = result.sort((a, b) => a.offset - b.offset);
  return cachedUniqueTimezones;
}


/**
 * Mapping of deprecated/alias timezone names to modern IANA names.
 * Useful for auto-detecting based on system-reported timezones.
 */
const DEPRECATED_TZ_MAP: Record<string, string> = {
  'US/Eastern': 'America/New_York',
  'US/Central': 'America/Chicago',
  'US/Mountain': 'America/Denver',
  'US/Pacific': 'America/Los_Angeles',
  'US/Alaska': 'America/Anchorage',
  'US/Hawaii': 'America/Adak',
  'US/Arizona': 'America/Phoenix',
  'Europe/Kiev': 'Europe/Kyiv',
  'Asia/Calcutta': 'Asia/Kolkata',
  'Asia/Saigon': 'Asia/Ho_Chi_Minh',
  'Asia/Katmandu': 'Asia/Kathmandu',
  'Asia/Rangoon': 'Asia/Yangon',
  'Africa/Asmera': 'Africa/Asmara',
  'America/Buenos_Aires': 'America/Argentina/Buenos_Aires',
  'America/Rosario': 'America/Argentina/Cordoba',
  'America/Shiprock': 'America/Denver',
  'Asia/Chungking': 'Asia/Chongqing',
  'Asia/Dacca': 'Asia/Dhaka',
  'Asia/Macao': 'Asia/Macau',
  'Asia/Thimbu': 'Asia/Thimphu',
  'Asia/Ulan_Bator': 'Asia/Ulaanbaatar',
  'Australia/ACT': 'Australia/Sydney',
  'Australia/LHI': 'Australia/Lord_Howe',
  'Australia/North': 'Australia/Darwin',
  'Australia/NSW': 'Australia/Sydney',
  'Australia/Queensland': 'Australia/Brisbane',
  'Australia/South': 'Australia/Adelaide',
  'Australia/Tasmania': 'Australia/Hobart',
  'Australia/Victoria': 'Australia/Melbourne',
  'Australia/West': 'Australia/Perth',
  'Brazil/Acre': 'America/Rio_Branco',
  'Brazil/DeNoronha': 'America/Noronha',
  'Brazil/East': 'America/Sao_Paulo',
  'Brazil/West': 'America/Manaus',
  'Canada/Atlantic': 'America/Halifax',
  'Canada/Central': 'America/Winnipeg',
  'Canada/Eastern': 'America/Toronto',
  'Canada/Mountain': 'America/Edmonton',
  'Canada/Newfoundland': 'America/St_Johns',
  'Canada/Pacific': 'America/Vancouver',
  'Canada/Saskatchewan': 'America/Regina',
  'Canada/Yukon': 'America/Whitehorse',
  'Europe/Belfast': 'Europe/London',
  'Europe/Tiraspol': 'Europe/Chisinau',
};

/**
 * Find a timezone by its IANA name (e.g. "America/New_York")
 * Supports modern names and common deprecated aliases.
 */
export function getTimezoneByName(name: string): ITimezone | undefined {
  if (!name) return undefined;

  const normalizedName = name.toLowerCase();
  const allTimezones = getAllTimezones();

  // 1. Try direct match
  const directMatch = allTimezones.find(
    (tz) => tz.name.toLowerCase() === normalizedName
  );
  if (directMatch) return directMatch;

  // 2. Try mapping from deprecated names
  const modernName = Object.entries(DEPRECATED_TZ_MAP).find(
    ([old]) => old.toLowerCase() === normalizedName
  )?.[1];

  if (modernName) {
    return allTimezones.find(
      (tz) => tz.name.toLowerCase() === modernName.toLowerCase()
    );
  }

  return undefined;
}

const searchTimezonesCache = new Map<string, ITimezone[]>();

/**
 * Search timezones by name, abbreviation, or offset string
 */
export function searchTimezones(query: string, countryIso2?: string): ITimezone[] {
  const pool = countryIso2 ? getTimezonesByCountry(countryIso2) : getAllTimezones();
  if (!query.trim()) return pool;
  const q = query.toLowerCase().trim();
  const cacheKey = `${countryIso2 || ''}:${q}`;
  const cached = searchTimezonesCache.get(cacheKey);
  if (cached) return cached;

  const result = pool.filter(
    (tz) =>
      tz.name.toLowerCase().includes(q) ||
      tz.tzName.toLowerCase().includes(q) ||
      tz.abbreviation.toLowerCase().includes(q) ||
      tz.offset_name.toLowerCase().includes(q)
  );
  searchTimezonesCache.set(cacheKey, result);
  return result;
}
