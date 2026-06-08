import { Monitor, Moon, Sun } from 'lucide-react'
import { m } from 'motion/react'
import { useTheme } from 'next-themes'

import { Container } from '../ui/Container'

export function Footer() {
  const { theme, setTheme } = useTheme()

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'system', icon: Monitor, label: 'System' },
    { value: 'dark', icon: Moon, label: 'Dark' },
  ]

  const activeIndex = themeOptions.findIndex((option) => option.value === theme)

  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="flex items-center justify-between py-8">
          <div className="text-sm text-text-secondary">
            © 2025 Pastel. Built with love by{' '}
            <a
              className="hover:underline decoration-accent"
              href="https://innei.in"
              rel="noopener noreferrer"
              target="_blank"
            >
              Innei
            </a>
            . To build better design.
          </div>

          <div className="relative flex items-center gap-1 p-1 rounded-full bg-background-secondary border border-border">
            <m.div
              className="absolute rounded-full bg-background shadow-sm border border-border/50"
              initial={false}
              animate={{
                x: activeIndex * 36, // 32px button width + 4px gap
                width: 32,
                height: 32,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            />
            {themeOptions.map((option) => (
              <button
                aria-label={`Switch to ${option.label} theme`}
                key={option.value}
                title={option.label}
                type="button"
                className={`relative z-10 p-2 rounded-full transition-colors ${
                  theme === option.value
                    ? 'text-text'
                    : 'text-text-secondary hover:text-text'
                }`}
                onClick={() => setTheme(option.value)}
              >
                <option.icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
