import type { MenuItem } from '../menu/types';

interface VirtualAnchor {
  getBoundingClientRect: () => DOMRect;
}

export interface ContextMenuState {
  anchor: VirtualAnchor | null;
  items: MenuItem[];
  open: boolean;
}

const emptyState: ContextMenuState = { anchor: null, items: [], open: false };

let state: ContextMenuState = emptyState;
const listeners = new Set<() => void>();
const lastPointer = { ready: false, x: 0, y: 0 };

const notify = () => listeners.forEach((listener) => listener());

export const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getSnapshot = () => state;

export const updateLastPointer = (event: MouseEvent | PointerEvent) => {
  lastPointer.x = event.clientX;
  lastPointer.y = event.clientY;
  lastPointer.ready = true;
};

const createVirtualAnchor = (point: { x: number; y: number }): VirtualAnchor => ({
  getBoundingClientRect: () =>
    ({
      bottom: point.y,
      height: 0,
      left: point.x,
      right: point.x,
      toJSON: () => void 0,
      top: point.y,
      width: 0,
      x: point.x,
      y: point.y,
    }) as DOMRect,
});

const setState = (next: Partial<ContextMenuState>) => {
  state = { ...state, ...next };
  notify();
};

export const showContextMenu = (items: MenuItem[]) => {
  const point = lastPointer.ready
    ? { x: lastPointer.x, y: lastPointer.y }
    : { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  setState({ anchor: createVirtualAnchor(point), items, open: true });
};

export const updateContextMenuItems = (items: MenuItem[]) => {
  setState({ items });
};

export const closeContextMenu = () => {
  setState(emptyState);
};
