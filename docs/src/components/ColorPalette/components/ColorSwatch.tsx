import { m } from 'motion/react'
import * as React from 'react'

import { microReboundPreset } from '../../../constants/spring'

interface ColorSwatchProps {
  icon?: React.ReactNode
  name: string
  onClick: () => void
  showIcon?: boolean
  variants: {
    light: { srgb: string }
    dark: { srgb: string }
  }
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  variants,
  onClick,
  showIcon = false,
  icon,
}) => {
  const displayName = name.replace('-', ' ')

  return (
    <m.div layout className="group" layoutId={name}>
      <button className="w-full text-left" type="button" onClick={onClick}>
        <m.div
          className="aspect-square rounded-lg overflow-hidden shadow-sm border border-border relative"
          transition={microReboundPreset}
          whileTap={{ scale: 0.98 }}
          whileHover={{
            scale: 1.05,
            boxShadow:
              '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Dark variant - bottom half */}
          <div
            className="h-1/2 w-full"
            style={{ backgroundColor: variants.dark.srgb }}
          />
          {/* Light variant - top half */}
          <div
            className="h-1/2 w-full"
            style={{ backgroundColor: variants.light.srgb }}
          />

          {/* Icon overlay for semantic colors */}
          {showIcon && icon && (
            <m.div
              className="absolute inset-0 flex items-center justify-center"
              transition={microReboundPreset}
              whileHover={{ scale: 1.1 }}
            >
              {icon}
            </m.div>
          )}
        </m.div>
      </button>

      <m.p
        className="text-sm font-medium capitalize text-center"
        initial={{ opacity: 0.8 }}
        transition={{ duration: 0.2 }}
        whileHover={{ opacity: 1 }}
      >
        {displayName}
      </m.p>
    </m.div>
  )
}
