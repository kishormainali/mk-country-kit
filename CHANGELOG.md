# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-08-31

### 🩹 Fixed & Improved
- **Exports Map**: Added explicit `"exports"` field to `@mkishor/mk-country-kit-ui` for modern ESM/CJS and bundler resolution.
- **CSS Import Compatibility**: Added `./styles`, `./style.css`, and `./dist/style.css` export subpaths in `@mkishor/mk-country-kit-react` and automated `style.css` generation during build.
- **Licensing & Metadata**: Added root and package-level MIT `LICENSE` files, plus repository, homepage, and issue-tracker links.
- **OIDC Publishing**: Configured GitHub Actions for passwordless OpenID Connect (OIDC) Trusted Publishing to npm.
- **Agent Skill**: Introduced `.agents/skills/mk-country-kit` with token-optimized progressive disclosure references for AI coding agents.

## [1.0.0] - 2026-08-31

### ✨ Added
- **Initial Release**: Launched the new scoped `@mkishor/mk-country-kit-*` packages monorepo.
- **Ecosystem Overhaul**:
  - `@mkishor/mk-country-kit`: Decoupled, zero-dependency package hosting raw country, currency, timezone, language, and division datasets with pure helper utility functions. Suitable for server-side, non-React, and scripting usage.
  - `@mkishor/mk-country-kit-core`: Decoupled core React hooks, context engine, and pickers logic.
  - `@mkishor/mk-country-kit-ui`: Premium component templates styled with Shadcn/UI (Tailwind CSS + Radix UI).
  - `@mkishor/mk-country-kit-react`: Main high-level React components wrapper with pre-bundled Vanilla CSS styling.
- **Tree-Shaking Support**: Implemented `"sideEffects": false` across all packages in the monorepo for clean treeshaking in modern bundlers.
- **Secure Publishing Workflow**: Configured a passwordless release pipeline on GitHub Actions using OpenID Connect (OIDC) trusted publishing and automated provenance generation.
