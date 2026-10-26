import { test, expect } from "./utils/fixtures_2.js";

test("Verify user login using custom fixture", async ({
  authenticatedPage,
  orderPage,
}) => {
  // Verify that login succeeds by checking the dashboard URL.
  await expect(authenticatedPage).toHaveURL(/.*dashboard/);
  await expect(orderPage).toHaveURL(/\/thanks\?/);
});
