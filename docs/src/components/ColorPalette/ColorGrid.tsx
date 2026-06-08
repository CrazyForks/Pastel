import { AnimatePresence, m as motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { microReboundPreset, Spring } from '../../constants/spring'
import { Dropdown } from '../ui/Dropdown'
import { ColorModal } from './ColorModal'
import { GridApplicationColors } from './components/GridApplicationColors'
import { GridGrayScaleColors } from './components/GridGrayScaleColors'
import { GridMaterialColors } from './components/GridMaterialColors'
import { GridRegularColors } from './components/GridRegularColors'
import { GridSemanticColors } from './components/GridSemanticColors'
import type {
  ColorCategory,
  ColorChannel,
  ColorVariant,
  SortOrder,
} from './types'
import {
  colorChannelOptions,
  colorSections,
  colorVariantOptions,
  sortOptions,
} from './utils/constants'

type ColorModalState = {
  name: string
  type: ColorCategory
  data?: any
} | null

export function ColorGrid() {
  const [selectedCategory, setSelectedCategory] =
    useState<ColorCategory>('regular')
  const [selectedVariant, setSelectedVariant] =
    useState<ColorVariant>('regular')
  const [sortOrder, setSortOrder] = useState<SortOrder>('default')
  const [selectedChannel, setSelectedChannel] = useState<ColorChannel>('oklch')
  const [modalColor, setModalColor] = useState<ColorModalState>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  // Update indicator position when selectedCategory changes
  useEffect(() => {
    const activeTab = tabRefs.current[selectedCategory]
    if (activeTab) {
      const { offsetLeft, offsetWidth } = activeTab
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      })
    }
  }, [selectedCategory])

  const handleColorClick = (
    colorName: string,
    type: ColorCategory = 'regular',
    data?: any,
  ) => {
    setModalColor({ name: colorName, type, data })
  }

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const renderColorContent = () => {
    switch (selectedCategory) {
      case 'regular': {
        return (
          <GridRegularColors
            selectedVariant={selectedVariant}
            sortOrder={sortOrder}
            onColorClick={handleColorClick}
          />
        )
      }

      case 'grayScale': {
        return (
          <GridGrayScaleColors
            selectedChannel={selectedChannel}
            selectedVariant={selectedVariant}
            onColorClick={handleColorClick}
          />
        )
      }

      case 'material': {
        return (
          <GridMaterialColors
            selectedChannel={selectedChannel}
            selectedVariant={selectedVariant}
            onColorClick={handleColorClick}
          />
        )
      }
      case 'application': {
        return (
          <GridApplicationColors
            selectedChannel={selectedChannel}
            selectedVariant={selectedVariant}
            onColorClick={handleColorClick}
          />
        )
      }
      case 'element':
      case 'background':
      case 'fill': {
        return (
          <GridSemanticColors
            selectedCategory={selectedCategory}
            selectedChannel={selectedChannel}
            selectedVariant={selectedVariant}
            onColorClick={handleColorClick}
            onCopy={handleCopy}
          />
        )
      }
      default: {
        return (
          <GridRegularColors
            selectedVariant={selectedVariant}
            sortOrder={sortOrder}
            onColorClick={handleColorClick}
          />
        )
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border"
        initial={{ opacity: 0, y: 20 }}
        transition={Spring.smooth(0.3)}
      >
        <nav className="flex space-x-8 overflow-auto relative">
          {colorSections.map((section, index) => (
            <motion.button
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              key={section.id}
              transition={Spring.smooth(0.4, index * 0.1)}
              type="button"
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                selectedCategory === section.id
                  ? 'border-transparent text-accent'
                  : 'border-transparent text-text-secondary hover:text-text-tertiary'
              }`}
              ref={(el) => {
                tabRefs.current[section.id] = el
              }}
              whileHover={{
                scale: 1.02,
                y: -1,
              }}
              onClick={() => {
                setSelectedCategory(section.id)
                setModalColor(null)
              }}
            >
              <motion.div
                className="flex items-center gap-2"
                transition={microReboundPreset}
                whileHover={{ scale: 1.05 }}
              >
                {section.icon}
                {section.title}
              </motion.div>
            </motion.button>
          ))}

          {/* Active tab indicator - positioned absolutely to track the active tab */}
          <motion.div
            className="absolute bottom-0 h-0.5 bg-accent rounded-full"
            layoutId="activeTab"
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 35,
            }}
          />
        </nav>
      </motion.div>

      {/* Category Description */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        key={selectedCategory}
        transition={Spring.smooth(0.6, 0.2)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            transition={Spring.smooth(0.5, 0.3)}
          >
            <h3 className="text-xl font-semibold">
              {colorSections.find((s) => s.id === selectedCategory)?.title}
            </h3>
            <p className="text-text-secondary">
              {
                colorSections.find((s) => s.id === selectedCategory)
                  ?.description
              }
            </p>
          </motion.div>

          {/* Controls Section */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, x: 20 }}
            transition={Spring.smooth(0.5, 0.4)}
          >
            <motion.div
              className="flex flex-col gap-2 min-w-[200px]"
              transition={microReboundPreset}
              whileHover={{ scale: 1.02 }}
            >
              <label className="text-sm font-medium text-text-secondary">
                Color Variant
              </label>
              <Dropdown
                options={colorVariantOptions}
                placeholder="Select color variant"
                value={selectedVariant}
                onChange={(value) => {
                  setSelectedVariant(value as ColorVariant)

                  document.documentElement.dataset.contrast =
                    value === 'high-contrast'
                      ? 'high'
                      : value === 'kawaii'
                        ? 'low'
                        : ''
                }}
              />
            </motion.div>
            {/* Color Variant Selector and Sort Options - Only show for regular colors */}
            <AnimatePresence>
              {selectedCategory === 'regular' && (
                <motion.div
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  className="flex flex-col gap-2 min-w-[200px]"
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={Spring.smooth(0.4)}
                  whileHover={{ scale: 1.02 }}
                >
                  <label className="text-sm font-medium text-text-secondary">
                    Sort Order
                  </label>
                  <Dropdown
                    options={sortOptions}
                    placeholder="Select sort order"
                    value={sortOrder}
                    onChange={(value) => setSortOrder(value as SortOrder)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Color Channel Selector - Always visible */}
            <motion.div
              className="flex flex-col gap-2 min-w-[200px]"
              transition={microReboundPreset}
              whileHover={{ scale: 1.02 }}
            >
              <label className="text-sm font-medium text-text-secondary">
                Color Channel
              </label>
              <Dropdown
                options={colorChannelOptions}
                placeholder="Select color channel"
                value={selectedChannel}
                onChange={(value) => setSelectedChannel(value as ColorChannel)}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Color Content */}
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          initial={{ opacity: 0, y: 30 }}
          key={selectedCategory}
          transition={Spring.smooth(0.3)}
        >
          {renderColorContent()}
        </motion.div>
      </AnimatePresence>

      {/* Color Modal */}
      <ColorModal
        colorData={modalColor?.data}
        colorName={modalColor?.name ?? ''}
        colorType={modalColor?.type ?? 'regular'}
        colorVariant={selectedVariant}
        isOpen={!!modalColor}
        onClose={() => setModalColor(null)}
        onCopy={handleCopy}
      />
    </div>
  )
}
