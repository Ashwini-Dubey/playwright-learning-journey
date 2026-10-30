// @ts-check
import dotenv from "dotenv";
import { defineConfig, devices } from "@playwright/test";
import reportingLabs from "./reporting-labs.config";

// Load environment variables from the .env file.
dotenv.config({ path: ".env" });

export default defineConfig({
  // Directory containing all Playwright test files.
  testDir: "./tests",

  // Generate separate snapshots for different projects and platforms.
  snapshotPathTemplate:
    "{testDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}",

  // Allow independent tests to execute in parallel.
  fullyParallel: true,

  // Prevent accidental test.only usage in CI/CD.
  forbidOnly: !!process.env.CI,

  // Retry failed tests once.
  retries: 1,

  // Maximum number of parallel workers.
  workers: 2,

  // Maximum execution time for an individual test.
  timeout: 60_000,

  // Maximum timeout for web-first assertions.
  expect: {
    timeout: 5_000,
  },

  // Configure test reporters.
  reporter: [
    ["list"],
    ["reporting-labs", reportingLabs],
    ["junit", { outputFile: "test-results/junit.xml" }],
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never",
      },
    ],
  ],

  // Global browser and test execution settings.
  use: {
    // Capture trace when a test fails.
    trace: "retain-on-failure",

    // Run headless in CI and headed locally.
    headless: !!process.env.CI,

    // Capture screenshots only for failed tests.
    screenshot: "only-on-failure",

    // Retain videos for failed tests.
    video: "retain-on-failure",

    // Maximum time for individual browser actions.
    actionTimeout: 10_000,

    // Maximum time for navigation operations.
    navigationTimeout: 10_000,

    // Default desktop viewport.
    viewport: {
      width: 1280,
      height: 720,
    },
  },

  // Browser and device execution matrix.
  // Every test file runs against each configured project.
  projects: [
    // 1. Desktop Chrome - Chromium engine.
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
