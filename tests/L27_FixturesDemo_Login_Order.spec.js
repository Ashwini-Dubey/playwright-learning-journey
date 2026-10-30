import { test, expect } from "./utils/fixtures_2.js";

test("@Web Verify user login using custom fixture", async ({
  authenticatedPage,
  orderPage,
  testData_Order,
}) => {
  // Verify that login succeeds by checking the dashboard URL.
  await expect(authenticatedPage).toHaveURL(/.*dashboard/);
  await expect(orderPage).toHaveURL(/\/thanks\?/);
  console.log(testData_Order.productNames);
});
