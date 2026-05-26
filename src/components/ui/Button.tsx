import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', loading, className, children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
          'transition-all duration-150 cursor-pointer select-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--color-accent)]',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          variant === 'primary' && [
            'bg-[var(--color-accent)] text-[var(--color-accent-text)]',
            'hover:bg-[var(--color-accent-hover)] active:scale-[0.98]',
          ],
          variant === 'ghost' && [
            'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
            'hover:bg-[var(--color-surface)]',
          ],
          variant === 'outline' && [
            'border border-[var(--color-border)] text-[var(--color-text-primary)]',
            'hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]',
            'active:scale-[0.98]',
          ],
          size === 'sm' && 'h-8 px-3 text-sm',
          size === 'md' && 'h-10 px-4 text-sm',
          size === 'lg' && 'h-12 px-6 text-base',
          className
        )}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };