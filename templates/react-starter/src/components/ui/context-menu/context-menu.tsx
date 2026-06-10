import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu';
import type { ReactElement } from 'react';

import { createMenuItemsRenderer } from '../menu/render';
import { menuPopupClassName } from '../menu/shared';
import type { MenuItem } from '../menu/types';
import { renderContextMenuParts } from './parts';

const renderItems = createMenuItemsRenderer(renderContextMenuParts);

export interface ContextMenuProps {
  children: ReactElement;
  items: MenuItem[];
}

export const ContextMenu = ({ children, items }: ContextMenuProps) => (
  <ContextMenuPrimitive.Root>
    <ContextMenuPrimitive.Trigger render={children} />
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner className="z-50" sideOffset={2}>
        <ContextMenuPrimitive.Popup className={menuPopupClassName}>
          {renderItems(items)}
        </ContextMenuPrimitive.Popup>
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  </ContextMenuPrimitive.Root>
);

export { ContextMenuPrimitive };
