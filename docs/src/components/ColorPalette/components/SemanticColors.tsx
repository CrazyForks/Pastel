import { colorSystem } from '@pastel-palette/colors'
import { Square, Type } from 'lucide-react'
import * as React from 'react'

import type { ColorCategory, ColorChannel, ColorVariant } from '../types'
import { ColorCard } from './ColorCard'

interface SemanticColorsProps {
  onColorClick: (colorName: string, type: ColorCategory, data?: any) => void
  onCopy: (value: string) => void
  selectedCategory: ColorCategory
  selectedChannel: ColorChannel
  selectedVariant: ColorVariant
}

export const SemanticColors: React.FC<SemanticColorsProps> = ({
  selectedVariant,
  selectedChannel,
  selectedCategory,
  onColorClick,
  onCopy,
}) => {
  const getColorData = () => {
    const variant =
      selectedVariant === 'regular'
        ? 'regular'
        : selectedVariant === 'high-contrast'
          ? 'high-contrast'
          : 'kawaii'
    const themeData = colorSystem[variant] || colorSystem.regular

    switch (selectedCategory) {
      case 'element': {
        return themeData.element || {}
      }
      case 'background': {
        return themeData.background || {}
      }
      case 'fill': {
        return themeData.fill || {}
      }
      case 'material': {
        return themeData.material || {}
      }
      case 'application': {
        return themeData.application || {}
      }
      default: {
        return {}
      }
    }
  }

  const colorData = getColorData()

  const renderTextLabel = () => (
    <div className="flex items-center justify-center text-white">
      <Type className="w-8 h-8" />
    </div>
  )

  const renderColorLabel = () => {
    if (selectedCategory === 'material') {
      return (
        <div className="flex items-center justify-center text-white/80">
          <Square className="w-6 h-6" />
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.entries(colorData).map(([type, variants]) => (
              <div className="space-y-4" key={type}>
                <h5 className="text-sm font-medium capitalize">
                  {type.replaceAll(/([A-Z])/g, ' $1')}
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {typeof variants === 'object' && 'light' in variants ? (
                    <ColorCard
                      aspectRatio="aspect-[4/3]"
                      colorName={type}
                      selectedChannel={selectedChannel}
                      variants={variants}
                      labelContent={
                        type.includes('text') ? renderTextLabel() : null
                      }
                      onCopy={onCopy}
                      onClick={() =>
                        onColorClick(type, selectedCategory, variants)
                      }
                    />
                  ) : (
                    Object.entries(variants).map(([level, colorVariants]) => (
                      <ColorCard
                        aspectRatio="aspect-[4/3]"
                        colorName={`${type}-${level}`}
                        key={`${type}-${level}`}
                        labelContent={renderColorLabel()}
                        selectedChannel={selectedChannel}
                        variants={colorVariants}
                        onCopy={onCopy}
                        onClick={() =>
                          onColorClick(
                            `${type}-${level}`,
                            selectedCategory,
                            colorVariants,
                          )
                        }
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
