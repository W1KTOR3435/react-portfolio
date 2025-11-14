# Portfolio - React + TypeScript + Vite

Responsive personal portfolio with light/dark themes, PL/EN localization, AOS scroll animations, and modular SCSS.

## Tech stack
- React 19, TypeScript, Vite
- SCSS Modules (design tokens, mixins, breakpoints)
- AOS (Animate On Scroll)
- i18n (PL/EN)
- CSS custom properties + data-theme

## Features
- Light/Dark theme with system preference and localStorage persistence
- Language toggle (PL/EN) via context
- Smooth in-page navigation with header offset
- Mobile menu with iOS-safe scroll lock
- Accessible focus styles and ARIA labels

## Requirements
- Node.js 18+ and npm/yarn/pnpm

## Quick start
```bash
# install
npm install

# dev server
npm run dev

# lint
npm run lint

# production build + preview
npm run build
npm run preview
```

Scripts are defined in package.json.

## Project structure
```
src/
  components/       # UI sections (Header, Banner, About, Experience, Skills, Certificates)
  i18n/             # i18n provider and locales (pl/en)
  styles/           # SCSS: abstracts (tokens/mixins), base, layout, main.scss
  App.tsx           # AOS initialization and page sections
  main.tsx          # Theme bootstrap and app mount
```

Key files:
- Theme tokens and breakpoints: src/styles/abstracts/_variables.scss
- Mixins (mq, container, focus ring): src/styles/abstracts/_mixins.scss
- Global styles entry: src/styles/main.scss
- Theme toggle: src/components/ThemeToggle/ThemeToggle.tsx
- Language toggle: src/components/LangToggle/LangToggle.tsx
- i18n provider and helpers: src/i18n/index.tsx; locales in src/i18n/locales/{pl,en}.json
- Smooth scroll helpers: Header/MobileMenu components
- Mobile menu overlay styles: src/components/MobileMenu/MobileMenu.module.scss

## Theming
- Current theme stored on documentElement as data-theme
- Colors defined as CSS variables in _variables.scss and consumed via SCSS variables
- System preference respected via prefers-color-scheme; user choice persisted

## i18n
- useI18n provides { lang, setLang, t }
- Add keys to src/i18n/locales/pl.json and en.json, then use t("app.path.to.key")

## Accessibility
- Focus-visible ring mixin and global outline
- ARIA attributes for interactive controls
- Scroll lock on mobile menu prevents background scrolling on iOS

## Build and deploy
- Build outputs static assets to dist/
- Host on any static hosting (Vercel, Netlify, GitHub Pages, etc.)

## License
Personal portfolio project.
