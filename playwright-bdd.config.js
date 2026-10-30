// @ts-check
import dotenv from "dotenv";
import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import reportingLabs from "./reporting-labs.config";

// Load environment variables.
dotenv.config({ path: ".env" });

// Configure BDD test generation.
const testDir = defineBddConfig({
  features: "features/**/*.feature",
  steps: "steps/**/*.js",
  outputDir: ".features-gen",
});

export default defineConfig({
  // Generated BDD test directory.
  testDir,

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 2,

  timeout: 60_000,

  expect: {
    timeout: 5_000,
  },

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

  use: {
    trace: "retain-on-failure",
    headless: !!process.env.CI,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10_000,
    navigationTimeout: 10_000,

    viewport: {
      width: 1280,
      height: 720,
    },
  },

  projects: [
    {
      name: "BDD - Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
