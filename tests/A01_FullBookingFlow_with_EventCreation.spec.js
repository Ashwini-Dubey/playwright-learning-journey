import { test, expect } from "@playwright/test";

/*
 * Test Suite: EventHub End-to-End Event Booking Workflow
 *
 * Objective:
 * Validate the complete event booking lifecycle by registering a new user,
 * creating an event through the admin panel, booking one ticket, verifying
 * the booking confirmation and booking history, and confirming that the
 * available seat count decreases by exactly one.
 *
 * Test Scenarios:
 * 1. Register a new user with a unique email address.
 * 2. Authenticate the registered user.
 * 3. Create a new event and capture its initial seat availability.
 * 4. Open the booking form for the newly created event.
 * 5. Enter customer details and submit a single-ticket booking.
 * 6. Verify the booking confirmation and capture the booking reference.
 * 7. Verify that the booking appears in My Bookings with the correct event.
 * 8. Verify that the event's available seat count decreases by exactly one.
 *
 * Expected Results:
 * - User registration and authentication complete successfully.
 * - The event is created successfully and can be identified in the listing.
 * - The booking is confirmed and a booking reference is generated.
 * - The booking record displays the expected booking reference and event.
 * - Available seats decrease from the initial count by exactly one.
 *
 * Test Data:
 * - A timestamp-based email address identifies the test account.
 * - A timestamp-based event title identifies the event created in this run.
 * - One ticket is booked to validate the expected seat reduction.
 */

// Application configuration: base URL used for all application navigation.
const BASE_URL = "https://eventhub.rahulshettyacademy.com/";

// Generate a unique email address once and reuse it throughout the
// registration, login, and booking workflow.
const email_id = emailGenerator();
console.log(email_id);

// Credentials used to register and authenticate the test user.
const password = "Password@123";

// Generate a timestamp-based email address to reduce conflicts with
// accounts created during previous test executions.
function emailGenerator() {
  return `testuser${Date.now()}@test.com`;
}

// Generate a unique event title so the event created during this
// execution can be distinguished from existing events.
function eventNameGenerator() {
  return `Test Event ${Date.now()}`;
}

const eventName = eventNameGenerator();

// Register a new user using the generated test credentials.
// The page object is passed in so the registration steps can be reused.
async function signup(page) {
  // Navigate to the user registration page.
  await page.goto(`${BASE_URL}register`);

  // Enter the email address and password for the new test account.
  await page.getByPlaceholder("you@email.com").fill(email_id);
  await page.locator("#register-password").fill(password);

  // Confirm the password and submit the registration form.
  await page.getByPlaceholder("Repeat your password").fill(password);
  await page.getByTestId("register-btn").click();
}

// Authenticate the registered test user before accessing event-management
// and booking functionality.
async function login(page) {
  // Navigate to the application login page.
  await page.goto(BASE_URL);

  // Enter the registered account credentials.
  await page.getByPlaceholder("you@email.com").fill(email_id);
  await page.getByLabel("Password").fill(password);

  // Submit the login form.
  await page.locator("#login-btn").click();
}

