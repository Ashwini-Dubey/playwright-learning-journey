# Playwright Learning Journey

A hands-on learning repository focused on **Playwright, JavaScript, UI test automation, debugging, and continuous integration**. This repository documents my progress through practical coding exercises, reusable automation patterns, and CI pipeline implementation.

The goal is to build job-ready QA automation skills by writing, executing, debugging, and continuously improving automated tests.

## Table of Contents

- [Learning Goals](#learning-goals)
- [Learning Approach](#learning-approach)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Playwright CLI Commands Cheat Sheet](#playwright-cli-commands-cheat-sheet)
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
- [Jenkins CI Pipeline](#jenkins-ci-pipeline)
- [Running Tests Locally](#running-tests-locally)
- [Skills Demonstrated](#skills-demonstrated)
- [Repository](#repository)

---

## Learning Goals

- Build a strong foundation in Playwright using JavaScript.
- Practice browser automation, locators, user interactions, and assertions.
- Develop maintainable and reusable automated tests.
- Understand test configuration, execution, and browser management.
- Debug failures using Playwright Inspector, traces, screenshots, and videos.
- Generate and analyze HTML and JUnit test reports.
- Integrate automated tests with Jenkins and GitHub Actions.
- Manage test credentials securely using environment variables and CI secrets.
- Apply automation practices to practical QA scenarios.
- Build a portfolio demonstrating hands-on automation and CI experience.

## Learning Approach

Each learning module focuses on practical exercises and incremental improvements.

My approach is to:

1. Write automation code based on a specific requirement.
2. Execute tests locally and observe their behavior.
3. Debug failures and understand their root causes.
4. Refactor code for readability, maintainability, and reuse.
5. Integrate successful tests into automated CI workflows.
6. Document the implementation and lessons learned.

The emphasis is on learning by doing rather than theory alone.

## Technology Stack

| Category             | Technologies                       |
| -------------------- | ---------------------------------- |
| Programming Language | JavaScript                         |
| Automation Framework | Playwright Test                    |
| Runtime              | Node.js                            |
| Package Manager      | npm                                |
| Version Control      | Git                                |
| Repository Hosting   | GitHub                             |
| CI Automation        | Jenkins, GitHub Actions            |
| Browsers             | Chromium                           |
| Test Reporting       | Playwright HTML Report, JUnit XML  |
| Debugging            | Playwright Inspector, Trace Viewer |
| Editor               | Visual Studio Code                 |

---

## Project Structure

The repository is organized around learning modules, test scripts, configuration, and CI workflows.

```text
playwright-learning-journey/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── tests/
│   ├── UIBasicsTest.spec.js
│   └── LocatorsTest.spec.js
├── playwright.config.js
├── Jenkinsfile
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

_The filenames above are representative of the current project. Update the tree as modules and files are added._

Generated directories such as `test-results/` and `playwright-report/` are created when tests run. They generally should not be committed to Git.

---

# Playwright CLI Commands Cheat Sheet

A practical reference for running, debugging, and managing Playwright tests using JavaScript and Playwright Test.

Run commands from the project root containing `package.json` and `playwright.config.js`.

## 1. Essential Commands

| Command                               | Description                         |
| ------------------------------------- | ----------------------------------- |
| `npx playwright test`                 | Run all configured tests            |
| `npx playwright test --headed`        | Run tests with a visible browser    |
| `npx playwright test --ui`            | Open interactive UI mode            |
| `npx playwright test --debug`         | Debug tests interactively           |
| `npx playwright test --list`          | List tests without executing them   |
| `npx playwright test --workers=1`     | Run with one worker                 |
| `npx playwright test --retries=2`     | Retry failed tests up to two times  |
| `npx playwright test --reporter=list` | Display test results in list format |
| `npx playwright --version`            | Display the Playwright version      |
| `npx playwright --help`               | Display general CLI help            |
| `npx playwright test --help`          | Display test runner options         |

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

### Run tests for a configured browser project

```bash
npx playwright test --project=chromium
```

Firefox and WebKit can also be selected if their projects are enabled in `playwright.config.js`:

```bash
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run previously failed tests

```bash
npx playwright test --last-failed
```

### Repeat each test multiple times

```bash
npx playwright test --repeat-each=3
```

### Combine multiple options

```bash
npx playwright test tests/UIBasicsTest.spec.js --headed --workers=1
```

## 3. Browser Installation

| Command                                       | Description                                             |
| --------------------------------------------- | ------------------------------------------------------- |
| `npx playwright install`                      | Install supported Playwright browsers                   |
| `npx playwright install chromium`             | Install Chromium                                        |
| `npx playwright install firefox`              | Install Firefox                                         |
| `npx playwright install webkit`               | Install WebKit                                          |
| `npx playwright install --with-deps chromium` | Install Chromium and required Linux system dependencies |
| `npx playwright install --with-deps`          | Install browsers and required system dependencies       |
| `npx playwright uninstall`                    | Remove Playwright-managed browser binaries              |

For GitHub Actions on Ubuntu, the following command is useful:

```bash
npx playwright install --with-deps chromium
```

This installs Chromium and the required system dependencies for the runner.

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

### Run tests with tracing

```bash
npx playwright test --trace on
```

Other useful trace modes include:

```bash
npx playwright test --trace retain-on-failure
npx playwright test --trace on-first-retry
```

### Configure screenshots and videos

Screenshot and video capture are configured in `playwright.config.js`:

```javascript
use: {
  screenshot: "only-on-failure",
  video: "retain-on-failure",
  trace: "on-first-retry",
}
```

These settings help capture debugging evidence when a test fails or is retried.

### Use different reporters

```bash
npx playwright test --reporter=list
npx playwright test --reporter=line
npx playwright test --reporter=dot
npx playwright test --reporter=html
```

### Generate JUnit XML for CI

```bash
npx playwright test --reporter=junit
```

For a fixed output path, configure the reporter in `playwright.config.js`:

```javascript
reporter: [
  ["list"],
  ["junit", { outputFile: "test-results/junit.xml" }],
  ["html", { outputFolder: "playwright-report", open: "never" }],
],
```

### Recommended debugging workflow

1. Reproduce the failing test locally.
2. Run it with `--debug` or `--trace on`.
3. Inspect the locator, action, and assertion.
4. Review the trace, screenshot, or video.
5. Fix the root cause and rerun the test.

## 5. Code Generation and Screenshots

### Generate test code using Codegen

```bash
npx playwright codegen https://www.google.com
```

### Generate code for a practice login page

```bash
npx playwright codegen https://rahulshettyacademy.com/loginpagePractise/
```

Codegen opens a browser and records interactions to help generate locators and automation code. Review and refactor generated code before using it in your test suite.

### Capture a webpage screenshot

```bash
npx playwright screenshot https://www.google.com screenshot.png
```

### Check command options

```bash
npx playwright screenshot --help
npx playwright codegen --help
```

## 6. Test Runner Options

| Option           | Example                         | Description                          |
| ---------------- | ------------------------------- | ------------------------------------ |
| `--config`       | `--config=playwright.config.js` | Specify a configuration file         |
| `--project`      | `--project=chromium`            | Select a configured project          |
| `--grep` or `-g` | `-g "Login"`                    | Run tests matching a title pattern   |
| `--grep-invert`  | `--grep-invert "Skipped"`       | Exclude matching test titles         |
| `--workers`      | `--workers=2`                   | Set the number of workers            |
| `--timeout`      | `--timeout=30000`               | Set the test timeout in milliseconds |
| `--retries`      | `--retries=1`                   | Retry failed tests                   |
| `--repeat-each`  | `--repeat-each=3`               | Repeat every test three times        |
| `--headed`       | `--headed`                      | Show the browser during execution    |
| `--last-failed`  | `--last-failed`                 | Rerun previously failed tests        |

For all available options, refer to:

```bash
npx playwright test --help
```

## 7. npm Commands

| Command                           | Description                                         |
| --------------------------------- | --------------------------------------------------- |
| `npm init -y`                     | Create a default `package.json`                     |
| `npm install`                     | Install project dependencies                        |
| `npm ci`                          | Install dependencies from the lockfile              |
| `npm install -D @playwright/test` | Install Playwright Test as a development dependency |
| `npm list @playwright/test`       | Display the installed Playwright Test version       |
| `npm outdated`                    | Check for outdated dependencies                     |
| `npm run`                         | List available npm scripts                          |

Use `npm ci` in CI pipelines for reproducible dependency installation. It requires a compatible committed lockfile.

## 8. npm Scripts

Define reusable commands in the `scripts` section of `package.json`.

For example:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:chromium": "playwright test --project=chromium",
    "test:report": "playwright show-report"
  }
}
```

Run the scripts using:

```bash
npm test
npm run test:headed
npm run test:ui
npm run test:debug
npm run test:chromium
npm run test:report
```

Add scripts to your existing `package.json` rather than replacing other dependencies or configuration.

## 9. Daily Workflow

A typical development workflow:

```bash
# 1. Install dependencies
npm ci

# 2. Install the required browser
npx playwright install chromium

# 3. Run the tests
npx playwright test

# 4. Debug a failing test
npx playwright test --debug

# 5. Open the HTML report
npx playwright show-report

# 6. Review changes before committing
git status
git diff

# 7. Commit and push your work
git add .
git commit -m "Add Playwright automation exercises"
git push origin dev
```

Before using `git add .`, verify that `.env`, credentials, and generated files are excluded by `.gitignore`.

## 10. Official Documentation

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test Configuration](https://playwright.dev/docs/test-configuration)
- [Playwright CLI](https://playwright.dev/docs/test-cli)
- [Locators](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)
- [HTML Reporter](https://playwright.dev/docs/test-reporters)
- [Playwright with GitHub Actions](https://playwright.dev/docs/ci-intro)

---

# Jenkins CI Pipeline

This project includes a Jenkins Declarative Pipeline for running Playwright tests from a GitHub-hosted repository.

The pipeline demonstrates continuous integration by automating dependency installation, browser setup, test execution, and reporting.

## Pipeline Stages

1. **Checkout:** Retrieve source code from GitHub.
2. **Environment Check:** Verify Node.js and npm availability.
3. **Install Dependencies:** Install project dependencies using `npm ci`.
4. **Browser Setup:** Install Chromium and required browser dependencies.
5. **Execute Tests:** Run Playwright automated tests.
6. **Publish Results:** Publish JUnit XML test results and archive reports and debugging artifacts.

## Key Features

- Jenkins Declarative Pipeline defined in a root-level `Jenkinsfile`.
- GitHub repository integration.
- Automated browser test execution.
- JUnit XML reporting for Jenkins.
- Playwright HTML report archiving.
- Screenshots, traces, and videos for failure investigation.
- Environment-based test configuration and securely managed credentials.
- Automatic build triggering through configured GitHub change detection.

## Technology Stack

- **Automation:** Playwright Test, JavaScript
- **Runtime:** Node.js, npm
- **CI:** Jenkins
- **Version Control:** Git, GitHub
- **Reporting:** JUnit XML, Playwright HTML Report
- **Browser:** Chromium

## Run the Tests Locally

```bash
npm ci
npx playwright install chromium
npx playwright test
```

The same test suite can then be executed by Jenkins through the configured pipeline.

## CI Artifacts

Depending on the build configuration, Jenkins can publish or archive:

- Build console output
- Pipeline stage results
- JUnit test results
- Playwright HTML reports
- Failure screenshots
- Traces and video recordings

Generated artifacts are intended for analysis and troubleshooting. They do not need to be committed to GitHub.

---

# Running Tests Locally

### Prerequisites

- Node.js and npm installed.
- Git installed.
- Repository cloned locally.
- Required Playwright browsers installed.
- Any required test credentials configured securely.

### Setup

```bash
git clone https://github.com/Ashwini-Dubey/playwright-learning-journey.git
cd playwright-learning-journey
npm ci
npx playwright install chromium
```

### Execute the tests

```bash
npm test
```

If your `package.json` does not define a `test` script, use:

```bash
npx playwright test
```

### View the results

```bash
npx playwright show-report
```

---

# Skills Demonstrated

This repository demonstrates practical experience and ongoing development in:

- JavaScript programming for QA automation.
- Browser automation with Playwright Test.
- Locator strategies, browser interactions, and assertions.
- Test execution, configuration, and debugging.
- Screenshot, trace, video, and report analysis.
- Reusable test design and maintainable automation code.
- Git version control and GitHub collaboration workflows.
- Jenkins pipeline configuration and automated test execution.
- GitHub Actions workflow configuration.
- CI test reporting and artifact management.
- Secure handling of test credentials through environment variables and CI secrets.

---

# Repository

**GitHub:** [Ashwini-Dubey/playwright-learning-journey](https://github.com/Ashwini-Dubey/playwright-learning-journey)

This repository is an ongoing learning project. New exercises, automation scenarios, debugging examples, and CI improvements will be added as the journey progresses.
