import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../lib/utils';

// ─── Re-exported Radix primitives ────────────────────────────────────────────
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

// ─── Utility Primitives ──────────────────────────────────────────────────────
export const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-4 w-4 text-primary', className)}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="4 10 8 14 16 6" />
  </svg>
);
CheckIcon.displayName = 'CheckIcon';

export const FieldLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <label
    className={cn(
      'text-[0.65rem] font-bold uppercase tracking-[0.12em] text-muted-foreground/80 ml-1 mb-1.5 block',
      className
    )}
  >
    {children}
  </label>
);
FieldLabel.displayName = 'FieldLabel';

export const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full bg-primary/20 px-2.5 py-0.5 text-[0.7rem] font-bold text-primary tracking-tight',
      className
    )}
  >
    {children}
  </span>
);
Badge.displayName = 'Badge';
 
 export const Flag = ({ 
   iso2, 
   flag, 
   flagUrl, 
   className 
 }: { 
   iso2: string; 
   flag: string; 
   flagUrl: string; 
   className?: string; 
 }) => {
   return (
     <span className={cn('inline-flex items-center justify-center shrink-0 overflow-hidden', className)}>
       {/* Use img as fallback for Windows where emoji flags often fail */}
       <img 
         src={flagUrl} 
         alt={iso2} 
         className="h-[1em] w-[1.5em] object-cover rounded-[1px] shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
         onError={(e) => {
           // Fallback to emoji if image fails
           (e.target as HTMLImageElement).style.display = 'none';
           if ((e.target as HTMLElement).parentElement) {
             const span = document.createElement('span');
             span.textContent = flag;
             ((e.target as HTMLElement).parentElement!).appendChild(span);
           }
         }}
       />
     </span>
   );
 };
 Flag.displayName = 'Flag';

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> { }

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'start', sideOffset = 6, onCloseAutoFocus, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      onCloseAutoFocus={(e) => {
        // Prevent Radix from returning focus to the trigger after close.
        // Without this, the focus restoration can re-trigger DismissableLayer
        // logic and cause the picker to close before selection completes.
        e.preventDefault();
        onCloseAutoFocus?.(e);
      }}
      className={cn(
        'z-50 w-[var(--radix-popover-trigger-width)] rounded-xl border border-border bg-popover p-0 shadow-lg',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = 'PopoverContent';

// ─── Search / list primitives (no external dependency) ───────────────────────

/** Wrapper that groups search input + scrollable list. */
export const CommandRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground',
      className
    )}
    {...props}
  />
));
CommandRoot.displayName = 'CommandRoot';

export interface CommandInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onValueChange?: (value: string) => void;
}

export const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, onValueChange, ...props }, ref) => (
    <div className="px-3 pt-3 pb-2 border-b border-border">
      <div className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/40 transition-colors',
        'focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10'
      )}>
        <svg
          className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="M17 17l-4-4" strokeLinecap="round" />
        </svg>
        <input
          ref={ref}
          type="text"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={cn(
            'flex h-8 w-full bg-transparent text-sm outline-none',
            'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          onChange={(e) => onValueChange?.(e.target.value)}
          {...props}
        />
      </div>
    </div>
  )
);
CommandInput.displayName = 'CommandInput';

export const CommandList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="listbox"
    className={cn('max-h-72 overflow-y-auto overflow-x-hidden p-1', className)}
    {...props}
  />
));
CommandList.displayName = 'CommandList';

export const CommandEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <div
    ref={ref}
    className="flex flex-col items-center justify-center gap-1 py-8 text-sm text-muted-foreground"
    {...props}
  />
));
CommandEmpty.displayName = 'CommandEmpty';

export interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Called when the item is clicked or activated via keyboard Enter. */
  onSelect?: () => void;
  disabled?: boolean;
  selected?: boolean;
  /** Kept for API compatibility; not used internally. */
  value?: string;
}

export const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, onSelect, onMouseDown, onKeyDown, disabled, selected, value: _value, ...props }, ref) => (
    <div
      ref={ref}
      role="option"
      aria-disabled={disabled || undefined}
      aria-selected={selected}
      data-disabled={disabled || undefined}
      data-selected={selected || undefined}
      tabIndex={disabled ? undefined : 0}
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-2 py-2 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        'hover:bg-accent/50 transition-colors',
        selected && 'bg-accent text-accent-foreground font-semibold',
        className
      )}
      onMouseDown={(e) => {
        // Prevent the browser from moving focus on mousedown so Radix's
        // DismissableLayer doesn't detect a "focus outside" and close the
        // popover before the click event fires.
        e.preventDefault();
        onMouseDown?.(e);
      }}
      onClick={disabled ? undefined : () => onSelect?.()}
      onKeyDown={(e) => {
        if (!disabled && e.key === 'Enter') {
          e.preventDefault();
          onSelect?.();
        }
        onKeyDown?.(e);
      }}
      {...props}
    />
  )
);
CommandItem.displayName = 'CommandItem';

