# PrediX Finance Mobile

Bare React Native application (no Expo), based on React Native 0.86 and TypeScript.

## Requirements

- Node.js 22.11+
- Android Studio/JDK 17 for Android
- Xcode and CocoaPods for iOS

Install dependencies:

```sh
npm install
cd ios && bundle install && bundle exec pod install && cd ..
```

Start Metro in one terminal with `npm start`, then run the desired app variant in another.

## Environments and builds

| Environment         | Debug                        | Release                        |
| ------------------- | ---------------------------- | ------------------------------ |
| Android development | `npm run android:dev:debug`  | `npm run android:dev:release`  |
| Android production  | `npm run android:prod:debug` | `npm run android:prod:release` |
| iOS development     | `npm run ios:dev:debug`      | `npm run ios:dev:release`      |
| iOS production      | `npm run ios:prod:debug`     | `npm run ios:prod:release`     |

Android has native `dev` and `prod` product flavors. Dev uses the `.dev` application ID suffix, so dev and production apps can be installed together. Both iOS commands use the standard target and inject the selected `.env` at build time. Add separate Xcode schemes later if the app needs separate bundle IDs/icons on iOS.

Environment values live in `.env.development` and `.env.production`. Never put production secrets in these files; mobile app bundles cannot safely hold secrets.

> The generated Android release configuration temporarily uses the debug keystore. Replace it with a secure CI/local release signing configuration before shipping.

## Project structure

```text
src/
├── app/navigation/       # Root stack and bottom tabs
├── components/           # Shared presentational components
├── config/               # Typed environment access
├── features/             # Product features and screens
├── theme/                # Semantic colors, spacing and typography
├── types/                # Shared TypeScript contracts
└── utils/                # Pure, unit-tested helpers
```

The first UI slice reproduces the dark/gold Challenges dashboard from the supplied HTML. Payouts, Billing, and More are registered in navigation and ready for their next feature slices.

## Quality commands

```sh
npm run typecheck
npm run lint
npm run format:check
npm test -- --runInBand
```

VS Code is configured so format-on-save uses Prettier and ESLint fixes only run when explicitly requested. Project and AI contribution rules are documented in `AGENTS.md`.
