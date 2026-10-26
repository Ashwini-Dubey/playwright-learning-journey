import { test as base, expect } from "@playwright/test";

// Create a custom test object by extending Playwright's base test.
export const test = base.extend({
  appPage: async ({ page }, use) => {
    await page.goto("https://playwright.dev/");
    await use(page);
    console.log("Custom fixture teardown completed");
  },
});

export { expect };
