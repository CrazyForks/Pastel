import { ContextMenu } from '@base-ui/react/context-menu';
import { useEffect, useSyncExternalStore } from 'react';

import { createMenuItemsRenderer } from '../menu/render';
import { menuPopupClassName } from '../menu/shared';
import { renderContextMenuParts } from './parts';
import { closeContextMenu, getSnapshot, subscribe, updateLastPointer } from './store';

export const ContextMenuHost = () => {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  useEffect(() => {
    const handler = (event: MouseEvent | PointerEvent) => updateLastPointer(event);
    window.addEventListener('pointerdown', handler, true);
    window.addEventListener('contextmenu', handler, true);
    return () => {
      window.removeEventListener('pointerdown', handler, true);
      window.removeEventListener('contextmenu', handler, true);
    };
  }, []);

  if (!state.open && state.items.length === 0) return null;

  return (
    <ContextMenu.Root
      open={state.open}
      onOpenChange={(open) => {
        if (!open) closeContextMenu();
      }}
    >
      <ContextMenu.Portal>
        <ContextMenu.Positioner anchor={state.anchor ?? undefined} className="z-50" sideOffset={2}>
          <ContextMenu.Popup
            className={menuPopupClassName}
            onContextMenu={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            {renderItems(state.items)}
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

const renderItems = createMenuItemsRenderer(renderContextMenuParts);
