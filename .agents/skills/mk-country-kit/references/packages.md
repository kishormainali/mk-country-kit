# Package Directory & Setup

## Selection Guide

| Stack / Need | Package to Install | Peer Dependencies |
| :--- | :--- | :--- |
| **Vanilla React** (No Tailwind) | `npm i @mkishor/mk-country-kit-react @mkishor/mk-country-kit-core` | `react >= 17` |
| **Shadcn / Tailwind CSS** | `npm i @mkishor/mk-country-kit-ui @mkishor/mk-country-kit-core` | `@radix-ui/react-popover`, `clsx`, `tailwind-merge`, `class-variance-authority`, `react >= 17` |
| **Custom UI / Headless Hooks** | `npm i @mkishor/mk-country-kit-core` | `react >= 17` |
| **Node.js / Server / Non-React** | `npm i @mkishor/mk-country-kit` | `libphonenumber-js` (bundled) |

---

## Bundler & CSS Configuration

### Vanilla CSS (`@mkishor/mk-country-kit-react`)
Must import CSS once in application root (`App.tsx`, `layout.tsx`, or global CSS):
```tsx
import '@mkishor/mk-country-kit-react/styles';
```

### Tailwind CSS (`@mkishor/mk-country-kit-ui`)
In Tailwind v3 `tailwind.config.js`, include the package in `content` if styles don't appear:
```js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@mkishor/mk-country-kit-ui/dist/**/*.{js,mjs}'
  ],
  // ...
};
```
In Tailwind v4, standard class matching is automatic.

---

## Next.js (App Router)
- Mark components importing pickers or hooks with `'use client';`
- Server Components can directly import `@mkishor/mk-country-kit` without client bundle overhead.
