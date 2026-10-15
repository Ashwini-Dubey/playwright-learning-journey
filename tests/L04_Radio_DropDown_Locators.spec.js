// Load environment variables from the .env file.
import "dotenv/config";

// Import Playwright's test runner and assertion library.
import { test, expect } from "@playwright/test";

// Read login credentials from environment variables.
const rs_username = process.env.RS_USERNAME;
const rs_password = process.env.RS_PASSWORD;

// Store the practice application's login page URL.
const BASE_URL = "https://rahulshettyacademy.com/loginpagePractise/";

// Test: Verify radio buttons, dropdown selection, checkbox, and login.
test("Login Form - Verify input fields and form controls", async ({ page }) => {
  // Define reusable locators for the page elements.
  const usernameField = page.getByLabel("Username");
  const passwordField = page.getByLabel("Password");
  const userRadio = page.getByLabel("User", { exact: true });
  const consultantDropdown = page.getByRole("combobox");
  const termsCheckbox = page.locator("input#terms");
  const signInButton = page.getByRole("button", { name: "Sign In" });

  // Navigate to the login page.
  await page.goto(BASE_URL);

  // Enter the username retrieved from the .env file.
  await usernameField.fill(rs_username);

  // Enter the password retrieved from the .env file.
  await passwordField.fill(rs_password);

  // Select the User radio button.
  await userRadio.check();

  // Verify that the User radio button is selected.
  await expect(userRadio).toBeChecked();

  await page.getByRole("button", { name: "Okay" }).click();

  // Select the Consultant option from the dropdown by its visible label.
  await consultantDropdown.selectOption({ label: "Student" });

  // Verify that the selected dropdown option has the expected value.
  await expect(consultantDropdown).toHaveValue("stud");

  // Select the terms and conditions checkbox.
  await termsCheckbox.check();

  // Verify that the terms and conditions checkbox is selected.
  await expect(termsCheckbox).toBeChecked();

  // Click the Sign In button to submit the login form.
  await signInButton.click();
});
