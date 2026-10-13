import { test, expect } from "@playwright/test";

const BASE_URL = "https://rahulshettyacademy.com/loginpagePractise/";

test.only("Handling Radio Buttons and Select Dropdown", async ({ page }) => {
  await page.goto(BASE_URL);

  // Select the User radio button.
  await page.getByLabel("User", { exact: true }).check();

  // Verify that the User radio button is selected.
  await expect(page.getByLabel("User", { exact: true })).toBeChecked();

  // Select the Consultant option from the dropdown.
  await page.getByRole("combobox").selectOption({ label: "Consultant" });

  // Verify that the Consultant option is selected.
  await expect(page.getByRole("combobox")).toHaveValue("consult");
});
