import { ChevronRight } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';

import { cn } from '~/lib/cn';

import {
  menuDangerItemClassName,
  menuGroupLabelClassName,
  menuItemClassName,
  menuPopupClassName,
  menuSeparatorClassName,
} from './shared';
import type { MenuActionItem, MenuItem } from './types';

export interface MenuParts {
  Group: ComponentType<any>;
  GroupLabel: ComponentType<any>;
  Item: ComponentType<any>;
  Popup: ComponentType<any>;
  Portal: ComponentType<any>;
  Positioner: ComponentType<any>;
  Separator: ComponentType<any>;
  SubmenuRoot: ComponentType<any>;
  SubmenuTrigger: ComponentType<any>;
}

const itemKeyOf = (item: MenuItem, index: number) => item.key ?? `menu-item-${index}`;

export function createMenuItemsRenderer(parts: MenuParts) {
  const renderActionItem = (item: MenuActionItem, key: string): ReactNode => {
    const inner = (
      <>
        {item.icon && (
          <span className="flex size-4 items-center justify-center [&>svg]:size-4">
            {item.icon}
          </span>
        )}
        <span className="flex-1 truncate">{item.label}</span>
      </>
    );

    if (item.children) {
      return (
        <parts.SubmenuRoot key={key}>
          <parts.SubmenuTrigger
            className={cn(menuItemClassName, item.danger && menuDangerItemClassName)}
            disabled={item.disabled}
          >
            {inner}
            <ChevronRight className="size-3.5 text-text-tertiary" />
          </parts.SubmenuTrigger>
          <parts.Portal>
            <parts.Positioner sideOffset={4}>
              <parts.Popup className={menuPopupClassName}>
                {renderMenuItems(item.children)}
              </parts.Popup>
            </parts.Positioner>
          </parts.Portal>
        </parts.SubmenuRoot>
      );
    }

    return (
      <parts.Item
        className={cn(menuItemClassName, item.danger && menuDangerItemClassName)}
        disabled={item.disabled}
        key={key}
        onClick={item.onClick}
      >
        {inner}
      </parts.Item>
    );
  };

  const renderMenuItems = (items: MenuItem[]): ReactNode =>
    items.map((item, index) => {
      const key = itemKeyOf(item, index);

      if (item.type === 'separator') {
        return <parts.Separator className={menuSeparatorClassName} key={key} />;
      }

      if (item.type === 'group') {
        return (
          <parts.Group key={key}>
            <parts.GroupLabel className={menuGroupLabelClassName}>{item.label}</parts.GroupLabel>
            {renderMenuItems(item.children)}
          </parts.Group>
        );
      }

      return renderActionItem(item, key);
    });

  return renderMenuItems;
}
