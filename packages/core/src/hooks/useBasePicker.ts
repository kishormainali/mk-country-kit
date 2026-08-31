import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { IUsePickerReturn } from '../types';

/**
 * Generic base hook for all pickers.
 * Handles open/close state, search query, and item selection.
 * 
 * Optimized with minimal memoization - only return value and internal callbacks are memoized.
 */
export function useBasePicker<T>(
  allItems: T[],
  filterFn: (items: T[], query: string) => T[],
  initialValue?: T | null,
  onChange?: (item: T) => void
): IUsePickerReturn<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<T | null>(initialValue ?? null);

  // Sync state with initialValue when it changes from the parent
  useEffect(() => {
    setSelectedItem(initialValue ?? null);
  }, [initialValue]);

  // Keep a stable ref to the latest onChange callback to avoid callback invalidations
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Memoize filtered items - this is essential for performance
  const filteredItems = useMemo(
    () => filterFn(allItems, searchQuery),
    [allItems, searchQuery, filterFn]
  );

  // Callbacks don't need individual memoization, React will handle them efficiently
  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setSearchQuery('');
  };
  const toggle = () => setIsOpen((prev) => !prev);

  const selectItem = (item: T) => {
    setSelectedItem(item);
    onChangeRef.current?.(item);
    close();
  };

  const clearSelection = () => {
    setSelectedItem(null);
  };

  // Memoize only the returned object to ensure stable reference
  return useMemo(
    () => ({
      isOpen,
      searchQuery,
      filteredItems,
      selectedItem,
      open,
      close,
      toggle,
      setSearchQuery,
      selectItem,
      clearSelection,
    }),
    [
      isOpen,
      searchQuery,
      filteredItems,
      selectedItem,
      open,
      close,
      toggle,
      selectItem,
      clearSelection,
    ]
  );
}