// Group the related test cases into a serial suite.
// Serial execution ensures that registration runs before the login and
// booking workflow that depends on the newly registered account.
test.describe.serial("Full Booking Flow with Event Creation", () => {
  // TC 01: User Registration
  // Register a new test account and verify that the application
  // returns to the expected base URL.
  test("Sign Up", async ({ page }) => {
    // Execute the reusable registration workflow.
    await signup(page);

    // Wait until network activity settles before validating navigation.
    await page.waitForLoadState("networkidle");

    // Verify that the resulting URL contains the application's base URL.
    await expect(page.url()).toContain(BASE_URL);
  });

  // TC 02: Event Creation, Booking, and Seat Availability Validation
  // Authenticate the registered user, create a new event, complete a
  // single-ticket booking, verify the booking record, and confirm
  // the resulting change in available seat count.
  test("Login", async ({ page }) => {
    // Step 1: Authenticate the registered user.
    await login(page);

    // Wait until network activity settles after login.
    await page.waitForLoadState("networkidle");

    // Verify that the application URL is correct and the Browse Events
    // link is visible, indicating that the user can access the event flow.
    await expect(page.url()).toContain(BASE_URL);
    await expect(page.getByText("Browse Events →")).toBeVisible();

    // Step 2: Create a new event through the admin panel.
    // Populate the event details, submit the form, and verify the
    // application's event-creation confirmation.
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

    // Confirm that the application reports successful event creation.
    await expect(page.getByText("Event created!")).toBeVisible();

    // Step 3: Locate the newly created event and capture its initial
    // available-seat count. This value is the baseline for verifying
    // the effect of the subsequent booking.
    await page.goto(`${BASE_URL}events`);

    // Verify that the event listing contains at least one visible event card.
    await expect(page.getByTestId("event-card").first()).toBeVisible();

    const eventCards = await page.getByTestId("event-card");

    // Capture the number of event cards available for inspection.
    const eventCardsCount = await eventCards.count();
    console.log("Event Cards Count: ", eventCardsCount);

    // Initialize the baseline seat count before locating the target event.
    let seatsBeforeBooking = 0;

    // Inspect the event cards to identify the event created in this run.
    for (let i = 0; i < eventCardsCount; i++) {
      const eventCardDetail = await eventCards
        .nth(i)
        .locator("h3")
        .textContent();

      // Continue the booking workflow only when the event title matches
      // the uniquely generated title for this execution.
      if (eventCardDetail.includes(eventName)) {
        // Verify that the matching event card and its title are visible.
        await expect(eventCards.nth(i)).toBeVisible({ timeout: 5_000 });
        await expect(eventCards.nth(i).locator("h3")).toBeVisible();

        // Read the displayed seat availability and convert it to a number
        // for comparison with the post-booking seat count.
        const seatAvailability = await eventCards
          .nth(i)
          .locator("span")
          .last()
          .textContent();

        seatsBeforeBooking = parseInt(
          seatAvailability.replace(" seats available", "").trim(),
        );

        console.log("Seats Before Booking: ", seatsBeforeBooking);

        // Step 4: Start booking.
        // Open the booking form from the matched event card to ensure
        // the booking is initiated for the intended event.
        await eventCards.nth(i).getByTestId("book-now-btn").click();

        // Verify that the booking form is displayed before entering details.
        await expect(page.getByText("Book Tickets")).toBeVisible();

        // Step 5: Complete the booking form.
        // Verify the default ticket quantity, enter the customer details,
        // and submit the booking request.

        await expect(page.locator("#ticket-count")).toHaveText("1");
        await page.getByLabel("Full Name").fill("Test User");
        await page.locator("#customer-email").fill(email_id);
        await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 87210");
        await page.locator(".confirm-booking-btn").click();

        // Verify that the application displays the booking confirmation.
        await expect(page.getByText("Booking Confirmed! 🎉")).toBeVisible();

        // Step 6: Verify booking confirmation.
        // Confirm that a booking reference is visible and capture its
        // trimmed text for identifying the corresponding booking record.
        await expect(page.locator(".booking-ref").first()).toBeVisible();

        let bookingRef = await page
          .locator(".booking-ref")
          .first()
          .textContent();

        bookingRef = bookingRef.trim();
        console.log("Booking Reference: ", bookingRef);

        // Step 7: Verify the booking in My Bookings.
        // Navigate to the booking history, inspect the available booking
        // cards, and verify the record associated with this booking reference.
        await page.getByText("View My Bookings").click();

        // Confirm that navigation reaches the expected bookings page.
        await expect(page).toHaveURL(`${BASE_URL}bookings`);

        // Locate the booking cards and verify that the listing is populated.
        const bookingCards = page.locator("#booking-card");
        await expect(bookingCards.first()).toBeVisible();

        // Capture the number of booking records available for inspection.
        const bookingCardsCount = await bookingCards.count();

        // Inspect each booking card to find the record matching this booking.
        for (let j = 0; j < bookingCardsCount; j++) {
          const bookingReferenceDetail = await bookingCards
            .nth(j)
            .locator(".booking-ref")
            .textContent();

          // Verify the matching booking card and confirm that it belongs
          // to the event created during this test execution.
          if (bookingReferenceDetail.trim().includes(bookingRef)) {
            await expect(bookingCards.nth(j)).toBeVisible();
            await expect(bookingCards.nth(j).locator("h3")).toContainText(
              eventName,
            );
            break;
          }
        }

        // Step 8: Verify seat reduction.
        // Return to the event listing, locate the same event, and compare
        // its current seat availability with the initial baseline.
        await page.goto(`${BASE_URL}events`);

        // Verify that the event listing is visible after navigation.
        await expect(eventCards.first()).toBeVisible();

        // Locate the event card using its unique title.
        const matchedEventCard = page.getByTestId("event-card").filter({
          hasText: eventName,
        });

        // Verify that the matching event card is visible.
        await expect(matchedEventCard).toBeVisible();

        // Read the updated seat availability from the matching event card.
        let seatsAfterBooking = await matchedEventCard
          .locator("span")
          .last()
          .textContent();

        // Remove the displayed label and convert the seat count to a number.
        seatsAfterBooking = seatsAfterBooking
          .replace(" seats available", "")
          .trim();

        seatsAfterBooking = parseInt(seatsAfterBooking);

        // Confirm that booking one ticket reduced the available seat count
        // by exactly one compared with the initial count.
        expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);

        // Exit the event-card loop after completing the booking workflow
        // for the uniquely identified event.
        break;
      }
    }
  });
});
