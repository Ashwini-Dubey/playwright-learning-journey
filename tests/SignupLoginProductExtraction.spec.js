import { test, expect } from "@playwright/test";

function emailGenerator() {
  const email = `testuser${Date.now()}@test.com`;
  return email;
}

const email_id = emailGenerator();

console.log(email_id);

// Test 1: Verify that a new user can register successfully.
test("Sign Up - Register a new user successfully", async ({ page }) => {
  // Store the login page URL in a constant.
  const BASE_URL = "https://rahulshettyacademy.com/client/auth/login";

  // Navigate to the login page.
  await page.goto(BASE_URL);

  // Click the link that redirects the user to the registration page.
  await page.locator("p.login-wrapper-footer-text").click();

  // Verify that the user has been redirected to the registration page.
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/client/#/auth/register",
  );

  // Enter the user's first name.
  await page.getByRole("textbox", { name: "First Name" }).fill("Test");

  // Enter the user's last name.
  await page.getByRole("textbox", { name: "Last Name" }).fill("User");

  // Enter a valid email address for registration.
  await page.getByRole("textbox", { name: "email@example.com" }).fill(email_id);

  // Enter the user's mobile number.
  await page
    .getByRole("textbox", { name: "enter your number" })
    .fill("1244564686");

  // Select the Male radio button.
  await page.getByRole("radio", { name: "Male", exact: true }).check();

  // Enter the password.
  await page.locator("input#userPassword").fill("Password123");

  // Enter the same password to confirm it.
  await page.locator("input#confirmPassword").fill("Password123");

  // Accept the age confirmation checkbox.
  await page.getByText("I am 18 year or Older").click();

  // Click the registration button to submit the form.
  await page.getByRole("button").click();

  // Verify the resulting page URL after form submission.
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/client/#/auth/register",
  );
});
