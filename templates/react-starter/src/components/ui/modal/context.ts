import { createContext, use } from 'react';

export interface ModalContextValue {
  close: () => void;
  exitComplete: () => void;
  open: boolean;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = () => {
  const context = use(ModalContext);
  if (!context) throw new Error('useModalContext must be used inside a Modal');
  return context;
};

export const useModal = () => {
  const { close } = useModalContext();
  return { close };
};
