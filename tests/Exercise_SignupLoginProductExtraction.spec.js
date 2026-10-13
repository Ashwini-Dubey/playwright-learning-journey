import { test, expect } from "@playwright/test";

// Generate a unique email address once and reuse it across both tests.
function emailGenerator() {
  return `testuser${Date.now()}@test.com`;
}

const email_id = emailGenerator();
const password = "Password123";
const BASE_URL = "https://rahulshettyacademy.com/client/auth/login";

// Log the generated email for debugging purposes.
console.log("Generated Email:", email_id);

// Run these tests sequentially.
// If signup fails, Playwright skips the login test.
test.describe.serial("Signup and Login Flow", () => {
  // Test 1: Verify that a new user can register successfully.
  test("Sign Up - Register a new user successfully", async ({ page }) => {
    // Navigate to the login page.
    await page.goto(BASE_URL);

    // Navigate to the registration page.
    await page.locator("p.login-wrapper-footer-text").click();

    // Verify that the registration page is displayed.
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/client/#/auth/register",
    );

    // Enter the user's first name.
    await page.getByRole("textbox", { name: "First Name" }).fill("Test");

    // Enter the user's last name.
    await page.getByRole("textbox", { name: "Last Name" }).fill("User");

    // Enter the generated email address.
    await page
      .getByRole("textbox", { name: "email@example.com" })
      .fill(email_id);

    // Enter the user's mobile number.
    await page
      .getByRole("textbox", { name: "enter your number" })
      .fill("1244564686");

    // Select the Male radio button.
    await page.getByRole("radio", { name: "Male", exact: true }).check();

    // Enter the password.
    await page.locator("input#userPassword").fill(password);

    // Confirm the password.
    await page.locator("input#confirmPassword").fill(password);

    // Accept the age confirmation checkbox.
    await page.getByRole("checkbox").check();

    // Submit the registration form.
    await page.getByRole("button").click();

    // Verify that the account was created successfully.
    await expect(
      page.getByText("Account Created Successfully", { exact: true }),
    ).toBeVisible();
  });

  // Test 2: Run only after the signup test passes.
  test("Login - Log in with valid credentials", async ({ page }) => {
    // Navigate to the login page.
    await page.goto(BASE_URL);

    // Enter the same email address used during registration.
    await page
      .getByRole("textbox", { name: "email@example.com" })
      .fill(email_id);

    // Enter the same password used during registration.
    await page.getByPlaceholder("enter your passsword").fill(password);

    // Submit the login form.
    await page.getByRole("button").click();

    // Verify that login succeeds by checking the dashboard URL.
    await expect(page).toHaveURL(/.*dashboard/);
  });

  // Test 3: Verify that product names can be extracted from the shop page.
  test("Product Extraction - Extract product names from the shop page", async ({
    page,
  }) => {
    // Navigate to the login page.
    await page.goto(BASE_URL);

    // Enter the same email address used during registration.
    await page
      .getByRole("textbox", { name: "email@example.com" })
      .fill(email_id);

    // Enter the password associated with the registered account.
    await page.getByPlaceholder("enter your passsword").fill(password);

    // Submit the login form.
    await page.getByRole("button").click();

    // Verify that login succeeds by checking the dashboard URL.
    await expect(page).toHaveURL(/.*dashboard/);

    // Locate the product by its exact visible text.
    const product = page.getByText("ZARA COAT 3", { exact: true });

    // Verify that the product is visible on the page.
    await expect(product).toBeVisible();

    // Extract the product name and store it in a variable.
    const productName = await product.textContent();

    // Print the extracted product name in the terminal.
    console.log("Extracted Product:", productName);

    // Verify that the extracted product name matches the expected value.
    expect(productName?.trim()).toBe("ZARA COAT 3");
  });
});
