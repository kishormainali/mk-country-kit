import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes safely, resolving conflicts.
 * Re-exported from react-country-kit/ui for consumer convenience.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
