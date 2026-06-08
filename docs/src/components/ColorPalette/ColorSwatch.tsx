interface ColorSwatchProps {
  className?: string
  color: string
  name: string
  onClick?: () => void
  shade?: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function ColorSwatch({
  color,
  name,
  shade,
  onClick,
  size = 'md',
  showLabel = true,
  className = '',
}: ColorSwatchProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  }

  return (
    <button
      aria-label={`${name} color swatch`}
      className={`group ${className}`}
      onClick={onClick}
    >
      <div className="space-y-2">
        <div
          className={`${sizeClasses[size]} rounded-md border border-border transition-all group-hover:scale-105`}
          style={{ backgroundColor: color }}
        />
        {showLabel && (
          <div className="text-left">
            <p className="text-sm font-medium capitalize">{name}</p>
            {shade && <p className="text-xs text-muted">{shade}</p>}
            <p className="text-xs text-muted font-mono">{color}</p>
          </div>
        )}
      </div>
    </button>
  )
}
