import type { ReactNode } from 'react';

export interface MenuActionItem {
  children?: MenuItem[];
  danger?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  key?: string;
  label: ReactNode;
  onClick?: () => void;
  type?: 'item';
}

export interface MenuSeparatorItem {
  key?: string;
  type: 'separator';
}

export interface MenuGroupItem {
  children: MenuItem[];
  key?: string;
  label: ReactNode;
  type: 'group';
}

export type MenuItem = MenuActionItem | MenuSeparatorItem | MenuGroupItem;
