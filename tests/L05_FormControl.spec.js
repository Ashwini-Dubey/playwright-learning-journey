/**
 * @priority P1
 * @owner Ashwini Dubey
 * @feature Form Elements
 */

import { test, expect } from "@playwright/test";

// Generate a unique email address using the current timestamp.
// This helps avoid duplicate email addresses during test execution.
function emailGenerator() {
  return `testuser${Date.now()}@test.com`;
}

// Generate the email address once and reuse it across tests.
const email_id = emailGenerator();

// Log the generated email address for debugging purposes.
console.log("Generated Email:", email_id);

// Store the base URL in a constant to make it easy to maintain.
const BASE_URL = "https://playwrightlab.github.io/";

// Group related tests for form elements under a single test suite.
test.describe("Form Elements", () => {
  // Run only this test while developing or debugging.
  // Remove .only when you want to execute the entire test suite.
  test.only("Registration Form", async ({ page }) => {
    console.log("======Registration Form======");

    // Navigate to the website and wait for navigation to complete.
    await page.goto(BASE_URL);

    // Locate the Full Name field by its ID and enter the user's name.
    await page.locator("#fullName").fill("Ashwini Dubey");

    // Locate the Email field by its ID and enter the generated email.
    await page.locator("#email").fill(email_id);

    // Locate the password field using its accessible label and enter a password.
    await page.getByLabel("Password *").fill("Password@123");

    // Locate and click the password visibility toggle to show the password.
    await page
      .locator(
        "button[aria-label='Toggle password visibility'] ion-icon[name='eye-outline'] svg",
      )
      .click();

    // Verify that the password field is visible on the page.
    await expect(page.getByLabel("Password *")).toBeVisible();

    // Verify that the password field's type changes from "password" to "text".
    // This confirms that the password is displayed as readable text.
    await expect(page.getByLabel("Password *")).toHaveAttribute("type", "text");

    // Click the visibility toggle again to hide the password.
    await page
      .locator(
        "button[aria-label='Toggle password visibility'] ion-icon[name='eye-outline'] svg",
      )
      .click();

    // Verify that the password field's type changes back to "password".
    // This confirms that the password is masked again.
    await expect(page.getByLabel("Password *")).toHaveAttribute(
      "type",
      "password",
    );

    await page.locator("#phone").fill("9876543210");

    
  });

  // Test area for slider and range input controls.
  test("Sliders& Range", async ({ page }) => {
    console.log("======Sliders& Range======");

    // Open the practice website.
    await page.goto(BASE_URL);
  });

  // Test area for autocomplete or suggestion-based input fields.
  test("Auto Suggest", async ({ page }) => {
    console.log("======Auto Suggest======");

    // Open the practice website.
    await page.goto(BASE_URL);
  });

  // Test area for uploading files through a file input.
  test("File Upload", async ({ page }) => {
    console.log("======File Upload======");

    // Open the practice website.
    await page.goto(BASE_URL);
  });

  // Test area for selecting multiple options in a multi-select control.
  test("Multi-Select", async ({ page }) => {
    console.log("======Multi-Select======");

    // Open the practice website.
    await page.goto(BASE_URL);
  });

  // Test area for interacting with custom dropdown components.
  test("Custom Dropdown", async ({ page }) => {
    console.log("======Custom Dropdown======");

    // Open the practice website.
    await page.goto(BASE_URL);
  });

  // Test area for dropdowns that allow searching for an option.
  test("Searchable Dropdown", async ({ page }) => {
    console.log("======Searchable Dropdown======");

    // Open the practice website.
    await page.goto(BASE_URL);
  });

  // Test area for dropdowns containing options organized into groups.
  test("Grouped Options", async ({ page }) => {
    console.log("======Grouped Options======");

    // Open the practice website.
    await page.goto(BASE_URL);
  });

  // Test area for dependent dropdowns where one selection affects another.
  test("Cascading Dropdowns", async ({ page }) => {
    console.log("======Cascading Dropdowns======");

    // Open the practice website.
    await page.goto(BASE_URL);
  });

  // Test area for selecting multiple checkboxes.
  test("Multi-select Checkboxes", async ({ page }) => {
    console.log("======Multi-select Checkboxes======");

    // Open the practice website.
    await page.goto(BASE_URL);
  });

  // Test area for verifying that certain dropdown options are disabled.
  test("Disabled Options", async ({ page }) => {
    console.log("======Disabled Options======");

    // Open the practice website.
    await page.goto(BASE_URL);
  });

  // Test area for dropdowns that become available or behave differently on focus.
  test("Focus-Gated Dropdown", async ({ page }) => {
    console.log("======Focus-Gated Dropdown======");

    // Open the practice website.
    await page.goto(BASE_URL);
  });

  // Test area for dropdowns whose options appear after a delay.
  test("Delayed Dropdown", async ({ page }) => {
    console.log("======Delayed Dropdown======");

    // Open the practice website.
    await page.goto(BASE_URL);
  });
});
