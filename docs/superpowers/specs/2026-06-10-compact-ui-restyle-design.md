# Compact UI Restyle — Design Spec

Date: 2026-06-10
Status: Approved (mockup reviewed at true pixel size)

## Goal

Restyle the UI components in both `templates/react-starter` and `docs` to a compact, Linear-density look. Current buttons and form controls feel oversized and dated. No architectural changes — restyle in place; the two codebases keep their independent component implementations.

## Out of scope

- Extracting a shared UI package (`@pastel-palette/ui`)
- Replacing the docs site's hand-rolled components with the starter's Base UI kit
- Any color/token changes in `packages/colors`

## Size spec

### Button (both codebases)

| Size           | Height     | Padding | Font        |
| -------------- | ---------- | ------- | ----------- |
| `sm`           | h-6 (24px) | px-2    | text-xs     |
| `md` (default) | h-7 (28px) | px-2.5  | text-[13px] |
| `lg` (CTA)     | h-8 (32px) | px-3.5  | text-sm     |

- Radius stays `rounded-md` (`rounded` / 5px acceptable for `sm`).
- The starter Button gains no new variants; docs Button keeps primary/secondary/ghost.
- The starter Button currently has only `sm`/`md`; add `lg`.

### Focus ring (both codebases)

Replace `focus:ring-2 focus:ring-offset-2` (and `focus-visible:` equivalents) with a soft, offset-free ring:

- `focus-visible:ring-2 focus-visible:ring-accent/40` plus `focus-visible:border-accent` on bordered controls.
- No `ring-offset`.

### docs Button: remove motion

- Delete `whileHover={{ scale: 1.02 }}` / `whileTap={{ scale: 0.98 }}` and the `m.button` / `m.a` wrappers; render plain `button` / `a` with a `transition-[background-color,opacity]` color transition.
- Drop the now-unused `microReboundPreset` import (keep the constant file if other components use it).

## Component changes — templates/react-starter (`src/components/ui/`)

| Component              | Current                                        | Proposed                                            |
| ---------------------- | ---------------------------------------------- | --------------------------------------------------- |
| Button                 | `md: h-9 px-4 text-sm`, `sm: h-8 px-3 text-xs` | Spec table above; add `lg`                          |
| Input                  | `h-9 px-3 text-sm`                             | `h-7 px-2.5 text-[13px]`                            |
| Textarea               | `min-h-20 px-3 py-2 text-sm`                   | `min-h-16 px-2.5 py-1.5 text-[13px]`                |
| Select trigger         | `h-9 px-3 text-sm`                             | `h-7 px-2.5 text-[13px]`                            |
| Menu item              | `px-2.5 py-1.5 text-sm`                        | `px-2 py-1 text-[13px]`                             |
| Menu group label       | `px-2.5 py-1.5 text-xs`                        | `px-2 py-1 text-[11px]`                             |
| Dropdown header/footer | `px-2.5 py-1.5`                                | `px-2 py-1`                                         |
| Modal header           | `px-4 pb-1 pt-3.5`, title `text-base`          | `px-3.5 pb-0.5 pt-3`, title `text-sm font-semibold` |
| Modal body             | `px-4 py-3 text-sm`                            | `px-3.5 py-2.5 text-[13px]`                         |
| Modal footer           | `px-4 pb-3.5 pt-1`                             | `px-3.5 pb-3 pt-0.5`, gap-1.5                       |
| Popover content        | `p-4`                                          | `p-3`                                               |
| Tooltip                | `px-2.5 py-1 text-xs`                          | `px-2 py-1 text-xs`                                 |
| Form label             | `text-sm`                                      | `text-[13px]`                                       |
| Form gap               | `gap-4`                                        | `gap-3`                                             |

Select popup items reuse the shared menu classes and shrink automatically.

## Component changes — docs (`src/components/ui/` + call sites)

| Component                                                 | Current                                                                       | Proposed                                                  |
| --------------------------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------- |
| Button                                                    | `sm: px-3 py-1.5 text-sm`, `md: px-4 py-2 text-sm`, `lg: px-6 py-3 text-base` | Spec table above (h-6/h-7/h-8)                            |
| Input                                                     | `h-10 px-3 py-2 text-sm`                                                      | `h-7 px-2.5 text-[13px]` (drop py)                        |
| Select                                                    | `h-10 px-3 py-2 text-sm`                                                      | `h-7 px-2.5 text-[13px]`; option rows shrink to match     |
| Textarea                                                  | mirrors Input                                                                 | `px-2.5 py-1.5 text-[13px]`                               |
| Modal                                                     | header `px-6 py-3`, body `p-6`                                                | header `px-4 py-2.5`, body `p-4`                          |
| Checkbox / Slider / Dropdown                              | various                                                                       | shrink hit targets and fonts to match the 28px/13px scale |
| Hero CTA (`Hero.tsx`, hand-written `px-6 py-3 text-base`) | use `lg` spec: `h-8 px-3.5 text-sm`                                           |

Other hand-written oversized controls found in `MainSections.tsx`, `InstallSection.tsx`, `StarterTemplateSection.tsx`, `ColorSwatch.tsx` get the same treatment where they are buttons/inputs; purely decorative large spacing (section paddings, hero `py-16+`) stays untouched.

## Verification

- `pnpm lint` + `pnpm typecheck` scoped to touched files.
- Visual check: run `docs` dev server and the starter template dev server; compare against the approved mockup (`.superpowers/brainstorm/60751-1781091426/content/compact-components.html`).
