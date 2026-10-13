// @ts-check
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for local development and Jenkins CI.
 */

export default defineConfig({
  testDir: "./tests",

  // Run independent test files in parallel.
  fullyParallel: true,

  // Prevent accidental test.only in CI.
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI.
  retries: process.env.CI ? 2 : 0,

  // Use one worker in CI for more predictable execution.
  workers: process.env.CI ? 1 : undefined,

  // Test timeouts.
  timeout: 60_000,

  expect: {
    timeout: 5_000,
  },

  // Generate both Jenkins-compatible JUnit XML and HTML reports.
  reporter: [
    ["list"],
    [
      "junit",
      {
        outputFile: "test-results/junit.xml",
      },
    ],
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never",
      },
    ],
  ],

  // Shared settings for all browser projects.
  use: {
    // Uncomment if your application has a common base URL.
    // baseURL: "http://localhost:3000",

    // Collect a trace on the first retry.
    trace: "on-first-retry",

    // Run headless in CI and headed locally by default.
    headless: !!process.env.CI,
    //headless: true,

    // Capture debugging evidence on failure.
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  // Browser projects.
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    // Enable additional browsers when needed.
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],

  // Uncomment when testing an application that needs a local server.
  // webServer: {
  //   command: "npm run start",
  //   url: "http://localhost:3000",
  //   reuseExistingServer: !process.env.CI,
  // },
});
