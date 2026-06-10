import { Provider as JotaiProvider } from 'jotai';
import { domAnimation, LazyMotion } from 'motion/react';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

import { ContextMenuHost } from '~/components/ui/context-menu';
import { ModalHost } from '~/components/ui/modal';
import { Toaster } from '~/components/ui/toast';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider enableSystem attribute="data-theme" defaultTheme="system">
      <JotaiProvider>
        <LazyMotion strict features={domAnimation}>
          {children}
          <ModalHost />
          <ContextMenuHost />
          <Toaster />
        </LazyMotion>
      </JotaiProvider>
    </ThemeProvider>
  );
}
