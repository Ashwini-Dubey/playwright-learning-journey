import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto("https://rahulshettyacademy.com/client/auth/login");
    await page
      .getByRole("textbox", { name: "email@example.com" })
      .fill("testuser008@gmail.com");

    // Enter the same password used during registration.
    await page.getByPlaceholder("enter your passsword").fill("Password@123");

    // Submit the login form.
    await page.getByRole("button").click();

    await use(page);
  },
  orderPage: async ({ page }, use) => {
    // Define the target product name.
    const productName = "iphone 13 pro";

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

    // Tear-down
    await use(page);
  },
  //DataDriveFixture
  testData_Order: {
    productNames: "ADIDAS ORIGINALs",
  },
});

export { expect };
