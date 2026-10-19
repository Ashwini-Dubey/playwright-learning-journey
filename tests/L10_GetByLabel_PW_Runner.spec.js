import { test, expect } from "@playwright/test";

// Import the Playwright test runner and expect assertion library.

test("Playwright Special Locators", async ({ page }) => {
  // Navigate to the Angular Practice application.
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  // Checkbox / Elements with label tag.
  // Locate the checkbox using its associated label text and click it.
  await page.getByLabel("Check me out if you Love IceCreams!").click();

  // Radio / Elements with label tag.
  // Locate the radio button using its associated label text and select it.
  await page.getByLabel("Employed").check();

  // Placeholder
  // Locate the input field using its placeholder text and enter a password.
  await page.getByPlaceholder("Password").fill("Password@123");

  // Select Dropdown with label
  // Locate the Gender dropdown using its associated label and select Female by option value.
  await page.getByLabel("Gender").selectOption("Female");

  // Button
  // Locate the Submit button by its accessible role and name, then click it.
  await page.getByRole("button", { name: "submit" }).click();

  // Locate the success message by its visible text and check its visibility.
  // Note: isVisible() returns a boolean; use expect() to assert visibility.
  await page
    .getByText("Success! The Form has been submitted successfully!")
    .isVisible();

  // Locate the Shop link by its accessible role and name, then click it.
  await page.getByRole("link", { name: "Shop" }).click();

  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();

  // Pause test execution to allow interactive inspection and debugging.
  await page.pause();
});
