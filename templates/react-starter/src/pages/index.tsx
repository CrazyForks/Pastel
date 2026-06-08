import { Button } from '~/components/ui/button';

export function Component() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold text-text">Hello, Pastel.</h1>
      <p className="text-text-secondary">
        Vite 8 · React 19 · React Compiler · code-inspector · file-based routes · jotai · Pastel
        theme.
      </p>
      <Button>Get started</Button>
    </section>
  );
}
