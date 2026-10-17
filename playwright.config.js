// @ts-check
import dotenv from "dotenv";
import { defineConfig, devices } from "@playwright/test";
import reportingLabs from "./reporting-labs.config";

dotenv.config({ path: ".env" });

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  timeout: 60_000,
  expect: {
    timeout: 5_000,
  },

  reporter: [
    ["list"],
    ["reporting-labs", reportingLabs],
    ["junit", { outputFile: "test-results/junit.xml" }],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  use: {
    trace: "on-first-retry",
    headless: !!process.env.CI,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
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
  ],
});
