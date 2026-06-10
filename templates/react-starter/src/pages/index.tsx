import { Copy, Pencil, Settings, Share2, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { ContextMenu, showContextMenu } from '~/components/ui/context-menu';
import { DropdownMenu } from '~/components/ui/dropdown-menu';
import { Form, FormControl, FormError, FormField, FormLabel } from '~/components/ui/form';
import { Input, Textarea } from '~/components/ui/input';
import type { MenuItem } from '~/components/ui/menu';
import {
  confirmModal,
  createModal,
  ModalBackdrop,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalPopup,
  ModalPortal,
  ModalRoot,
  ModalTitle,
  ModalTrigger,
} from '~/components/ui/modal';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Select } from '~/components/ui/select';
import { toast } from '~/components/ui/toast';
import { Tooltip } from '~/components/ui/tooltip';

const menuItems: MenuItem[] = [
  { icon: <Pencil />, label: 'Edit', onClick: () => console.info('edit') },
  { icon: <Copy />, label: 'Duplicate' },
  {
    children: [{ label: 'Copy link' }, { label: 'Email' }],
    icon: <Share2 />,
    label: 'Share',
  },
  { type: 'separator' },
  { danger: true, icon: <Trash2 />, label: 'Delete' },
];

function DemoCard({
  title,
  description,
  children,
  wide,
}: {
  title: string;
  description: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border border-border bg-background-secondary/50 p-5 ${
        wide ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="space-y-0.5">
        <h3 className="text-sm font-semibold text-text">{title}</h3>
        <p className="text-xs text-text-tertiary">{description}</p>
      </div>
      <div className="flex flex-1 flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function Component() {
  const [fruit, setFruit] = useState<string>();

  return (
    <div className="space-y-12">
      <section className="space-y-4 pt-4">
        <h1 className="text-3xl font-semibold tracking-tight text-text">Hello, Pastel.</h1>
        <p className="max-w-xl text-text-secondary">
          Vite 8 · React 19 · React Compiler · Base UI · motion (LazyMotion) · file-based routes ·
          jotai — themed with the Pastel color system.
        </p>
        <div className="flex gap-3">
          <Button>Get started</Button>
          <Button
            variant="secondary"
            onClick={() => window.open('https://github.com/Innei/Pastel', '_blank')}
          >
            Pastel on GitHub
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-text">UI components</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <DemoCard
            description="Composable parts: ModalRoot, ModalTrigger, ModalPopup…"
            title="Modal · declarative"
          >
            <ModalRoot>
              <ModalTrigger render={<Button variant="secondary">Open modal</Button>} />
              <ModalPortal>
                <ModalBackdrop />
                <ModalPopup>
                  <ModalHeader>
                    <ModalTitle>Declarative modal</ModalTitle>
                    <ModalClose />
                  </ModalHeader>
                  <ModalContent>
                    Composed from Modal parts, animated with motion via LazyMotion.
                  </ModalContent>
                </ModalPopup>
              </ModalPortal>
            </ModalRoot>
          </DemoCard>

          <DemoCard
            description="createModal() and confirmModal() from anywhere"
            title="Modal · imperative"
          >
            <Button
              variant="secondary"
              onClick={() =>
                createModal({
                  content: 'Opened via createModal(). The instance can close/update itself.',
                  title: 'Imperative modal',
                })
              }
            >
              createModal()
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                confirmModal({
                  content: 'This action cannot be undone.',
                  danger: true,
                  onOk: () => new Promise((resolve) => setTimeout(resolve, 1000)),
                  title: 'Delete item?',
                })
              }
            >
              confirmModal()
            </Button>
          </DemoCard>

          <DemoCard description="Data-driven items with submenu support" title="Dropdown menu">
            <DropdownMenu items={menuItems}>
              <Button variant="secondary">
                <Settings className="size-4" />
                Actions
              </Button>
            </DropdownMenu>
          </DemoCard>

          <DemoCard description="Typed options, keyboard navigable" title="Select">
            <Select
              placeholder="Pick a fruit"
              value={fruit}
              options={[
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
                { disabled: true, label: 'Cherry (sold out)', value: 'cherry' },
              ]}
              onValueChange={setFruit}
            />
          </DemoCard>

          <DemoCard
            wide
            description="Declarative wrapper, or showContextMenu(items) from any event handler"
            title="Context menu"
          >
            <ContextMenu items={menuItems}>
              <div className="flex h-24 min-w-48 flex-1 items-center justify-center rounded-lg border border-dashed border-border text-sm text-text-tertiary">
                Right click · declarative
              </div>
            </ContextMenu>
            <button
              className="flex h-24 min-w-48 flex-1 items-center justify-center rounded-lg border border-dashed border-border text-sm text-text-tertiary"
              type="button"
              onContextMenu={(event) => {
                event.preventDefault();
                showContextMenu(menuItems);
              }}
            >
              Right click · imperative
            </button>
          </DemoCard>

          <DemoCard description="Anchored floating panel" title="Popover">
            <Popover>
              <PopoverTrigger render={<Button variant="secondary">Open popover</Button>} />
              <PopoverContent>
                <p className="text-sm text-text-secondary">
                  Arbitrary content, anchored to the trigger.
                </p>
              </PopoverContent>
            </Popover>
          </DemoCard>

          <DemoCard description="Appears on hover and focus" title="Tooltip">
            <Tooltip title="Tooltips appear on hover">
              <Button variant="ghost">Hover me</Button>
            </Tooltip>
          </DemoCard>

          <DemoCard wide description="sonner, themed with Pastel tokens" title="Toast">
            <Button variant="secondary" onClick={() => toast('A plain toast')}>
              toast()
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.success('Saved successfully', { description: 'All changes are persisted.' })
              }
            >
              toast.success()
            </Button>
            <Button variant="secondary" onClick={() => toast.error('Something went wrong')}>
              toast.error()
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
                  error: 'Failed',
                  loading: 'Uploading…',
                  success: 'Uploaded',
                })
              }
            >
              toast.promise()
            </Button>
          </DemoCard>

          <DemoCard wide description="Base UI Form + Field with native validation" title="Form">
            <Form
              className="w-full max-w-sm"
              onFormSubmit={(values) => console.info('submitted', values)}
            >
              <FormField name="email">
                <FormLabel>Email</FormLabel>
                <FormControl
                  required
                  placeholder="you@example.com"
                  render={<Input />}
                  type="email"
                />
                <FormError />
              </FormField>
              <FormField name="message">
                <FormLabel>Message</FormLabel>
                <FormControl render={<Textarea placeholder="Say something nice" />} />
              </FormField>
              <Button className="self-start" type="submit">
                Submit
              </Button>
            </Form>
          </DemoCard>
        </div>
      </section>
    </div>
  );
}
