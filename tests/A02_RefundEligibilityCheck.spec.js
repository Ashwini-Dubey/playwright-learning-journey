/*
Assignment 02: Refund Eligibility Validation

Objective:
Validate refund eligibility for single-ticket and group-ticket bookings
through two separate end-to-end Playwright tests.

Test Scenarios:
1. Single-ticket booking:
   - Create a booking with the default quantity of one ticket.
   - Navigate to the booking details page and validate the booking reference
     against the event title.
   - Check refund eligibility and verify that the refund spinner appears
     and disappears before the result is displayed.
   - Assert that the booking is eligible for a full refund and that the
     expected eligibility message is displayed.

2. Group-ticket booking:
   - Create a booking with three tickets by incrementing the ticket quantity
     twice before confirming the booking.
   - Navigate to the booking details page and validate the booking reference
     against the event title.
   - Check refund eligibility and verify that the refund spinner appears
     and disappears before the result is displayed.
   - Assert that the booking is not eligible for a refund and that the
     expected group-booking message is displayed.

Setup:
- BASE_URL: Base URL of the EventHub application.
- Credentials: Registered test-user credentials.
- loginAndGoToBooking(page): Reusable helper that authenticates the user
  and verifies that the Browse Events link is visible.

Validation Coverage:
- Successful login.
- Booking creation with the required ticket quantity.
- Navigation to booking history and booking details.
- Booking reference and event title first-character validation.
- Refund spinner visibility and disappearance within six seconds.
- Refund eligibility result visibility and expected result messages.
*/

import { test, expect } from "@playwright/test";

// Application configuration: base URL used for all application navigation.
const BASE_URL = "https://eventhub.rahulshettyacademy.com/";

// Credentials used to register and authenticate the test user.
const email_id = "testuser1792518647928@test.com";
const password = "Password@123";

// Authenticate the registered test user before accessing event-management
// and booking functionality.
async function loginAndGoToBooking(page) {
  // Navigate to the application login page.
  await page.goto(BASE_URL);

  // Enter the registered account credentials.
  await page.getByPlaceholder("you@email.com").fill(email_id);
  await page.getByLabel("Password").fill(password);

  // Submit the login form.
  await page.locator("#login-btn").click();

  // Verify that login succeeds and the Browse Events link is visible.
  await expect(page.getByText("Browse Events →")).toBeVisible();
}

test("@Web TC01: Single ticket booking is eligible for refund", async ({
  page,
}) => {
  // Step 1: Log in and verify access to the application.
  await loginAndGoToBooking(page);

  // Step 2: Book the first event with the default quantity of one ticket.
  await page.goto(`${BASE_URL}events`);

  await page
    .getByTestId("event-card")
    .first()
    .getByTestId("book-now-btn")
    .click();

  // Fill in the booking form and confirm the booking.
  await page.getByLabel("Full Name").fill("Test User");
  await page.locator("#customer-email").fill(email_id);
  await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 87210");
  await page.locator(".confirm-booking-btn").click();

  // Step 3: Navigate to booking history and open the first booking's details.
  await page.getByText("View My Bookings").click();
  await expect(page).toHaveURL(`${BASE_URL}bookings`);

  await page
    .locator("#booking-card")
    .first()
    .getByRole("button", { name: "View Details" })
    .click();

  // Verify that the booking details page is displayed.
  await expect(page.getByText("Booking Information")).toBeVisible();

  // Step 4: Read the booking reference and event title.
  const bookingRef = await page
    .locator("div div div div span")
    .nth(1)
    .textContent();

  const eventTitle = await page.locator("h1").textContent();

  // Verify that the first character of the booking reference matches
  // the first character of the event title.
  expect(bookingRef[0]).toStrictEqual(eventTitle[0]);

  // Step 5: Check refund eligibility and validate the spinner lifecycle.
  await page.locator("#check-refund-btn").click();

  // Verify that the refund spinner appears.
  await expect(page.locator("#refund-spinner")).toBeVisible();

  // Verify that the refund spinner disappears within six seconds.
  await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });

  // Step 6: Verify the refund eligibility result and its expected messages.
  await expect(page.locator("#refund-result")).toBeVisible();

  await expect(page.locator("#refund-result")).toContainText(
    "Eligible for refund",
  );

  await expect(page.locator("#refund-result")).toContainText(
    "Single-ticket bookings qualify for a full refund",
  );
});

test("@Web TC02: Group ticket booking is NOT eligible for refund", async ({
  page,
}) => {
  // Step 1: Log in and verify access to the application.
  await loginAndGoToBooking(page);

  // Step 2: Open the first event and increase the ticket quantity to three.
  await page.goto(`${BASE_URL}events`);

  await page
    .getByTestId("event-card")
    .first()
    .getByTestId("book-now-btn")
    .click();

  // Click the increment button twice to select three tickets.
  await page.locator('button:has-text("+")').click();
  await page.locator('button:has-text("+")').click();

  // Fill in the booking form and confirm the group booking.
  await page.getByLabel("Full Name").fill("Test User");
  await page.locator("#customer-email").fill(email_id);
  await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 87210");
  await page.locator(".confirm-booking-btn").click();

  // Step 3: Navigate to booking history and open the first booking's details.
  await page.getByText("View My Bookings").click();
  await expect(page).toHaveURL(`${BASE_URL}bookings`);

  await page
    .locator("#booking-card")
    .first()
    .getByRole("button", { name: "View Details" })
    .click();

  // Verify that the booking details page is displayed.
  await expect(page.getByText("Booking Information")).toBeVisible();

  // Step 4: Read the booking reference and event title.
  const bookingRef = await page
    .locator("div div div div span")
    .nth(1)
    .textContent();

  const eventTitle = await page.locator("h1").textContent();

  // Verify that the first character of the booking reference matches
  // the first character of the event title.
  expect(bookingRef[0]).toStrictEqual(eventTitle[0]);

  // Step 5: Check refund eligibility and validate the spinner lifecycle.
  await page.locator("#check-refund-btn").click();

  // Verify that the refund spinner appears.
  await expect(page.locator("#refund-spinner")).toBeVisible();

  // Verify that the refund spinner disappears within six seconds.
  await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });

  // Step 6: Verify that the group booking is not eligible for a refund.
  await expect(page.locator("#refund-result")).toBeVisible();

  await expect(page.locator("#refund-result")).toContainText(
    "Not eligible for refund",
  );

  await expect(page.locator("#refund-result")).toContainText(
    "Group bookings (3 tickets) are non-refundable",
  );
});
