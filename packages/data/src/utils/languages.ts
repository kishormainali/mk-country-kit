import languages from '../data/languages';
import type { ILanguage } from '../types';

const searchLanguagesCache = new Map<string, ILanguage[]>();

/**
 * Returns all languages
 */
export function getAllLanguages(): ILanguage[] {
  return languages;
}

/**
 * Find a language by its BCP-47 code
 */
export function getLanguageByCode(code: string): ILanguage | undefined {
  const targetCode = code.toLowerCase();
  return languages.find((l) => l.code.toLowerCase() === targetCode);
}

/**
 * Search languages by english name, native name, or code
 */
export function searchLanguages(query: string): ILanguage[] {
  if (!query.trim()) return languages;
  const q = query.toLowerCase().trim();
  const cached = searchLanguagesCache.get(q);
  if (cached) return cached;

  const result = languages.filter(
    (l) =>
      l.english_name.toLowerCase().includes(q) ||
      l.native_name.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q)
  );
  searchLanguagesCache.set(q, result);
  return result;
}
