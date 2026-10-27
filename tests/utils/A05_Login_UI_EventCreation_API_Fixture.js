import { test as base, expect, request } from "@playwright/test";

export const BASE_URL = "https://eventhub.rahulshettyacademy.com/";

function eventNameGenerator() {
  return `Test Event ${Date.now()}`;
}

export const eventName = eventNameGenerator();

const evenCreationPayload = {
  title: eventName,
  description: "",
  category: "Conference",
  venue: "Chandigarh",
  city: "Pune",
  eventDate: "2027-10-30T20:03:00.000Z",
  price: 100,
  totalSeats: 5000,
};

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto(BASE_URL);
    await page
      .getByPlaceholder("you@email.com")
      .fill("testuser1792517543162@test.com");
    await page.getByLabel("Password").fill("Password@123");
    await page.locator("#login-btn").click();
    await expect(page.getByText("Browse Events →")).toBeVisible();

    await use(page);
  },
  createEvent: async ({}, use) => {
    const apiContext = await request.newContext();

    // Submit a POST request to the registration endpoint with the user details
    // serialized as JSON and the appropriate Content-Type header.
    const eventCreationResponse = await apiContext.post(
      "https://api.eventhub.rahulshettyacademy.com/api/events",
      {
        data: evenCreationPayload,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0MjMwLCJlbWFpbCI6InRlc3R1c2VyMTc5MjUxNzU0MzE2MkB0ZXN0LmNvbSIsImlhdCI6MTc5MzEzMDExNCwiZXhwIjoxNzkzNzM0OTE0fQ.i7gA9plYk-p4pxhaIIBBeeio0wPH7WCcFY21cKoRLH8",
        },
      },
    );

    // Assert that the API response indicates a successful HTTP request.
    expect(eventCreationResponse.ok()).toBeTruthy();

    // Log the HTTP status code returned by the registration endpoint.
    console.log("Status Code: ", eventCreationResponse.status());

    // Verify that the registration API returns the expected HTTP status code.
    expect(eventCreationResponse.status()).toBe(201);

    // Log the response headers to inspect the metadata returned by the API.
    console.log("Response Header: ", eventCreationResponse.headers());

    // Parse the response body from JSON into a JavaScript object.
    const eventCreationResponseJson = await eventCreationResponse.json();

    // Log the complete parsed response body for debugging and verification.
    console.log("Response (Json): ", eventCreationResponseJson);

    // Extract and log the registration confirmation message from the JSON response.
    console.log("Response's Message: ", eventCreationResponseJson.message);

    // Assert that the API returns the expected registration success message.
    expect(eventCreationResponseJson.message).toEqual(
      "Event created successfully",
    );

    await use(eventCreationResponseJson);
    await apiContext.dispose();
  },
});

export { expect };
