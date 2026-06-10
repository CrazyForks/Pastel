import { Menu } from '@base-ui/react/menu';
import type { ReactElement, ReactNode } from 'react';

import { createMenuItemsRenderer } from '../menu/render';
import { menuPopupClassName } from '../menu/shared';
import type { MenuItem } from '../menu/types';

const renderItems = createMenuItemsRenderer({
  Group: Menu.Group,
  GroupLabel: Menu.GroupLabel,
  Item: Menu.Item,
  Popup: Menu.Popup,
  Portal: Menu.Portal,
  Positioner: Menu.Positioner,
  Separator: Menu.Separator,
  SubmenuRoot: Menu.SubmenuRoot,
  SubmenuTrigger: Menu.SubmenuTrigger,
});

export interface DropdownMenuProps {
  align?: 'start' | 'center' | 'end';
  children: ReactElement;
  defaultOpen?: boolean;
  footer?: ReactNode;
  header?: ReactNode;
  items: MenuItem[];
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export const DropdownMenu = ({
  children,
  items,
  align = 'start',
  side = 'bottom',
  header,
  footer,
  open,
  onOpenChange,
  defaultOpen,
}: DropdownMenuProps) => (
  <Menu.Root defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
    <Menu.Trigger render={children} />
    <Menu.Portal>
      <Menu.Positioner align={align} side={side} sideOffset={6}>
        <Menu.Popup className={menuPopupClassName}>
          {header && <div className="border-b border-border px-2.5 py-1.5">{header}</div>}
          {renderItems(items)}
          {footer && <div className="border-t border-border px-2.5 py-1.5">{footer}</div>}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  </Menu.Root>
);

export { Menu as DropdownMenuPrimitive };
