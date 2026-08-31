import React, { useEffect, useRef } from 'react';

interface PickerBaseProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  triggerContent: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}

const ChevronIcon = () => (
  <svg
    className="rck-chevron"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="5 8 10 13 15 8" />
  </svg>
);

export function PickerBase({
  isOpen,
  onClose,
  onToggle,
  label,
  disabled,
  className,
  triggerContent,
  children,
  id,
}: PickerBaseProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <div ref={wrapperRef} className={`rck-picker${className ? ` ${className}` : ''}`}>
      {label && (
        <span className="rck-label" id={id ? `${id}-label` : undefined}>
          {label}
        </span>
      )}
      <button
        type="button"
        className={`rck-trigger${isOpen ? ' rck-open' : ''}`}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={id && label ? `${id}-label` : undefined}
        id={id}
        onClick={onToggle}
      >
        {triggerContent}
        <ChevronIcon />
      </button>

      {isOpen && (
        <div className="rck-dropdown" role="listbox">
          {children}
        </div>
      )}
    </div>
  );
}
