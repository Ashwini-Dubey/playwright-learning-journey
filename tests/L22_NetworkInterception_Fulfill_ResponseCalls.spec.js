/*
Implementation: Network Interception of Responses using Playwright

Objective:
Intercept the Get Orders API response and replace its actual response body
with a mocked payload to simulate a customer having no orders.

Steps involved:
1. Authenticate the user using the Login API and extract the authentication token.
2. Create an order using the Create Order API.
3. Inject the authentication token into local storage before the application loads.
4. Navigate to the client application.
5. Register a route handler to intercept the Get Orders API request.
6. Fetch the original API response and replace its body with a mocked payload.
7. Fulfill the intercepted request with the modified response.
8. Navigate to the My Orders page to trigger the API request.
9. Wait for the matching response and inspect the UI.
*/

// Import Playwright's test runner, assertion library, and API request functionality.
import { test, expect, request } from "@playwright/test";

// Define the credentials required to authenticate through the application's API.
const loginPayload = {
  userEmail: "testuser008@gmail.com",
  userPassword: "Password@123",
};

// Define the order details required to create an order through the API.
const createOrderPayload = {
  orders: [{ country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5" }],
};

// Define the mocked response that will replace the actual Get Orders API response.
// The empty data array represents a customer with no orders.
const fakePayloadOrder = { data: [], message: "No Orders" };

// Declare variables to store the authentication token and created order ID.
let token;
let orderId;

// Execute the API setup once before the tests begin.
test.beforeAll(async () => {
  // Create an isolated API request context to execute API requests independently
  // of the browser page.
  const apiContext = await request.newContext();

  // Login API
  // Submit the login payload to the authentication endpoint.
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    },
  );

  // Verify that the login API request completed successfully.
  expect(loginResponse.ok()).toBeTruthy();

  // Parse the JSON response and extract the authentication token.
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;

  // Order API
  // Create an order through the API using the authentication token.
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

  // Verify that the order creation API request completed successfully.
  expect(createOrderResponse.ok()).toBeTruthy();

  // Parse the response and store the created order ID for potential reuse.
  const createOrderResponseJson = await createOrderResponse.json();
  orderId = createOrderResponseJson.orders;
});

test("Network Interception", async ({ page }) => {
  // Inject the authentication token into local storage before the application
  // loads so that the browser can access the authenticated application.
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  // Open the client application with the authentication token available.
  await page.goto("https://rahulshettyacademy.com/client/");

  // Register a route handler to intercept requests matching the Get Orders API.
  // The wildcard allows the endpoint to match different customer IDs.
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      // Fetch the original API response using the intercepted request.
      // This allows the real API to execute before its response is modified.
      const response = await page.request.fetch(route.request());

      // Convert the mocked JavaScript object into a JSON string because the
      // intercepted response body must contain the serialized JSON payload.
      let body = JSON.stringify(fakePayloadOrder);

      // Fulfill the intercepted browser request with the modified response.
      // The original response properties are reused, while the body and
      // Content-Type header are overridden with the mocked JSON response.
      await route.fulfill({
        response,
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  );

  // Navigate to the My Orders page, triggering the Get Orders API request.
  await page.locator("button[routerlink*='/dashboard/myorders']").click();

  // Wait for the matching API response event before inspecting the page.
  // Note that this waits for the response event, not necessarily for the UI
  // to finish rendering the response.
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  );

  // Read and print the text content of the selected element for inspection.
  const checkResponse = await page.locator(".mt-4").textContent();

  await expect(checkResponse.trim()).toBe(
    "You have No Orders to show at this time. Please Visit Back Us",
  );
});
