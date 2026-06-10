import { ArrowUpRight, Terminal } from 'lucide-react'
import { m } from 'motion/react'

import { Spring } from '../../constants/spring'
import { Container } from '../ui/Container'
import { CopyButton } from '../ui/CopyButton'

const DEGIT_COMMAND =
  'pnpm dlx degit Innei/Pastel/templates/react-starter my-app'

const features = [
  'Vite 8 + React 19 + React Compiler',
  'TailwindCSS v4 with the Pastel theme preset',
  'Base UI primitives: modal, dropdown, context menu, select, popover, tooltip, form',
  'Imperative APIs — createModal / confirmModal / showContextMenu',
  'motion via LazyMotion (~6KB), file-based routes, jotai',
  'AGENTS.md + CLAUDE.md so AI agents follow the project conventions',
]

export const StarterTemplateSection = () => {
  return (
    <m.section
      className="py-16 sm:py-24 lg:py-32 border-t border-border"
      id="starter"
      initial={{ opacity: 0, y: 50 }}
      transition={Spring.smooth(0.8)}
      viewport={{ once: true, margin: '-100px' }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Container>
        <div className="max-w-4xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Starter template
          </h2>
          <p className="text-lg text-text-secondary mb-12">
            Skip the setup. A React starter wired with the Pastel theme, Base UI
            components and sensible conventions — scaffold a new app in one
            command.
          </p>

          <div className="space-y-8">
            <div className="group relative overflow-hidden rounded-xl border border-border bg-background-secondary/30 backdrop-blur-sm transition-all duration-200 hover:border-border-secondary hover:shadow-lg hover:shadow-black/5">
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-background-secondary/50 to-background-secondary/30 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-text">
                      Create a new app
                    </span>
                    <p className="text-xs text-text-secondary">
                      degit copies the template without git history
                    </p>
                  </div>
                </div>
                <CopyButton
                  label="Copy degit command"
                  value={DEGIT_COMMAND}
                  variant="icon"
                />
              </div>
              <div className="p-4 bg-gradient-to-br from-material-thin/20 to-material-thin/10">
                <code className="text-sm font-mono text-text">
                  {DEGIT_COMMAND}
                </code>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li
                  className="flex items-start gap-2.5 text-sm text-text-secondary"
                  key={feature}
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-6">
              <a
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:opacity-80 transition-opacity"
                href="/starter/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Open the live preview
                <ArrowUpRight className="size-4" />
              </a>
              <a
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text transition-colors"
                href="https://github.com/Innei/Pastel/tree/main/templates/react-starter"
                rel="noopener noreferrer"
                target="_blank"
              >
                Browse the template source
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </m.section>
  )
}
