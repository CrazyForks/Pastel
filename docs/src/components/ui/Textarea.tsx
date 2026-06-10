import * as React from 'react'

import { cn } from '../../utils/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({
  ref,
  className,
  ...props
}: TextareaProps & { ref?: React.RefObject<HTMLTextAreaElement | null> }) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-16 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[13px] text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent disabled:cursor-not-allowed disabled:opacity-50 resize-none',
        className,
      )}
      {...props}
    />
  )
}
Textarea.displayName = 'Textarea'

export { Textarea }
