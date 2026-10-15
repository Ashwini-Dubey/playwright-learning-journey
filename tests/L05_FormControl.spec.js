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

// Store the base URL in a constant to simplify maintenance.
const BASE_URL = "https://playwrightlab.github.io/";

// Group related tests for form elements under a single test suite.
test.describe("Form Elements", () => {
  // Test the registration form by interacting with its input fields and controls.
  test("TC01 : Registration Form", async ({ page }) => {
    // Navigate to the practice website.
    await page.goto(BASE_URL);

    // Enter the user's full name into the Full Name field.
    await page.locator("#fullName").fill("Ashwini Dubey");

    // Enter the generated unique email address into the Email field.
    await page.locator("#email").fill(email_id);

    // Locate the password field using its accessible label and enter a password.
    await page.getByLabel("Password *").fill("Password@123");

    // Click the password visibility toggle to display the password as readable text.
    await page
      .locator(
        "button[aria-label='Toggle password visibility'] ion-icon[name='eye-outline'] svg",
      )
      .click();

    // Verify that the password field is visible on the page.
    await expect(page.getByLabel("Password *")).toBeVisible();

    // Verify that the password field type changes to "text" when visibility is enabled.
    await expect(page.getByLabel("Password *")).toHaveAttribute("type", "text");

    // Click the password visibility toggle again to hide the password.
    await page
      .locator(
        "button[aria-label='Toggle password visibility'] ion-icon[name='eye-outline'] svg",
      )
      .click();

    // Verify that the password field type changes back to "password".
    await expect(page.getByLabel("Password *")).toHaveAttribute(
      "type",
      "password",
    );

    // Enter a phone number into the Phone field.
    await page.locator("#phone").fill("9876543210");

    // Select the Male radio button using its ID.
    await page.locator("input#radioMale").click();

    // Select the JavaScript checkbox using its visible label.
    await page.getByText("JavaScript").check();

    // Enter sample text into the Bio field to practice textarea automation.
    await page
      .getByLabel("Bio")
      .fill(
        "This is just a dummy text typed up to practice the web automation with Playwright using JS/TS.",
      );

    // Select the Terms and Conditions checkbox.
    await page.locator("#terms").check();

    await page.getByText("Register").click();

    await expect(
      page.getByText("Registration successful! Welcome aboard."),
    ).toBeVisible();
  });

  // Test area for slider and range input controls.
  test("TC02 : Sliders& Range", async ({ page }) => {
    // Navigate to the practice website before interacting with the controls.
    await page.goto(BASE_URL);
  });

  // Test area for autocomplete fields that display suggestions while typing.
  test("Auto Suggest", async ({ page }) => {
    // Navigate to the practice website before testing autocomplete behavior.
    await page.goto(BASE_URL);
  });

  // Test area for uploading files through a file input.
  test("File Upload", async ({ page }) => {
    // Navigate to the practice website before testing file upload functionality.
    await page.goto(BASE_URL);
  });

  // Test area for selecting multiple options in a multi-select control.
  test("Multi-Select", async ({ page }) => {
    // Navigate to the practice website before interacting with the multi-select control.
    await page.goto(BASE_URL);
  });

  // Test area for interacting with custom dropdown components.
  test("Custom Dropdown", async ({ page }) => {
    // Navigate to the practice website before testing the custom dropdown.
    await page.goto(BASE_URL);
  });

  // Test area for dropdowns that allow searching for an option.
  test("Searchable Dropdown", async ({ page }) => {
    // Navigate to the practice website before testing searchable dropdown behavior.
    await page.goto(BASE_URL);
  });

  // Test area for dropdowns containing options organized into groups.
  test("Grouped Options", async ({ page }) => {
    // Navigate to the practice website before testing grouped dropdown options.
    await page.goto(BASE_URL);
  });

  // Test area for dependent dropdowns where one selection affects another.
  test("Cascading Dropdowns", async ({ page }) => {
    // Navigate to the practice website before testing dependent dropdown behavior.
    await page.goto(BASE_URL);
  });

  // Test area for selecting multiple checkboxes.
  test("Multi-select Checkboxes", async ({ page }) => {
    // Navigate to the practice website before selecting multiple checkboxes.
    await page.goto(BASE_URL);
  });

  // Test area for verifying that certain dropdown options are disabled.
  test("Disabled Options", async ({ page }) => {
    // Navigate to the practice website before checking disabled options.
    await page.goto(BASE_URL);
  });

  // Test area for dropdowns that become available or behave differently on focus.
  test("Focus-Gated Dropdown", async ({ page }) => {
    // Navigate to the practice website before testing focus-dependent behavior.
    await page.goto(BASE_URL);
  });

  // Test area for dropdowns whose options appear after a delay.
  test("Delayed Dropdown", async ({ page }) => {
    // Navigate to the practice website before testing delayed dropdown behavior.
    await page.goto(BASE_URL);
  });
});
