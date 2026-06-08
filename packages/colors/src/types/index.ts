export interface ColorValue {
  oklch: string
  p3?: string
  srgb: string
}

/**
 * Input type for creating colors - can be OKLCH or sRGB string
 */
export type ColorInput = string

export interface ColorVariants {
  dark: ColorValue
  light: ColorValue
}

export type DepthLevel =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'quinary'

export interface SemanticColor {
  primary?: ColorVariants
  quaternary?: ColorVariants
  quinary?: ColorVariants
  secondary?: ColorVariants
  tertiary?: ColorVariants
}

export type MaterialOpacity =
  | 'ultraThick'
  | 'thick'
  | 'medium'
  | 'thin'
  | 'ultraThin'
  | 'opaque'

export interface MaterialColor {
  dark: ColorValue
  light: ColorValue
}

export type DarkModeStrategy = 'media-query' | 'class' | 'data-attribute'

export interface DarkModeConfig {
  selector?: string
  strategy: DarkModeStrategy
}

export type RegularColorName =
  | 'blue'
  | 'red'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'orange'
  | 'pink'
  | 'brown'
  | 'gray'
  | 'black'
  | 'white'
  | 'sky'
  | 'neutral'
  | 'teal'
  | 'cyan'
  | 'indigo'
  | 'violet'
  | 'lime'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'slate'
  | 'zinc'

export type GrayScaleColorName =
  | 'gray1'
  | 'gray2'
  | 'gray3'
  | 'gray4'
  | 'gray5'
  | 'gray6'
  | 'gray7'
  | 'gray8'
  | 'gray9'
  | 'gray10'

export type ElementColorName =
  | 'border'
  | 'separator'
  | 'link'
  | 'text'
  | 'placeholderText'
  | 'disabledControl'
  | 'disabledText'

export type ApplicationColorName = 'accent' | 'primary' | 'secondary'

export type ThemeName = 'regular' | 'kawaii' | 'high-contrast'

export interface ThemeColorSystem {
  application: Record<ApplicationColorName, ColorVariants>
  background: SemanticColor
  colors: Record<RegularColorName, ColorVariants>
  element: Record<ElementColorName, SemanticColor>
  fill: SemanticColor
  grayScale: Record<GrayScaleColorName, ColorVariants>
  material: Record<MaterialOpacity, MaterialColor>
}

export interface ColorSystem {
  'high-contrast': ThemeColorSystem
  kawaii: ThemeColorSystem
  regular: ThemeColorSystem
}

export interface ColorPalette {
  colors: ColorSystem
  meta?: {
    name: string
    description: string
    theme: ThemeName
  }
}

// Legacy interfaces for backward compatibility
export interface HighContrastColorVariants extends ColorVariants {}
export interface KawaiiColorVariants extends ColorVariants {}
