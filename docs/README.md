# PrediX Finance references

Use these local references before changing authentication or staging integration:

- `predix-auth-flow.md`: product requirements supplied on 2026-08-20.
- `staging-openapi.json`: OpenAPI schema captured from staging Swagger on 2026-08-20.
- Swagger UI: https://beta-finance-api.predixpro.io/api/docs#/
- Staging web: https://test-landing-page.predixpro.io

## Current authentication API coverage

The staging schema exposes email/password, refresh, Google browser OAuth, Apple,
X, and SIWE wallet authentication. Wallet providers include MetaMask, Base
Account, Rainbow, and WalletConnect. The schema does not currently expose a
Passkey/WebAuthn endpoint.

Never put production secrets or OAuth private credentials in this directory.

## Mobile authentication configuration

Set these values in the appropriate uncommitted/local environment or CI configuration:

- `REOWN_PROJECT_ID`: Reown Cloud project ID used by AppKit. Wallet login remains unavailable when empty.
- `X_OAUTH_CLIENT_ID`: X OAuth 2.0 public client ID. Register
  `predixfinance://auth/x/callback` as an allowed callback URL.
- `APPLE_SERVICE_ID` and `APPLE_REDIRECT_URI`: required for Apple sign-in on Android.
  The redirect must be HTTPS and registered with the Apple Service ID.
- `OAUTH_CALLBACK_SCHEME`: currently `predixfinance`. Keep the native iOS and Android
  URL scheme registrations in sync if this changes.

The staging backend Google OAuth callback must redirect to
`predixfinance://auth/google/callback?accessToken=...`. The app accepts both a
warm deep link and a cold-start deep link.

For iOS distribution, replace the placeholder bundle/application identifiers with
the final identifiers, enable **Sign in with Apple** for that App ID, and regenerate
the provisioning profile. The entitlement is already present in the Xcode project.

## Reown wallet flow

Reown AppKit is responsible for wallet discovery, connection, and message signing.
The application requests the exact SIWE message from `POST /api/auth/wallet/nonce`,
signs that returned message without modification, then exchanges the signature at
`POST /api/auth/walletconnect/login`.

Configured EVM networks are Base (`8453`), Base Sepolia (`84532`), and Ethereum
Mainnet (`1`), with Base selected by default.
