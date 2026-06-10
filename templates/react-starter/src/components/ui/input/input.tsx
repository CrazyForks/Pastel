import { Input as InputPrimitive } from '@base-ui/react/input';
import type { TextareaHTMLAttributes } from 'react';

import { cn } from '~/lib/cn';

const fieldClassName = cn(
  'w-full rounded-md border border-border bg-background text-sm text-text',
  'placeholder:text-text-tertiary',
  'focus:outline-none focus:ring-2 focus:ring-accent',
  'disabled:pointer-events-none disabled:opacity-50',
  'data-[invalid]:border-red data-[invalid]:focus:ring-red',
  'transition-shadow',
);

export const Input = ({ className, ...props }: React.ComponentProps<typeof InputPrimitive>) => (
  <InputPrimitive {...props} className={cn(fieldClassName, 'h-9 px-3', className as string)} />
);

export const Textarea = ({
  className,
  ref,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: React.RefObject<HTMLTextAreaElement | null>;
}) => (
  <textarea className={cn(fieldClassName, 'min-h-20 px-3 py-2', className)} ref={ref} {...props} />
);
