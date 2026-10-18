// @ts-check
import dotenv from "dotenv";
import { defineConfig, devices } from "@playwright/test";
import reportingLabs from "./reporting-labs.config";

dotenv.config({ path: ".env" });

export default defineConfig({
  // Specify the directory containing Playwright test files.
  testDir: "./tests",

  // Allow tests to run in parallel.
  fullyParallel: true,

  // Prevent accidental test.only usage in CI/CD.
  forbidOnly: !!process.env.CI,

  // Retry failed tests twice in CI/CD; do not retry locally.
  retries: process.env.CI ? 2 : 0,

  // Use one worker in CI/CD and Playwright's default locally.
  workers: process.env.CI ? 1 : undefined,

  // Set the maximum duration for each test.
  timeout: 60_000,

  // Set the maximum timeout for web-first assertions.
  expect: {
    timeout: 5_000,
  },

  // Configure test output and reporting tools.
  reporter: [
    ["list"],
    ["reporting-labs", reportingLabs],
    ["junit", { outputFile: "test-results/junit.xml" }],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  // Configure browser execution and debugging artifacts.
  use: {
    // Record a trace when a test is retried.
    trace: "on-first-retry",

    // Run headless in CI/CD and headed locally.
    headless: !!process.env.CI,

    // Capture screenshots only when tests fail.
    screenshot: "only-on-failure",

    // Retain videos when tests fail.
    video: "retain-on-failure",
  },

  // Run all three browsers in CI/CD and Chromium only locally.
  projects: process.env.CI
    ? [
        {
          name: "chromium",
          use: { ...devices["Desktop Chrome"] },
        },
        {
          name: "firefox",
          use: { ...devices["Desktop Firefox"] },
        },
        {
          name: "webkit",
          use: { ...devices["Desktop Safari"] },
        },
      ]
    : [
        {
          name: "chromium",
          use: { ...devices["Desktop Chrome"] },
        },
      ],
});
