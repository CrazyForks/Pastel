import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { AnimatePresence, m as motion } from 'motion/react'
import type { ReactNode } from 'react'

import { Spring } from '../../constants/spring'
import { cn } from '../../utils/cn'

interface ModalProps {
  children: ReactNode
  className?: string
  isOpen: boolean
  onClose: () => void
  size?: 'sm' | 'md' | 'lg'
  title?: string
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  className,
}: ModalProps) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            {/* Backdrop with Framer Motion */}
            <Dialog.Overlay asChild>
              <motion.div
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-50 bg-background-quaternary/20 backdrop-blur-[70px]"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={Spring.presets.smooth}
              />
            </Dialog.Overlay>

            {/* Modal Content with Framer Motion */}
            <Dialog.Content asChild forceMount>
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={Spring.presets.smooth}
                className={cn(
                  'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
                  'bg-background rounded-lg shadow-xl w-full max-h-[90vh] flex flex-col',
                  'focus:outline-none',
                  sizes[size],
                  className,
                )}
              >
                {/* Header */}
                {title && (
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-border flex-shrink-0">
                    <Dialog.Title className="text-sm font-semibold text-text">
                      {title}
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="text-text-secondary hover:text-text transition-colors"
                        type="button"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </Dialog.Close>
                  </div>
                )}

                {/* Close button when no title */}
                {!title && (
                  <Dialog.Close asChild>
                    <button
                      className="absolute right-3 top-3 z-10 text-text-secondary hover:text-text transition-colors p-1"
                      type="button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Dialog.Close>
                )}

                {/* Content - with scroll */}
                <div className={'overflow-y-auto flex-1 p-4'}>{children}</div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
