# AGENTS.md

Guidance for AI coding agents working in this project.

## Stack

Vite 8 · React 19 (React Compiler enabled) · TypeScript · TailwindCSS v4 · Pastel color system · Base UI (`@base-ui/react`) · motion (LazyMotion) · jotai · react-router via `vite-plugin-route-builder`.

Path alias: `~` → `./src`.

## Project structure & file placement

```
src/
├─ components/ui/        Reusable UI primitives — NO business logic
├─ features/<domain>/    Business modules, one folder per domain
├─ pages/                File-based routes — every .tsx exports `Component`
├─ lib/                  Cross-feature pure utilities (cn, formatters, …)
├─ styles/globals.css    Tailwind + Pastel theme + dark variant
├─ providers.tsx         Theme/Jotai/LazyMotion providers + ModalHost/ContextMenuHost/Toaster
└─ App.tsx               Mounts routes inside providers
```

### Where code goes

- **`components/ui/`** — generic, app-agnostic primitives (button, input, modal, …). They must never import from `features/` or know about business concepts. Every component lives in its own folder with an `index.ts` barrel (`button/button.tsx` + `button/index.ts`); import via `~/components/ui/<name>`, never deep paths.
- **`features/<domain>/`** — everything specific to a business domain. Internal layout per feature:
  ```
  features/<domain>/
  ├─ components/    Feature-scoped React components
  ├─ atoms.ts       jotai atoms for this domain
  ├─ hooks.ts       Feature-scoped hooks
  └─ index.ts       Barrel — the ONLY import surface for other code
  ```
  Other features and pages import only from `~/features/<domain>` (the barrel), never deep paths.
- **`pages/`** — thin route shells. Compose features and UI primitives; keep logic in features. A new file here automatically becomes a route (`pages/foo.tsx` → `/foo`, `pages/blog/[id].tsx` → `/blog/:id`). Each page exports a named `Component`.
- **`lib/`** — pure, dependency-light helpers used across features. No React state, no domain knowledge.

When deciding where a component goes: if another (hypothetical) app could reuse it unchanged, it is `components/ui/`; otherwise it belongs to a feature.

## UI components (`components/ui/`)

Built on [Base UI](https://base-ui.com) (`@base-ui/react`), styled with Pastel semantic Tailwind classes. Inventory:

| Component       | Folder           | Notes                                                                                                 |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------- |
| Button          | `button/`        | `variant`: primary / secondary / ghost / danger; `size`, `loading`                                    |
| Input, Textarea | `input/`         | Base UI Input; `data-invalid` styling built in                                                        |
| Form parts      | `form/`          | Base UI Form + Field: `Form`, `FormField`, `FormLabel`, `FormControl`, `FormDescription`, `FormError` |
| Modal           | `modal/`         | Declarative parts + imperative `createModal` / `confirmModal`                                         |
| DropdownMenu    | `dropdown-menu/` | Data-driven `items: MenuItem[]`                                                                       |
| ContextMenu     | `context-menu/`  | Declarative wrapper + imperative `showContextMenu(items)`                                             |
| Select          | `select/`        | Data-driven `options`                                                                                 |
| Popover         | `popover/`       | `Popover` / `PopoverTrigger` / `PopoverContent`                                                       |
| Tooltip         | `tooltip/`       | `<Tooltip title="…"><Button/></Tooltip>`                                                              |
| Toast           | `toast/`         | sonner-based; import `toast` from `~/components/ui/toast`, `Toaster` mounted in providers             |

Shared menu types and item rendering live in `components/ui/menu/` (`MenuItem` supports items, separators, groups, nested submenus, `danger`, icons).

### Imperative APIs

`ModalHost`, `ContextMenuHost` and `Toaster` are mounted once in `providers.tsx`. Anywhere in the app (including outside React) you can call:

```tsx
import { confirmModal, createModal } from '~/components/ui/modal'
import { showContextMenu } from '~/components/ui/context-menu'
import { toast } from '~/components/ui/toast'

const instance = createModal({ title: 'Hi', content: <Body /> }) // instance.close() / .update() / .destroy()
confirmModal({ title: 'Delete?', danger: true, onOk: async () => api.delete() })

onContextMenu={(e) => { e.preventDefault(); showContextMenu(items) }}
```

Content rendered through `createModal` can call `useModal().close()` to dismiss itself.

### Adding a new UI primitive

1. Reach for a Base UI primitive first (`@base-ui/react/<component>`); only hand-roll when none fits.
2. Style with Pastel semantic tokens (below). Reuse `components/ui/menu/shared.ts` class constants for popup-like surfaces.
3. For enter/exit animation, prefer Base UI CSS transitions via `data-[starting-style]` / `data-[ending-style]`. Use motion only for complex choreography.
4. Create the component as a folder and export everything public through its `index.ts` barrel.

## Motion

`motion` is loaded through `<LazyMotion features={domAnimation} strict>` in `providers.tsx` to keep the bundle small (~6KB instead of ~30KB).

- Always import the `m` component: `import { m, AnimatePresence } from 'motion/react'`.
- **Never** use `motion.*` directly — the `strict` flag throws on it.
- If a feature outside `domAnimation` is genuinely required (layout animations, drag), switch the affected subtree deliberately and document why.

## Styling rules

- Use Pastel **semantic** classes, never hard-coded palette values: `bg-background(-secondary/-tertiary)`, `text-text(-secondary/-tertiary)`, `border-border(-secondary)`, `bg-fill(-secondary/-tertiary)`, `bg-accent`, `text-red` for destructive.
- Dark mode is automatic via `data-theme` — semantic tokens switch by themselves; do not write `dark:` overrides for colors that have a semantic token.
- Compose class names with `cn()` from `~/lib/cn`.

## Conventions

- File names: kebab-case. Components export PascalCase named exports (no default exports except where a framework requires it).
- State: jotai atoms inside the owning feature (`features/<domain>/atoms.ts`).
- Run `pnpm lint` and `pnpm typecheck` after changes; only lint files you touched.
- `src/generated-routes.ts` is generated — never edit it by hand.
