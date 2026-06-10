import { cn } from '~/lib/cn';

export const popupTransitionClassName = cn(
  'origin-(--transform-origin) transition-[transform,opacity] duration-150 ease-out',
  'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
  'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
);

export const menuPopupClassName = cn(
  'z-50 min-w-40 rounded-lg border border-border bg-background p-1 shadow-lg outline-none',
  popupTransitionClassName,
);

export const menuItemClassName = cn(
  'flex cursor-default select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-text outline-none',
  'data-[highlighted]:bg-fill-tertiary data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
);

export const menuDangerItemClassName = cn(
  'text-red data-[highlighted]:bg-red/10 data-[highlighted]:text-red',
);

export const menuSeparatorClassName = 'mx-1 my-1 h-px bg-border';

export const menuGroupLabelClassName = 'px-2.5 py-1.5 text-xs font-medium text-text-tertiary';
