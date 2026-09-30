# AGENTS.md

## Agent skills

### Issue tracker

Issues are tracked as GitHub issues in this repo (`BitBangingBeast/TalkingCVProject`), using the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles map to these labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` at the repo root plus `docs/adr/`. See `docs/agents/domain.md`.

## Project structure

```
src/
  main.tsx                 entry — do not edit
  App.tsx                  composes Navbar + sections — orchestrator owns this
  index.css                theme tokens (Tailwind v4 `@theme`) + `.text-gradient`/`.bg-gradient-brand`
  components/
    ui/                    reusable primitives (Button, Card, SectionHeading, Section)
    layout/Navbar/         navbar
  sections/<Name>/         one folder per section; `index.tsx` default-exports the component
  data/                    typed content modules (site, skills, projects, experience, education, certifications, contact, tour)
  tour/                    avatar guide (3D scene + tour state machine)
  test/setup.ts            Vitest setup (jest-dom)
```

## Conventions

- **TypeScript strict**: `erasableSyntaxOnly` is on — no `enum`, no `namespace`, no parameter properties. `verbatimModuleSyntax` is on — use `import type { X }` for type-only imports. No unused locals/parameters.
- **Data from modules**: components never hardcode content strings; read from `src/data/*`.
- **Sections**: a section component lives in `src/sections/<Name>/index.tsx` as the default export, with a co-located `index.test.tsx`.
- **Tests**: Vitest + Testing Library; assert external behavior only (what renders / what a state machine transitions to). `npm test`.
- **Styling**: Tailwind utilities + the theme tokens in `index.css`; avoid raw hex colors in components.
- **Scope**: work only in the folders your ticket assigns you. Do **not** edit `App.tsx` or other sections' files.
- **Verify before finishing**: `npm run build`, `npm test`, `npm run lint`.
