/*
Objective:
Authenticate through the application's Web API, extract the authentication
token from the API response, and inject it into the browser's local storage
to establish an authenticated session for the UI workflow.

The test then:
1. Opens the client application using the stored authentication token.
2. Searches for the target product and adds it to the cart.
3. Verifies the cart contents and reviews the order summary.
4. Completes checkout by selecting the delivery country.
5. Captures the generated Order ID after successful order placement.
6. Navigates to My Orders, locates the newly created order, and verifies
   the order details.

Playwright concepts demonstrated:
- API authentication using the request API.
- Parsing JSON responses and extracting authentication data.
- Using test.beforeAll() for shared setup.
- Injecting browser-side JavaScript with page.addInitScript().
- Locating elements, iterating through product cards, and interacting
  with nested locators.
- Validating navigation, cart contents, and order details using assertions.
*/

// Import Playwright's test runner, assertion library, and API request functionality.
import { test, expect, request } from "@playwright/test";

// Define the credentials required to authenticate through the application's API.
const loginPayload = {
  userEmail: "testuser008@gmail.com",
  userPassword: "Password@123",
};

const createOrderPayload = {
  country: "India",
  productOrderedId: "6960ea76c941646b7a8b3dd5",
};

let token;
let orderId;

// Authenticate through the API before running the UI test and retain the
// returned token for injection into the browser's local storage.
test.beforeAll(async () => {
  // Create an isolated API request context.
  const apiContext = await request.newContext();

  // Login API
  // Submit the login payload to the authentication endpoint.
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    },
  );

  // Verify that the API request completed successfully.
  expect(loginResponse.ok()).toBeTruthy();

  // Parse the JSON response and extract the authentication token.
  const loginResponseJson = await loginResponse.json();
  console.log(loginResponseJson);
  token = loginResponseJson.token;
  console.log(token);

  // Order API
  const createOrderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: createOrderPayload,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    },
  );

  expect(createOrderResponse.ok()).toBeTruthy();
  const createOrderResponseJson = await createOrderResponse.json();
  console.log(createOrderResponseJson);
  orderId = createOrderResponseJson.orders[0];
  console.log(orderId);
});

// Execute the end-to-end purchase workflow using the authenticated browser session.
test("Client App Login", async ({ page }) => {
  // Register an initialization script that stores the API token in local storage
  // before application JavaScript executes on each newly navigated document.
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  // Open the client application with the authentication token available to it.
  await page.goto("https://rahulshettyacademy.com/client/");

  // Define the product that must be located and purchased.
  const productName = "iphone 13 pro";

  // Locate all product cards displayed in the product listing.
  const products = page.locator(".card-body");

  // Determine the number of product cards available for iteration.
  const productCount = await products.count();
  console.log("Product Count:", productCount);

  // Inspect each product card until the target product is found.
  for (let i = 0; i < productCount; i++) {
    // Read the product name from the current card.
    const currentProductName = await products.nth(i).locator("b").textContent();

    // Log the product name to help diagnose product-matching issues.
    console.log(`Product ${i + 1}:`, currentProductName);

    // Compare the normalized product name against the target name.
    if (currentProductName?.trim() === productName) {
      // Add the matching product to the cart using a locator scoped to its card.
      await products.nth(i).getByText("Add To Cart").click();

      // Exit the loop once the target product has been added.
      break;
    } else {
      // Record that the current product is not the requested item.
      console.log("This is not the matching product!");
    }
  }

  // Optional assertion to verify that the cart badge displays one item.
  await expect(
    page.locator("[routerlink*='cart']").locator("label"),
  ).toHaveText("1");

  // Open the shopping cart to verify the selected product.
  await page.locator("[routerlink*='cart']").click();

  // Retrieve the product name displayed in the cart.
  const productName_Cart = await page
    .locator(".cartSection")
    .locator("h3")
    .textContent();

  // Log the cart product name for diagnostic purposes.
  console.log("Product in cart:", productName_Cart);

  // Confirm that the cart contains the expected product.
  expect(productName_Cart).toBe(productName);

  // Read the subtotal and total values from the cart summary.
  const subTotal = await page.locator("li.totalRow:nth-child(1)").textContent();
  const total = await page.locator("li.totalRow:nth-child(2)").textContent();

  // Remove the summary labels and surrounding whitespace for readable output.
  console.log("Sub-Total:", subTotal.replace("Subtotal", "").trim());
  console.log("Total:", total.replace("Total", "").trim());

  // Initiate checkout from the shopping cart.
  await page.getByText("Checkout").click();

  // Verify that checkout navigates to the order details page.
  await expect(page).toHaveURL(/\/order\?/);

  // Enter a partial country name to trigger the autocomplete suggestions.
  await page.getByPlaceholder("Country").pressSequentially("Ind");

  // Locate the container that displays the country autocomplete results.
  const countryOptions = page.locator(".ta-results");

  // Wait until the suggestions container is available.
  await countryOptions.waitFor();

  // Count the country options returned by the autocomplete control.
  const countryCount = await countryOptions.locator("button").count();

  // Iterate through the suggestions to find and select India.
  for (let i = 0; i < countryCount; i++) {
    // Retrieve the text of the current country suggestion.
    const country = await countryOptions.locator("button").nth(i).textContent();

    // Select India when the suggestion matches the expected country name.
    if (country === " India") {
      await countryOptions.locator("button").nth(i).click();
      console.log("Country Selected!");
      break;
    }
  }

  // Submit the order using the application's order-placement control.
  await page.locator(".actions a").click();

  // Verify that the application navigates to the order confirmation page.
  await expect(page).toHaveURL(/\/thanks\?/);

  // Extract the generated Order ID from the confirmation page.
  const orderID = await page.locator("label").last().textContent();

  // Remove formatting characters and whitespace when logging the Order ID.
  console.log(
    "Order Placed Successfully with Order ID: ",
    orderID.replace(/[|]/g, "").trim(),
  );

  // Navigate to the My Orders page.
  await page.locator("[routerlink*='myorders']").last().click();

  // Log the current URL to assist with navigation troubleshooting.
  console.log("Current URL:", await page.url());

  // Verify that the My Orders page is displayed.
  await expect(page).toHaveURL(/\/myorders/);

  // Wait for the orders table body before accessing its rows.
  await page.locator("tbody").waitFor();

  // Create a locator for the order rows displayed in the table.
  const rows = await page.locator("tbody tr");

  // Search the order history for the order created during this test.
  for (let i = 0; i < (await rows.count()); i++) {
    // Extract the Order ID displayed in the current row.
    const orders_orderID = await rows.nth(i).locator("th").textContent();

    // Compare the confirmation Order ID with the ID displayed in the row.
    if (orderID.includes(orders_orderID)) {
      // Open the order details from the matching row.
      await rows.nth(i).locator("button").first().click();

      // Log that the newly placed order was located successfully.
      console.log("Order Found!!");

      // Verify that the order details URL contains the matched Order ID.
      expect(page.url()).toContain(orders_orderID);

      // Log successful navigation to the order details page.
      console.log("Order Details page opened.");

      // Stop searching once the matching order has been found.
      break;
    } else {
      // Log that the current row does not correspond to the placed order.
      console.log("Order not found!");
    }
  }

  // Extract the Order ID displayed on the order details page.
  const OrderIdDetails = await page.locator(".col-text").textContent();

  // Verify that the order details page displays the expected Order ID.
  expect(orderID.includes(OrderIdDetails)).toBeTruthy();
});
