/*
Concepts Covered:
1. Playwright test structure, imports, and page fixture
2. Environment variables using dotenv
3. Page navigation using page.goto()
4. Locators: CSS, getByLabel(), and getByRole()
5. Reusable locators and element interactions: fill() and click()
6. Assertions: URL, visibility, and text validation
7. Element text retrieval using textContent()
8. Positive and negative login scenarios
9. Debugging using console.log()
*/

import "dotenv/config";
import { test, expect } from "@playwright/test";

// Read login credentials from the .env file
const rs_username = process.env.RS_USERNAME;
const rs_password = process.env.RS_PASSWORD;

// Test 1: Enter credentials using reusable CSS locators
test("Login form accepts credentials using CSS locators", async ({ page }) => {
  // Define the login page URL
  const BASE_URL = "https://rahulshettyacademy.com/loginpagePractise/";

  // Create reusable CSS locators for the username and password fields
  const username = page.locator("input#username");
  const password = page.locator("input#password");

  // Navigate to the login page
  await page.goto(BASE_URL);

  // Enter the username and password using the reusable locators
  await username.fill(rs_username);
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
test("User sees an error message when login credentials are invalid", async ({
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

// Test 4: Extracting the details of products listed in the shop
test("Extracting the details of a product", async ({ page }) => {
  // Navigate to the login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // Locate the username field using its accessible label and enter the username
  await page.getByLabel("Username").fill(rs_username);

  // Locate the password field using its accessible label and enter the password
  await page.getByLabel("Password").fill(rs_password);

  // Locate the Sign In button using its role and accessible name, then click it
  await page.getByRole("button", { name: "Sign In" }).click();

  // Verify that successful login redirects the user to the shop page
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/angularpractice/shop",
  );

  // Locate the product link named "iphone X" and print its text content
  console.log(await page.getByRole("link", { name: "iphone X" }).textContent());

  // Verify that the product link displays the expected product name
  await expect(page.getByRole("link", { name: "iphone X" })).toHaveText(
    "iphone X",
  );

  // Locate all links inside product card bodies and print their text contents
  console.log(await page.locator(".card-body a").allTextContents());

  // Store the text contents of all product links in the products array
  const products = await page.locator(".card-body a").allTextContents();

  // Print the extracted product names to the console
  console.log(products);
});
