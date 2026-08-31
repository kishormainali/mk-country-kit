import { useEffect, useMemo, useRef, useState } from 'react';
import type { IUseMultiSelectReturn } from '../types';

/**
 * Generic multi-selection hook.
 * Handles open/close, search, and toggle-selection of multiple items.
 * 
 * Optimized with minimal useCallback - only the return value is memoized.
 */
export function useMultiSelect<T>(
  allItems: T[],
  filterFn: (items: T[], query: string) => T[],
  keyFn: (item: T) => string,
  initialValue?: T[],
  onChange?: (items: T[]) => void,
  maxItems?: number
): IUseMultiSelectReturn<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<T[]>(initialValue ?? []);

  // Sync state with initialValue when it changes from the parent
  useEffect(() => {
    setSelectedItems(initialValue ?? []);
  }, [initialValue]);

  // Keep a stable ref to the latest onChange callback to avoid callback invalidations
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Memoize filtered items
  const filteredItems = useMemo(
    () => filterFn(allItems, searchQuery),
    [allItems, searchQuery, filterFn]
  );

  // Callbacks - no need for useCallback as they're stable functions
  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setSearchQuery('');
  };
  const toggle = () => setIsOpen((prev) => !prev);

  const isSelected = (item: T) => selectedItems.some((s) => keyFn(s) === keyFn(item));

  const toggleItem = (item: T) => {
    setSelectedItems((prev) => {
      const alreadySelected = prev.some((s) => keyFn(s) === keyFn(item));
      let next: T[];
      if (alreadySelected) {
        next = prev.filter((s) => keyFn(s) !== keyFn(item));
      } else {
        if (maxItems !== undefined && prev.length >= maxItems) return prev;
        next = [...prev, item];
      }
      onChangeRef.current?.(next);
      return next;
    });
  };

  const removeItem = (item: T) => {
    setSelectedItems((prev) => {
      const next = prev.filter((s) => keyFn(s) !== keyFn(item));
      onChangeRef.current?.(next);
      return next;
    });
  };

  const clearAll = () => {
    setSelectedItems([]);
    onChangeRef.current?.([]);
  };

  // Memoize only the returned object
  return useMemo(
    () => ({
      isOpen,
      searchQuery,
      filteredItems,
      selectedItems,
      open,
      close,
      toggle,
      setSearchQuery,
      toggleItem,
      isSelected,
      removeItem,
      clearAll,
    }),
    [
      isOpen,
      searchQuery,
      filteredItems,
      selectedItems,
      open,
      close,
      toggle,
      toggleItem,
      isSelected,
      removeItem,
      clearAll,
    ]
  );
}
