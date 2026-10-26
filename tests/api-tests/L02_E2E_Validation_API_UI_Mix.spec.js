// Import Playwright's test runner, assertion library, and API request functionality.
import { test, expect, request } from "@playwright/test";

// Define the credentials required to authenticate through the application's API.
const loginPayload = {
  userEmail: "testuser008@gmail.com",
  userPassword: "Password@123",
};

const createOrderPayload = {
  orders: [{ country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5" }],
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
  orderId = createOrderResponseJson.orders;
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

  // Navigate to the My Orders page.
  await page.locator("button[routerlink*='/dashboard/myorders']").click();

  // Wait for the orders table body before accessing its rows.
  await page.locator("tbody").waitFor();

  // Create a locator for the order rows displayed in the table.
  const rows = await page.locator("tbody tr");

  // Search the order history for the order created during this test.
  for (let i = 0; i < (await rows.count()); i++) {
    // Extract the Order ID displayed in the current row.
    const orders_orderID = await rows.nth(i).locator("th").textContent();

    // Compare the confirmation Order ID with the ID displayed in the row.
    if (orderId.includes(orders_orderID)) {
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
  expect(orderId.includes(OrderIdDetails)).toBeTruthy();
});
