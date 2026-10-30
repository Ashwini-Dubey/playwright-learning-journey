import { test, expect } from "@playwright/test";

test("@Web Playwright Timeout 1", async ({ page }) => {
  // Set the maximum execution time for this test to 60 seconds.
  // This overrides the default test timeout but does not affect other tests.
  test.setTimeout(60000);

  // Create a configured expect instance with a default assertion timeout of 10 seconds.
  // Note: The returned expect instance is not assigned or used here, so this configuration has no effect on the imported expect.
  expect.configure({ timeout: 10_000 });

  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByLabel("Check me out if you Love IceCreams!").click();

  await page.getByLabel("Employed").check();

  await page.getByPlaceholder("Password").fill("Password@123");

  await page.getByLabel("Gender").selectOption("Female");

  await page.getByRole("button", { name: "submit" }).click();

  await expect(
    page.getByText("Success! The Form has been submitted successfully!"),
  ).toBeVisible({ timeout: 12_000 }); // Override the default assertion timeout to 12 seconds for this assertion.

  await page.getByRole("link", { name: "Shop" }).click();

  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();
});

test("@Web Playwright Timeout 2", async ({ page }) => {
  // Mark this test as slow, which triples its default test timeout.
  // This does not change the default assertion timeout.
  test.slow();

  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByLabel("Check me out if you Love IceCreams!").click();

  await page.getByLabel("Employed").check();

  await page.getByPlaceholder("Password").fill("Password@123");

  await page.getByLabel("Gender").selectOption("Female");

  await page.getByRole("button", { name: "submit" }).click();

  await expect(
    page.getByText("Success! The Form has been submitted successfully!"),
  ).toBeVisible({ timeout: 12_000 }); // Override the default assertion timeout to 12 seconds for this assertion.

  await page.getByRole("link", { name: "Shop" }).click();

  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();
});
