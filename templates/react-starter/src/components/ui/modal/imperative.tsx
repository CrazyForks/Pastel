import type { ReactNode } from 'react';
import { useCallback, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../button';
import {
  ModalBackdrop,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalPopup,
  ModalPortal,
  ModalRoot,
  ModalTitle,
} from './atoms';
import { useModal } from './context';

export interface ImperativeModalProps {
  className?: string;
  content?: ReactNode;
  footer?: ReactNode;
  maskClosable?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  title?: ReactNode;
  width?: number | string;
}

export interface ModalInstance {
  close: () => void;
  destroy: () => void;
  update: (props: Partial<ImperativeModalProps>) => void;
}

export interface ModalConfirmConfig {
  cancelText?: ReactNode;
  content?: ReactNode;
  danger?: boolean;
  okText?: ReactNode;
  onCancel?: () => void;
  onOk?: () => void | Promise<void>;
  title?: ReactNode;
}

interface ModalStackEntry {
  id: string;
  props: ImperativeModalProps;
}

let stack: ModalStackEntry[] = [];
let seed = 0;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
const getSnapshot = () => stack;

const updateModal = (id: string, next: Partial<ImperativeModalProps>) => {
  stack = stack.map((entry) =>
    entry.id === id ? { ...entry, props: { ...entry.props, ...next } } : entry,
  );
  notify();
};

const closeModal = (id: string) => updateModal(id, { open: false });

const destroyModal = (id: string) => {
  stack = stack.filter((entry) => entry.id !== id);
  notify();
};

export const createModal = (props: ImperativeModalProps): ModalInstance => {
  const id = `modal-${seed++}`;
  stack = [...stack, { id, props: { ...props, open: props.open ?? true } }];
  notify();

  return {
    close: () => closeModal(id),
    destroy: () => destroyModal(id),
    update: (next) => updateModal(id, next),
  };
};

const ConfirmBody = ({ config }: { config: ModalConfirmConfig }) => {
  const { close } = useModal();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    config.onCancel?.();
    close();
  };

  const handleOk = async () => {
    if (config.onOk) {
      try {
        const result = config.onOk();
        if (result instanceof Promise) {
          setLoading(true);
          await result;
        }
      } catch {
        setLoading(false);
        return;
      }
    }
    close();
  };

  return (
    <>
      {config.content && (
        <div className="text-[13px] text-text-secondary">{config.content}</div>
      )}
      <div className="mt-3 flex items-center justify-end gap-1.5">
        <Button size="sm" variant="secondary" onClick={handleCancel}>
          {config.cancelText ?? 'Cancel'}
        </Button>
        <Button
          loading={loading}
          size="sm"
          variant={config.danger ? 'danger' : 'primary'}
          onClick={handleOk}
        >
          {config.okText ?? 'OK'}
        </Button>
      </div>
    </>
  );
};

export const confirmModal = (config: ModalConfirmConfig) => {
  const instance = createModal({
    content: <ConfirmBody config={config} />,
    title: config.title,
    width: 400,
  });
  return { close: instance.close, destroy: instance.destroy };
};

const StackItem = ({ entry }: { entry: ModalStackEntry }) => {
  const { id, props } = entry;
  const open = props.open ?? true;

  const handleOpenChange = useCallback(
    (next: boolean, eventDetails?: { reason?: string }) => {
      if (!next && props.maskClosable === false && eventDetails?.reason === 'outside-press') {
        return;
      }
      if (!next) closeModal(id);
      props.onOpenChange?.(next);
    },
    [id, props],
  );

  const handleExitComplete = useCallback(() => destroyModal(id), [id]);

  const showHeader = props.title !== undefined && props.title !== null;

  return (
    <ModalRoot open={open} onExitComplete={handleExitComplete} onOpenChange={handleOpenChange}>
      <ModalPortal>
        <ModalBackdrop />
        <ModalPopup className={props.className} width={props.width}>
          {showHeader && (
            <ModalHeader>
              <ModalTitle>{props.title}</ModalTitle>
              <ModalClose />
            </ModalHeader>
          )}
          <ModalContent>{props.content}</ModalContent>
          {props.footer}
        </ModalPopup>
      </ModalPortal>
    </ModalRoot>
  );
};

export const ModalHost = () => {
  const entries = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  if (entries.length === 0) return null;
  return createPortal(
    entries.map((entry) => <StackItem entry={entry} key={entry.id} />),
    document.body,
  );
};
