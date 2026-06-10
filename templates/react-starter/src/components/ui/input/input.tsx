import { Input as InputPrimitive } from '@base-ui/react/input';
import type { TextareaHTMLAttributes } from 'react';

import { cn } from '~/lib/cn';

const fieldClassName = cn(
  'w-full rounded-md border border-border bg-background text-[13px] text-text',
  'placeholder:text-text-tertiary',
  'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent',
  'disabled:pointer-events-none disabled:opacity-50',
  'data-[invalid]:border-red data-[invalid]:focus:ring-red/40 data-[invalid]:focus:border-red',
  'transition-shadow',
);

export const Input = ({ className, ...props }: React.ComponentProps<typeof InputPrimitive>) => (
  <InputPrimitive {...props} className={cn(fieldClassName, 'h-7 px-2.5', className as string)} />
);

export const Textarea = ({
  className,
  ref,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: React.RefObject<HTMLTextAreaElement | null>;
}) => (
  <textarea
    className={cn(fieldClassName, 'min-h-16 px-2.5 py-1.5', className)}
    ref={ref}
    {...props}
  />
);
