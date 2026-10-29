import { test, expect } from "@playwright/test";

// Import Page Object Model (POM) classes.
// Each class encapsulates the locators and actions for a specific application page.
import { LoginPage } from "../page-objects/EventsHub_LoginPage";
import { SignUpPage } from "../page-objects/EventsHub_SignUpPage";
import { CreateEventsPage } from "../page-objects/EventsHub_CreateEventPage";
import { DashboardPage } from "../page-objects/EventsHub_DashboardPage";
import { EventsPage } from "../page-objects/EventsHub_EventsPage";

// Import event test data from a JSON module.
// The JSON file is automatically parsed into a JavaScript object.
import testData from "../utils/L29_EventsHub_E2E_EventCreation_testData.json" with { type: "json" };

// Generate a unique email address for each test run.
// Date.now() helps prevent duplicate usernames when tests are executed repeatedly.
function emailGenerator() {
  return `testuser${Date.now()}@test.com`;
}

// Generate the credentials used by the signup and login tests.
const username = emailGenerator();

// Generate unique event test data to reduce the chance of event-name conflicts.
function eventNameGenerator() {
  return `Test Event ${Date.now()}`;
}

const eventName = eventNameGenerator();

for (const data of testData) {
  const username = emailGenerator();
  const password = data.password;
  const eventName = eventNameGenerator();
  // Group related authentication and event-creation tests.
  // Serial mode executes these tests in the declared order within each browser project.
  test.describe
    .serial(`POM Demo : Events Hub Authentication ${data.category}`, () => {
    // Verify that a new user can successfully sign up.
    test("User Sign Up", async ({ page }) => {
      // Create the SignUpPage object using Playwright's page fixture.
      const signUpPage = new SignUpPage(page);

      // Navigate to the signup page.
      await signUpPage.goTo();

      // Complete the signup flow using the generated username and configured password.
      await signUpPage.validSignUp(username, password);
    });

    // Verify login and create a new event through the application UI.
    test("User Login", async ({ page }) => {
      // Initialize the Page Objects with the current test's browser page.
      // These objects provide access to page-specific locators and reusable actions.
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);
      const eventsPage = new EventsPage(page, eventName);
      const createEventsPage = new CreateEventsPage(page);

      // Navigate to the login page and authenticate using the signup credentials.
      await loginPage.goTo();
      await loginPage.validLogin(username, password);

      // Verify that the dashboard's Browse Events button is visible after login.
      await expect(dashboardPage.browseEventsButton).toBeVisible();

      // Navigate to the events listing and verify that event creation is available.
      await dashboardPage.browseEvents();
      await expect(eventsPage.addNewEventButton).toBeVisible();

      // Open the event creation form.
      await eventsPage.addNewEvent();

      // Create an event using a generated name and data maintained in the JSON file.
      // Passing test data as arguments keeps the test flow separate from test-data storage.
      await createEventsPage.validEventCreation(
        eventName,
        data.category,
        data.city,
        data.venue,
        data.dateTime,
        data.price,
        data.totalSeats,
      );

      // Verify that the application displays the event creation success message.
      await expect(createEventsPage.eventCreationSuccessMessage).toBeVisible();

      // Verify that the newly created event is visible in the events listing.
      // This assertion assumes the application has returned to, or displayed, that listing.
      await expect(eventsPage.searchEventText).toBeVisible();
    });
  });
}