// ─── Trigger button ───────────────────────────────────────────────────────────
export interface PickerTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean;
  hasValue?: boolean;
  placeholder?: string;
}

export const PickerTrigger = React.forwardRef<HTMLButtonElement, PickerTriggerProps>(
  ({ className, isOpen, children, placeholder, hasValue, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      className={cn(
        'flex h-12 w-full items-center justify-between gap-3 rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background',
        'placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:bg-accent/10 transition-all',
        !hasValue && 'text-muted-foreground',
        className
      )}
      {...props}
    >
      <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
        {children || <span>{placeholder}</span>}
      </span>
      <svg
        className={cn(
          'h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 8 10 12 14 8" />
      </svg>
    </button>
  )
);
PickerTrigger.displayName = 'PickerTrigger';

// ─── Base Picker ─────────────────────────────────────────────────────────────
export interface BasePickerProps {
  label?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export const BasePicker = React.forwardRef<HTMLDivElement, BasePickerProps>(
  ({ label, trigger, children, open, onOpenChange, className }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-0', className)}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="p-0">{children}</PopoverContent>
      </Popover>
    </div>
  )
);
BasePicker.displayName = 'BasePicker';

// ─── Multi-Select Trigger ─────────────────────────────────────────────────────
export interface MultiSelectTriggerProps<T>
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: T[];
  onRemove: (item: T, e: React.MouseEvent) => void;
  onClear: (e: React.MouseEvent) => void;
  isOpen: boolean;
  placeholder?: string;
  renderChip: (item: T) => React.ReactNode;
  maxVisible?: number;
}

export const MultiSelectTrigger = React.forwardRef(
  <T,>(
    {
      value,
      onRemove,
      onClear,
      isOpen,
      placeholder,
      renderChip,
      maxVisible = 3,
      className,
      disabled,
      ...props
    }: MultiSelectTriggerProps<T>,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const visible = value.slice(0, maxVisible);
    const overflow = value.length - maxVisible;

    return (
      <button
        ref={ref}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
        className={cn(
          'flex min-h-[3rem] w-full items-center gap-3 rounded-xl border border-input bg-background px-4 py-2',
          'text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50 hover:bg-accent/10 transition-all text-start',
          isOpen && 'ring-2 ring-ring ring-offset-2',
          className
        )}
        {...props}
      >
        <div className="flex flex-1 flex-wrap gap-1.5 min-w-0 items-center">
          {value.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <>
              {visible.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[0.75rem] font-semibold text-primary"
                >
                  {renderChip(item)}
                  <span
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!disabled) onRemove(item, e);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!disabled) onRemove(item, e as any);
                      }
                    }}
                    className="ml-0.5 rounded-full text-primary/60 hover:text-primary transition-colors cursor-pointer"
                    aria-label="Remove"
                  >
                    <svg width="9" height="9" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="5" y1="5" x2="15" y2="15" /><line x1="15" y1="5" x2="5" y2="15" />
                    </svg>
                  </span>
                </span>
              ))}
              {overflow > 0 && (
                <Badge className="bg-muted text-muted-foreground/80 px-2">+{overflow}</Badge>
              )}
            </>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1 ml-auto">
          {value.length > 0 && (
            <span
              role="button"
              tabIndex={disabled ? -1 : 0}
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) onClear(e);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!disabled) onClear(e as any);
                }
              }}
              className="rounded p-0.5 text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors cursor-pointer"
              aria-label="Clear all"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="5" x2="15" y2="15" /><line x1="15" y1="5" x2="5" y2="15" />
              </svg>
            </span>
          )}
          <svg
            className={cn('h-4 w-4 text-muted-foreground/60 transition-transform duration-200', isOpen && 'rotate-180')}
            viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 8 10 12 14 8" />
          </svg>
        </div>
      </button>
    );
  }
) as (<T>(props: MultiSelectTriggerProps<T> & { ref?: React.Ref<HTMLButtonElement> }) => React.ReactElement) & {
  displayName?: string;
};
MultiSelectTrigger.displayName = 'MultiSelectTrigger';
