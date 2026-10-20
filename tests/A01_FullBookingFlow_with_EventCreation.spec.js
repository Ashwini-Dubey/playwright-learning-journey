import { test, expect } from "@playwright/test";

/*
Instructions: 
Create a brand new event from the admin panel, then complete a booking for that event, and 
finally verify the seat count drops by exactly 1.

Setup:
- BASE_URL = https://eventhub.rahulshettyacademy.com
- Credentials: < Create your own credentials>
- Write a reusable login(page) helper function — you will call it at the start of the test


    
Step 3 — Find the event card and capture seats
- Navigate to /events
- Get all event cards (locate by data-testid="event-card")
- Assert the first card is visible (confirms page loaded)
- From all cards, filter for the one that contains your event title text
- Assert the matched card is visible (timeout 5 seconds)
- Read the seat count text from that card (locate element containing text seat, parse integer from its inner text) — store this as seatsBeforeBooking

Step 4 — Start booking
- On the matched event card, click the Book Now button (locate by data-testid="book-now-btn" inside the card)

Step 5 — Fill booking form
- Assert: element with id #ticket-count has text 1 (default quantity)
- Fill Full Name (locate by label Full Name)
- Fill Email (locate by id #customer-email)
- Fill Phone (locate by placeholder +91 98765 43210)
- Click the confirm button (locate by CSS class .confirm-booking-btn)

Step 6 — Verify booking confirmation
- Locate the booking reference element (locate by CSS class .booking-ref, take .first())
- Assert it is visible
- Read its inner text, trim it — store as bookingRef

Step 7 — Verify in My Bookings
- Click the link View My Bookings
- Assert: URL is BASE_URL/bookings
- Get all booking cards (locate by id #booking-card)
- Assert the first booking card is visible
- Filter booking cards for the one that contains an element with class .booking-ref matching your bookingRef text
- Assert that matched card is visible
- Assert that matched card contains your eventTitle text

Step 8 — Verify seat reduction
- Navigate back to /events
- Assert the first event card is visible
- Filter cards again using hasText: eventTitle
- Assert the card is visible
- Read the seat count text again (same as Step 3) — store as seatsAfterBooking
- Assert: seatsAfterBooking === seatsBeforeBooking - 1
*/

// Define the base URL of the EventHub application.
const BASE_URL = "https://eventhub.rahulshettyacademy.com/";

// Generate a unique email address once so the same account can be used
// throughout the signup, login, and booking flow.
const email_id = emailGenerator();
console.log(email_id);

// Define the password used for the test account.
const password = "Password@123"; // Test credentials

// Generate a unique email address using the current timestamp.
// This helps prevent conflicts with email addresses from previous test runs.
function emailGenerator() {
  return `testuser${Date.now()}@test.com`;
}

function eventNameGenerator() {
  return `Test Event ${Date.now()}`;
}

const eventName = eventNameGenerator();

// Reusable helper function to register a new user.
// Accepts the Playwright page object so the same steps can be reused in tests.
async function signup(page) {
  // Open the registration page.
  await page.goto(`${BASE_URL}register`);

  // Enter the email address generated for this test run.
  await page.getByPlaceholder("you@email.com").fill(email_id);

  // Enter the password in the registration password field.
  await page.locator("#register-password").fill(password);

  // Confirm the password by entering it again.
  await page.getByPlaceholder("Repeat your password").fill("Password@123");

  // Click the registration button to submit the signup form.
  await page.getByTestId("register-btn").click();
}

// Reusable helper function to log in with the registered test account.
// Accepts the Playwright page object to perform browser interactions.
async function login(page) {
  // Open the application's login page.
  await page.goto(BASE_URL);

  // Enter the registered email address.
  await page.getByPlaceholder("you@email.com").fill(email_id);

  // Locate the password field using its accessible label and enter the password.
  await page.getByLabel("Password").fill(password);

  // Locate the login button by its ID and click it.
  await page.locator("#login-btn").click();
}

// Group related tests into a serial suite.
// Serial execution ensures the signup test runs before the login test.
test.describe.serial("Full Booking Flow with Event Creation", () => {
  // TC 01: Sign up for a new EventHub account.

  test("Sign Up", async ({ page }) => {
    // Call the reusable signup helper to register the test account.
    await signup(page);

    // Wait for the page to reach the network-idle state.
    await page.waitForLoadState("networkidle");

    // Check that the current URL contains the application's base URL.
    await expect(page.url()).toContain(
      "https://eventhub.rahulshettyacademy.com/",
    );
  });

  // TC 02: Log in using the account created in the signup test.

  test("Login", async ({ page }) => {
    // Step 1: Log in using the reusable login helper.
    await login(page);

    // Wait for the page to reach the network-idle state.
    await page.waitForLoadState("networkidle");

    // Check that the current URL contains the application's base URL.
    await expect(page.url()).toContain(
      "https://eventhub.rahulshettyacademy.com/",
    );

    // Verify that the Browse Events link is visible after login.
    // This provides an additional check that the login flow succeeded.
    await expect(page.getByText("Browse Events →")).toBeVisible();

    // Step 2: Create a new event
    await page.goto(`${BASE_URL}admin/events`);

    await page.locator("#event-title-input").fill(eventName);

    await page.locator("#admin-event-form textarea").fill(eventName);

    await page.locator("#category").selectOption("Workshop");

    await page.getByLabel("City").fill("Chandigarh");

    await page.getByLabel("Venue").fill("DLF Phase 2");

    await page
      .getByRole("textbox", { name: "Event Date & Time*" })
      .fill("2027-12-01T11:00");

    await page.getByLabel("Price ($)").fill("250");

    await page.getByLabel("Total Seats").fill("50");

    await page.locator("#add-event-btn").click();

    await expect(page.getByText("Event created!")).toBeVisible();

    // Step 3: Find the event card and capture seats
    await page.goto(`${BASE_URL}events`);

    await expect(page.getByTestId("event-card").first()).toBeVisible();

    const eventCards = await page.getByTestId("event-card");

    const eventCardsCount = await eventCards.count();
    console.log("Event Cards Count: ", eventCardsCount);

    let seatsBeforeBooking = 0;

    for (let i = 0; i < eventCardsCount; i++) {
      const eventCardDetail = await eventCards
        .nth(i)
        .locator("h3")
        .textContent();
      console.log(`Event Detail ${i + 1}:${eventCardDetail} `);

      if (eventCardDetail.includes(eventName)) {
        await expect(eventCards.nth(i)).toBeVisible({ timeout: 5_000 });
        await expect(eventCards.nth(i).locator("h3")).toBeVisible();

        const seatAvailability = await eventCards
          .nth(i)
          .locator("span")
          .last()
          .textContent();
        seatsBeforeBooking = parseInt(
          seatAvailability.replace(" seats available", "").trim(),
        );
        console.log(seatsBeforeBooking);
        break;
      }
    }
  });
});
