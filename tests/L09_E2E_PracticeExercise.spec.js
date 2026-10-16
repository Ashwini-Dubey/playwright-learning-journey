import { test, expect } from "@playwright/test";

// Generate a unique email address using the current timestamp.
// This helps avoid duplicate email addresses during test execution.
function emailGenerator() {
  return `testuser${Date.now()}@test.com`;
}

// Generate test credentials and define the application URL.
const email_id = emailGenerator();
const password = "Password123";
const BASE_URL = "https://rahulshettyacademy.com/client/auth/login";

// Log the generated email address for debugging purposes.
console.log("Generated Email:", email_id);

// Execute the tests sequentially.
// If a test fails, subsequent tests in this serial group are skipped.
test.describe.serial("Signup and Login Flow", () => {
  // Test 1: Verify that a new user can register successfully.
  test("Sign Up - Register a new user successfully", async ({ page }) => {
    // Navigate to the login page.
    await page.goto(BASE_URL);

    // Click the registration link to open the signup form.
    await page.locator("p.login-wrapper-footer-text").click();

    // Verify that the registration page URL is correct.
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/client/#/auth/register",
    );

    // Enter the user's first name and last name.
    await page.getByRole("textbox", { name: "First Name" }).fill("Test");
    await page.getByRole("textbox", { name: "Last Name" }).fill("User");

    // Enter the generated email address and mobile number.
    await page
      .getByRole("textbox", { name: "email@example.com" })
      .fill(email_id);
    await page
      .getByRole("textbox", { name: "enter your number" })
      .fill("1244564686");

    // Select the Male radio button.
    await page.getByRole("radio", { name: "Male", exact: true }).check();

    // Enter the password and confirm it.
    await page.locator("input#userPassword").fill(password);
    await page.locator("input#confirmPassword").fill(password);

    // Accept the age confirmation checkbox.
    await page.getByRole("checkbox").check();

    // Submit the registration form.
    await page.getByRole("button").click();

    // Verify that the account creation success message is displayed.
    await expect(
      page.getByText("Account Created Successfully", { exact: true }),
    ).toBeVisible();
  });

  // Test 2: Verify that the newly registered user can log in.
  test("Login - Log in with valid credentials", async ({ page }) => {
    // Navigate to the login page.
    await page.goto(BASE_URL);

    // Enter the email address used during registration.
    await page
      .getByRole("textbox", { name: "email@example.com" })
      .fill(email_id);

    // Enter the registered user's password.
    await page.getByPlaceholder("enter your passsword").fill(password);

    // Submit the login form.
    await page.getByRole("button").click();

    // Verify successful login by checking the dashboard URL.
    await expect(page).toHaveURL(/.*dashboard/);
  });

  // Test 3: Find a specific product, add it to the cart, and verify it.
  test("Addition of product into the cart", async ({ page }) => {
    // Define the name of the product to be added to the cart.
    const productName = "iphone 13 pro";

    // Navigate to the login page.
    await page.goto(BASE_URL);

    // Enter the registered user's email address and password.
    await page
      .getByRole("textbox", { name: "email@example.com" })
      .fill(email_id);
    await page.getByPlaceholder("enter your passsword").fill(password);

    // Submit the login form.
    await page.getByRole("button").click();

    // Verify successful login by checking the dashboard URL.
    await expect(page).toHaveURL(/.*dashboard/);

    // Wait until network activity settles before inspecting the products.
    await page.waitForLoadState("networkidle");

    // Locate all product cards displayed on the dashboard.
    const products = page.locator(".card-body");

    // Count the available product cards and log the total.
    const productCount = await products.count();
    console.log("Product Count:", productCount);

    // Iterate through the product cards to find the requested product.
    for (let i = 0; i < productCount; i++) {
      // Extract the current product name from the product card.
      const currentProductName = await products
        .nth(i)
        .locator("b")
        .textContent();

      // Log the product name for debugging.
      console.log(`Product ${i + 1}:`, currentProductName);

      // Compare the current product name with the requested product name.
      if (currentProductName?.trim() === productName) {
        // Click the Add To Cart button within the matching product card.
        await products.nth(i).getByText("Add To Cart").click();

        // Stop searching after the matching product has been added.
        break;
      } else {
        // Log when the current product does not match the requested name.
        console.log("This is not the matching product!");
      }
    }

    // Verify that the cart badge displays the expected item count.
    await expect(
      page.locator("[routerlink*='cart']").locator("label"),
    ).toHaveText("1");

    // Navigate to the shopping cart page.
    await page.locator("[routerlink*='cart']").click();

    // Extract the product name displayed in the cart.
    const productName_Cart = await page
      .locator(".cartSection")
      .locator("h3")
      .textContent();

    // Log the extracted cart product name for debugging.
    console.log("Product in cart:", productName_Cart);

    // Assert that the product in the cart matches the requested product.
    expect(productName_Cart).toBe(productName);

    const subTotal = await page
      .locator("li.totalRow:nth-child(1)")
      .textContent();
    const total = await page.locator("li.totalRow:nth-child(2)").textContent();

    console.log("Sub-Total: ", subTotal.replace("Subtotal", "").trim());
    console.log("Total: ", total.replace("Total", "").trim());

    await page.getByText("Checkout").click();

    await expect(page).toHaveURL(/\/order\?/);

    //await page.locator("//input[@placeholder='Select Country']").fill("Ind");

    //await page.getByText("India", { exact: true }).click();

    //await page.locator(':text("PLACE ORDER")').click();

    //await page.pause();
  });
});
