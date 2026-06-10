import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import type { ReactElement, ReactNode } from 'react';

import { cn } from '~/lib/cn';

import { popupTransitionClassName } from '../menu/shared';

export interface TooltipProps {
  children: ReactElement;
  delay?: number;
  side?: 'top' | 'bottom' | 'left' | 'right';
  title: ReactNode;
}

export const Tooltip = ({ children, title, side = 'top', delay = 400 }: TooltipProps) => (
  <TooltipPrimitive.Root>
    <TooltipPrimitive.Trigger delay={delay} render={children} />
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner className="z-50" side={side} sideOffset={6}>
        <TooltipPrimitive.Popup
          className={cn(
            'rounded-md bg-text px-2 py-1 text-xs text-background shadow-md',
            popupTransitionClassName,
          )}
        >
          {title}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
);

export { TooltipPrimitive };
