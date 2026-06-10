import * as React from 'react'

import { cn } from '../../utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({
  ref,
  className,
  type,
  ...props
}: InputProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-7 w-full rounded-md border border-border bg-background px-2.5 text-[13px] text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
Input.displayName = 'Input'

export { Input }
