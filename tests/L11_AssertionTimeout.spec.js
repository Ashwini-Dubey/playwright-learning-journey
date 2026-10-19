import { test, expect } from "@playwright/test";

test("Playwright Special Locators", async ({ page }) => {
  // Set the default timeout to 10 seconds for assertions using this expect instance.
  // This does not change the overall test-level timeout.
  expect.configure({ timeout: 10_000 });

  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByLabel("Check me out if you Love IceCreams!").click();

  await page.getByLabel("Employed").check();

  await page.getByPlaceholder("Password").fill("Password@123");

  await page.getByLabel("Gender").selectOption("Female");

  await page.getByRole("button", { name: "submit" }).click();

  await expect(
    page.getByText("Success! The Form has been submitted successfully!"),
  ).toBeVisible({ timeout: 12_000 }); // Override the assertion timeout to 12 seconds.

  await page.getByRole("link", { name: "Shop" }).click();

  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();

  // Pauses execution for interactive debugging; this is not an ordinary action timeout.
  await page.pause();
});
