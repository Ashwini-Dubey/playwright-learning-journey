import { test, expect } from "./utils/test-fixtures.js";

test("Verify application title using custom fixture", async ({
  authenticatedPage,
}) => {
  await expect(authenticatedPage).toHaveTitle(/Playwright/);
});
