import "dotenv/config";
import { test, expect } from "@playwright/test";

// Read login credentials from the .env file
const rs_username = process.env.RS_USERNAME;
const rs_password = process.env.RS_PASSWORD;

// Test 1: Login using CSS locators
test("Login form accepts credentials using CSS locators", async ({ page }) => {
  // Open the login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // Locate the username field using a CSS selector and enter the username
  await page.locator("input#username").fill(rs_username);

  // Locate the password field using a CSS selector and enter the password
  await page.locator("input#password").fill(rs_password);
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

// Test 3: Login using invalid credentials
test.only("User sees an error message when login credentials are invalid", async ({
  page,
}) => {
  // Open the login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // Locate the username field by its accessible label and enter the username
  await page.getByLabel("Username").fill(rs_username);

  // Locate the password field by its accessible label and enter the password
  await page.getByLabel("Password").fill("rs_password");

  // Locate the Sign In button by its role and accessible name, then click it
  await page.getByRole("button", { name: "Sign In" }).click();

  // <div class="alert alert-danger col-md-12" style="display: none;"><strong>Incorrect</strong> username/password.</div>

  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toBeVisible();
  await expect(page.locator("[style*='block']")).toHaveText(
    "Incorrect username/password.",
  );
});
