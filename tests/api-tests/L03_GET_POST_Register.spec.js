// Import Playwright's test runner, assertion library, and API request functionality.
import { test, expect, request } from "@playwright/test";

// ################ HELPER FUNCTION ################

// Generate a unique email address for each registration attempt using the current timestamp.
function emailGenerator() {
  return `testuser${Date.now()}@test.com`;
}

// Generate a unique email address to avoid duplicate registration conflicts.
const email_id = emailGenerator();
// Log the generated email address for debugging and test traceability.
console.log(email_id);

//################ API PAYLOAD ################
let token;
let user_id;
let orderId;

// Define the request payload containing the user details required by the registration API.
const registrationPayload = {
  firstName: "Test",
  lastName: "User",
  userEmail: email_id,
  userRole: "customer",
  occupation: "Doctor",
  gender: "Male",
  userMobile: "9876543210",
  userPassword: "Password@123",
  confirmPassword: "Password@123",
  required: true,
};

// Define the credentials required to authenticate through the application's API.
const loginPayload = {
  userEmail: email_id,
  userPassword: registrationPayload.userPassword,
};

const createOrderPayload = {
  orders: [{ country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5" }],
};

// ################ API CALL ################

test.describe.serial("@API E2E Flow with API", () => {
  // Verify that a new user can be registered successfully through the API.
  test("User Registration", async () => {
    // Create an isolated API request context for sending HTTP requests.
    const apiContext = await request.newContext();

    // Submit a POST request to the registration endpoint with the user details
    // serialized as JSON and the appropriate Content-Type header.
    const registrationResponse = await apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/register",
      {
        data: registrationPayload,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    // Assert that the API response indicates a successful HTTP request.
    expect(registrationResponse.ok()).toBeTruthy();

    // Log the HTTP status code returned by the registration endpoint.
    console.log("Status Code: ", registrationResponse.status());

    // Verify that the registration API returns the expected HTTP status code.
    expect(registrationResponse.status()).toBe(200);

    // Log the response headers to inspect the metadata returned by the API.
    console.log("Response Header: ", registrationResponse.headers());

    // Parse the response body from JSON into a JavaScript object.
    const registrationResponseJson = await registrationResponse.json();

    // Log the complete parsed response body for debugging and verification.
    console.log("Response (Json): ", registrationResponseJson);

    // Extract and log the registration confirmation message from the JSON response.
    console.log("Response's Message: ", registrationResponseJson.message);

    // Assert that the API returns the expected registration success message.
    expect(registrationResponseJson.message).toEqual("Registered Successfully");

    await apiContext.dispose();
  });

  test("User Login", async () => {
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

    console.log("Login Response Status Code: ", loginResponse.status());

    expect(loginResponse.status()).toBe(200);

    // Parse the JSON response and extract the authentication token.
    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson);
    token = loginResponseJson.token;
    console.log(token);
    user_id = await loginResponseJson.userId;
    console.log("User ID: ", user_id);

    await apiContext.dispose();
  });

  test("Create Order", async () => {
    const apiContext = await request.newContext();
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

  test("FetchOrderListing", async () => {
    const apiContext = await request.newContext();

    const fetchOrderResponse = await apiContext.get(
      `https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/${user_id}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    );
    console.log(fetchOrderResponse);
    expect(fetchOrderResponse.ok()).toBeTruthy();

    const fetchOrderResponseJson = await fetchOrderResponse.json();
    console.log(fetchOrderResponseJson);

    await apiContext.dispose();
  });
});
