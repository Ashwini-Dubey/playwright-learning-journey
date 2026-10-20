# Playwright Installation and Command Reference

## 1. Installation

Initialize a new Playwright project:

```bash
npm init playwright@latest
```

## 2. Default Folder Structure

```text
project-root/
├── playwright.config.ts
├── package.json
├── package-lock.json
└── tests/
    └── example.spec.ts
```

- `playwright.config.ts` — Test configuration.
- `package.json` — Project metadata, dependencies, and scripts.
- `package-lock.json` — Locks dependency versions for reproducible installations. Yarn and pnpm use their respective lockfiles.
- `tests/` — Directory containing test files.
- `example.spec.ts` — Example test generated during project initialization.

## 3. Check the Playwright Version

```bash
npx playwright --version
```

## 4. Execute Tests

### Run all tests

```bash
npx playwright test
```

### Run tests with the browser window visible

```bash
npx playwright test --headed
```

### Run tests in a specific browser

```bash
npx playwright test --project=chromium
```

### Run tests in multiple browsers

```bash
npx playwright test --project=webkit --project=firefox
```

### Run a single test file

```bash
npx playwright test tests/example.spec.ts
```

### Run only the tests that failed in the previous run

```bash
npx playwright test --last-failed
```

## 5. Run Tests in UI Mode

Launch the interactive Playwright Test UI to explore, run, and debug tests:

```bash
npx playwright test --ui
```

## 6. Debug Tests with Playwright Inspector

Launch the test runner in debug mode:

```bash
npx playwright test --debug
```

## 7. Generate Tests Using Codegen

Open the browser and Playwright Inspector to record interactions and generate test code:

```bash
npx playwright codegen https://demo.playwright.dev/todomvc
```

## 8. Record and Inspect Traces

Enable trace recording for the test run:

```bash
npx playwright test --trace on
```

Open the HTML report to access available test results and trace attachments:

```bash
npx playwright show-report
```

> **Note:** `--trace on` records traces for the run. The `trace` setting in `playwright.config.ts` can be configured to control when traces are captured, such as on failure.

## 9. View the HTML Test Report

After executing tests, open the generated HTML report:

```bash
npx playwright show-report
```

## 10. Update Playwright

Update the Playwright Test package:

```bash
npm install -D @playwright/test@latest
```

Install the browsers and their required dependencies:

```bash
npx playwright install --with-deps
```

> **Note:** `--with-deps` installs operating-system dependencies where supported, particularly on Linux. On macOS, use `npx playwright install` to install the browser binaries if the system dependencies are already available.
