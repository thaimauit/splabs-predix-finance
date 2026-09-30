# PrediX Finance coding rules

## Architecture

- Keep product code under `src/`; group screens and domain logic under `src/features/<feature>`.
- Shared visual components belong in `src/components`; tokens belong in `src/theme`.
- Never hard-code colors in feature or component files. Add semantic tokens to `src/theme/colors.ts`.
- Read runtime configuration only through `src/config/env.ts`; never read `react-native-config` in features.
- Navigation route types live in `src/types/navigation.ts`. All screens and navigators must remain typed.

## React Native and TypeScript

- Use function components and named exports. `App.tsx` is the only allowed default component export.
- Keep styles in `StyleSheet.create` at the bottom of the file; avoid inline styles.
- Use `SafeAreaView` from `react-native-safe-area-context`, not React Native core.
- Keep render functions declarative. Move formatting and business rules to pure utilities and unit test them.
- Do not use `any`, non-null assertions, or untyped navigation props.
- Accessibility labels are required for icon-only pressables.

## Formatting and quality

- Prettier owns formatting; ESLint owns correctness. Do not add stylistic ESLint rules that conflict with Prettier.
- Before handing off code, run `npm run typecheck`, `npm run lint`, and `npm test -- --runInBand`.
- Tests should assert user-visible behavior or pure business rules, not implementation details or snapshots alone.
- Keep imports grouped: React/external modules, blank line, internal modules.

## Environment safety

- `.env.development` may contain local non-secret defaults. Never commit production secrets.
- Production builds must use `.env.production`; release signing credentials stay outside source control.
- Do not point development builds at production APIs.
