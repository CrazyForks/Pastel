import { ArrowRight, Palette, Star, Zap } from 'lucide-react'
import { m } from 'motion/react'

import pkg from '../../../package.json'
import { microReboundPreset, Spring } from '../constants/spring'
import { Container } from './ui/Container'

export function Hero() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background gradient using semantic colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-material-medium" />

      {/* Animated gradient orbs using project colors */}
      <div className="absolute inset-0 overflow-hidden">
        <m.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <m.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <m.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <m.div
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            transition={Spring.smooth(0.8)}
          >
            <div className="space-y-4">
              <m.div
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                transition={Spring.snappy(0.5)}
                whileHover={{ scale: 1.05 }}
              >
                <Star className="w-4 h-4" />
                <span>Modern Color System</span>
              </m.div>

              <m.h1
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
                initial={{ opacity: 0, y: 20 }}
                transition={Spring.smooth(0.8, 0.1)}
              >
                A thoughtfully crafted
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue">
                  {' '}
                  color system
                </span>{' '}
                for modern interfaces
              </m.h1>

              <m.p
                animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl text-text-secondary max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                transition={Spring.smooth(0.8, 0.2)}
              >
                Pastel provides a comprehensive color palette designed for
                accessibility, consistency, and visual harmony across your
                applications.
              </m.p>
            </div>

            {/* Feature highlights */}
            <m.div
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto lg:max-w-none lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              transition={Spring.smooth(0.8, 0.3)}
            >
              {[
                {
                  icon: Palette,
                  title: 'Beautiful',
                  subtitle: 'Carefully crafted',
                  bg: 'bg-accent/10',
                  text: 'text-accent',
                  delay: 0.4,
                },
                {
                  icon: Zap,
                  title: 'Accessible',
                  subtitle: 'WCAG compliant',
                  bg: 'bg-blue/10',
                  text: 'text-blue',
                  delay: 0.5,
                },
                {
                  icon: Star,
                  title: 'Consistent',
                  subtitle: 'Across platforms',
                  bg: 'bg-purple/10',
                  text: 'text-purple',
                  delay: 0.6,
                },
              ].map((feature) => (
                <m.div
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 justify-center sm:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  key={feature.title}
                  transition={Spring.smooth(0.5, feature.delay)}
                  whileHover={{ scale: 1.02 }}
                >
                  <m.div
                    className={`p-2 rounded-lg ${feature.bg} ${feature.text}`}
                    transition={microReboundPreset}
                    whileHover={{ scale: 1.1 }}
                  >
                    <feature.icon className="w-5 h-5" />
                  </m.div>
                  <div className="text-center sm:text-left">
                    <p className="text-sm font-medium text-text">
                      {feature.title}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {feature.subtitle}
                    </p>
                  </div>
                </m.div>
              ))}
            </m.div>

            {/* CTA buttons */}
            <m.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              transition={Spring.smooth(0.8, 0.7)}
            >
              <a
                className="group inline-flex h-8 items-center justify-center gap-2 px-3.5 text-sm font-medium rounded-full bg-accent text-white hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 shadow-lg shadow-accent/25"
                href="#installation"
              >
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                className="inline-flex h-8 items-center justify-center gap-2 hover:bg-background-tertiary px-3.5 text-sm font-medium rounded-full bg-background-secondary text-text border border-border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                href={pkg.repo.url}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </m.div>
          </m.div>

          {/* Right content - Color showcase */}
          <m.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative order-first lg:order-last"
            initial={{ opacity: 0, scale: 0.8 }}
            transition={Spring.smooth(1, 0.2)}
          >
            <div className="relative grid grid-cols-2 gap-4 sm:gap-6 max-w-sm mx-auto lg:max-w-none">
              {/* Color cards using project colors */}
              <m.div
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
                initial={{ opacity: 0, x: -30 }}
                transition={Spring.smooth(0.8, 0.4)}
              >
                <m.div
                  className="aspect-square rounded-2xl bg-gradient-to-br from-pink to-pink-dark shadow-lg shadow-pink/25"
                  style={{ rotate: -6 }}
                  transition={microReboundPreset}
                  whileHover={{
                    rotate: -3,
                    scale: 1.05,
                    boxShadow:
                      '0 25px 50px -12px rgba(var(--color-pink-rgb), 0.4)',
                  }}
                />
                <m.div
                  className="aspect-square rounded-2xl bg-gradient-to-br from-blue to-blue-dark shadow-lg shadow-blue/25"
                  style={{ rotate: 3 }}
                  transition={microReboundPreset}
                  whileHover={{
                    rotate: 6,
                    scale: 1.05,
                    boxShadow:
                      '0 25px 50px -12px rgba(var(--color-blue-rgb), 0.4)',
                  }}
                />
              </m.div>

              <m.div
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 mt-8"
                initial={{ opacity: 0, x: 30 }}
                transition={Spring.smooth(0.8, 0.6)}
              >
                <m.div
                  className="aspect-square rounded-2xl bg-gradient-to-br from-purple to-purple-dark shadow-lg shadow-purple/25"
                  style={{ rotate: 6 }}
                  transition={microReboundPreset}
                  whileHover={{
                    rotate: 3,
                    scale: 1.05,
                    boxShadow:
                      '0 25px 50px -12px rgba(var(--color-purple-rgb), 0.4)',
                  }}
                />
                <m.div
                  className="aspect-square rounded-2xl bg-gradient-to-br from-green to-green-dark shadow-lg shadow-green/25"
                  style={{ rotate: -3 }}
                  transition={microReboundPreset}
                  whileHover={{
                    rotate: -6,
                    scale: 1.05,
                    boxShadow:
                      '0 25px 50px -12px rgba(var(--color-green-rgb), 0.4)',
                  }}
                />
              </m.div>

              {/* Floating elements using project colors */}
              <m.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow/20 dark:bg-yellow/10 rounded-full blur-2xl"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <m.div
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-pink/20 dark:bg-pink/10 rounded-full blur-2xl"
                animate={{
                  y: [0, 8, 0],
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </div>

            {/* Stats */}
            <m.div
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 grid grid-cols-3 gap-4 text-center max-w-xs mx-auto lg:max-w-none"
              initial={{ opacity: 0, y: 20 }}
              transition={Spring.smooth(0.8, 0.8)}
            >
              {[
                { value: '20+', label: 'Colors', delay: 0.9 },
                { value: '100%', label: 'Accessible', delay: 1 },
                { value: '3', label: 'Themes', delay: 1.1 },
              ].map((stat) => (
                <m.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  key={stat.label}
                  transition={Spring.smooth(0.5, stat.delay)}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-2xl font-bold text-text">{stat.value}</p>
                  <p className="text-sm text-text-secondary">{stat.label}</p>
                </m.div>
              ))}
            </m.div>
          </m.div>
        </div>
      </Container>
    </section>
  )
}
