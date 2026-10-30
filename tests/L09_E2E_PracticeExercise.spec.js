import { test, expect } from "@playwright/test";

// Generate a unique email address using the current timestamp.
// This prevents duplicate email registration during test execution.
function emailGenerator() {
  return `testuser${Date.now()}@test.com`;
}

// Define test credentials and the application URL.
const email_id = emailGenerator();
const password = "Password123";
const BASE_URL = "https://rahulshettyacademy.com/client/auth/login";

// Log the generated email address for debugging.
console.log("Generated Email:", email_id);

// Run tests sequentially. If a test fails, subsequent tests in this
// serial group are skipped.
test.describe.serial("@Web Signup and Login Flow", () => {
  // Test 1: Register a new user and verify successful account creation.
  test("Sign Up - Register a new user successfully", async ({ page }) => {
    // Navigate to the login page.
    await page.goto(BASE_URL);

    // Click the signup link to open the registration form.
    await page.locator("p.login-wrapper-footer-text").click();

    // Verify navigation to the registration page.
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/client/#/auth/register",
    );

    // Fill in the user's first name and last name.
    await page.getByRole("textbox", { name: "First Name" }).fill("Test");
    await page.getByRole("textbox", { name: "Last Name" }).fill("User");

    // Enter the generated email address and mobile number.
    await page
      .getByRole("textbox", { name: "email@example.com" })
      .fill(email_id);

    await page
      .getByRole("textbox", { name: "enter your number" })
      .fill("1244564686");

    // Select the Male radio button using an accessible locator.
    await page.getByRole("radio", { name: "Male", exact: true }).check();

    // Fill in the password and confirmation fields using CSS selectors.
    await page.locator("input#userPassword").fill(password);
    await page.locator("input#confirmPassword").fill(password);

    // Accept the age confirmation checkbox.
    await page.getByRole("checkbox").check();

    // Submit the registration form.
    await page.getByRole("button").click();

    // Assert that the account creation success message is visible.
    await expect(
      page.getByText("Account Created Successfully", { exact: true }),
    ).toBeVisible();
  });

  // Test 2: Log in using the credentials created in Test 1.
  test("Login - Log in with valid credentials", async ({ page }) => {
    // Navigate to the login page.
    await page.goto(BASE_URL);

    // Fill in the registered email address and password.
    await page
      .getByRole("textbox", { name: "email@example.com" })
      .fill(email_id);

    await page.getByPlaceholder("enter your passsword").fill(password);

    // Submit the login form.
    await page.getByRole("button").click();

    // Verify successful login by checking the dashboard URL.
    await expect(page).toHaveURL(/.*dashboard/);
  });

  // Test 3: Find a product, add it to the cart, proceed to checkout,
  // place the order, and verify the order in My Orders and its details.
  test("Addition of product into the cart", async ({ page }) => {
    // Define the target product name.
    const productName = "iphone 13 pro";

    // Log in using the credentials created during signup.
    await page.goto(BASE_URL);

    await page
      .getByRole("textbox", { name: "email@example.com" })
      .fill(email_id);

    await page.getByPlaceholder("enter your passsword").fill(password);

    await page.getByRole("button").click();

    // Verify successful login before interacting with products.
    await expect(page).toHaveURL(/.*dashboard/);

    // Wait until network activity settles before inspecting the products.
    await page.waitForLoadState("networkidle");

    // Locate all product cards using a CSS class selector.
    const products = page.locator(".card-body");

    // Count the product cards and log the total count.
    const productCount = await products.count();
    console.log("Product Count:", productCount);

    // Iterate through the product cards to find the target product.
    for (let i = 0; i < productCount; i++) {
      // Extract the product name from the current card.
      const currentProductName = await products
        .nth(i)
        .locator("b")
        .textContent();

      // Log the extracted product name for debugging.
      console.log(`Product ${i + 1}:`, currentProductName);

      // Compare the extracted name with the target product name.
      if (currentProductName?.trim() === productName) {
        // Click Add To Cart within the matching product card.
        await products.nth(i).getByText("Add To Cart").click();

        // Stop the loop once the matching product is found.
        break;
      } else {
        // Log when the current product does not match.
        console.log("This is not the matching product!");
      }
    }

    // Verify that the cart badge displays one item.
    await expect(
      page.locator("[routerlink*='cart']").locator("label"),
    ).toHaveText("1");

    // Navigate to the cart page.
    await page.locator("[routerlink*='cart']").click();

    // Extract the product name displayed in the cart.
    const productName_Cart = await page
      .locator(".cartSection")
      .locator("h3")
      .textContent();

    // Log the extracted cart product name.
    console.log("Product in cart:", productName_Cart);

    // Assert that the cart contains the expected product.
    expect(productName_Cart).toBe(productName);

    // Extract the subtotal and total amounts from the cart summary.
    const subTotal = await page
      .locator("li.totalRow:nth-child(1)")
      .textContent();

    const total = await page.locator("li.totalRow:nth-child(2)").textContent();

    // Remove the labels and whitespace to log the amounts clearly.
    console.log("Sub-Total:", subTotal.replace("Subtotal", "").trim());
    console.log("Total:", total.replace("Total", "").trim());

    // Proceed to checkout.
    await page.getByText("Checkout").click();

    // Verify navigation to the order details page.
    await expect(page).toHaveURL(/\/order\?/);

    // Type a partial country name to display autocomplete suggestions.
    await page.getByPlaceholder("Country").pressSequentially("Ind");

    // Locate the container holding the suggested country options.
    const countryOptions = page.locator(".ta-results");

    // Wait for the suggestion container to appear.
    await countryOptions.waitFor();

    // Count the available country suggestions.
    const countryCount = await countryOptions.locator("button").count();

    // Iterate through suggestions and select India.
    for (let i = 0; i < countryCount; i++) {
      // Extract the text of the current country option.
      const country = await countryOptions
        .locator("button")
        .nth(i)
        .textContent();

      // Select India when its text matches the expected value.
      if (country === " India") {
        await countryOptions.locator("button").nth(i).click();
        console.log("Country Selected!");
        break;
      }
    }

    // Submit the order using the Place Order link.
    await page.locator(".actions a").click();

    // Verify that the order confirmation page is displayed.
    await expect(page).toHaveURL(/\/thanks\?/);

    // Extract the Order ID from the order confirmation page.
    const orderID = await page.locator("label").last().textContent();

    // Remove pipe characters and surrounding whitespace before logging the order ID.
    console.log(
      "Order Placed Successfully with Order ID: ",
      orderID.replace(/[|]/g, "").trim(),
    );

    // Navigate to My Orders using the last matching navigation element.
    await page.locator("[routerlink*='myorders']").last().click();

    // Print the current URL for debugging and navigation verification.
    console.log("Current URL:", await page.url());

    // Verify navigation to the My Orders page.
    await expect(page).toHaveURL(/\/myorders/);

    // Wait for the orders table body to appear before accessing its rows.
    await page.locator("tbody").waitFor();

    // Locate all rows displayed in the orders table.
    const rows = await page.locator("tbody tr");

    // Iterate through the order rows to find the order placed in this test.
    for (let i = 0; i < (await rows.count()); i++) {
      // Extract the order ID from the current row's table header.
      const orders_orderID = await rows.nth(i).locator("th").textContent();

      // Check whether the placed order ID contains the ID displayed in this row.
      if (orderID.includes(orders_orderID)) {
        // Click the first button in the matching row to open order details.
        await rows.nth(i).locator("button").first().click();

        // Log that the matching order was found.
        console.log("Order Found!!");

        // Verify that the current URL contains the order ID from the table row.
        expect(page.url()).toContain(orders_orderID);

        // Log successful navigation to the order details page.
        console.log("Order Details page opened.");

        // Stop searching after the matching order is found.
        break;
      } else {
        // Log when the current row does not contain the required order ID.
        console.log("Order not found!");
      }
    }

    // Extract the order ID displayed on the order details page.
    const OrderIdDetails = await page.locator(".col-text").textContent();

    // Verify that the original order ID contains the ID displayed in the details.
    expect(orderID.includes(OrderIdDetails)).toBeTruthy();
  });
});
