export type ColorCategory =
  | 'regular'
  | 'grayScale'
  | 'element'
  | 'background'
  | 'fill'
  | 'material'
  | 'application'
export type ColorVariant = 'regular' | 'high-contrast' | 'kawaii'
export type SortOrder =
  | 'default'
  | 'alphabetical'
  | 'alphabetical-desc'
  | 'hue'
  | 'lightness'
  | 'saturation'
export type ColorChannel = 'oklch' | 'srgb' | 'p3'

export interface ColorSection {
  description: string
  icon: React.ReactNode
  id: ColorCategory
  title: string
}

export interface ColorModalProps {
  colorData: any
  colorName: string
  colorType: ColorCategory
  colorVariant: ColorVariant
  isOpen: boolean
  onClose: () => void
  onCopy: (value: string) => void
}
