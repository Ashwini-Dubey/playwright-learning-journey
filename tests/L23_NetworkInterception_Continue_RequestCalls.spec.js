import { test, expect, request } from "@playwright/test";

const loginPayload = {
  userEmail: "testuser008@gmail.com",
  userPassword: "Password@123",
};

// Define the order details required to create an order through the API.
const createOrderPayload = {
  orders: [{ country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5" }],
};

// Declare variables to store the authentication token and created order ID.
let token;
let orderId;

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

test("testname", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  // Open the client application with the authentication token available.
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("button[routerlink*='/dashboard/myorders']").click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6ade1d8da90a419aa82926c2",
      }),
  );
  await page.getByRole("button", { name: "View" }).first().click();
  await page.screenshot({
    fullPage: true,
    path: "artifacts/NetworkIntercept2.png",
  });
  await expect(page.getByText("You are not authorize to view")).toBeVisible();
});
