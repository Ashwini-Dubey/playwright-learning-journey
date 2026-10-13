import "dotenv/config";
import { test, expect } from "@playwright/test";

// Read login credentials from the .env file
const rs_username = process.env.RS_USERNAME;
const rs_password = process.env.RS_PASSWORD;

const BASE_URL = "https://rahulshettyacademy.com/loginpagePractise/";

test.only("Handling Radio Buttons and Select Dropdown", async ({ page }) => {
  await page.goto(BASE_URL);

  // Locate the username field using its accessible label and enter the username
  await page.getByLabel("Username").fill(rs_username);

  // Locate the password field using its accessible label and enter the password
  await page.getByLabel("Password").fill(rs_password);

  // Select the User radio button.
  await page.getByLabel("User", { exact: true }).check();

  // Verify that the User radio button is selected.
  await expect(page.getByLabel("User", { exact: true })).toBeChecked();

  // Select the Consultant option from the dropdown.
  await page.getByRole("combobox").selectOption({ label: "Consultant" });

  // Verify that the Consultant option is selected.
  await expect(page.getByRole("combobox")).toHaveValue("consult");

  // Locate the Sign In button using its role and accessible name, then click it
  await page.getByRole("button", { name: "Sign In" }).click();
});
