import { ContextMenu } from '@base-ui/react/context-menu';

import type { MenuParts } from '../menu/render';

export const renderContextMenuParts: MenuParts = {
  Group: ContextMenu.Group,
  GroupLabel: ContextMenu.GroupLabel,
  Item: ContextMenu.Item,
  Popup: ContextMenu.Popup,
  Portal: ContextMenu.Portal,
  Positioner: ContextMenu.Positioner,
  Separator: ContextMenu.Separator,
  SubmenuRoot: ContextMenu.SubmenuRoot,
  SubmenuTrigger: ContextMenu.SubmenuTrigger,
};
