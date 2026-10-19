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
