# Playwright Learning Journey

This repository documents my hands-on journey learning Playwright with JavaScript, with a focus on practical coding exercises and QA automation.

## Goals

- Build a strong foundation in Playwright.
- Practice browser automation, locators, actions, and assertions.
- Learn test configuration, debugging, screenshots, traces, and reporting.
- Apply JavaScript skills to automated testing.
- Gradually build reusable tests and real-world automation projects.

## Approach

Each module contains practical coding exercises, test files, and notes on implementation. The goal is to learn by writing, running, debugging, and improving automated tests.

# Playwright CLI Commands Cheat Sheet

A practical reference guide for running, debugging, and managing Playwright tests using JavaScript and Playwright Test.

## Table of Contents

- [1. Essential Commands](#1-essential-commands)
- [2. Running Specific Tests](#2-running-specific-tests)
- [3. Browser Installation](#3-browser-installation)
- [4. Reports and Debugging](#4-reports-and-debugging)
- [5. Code Generation and Screenshots](#5-code-generation-and-screenshots)
- [6. Test Runner Options](#6-test-runner-options)
- [7. npm Commands](#7-npm-commands)
- [8. npm Scripts](#8-npm-scripts)
- [9. Daily Workflow](#9-daily-workflow)
- [10. Official Documentation](#10-official-documentation)

---

## 1. Essential Commands

Run these commands from the project root directory containing `package.json` and `playwright.config.js`.

| Command                               | Description                       |
| ------------------------------------- | --------------------------------- |
| `npx playwright test`                 | Run all tests                     |
| `npx playwright test --headed`        | Run tests with a visible browser  |
| `npx playwright test --ui`            | Open the interactive UI mode      |
| `npx playwright test --debug`         | Debug tests interactively         |
| `npx playwright test --list`          | List tests without executing them |
| `npx playwright test --workers=1`     | Run tests using one worker        |
| `npx playwright test --retries=2`     | Retry failed tests twice          |
| `npx playwright test --reporter=list` | Display test results as a list    |
| `npx playwright --version`            | Display the Playwright version    |
| `npx playwright --help`               | Display general CLI help          |
| `npx playwright test --help`          | Display test runner options       |

## 2. Running Specific Tests

### Run a specific test file

```bash
npx playwright test tests/UIBasicsTest.spec.js
```

### Run tests matching a title

```bash
npx playwright test -g "First Playwright Test"
```

### Run a specific file with a visible browser

```bash
npx playwright test tests/UIBasicsTest.spec.js --headed
```

### Run tests for a specific browser project

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

The Firefox and WebKit commands require those projects to be configured and their browsers installed.

### Run only previously failed tests

```bash
npx playwright test --last-failed
```

### Run each test multiple times

```bash
npx playwright test --repeat-each=3
```

### Combine multiple options

```bash
npx playwright test tests/UIBasicsTest.spec.js --headed --workers=1
```

## 3. Browser Installation

| Command                                       | Description                                       |
| --------------------------------------------- | ------------------------------------------------- |
| `npx playwright install`                      | Install all supported browsers                    |
| `npx playwright install chromium`             | Install Chromium                                  |
| `npx playwright install firefox`              | Install Firefox                                   |
| `npx playwright install webkit`               | Install WebKit                                    |
| `npx playwright install --with-deps`          | Install browsers and required system dependencies |
| `npx playwright install --with-deps chromium` | Install Chromium and its system dependencies      |
| `npx playwright uninstall`                    | Remove Playwright-managed browser binaries        |

For GitHub Actions on Ubuntu, install Chromium and its dependencies with:

```bash
npx playwright install --with-deps chromium
```

## 4. Reports and Debugging

### Generate an HTML report

```bash
npx playwright test --reporter=html
```

### Open the HTML report

```bash
npx playwright show-report
```

### Open a report from a specific directory

```bash
npx playwright show-report playwright-report
```

### Record traces

```bash
npx playwright test --trace on
npx playwright test --trace retain-on-failure
npx playwright test --trace on-first-retry
```

### Capture screenshots

```bash
npx playwright test --screenshot on
```

### Record videos

```bash
npx playwright test --video on
```

### Use different reporters

```bash
npx playwright test --reporter=list
npx playwright test --reporter=line
npx playwright test --reporter=dot
npx playwright test --reporter=html
```

### Recommended debugging workflow

```bash
npx playwright test --trace on
npx playwright show-report
```

Note: Screenshot, video, and trace options may also be configured through `playwright.config.js`. Check the options supported by your installed Playwright version.

## 5. Code Generation and Screenshots

### Generate test code using Codegen

```bash
npx playwright codegen https://www.google.com
```

### Generate code for a practice login page

```bash
npx playwright codegen https://rahulshettyacademy.com/loginpagePractise/
```

Codegen opens a browser and records your interactions to help generate locators and test code.

### Capture a webpage screenshot

```bash
npx playwright screenshot https://www.google.com screenshot.png
```

### Check screenshot command options

```bash
npx playwright screenshot --help
```

### Check Codegen options

```bash
npx playwright codegen --help
```

## 6. Test Runner Options

| Option           | Example                         | Description                            |
| ---------------- | ------------------------------- | -------------------------------------- |
| `--config`       | `--config=playwright.config.js` | Specify the configuration file         |
| `--project`      | `--project=chromium`            | Select a configured project            |
| `--grep` or `-g` | `-g "Login"`                    | Run tests matching a title pattern     |
| `--grep-invert`  | `--grep-invert "Skipped"`       | Exclude tests matching a title pattern |
| `--workers`      | `--workers=2`                   | Set the number of workers              |
| `--timeout`      | `--timeout=30000`               | Set the test timeout in milliseconds   |
| `--retries`      | `--retries=1`                   | Retry failed tests                     |
| `--repeat-each`  | `--repeat-each=3`               | Repeat each test three times           |

| `--
