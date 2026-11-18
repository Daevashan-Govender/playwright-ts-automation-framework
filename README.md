# playwright-ts-automation-framework

Playwright + TypeScript browser automation tests.

## Requirements

- Node.js 22 or later
- npm (included with Node.js)

## Setup after cloning

Run these commands from the project root:

```powershell
npm ci
npx playwright install
```

`npm ci` installs the exact dependency versions recorded in `package-lock.json`.
Playwright browser binaries are installed separately from npm packages.

## Run tests

```powershell
npm test
```

Optional:

```powershell
npm run test:headed
npm run test:ui
```

The test configuration runs the suite in Chromium, Firefox, and WebKit. Install
the browsers with `npx playwright install` before running the tests.
