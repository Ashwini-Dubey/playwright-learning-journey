/*
Concepts Covered:
1. Playwright imports, test structure, and built-in page fixture
2. Environment variables using dotenv
3. Page navigation using page.goto()
4. Locators: CSS, getByLabel(), getByRole()
5. Element interactions: fill() and click()
6. Assertions: URL, visibility, and text validation
7. Element text retrieval using textContent()
8. Positive and negative login scenarios
9. Debugging using console.log()
10. Reusable locator variables
*/

import "dotenv/config";
import { test, expect } from "@playwright/test";

// Read login credentials from the .env file
const rs_username = process.env.RS_USERNAME;
const rs_password = process.env.RS_PASSWORD;

// Test 1: Login using CSS locators
test("Login form accepts credentials using CSS locators", async ({ page }) => {
  const BASE_URL = "https://rahulshettyacademy.com/loginpagePractise/";
  const username = page.locator("input#username");
  const password = page.locator("input#password");
  // Open the login page
  await page.goto(BASE_URL);

  // Locate the username field using a CSS selector and enter the username
  await username.fill(rs_username);

  // Locate the password field using a CSS selector and enter the password
  await password.fill(rs_password);
});

// Test 2: Login using accessible label and role locators
test("User logs in successfully using accessible locators", async ({
  page,
}) => {
  // Open the login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // Locate the username field by its accessible label and enter the username
  await page.getByLabel("Username").fill(rs_username);

  // Locate the password field by its accessible label and enter the password
  await page.getByLabel("Password").fill(rs_password);

  // Locate the Sign In button by its role and accessible name, then click it
  await page.getByRole("button", { name: "Sign In" }).click();

  // Verify that successful login redirects to the shop page
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/angularpractice/shop",
  );
});

// Test 3: Verify the error message displayed after an invalid login attempt
test.only("User sees an error message when login credentials are invalid", async ({
  page,
}) => {
  // Open the login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // Locate the username field by its accessible label and enter the username
  await page.getByLabel("Username").fill(rs_username);

  // Enter an incorrect password to trigger the login error
  await page.getByLabel("Password").fill("rs_password");

  // Locate the Sign In button by its accessible role and name, then click it
  await page.getByRole("button", { name: "Sign In" }).click();

  // Locate the error message element using its inline style attribute
  const errorMessage = page.locator("[style*='block']");

  // Print the error message text in the terminal for debugging
  console.log(await errorMessage.textContent());

  // Verify that the error message is visible on the page
  await expect(errorMessage).toBeVisible();

  // Verify that the error message displays the expected text
  await expect(errorMessage).toHaveText("Incorrect username/password.");
});
