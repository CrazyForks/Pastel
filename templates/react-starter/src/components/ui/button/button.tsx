import type { ButtonHTMLAttributes } from 'react';

import { cn } from '~/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md';

const variantClassNames: Record<ButtonVariant, string> = {
  danger: 'bg-red text-white hover:opacity-90 focus-visible:ring-red',
  ghost: 'text-text hover:bg-fill-tertiary focus-visible:ring-accent',
  primary: 'bg-accent text-white hover:opacity-90 focus-visible:ring-accent',
  secondary:
    'border border-border bg-background text-text hover:bg-background-secondary focus-visible:ring-accent',
};

const sizeClassNames: Record<ButtonSize, string> = {
  md: 'h-9 px-4 text-sm',
  sm: 'h-8 px-3 text-xs',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  ref?: React.RefObject<HTMLButtonElement | null>;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const Button = ({
  ref,
  className,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) => (
  <button
    disabled={disabled || loading}
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center gap-2 rounded-md font-medium',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'transition-[background-color,opacity]',
      variantClassNames[variant],
      sizeClassNames[size],
      className,
    )}
    {...props}
  >
    {loading && (
      <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
    )}
    {children}
  </button>
);
Button.displayName = 'Button';
