import type { ButtonHTMLAttributes } from 'react';

import { cn } from '~/lib/cn';

export const Button = ({
  ref,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: React.RefObject<HTMLButtonElement | null>;
}) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex h-9 items-center justify-center rounded-md px-4',
      'bg-accent text-sm font-medium text-white',
      'hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'transition-opacity',
      className,
    )}
    {...props}
  />
);
Button.displayName = 'Button';
