# TODO

## 1) Apply UI restraint to runtime canvas
- [x] Update `components/builder/live-canvas.tsx` to make runtime purple dominant:

  - Replace large semantic borders with runtime purple/neutral borders.
  - Make chart bars runtime-purple dominant with only subtle tone tint.
  - Replace semantic icon colors with runtime/neutral.
  - Keep `ToneBadge`/chips as the primary semantic indicators.


## 2) Subtle template differentiation (no rainbow)
- [x] Update `components/templates/template-card.tsx` to keep template accents subtle and consistent per template category:
  - CRM → runtime + success accents
  - Support → runtime + live accents
  - Analytics → runtime + live accents
  - Inventory → runtime + pending accents
  - Admin → runtime + advanced accents

## 3) Validate
- [x] Run lint/build to ensure no TS/JSX errors.
- [x] Summarize changed files and call out visible before/after differences.

