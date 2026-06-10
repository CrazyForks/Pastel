import type { ReactNode } from 'react'

import { cn } from '../../utils/cn'

interface ButtonProps {
  asChild?: boolean
  children?: ReactNode
  className?: string
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'ghost'
}

export const Button = ({
  ref,
  className,
  variant = 'primary',
  size = 'md',
  asChild,
  children,
  ...props
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  const variants = {
    primary: 'bg-accent text-background hover:opacity-90',
    secondary:
      'bg-background text-text border border-border hover:bg-background-secondary focus-visible:border-accent',
    ghost: 'hover:bg-background-secondary',
  }

  const sizes = {
    sm: 'h-6 px-2 text-xs',
    md: 'h-7 px-2.5 text-[13px]',
    lg: 'h-8 px-3.5 text-sm',
  }

  const buttonClasses = cn(
    'inline-flex items-center justify-center font-medium rounded-md transition-[background-color,opacity,border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    className,
  )

  if (asChild && children) {
    const child = children as any
    if (child?.type === 'a') {
      return (
        <a
          {...child.props}
          className={cn(buttonClasses, child.props.className)}
        >
          {child.props.children}
        </a>
      )
    }
  }

  return (
    <button className={buttonClasses} ref={ref} {...props}>
      {children}
    </button>
  )
}

Button.displayName = 'Button'
