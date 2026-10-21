/*
Instructions:
Two separate tests — one booking with 1 ticket should show "Eligible for refund", a booking with 3 tickets should show 
"Not eligible for refund". Both tests verify the spinner appears and disappears before showing the result.

Setup:

- BASE_URL = https://eventhub.rahulshettyacademy.com
- Credentials: Use your own credentials
- Write a reusable loginAndGoToBooking(page) helper that logs in and confirms the Browse Events → link is visible

---

Test 1 — Single ticket booking is eligible for refund

Step 1 — Login
- Call your login helper

Step 2 — Book first event with 1 ticket (default)
- Navigate to /events
- Click Book Now on the very first event card (locate data-testid="event-card" → first → data-testid="book-now-btn")
- Fill Full Name, Email (your email), Phone
- Click confirm button (.confirm-booking-btn)

Step 3 — Navigate to booking detail
- Click View My Bookings link
- Assert URL is /bookings
- Click the first View Details link
- Assert: text Booking Information is visible on the page

Step 4 — Validate booking ref
- Read booking ref from page
- Read event title from h1
- Assert validation : "first character of booking ref equals first character of event title"

Step 5 — Check refund eligibility
- Click the Check Refund Eligibility button
- Assert: spinner element (#refund-spinner) is immediately visible
- Assert: spinner is no longer visible within 6 seconds

Step 6 — Validate result
- Locate result element by id #refund-result
- Assert it is visible
- Assert it contains text Eligible for refund
- Assert it contains text Single-ticket bookings qualify for a full refund

---

Test 2 — Group ticket booking is NOT eligible for refund

Steps 1–2 — Same as Test 1, except after navigating to the event detail page, click the + button twice to increase quantity to 3 before filling the form
- Locate the increment button with button:has-text("+") and click it twice

Steps 3–5 — Identical to Test 1

Step 6 — Validate result (different assertions)
- Assert result contains Not eligible for refund
- Assert result contains Group bookings (3 tickets) are non-refundable
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

  await expect(page.getByText("Browse Events →")).toBeVisible();
}

test("TC01: Single ticket booking is eligible for refund", async ({ page }) => {
  // Step 1:
  await loginAndGoToBooking(page);

  // Step 2: Book first event with 1 ticket (default)
  await page.goto(`${BASE_URL}events`);

  await page
    .getByTestId("event-card")
    .first()
    .getByTestId("book-now-btn")
    .click();

  await page.getByLabel("Full Name").fill("Test User");
  await page.locator("#customer-email").fill(email_id);
  await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 87210");
  await page.locator(".confirm-booking-btn").click();

  //Step 3: Navigate to booking detail
  await page.getByText("View My Bookings").click();
  await expect(page).toHaveURL(`${BASE_URL}bookings`);
  await page
    .locator("#booking-card")
    .first()
    .getByRole("button", { name: "View Details" })
    .click();
  await expect(page.getByText("Booking Information")).toBeVisible();

  //Step 4: Validate booking ref
  const bookingRef = await page
    .locator("div div div div span")
    .nth(1)
    .textContent();

  const eventTitle = await page.locator("h1").textContent();

  expect(bookingRef[0]).toStrictEqual(eventTitle[0]);

  // Step 5: Check refund eligibility
  await page.locator("#check-refund-btn").click();
  await expect(page.locator("#refund-spinner")).toBeVisible();
  await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });

  // Step 6: Validate Result
  await expect(page.locator("#refund-result")).toBeVisible();
  await expect(page.locator("#refund-result")).toContainText(
    "Eligible for refund",
  );
  await expect(page.locator("#refund-result")).toContainText(
    "Single-ticket bookings qualify for a full refund",
  );
});

test("TC02: Group ticket booking is NOT eligible for refund", async ({
  page,
}) => {
  // Step 1:
  await loginAndGoToBooking(page);

  // Step 2: Book first event with 1 ticket (default)
  await page.goto(`${BASE_URL}events`);

  await page
    .getByTestId("event-card")
    .first()
    .getByTestId("book-now-btn")
    .click();

  await page.locator('button:has-text("+")').click();
  await page.locator('button:has-text("+")').click();
  await page.getByLabel("Full Name").fill("Test User");
  await page.locator("#customer-email").fill(email_id);
  await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 87210");
  await page.locator(".confirm-booking-btn").click();

  //Step 3: Navigate to booking detail
  await page.getByText("View My Bookings").click();
  await expect(page).toHaveURL(`${BASE_URL}bookings`);
  await page
    .locator("#booking-card")
    .first()
    .getByRole("button", { name: "View Details" })
    .click();
  await expect(page.getByText("Booking Information")).toBeVisible();

  //Step 4: Validate booking ref
  const bookingRef = await page
    .locator("div div div div span")
    .nth(1)
    .textContent();

  const eventTitle = await page.locator("h1").textContent();

  expect(bookingRef[0]).toStrictEqual(eventTitle[0]);

  // Step 5: Check refund eligibility
  await page.locator("#check-refund-btn").click();
  await expect(page.locator("#refund-spinner")).toBeVisible();
  await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });

  // Step 6: Validate Result
  await expect(page.locator("#refund-result")).toBeVisible();
  await expect(page.locator("#refund-result")).toContainText(
    "Not eligible for refund",
  );
  await expect(page.locator("#refund-result")).toContainText(
    "Group bookings (3 tickets) are non-refundable",
  );
});
