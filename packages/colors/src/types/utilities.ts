import type { ColorSystem, DarkModeConfig } from './index'

export interface OKLCH {
  a?: number
  c: number
  h: number
  l: number
}

export interface RGB {
  a?: number
  b: number
  g: number
  r: number
}

export interface ColorValidationResult {
  errors: string[]
  valid: boolean
  warnings: string[]
}

export interface ContrastRatio {
  passes: {
    aa: boolean
    aaa: boolean
    largeTextAa: boolean
    largeTextAaa: boolean
  }
  ratio: number
}

export type ColorFormat = 'oklch' | 'srgb' | 'p3' | 'hex'

export interface ColorConversionOptions {
  fallback?: boolean
  format: ColorFormat
  precision?: number
}

export interface GeneratorConfig {
  colors: ColorSystem
  darkMode?: DarkModeConfig
  formatOptions?: {
    colorSpace?: ColorFormat
    includeP3?: boolean
    includeFallbacks?: boolean
    precision?: number
  }
  prefix?: string
}
