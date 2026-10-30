import { test, expect } from "./utils/test-fixtures.js";

test("@Web Verify application title using custom fixture", async ({
  appPage,
}) => {
  await expect(appPage).toHaveTitle(/Playwright/);
});
