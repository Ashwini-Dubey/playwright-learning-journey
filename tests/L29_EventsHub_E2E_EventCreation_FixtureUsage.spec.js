
import {
  test,
  expect,
} from "../utils/L29_EventsHub_E2E_EventCreation_testDataFixture";

// Import Page Object Model (POM) classes.
// Each class encapsulates page-specific locators and reusable user actions.
import { LoginPage } from "../page-objects/EventsHub_LoginPage";
import { SignUpPage } from "../page-objects/EventsHub_SignUpPage";
import { CreateEventsPage } from "../page-objects/EventsHub_CreateEventPage";
import { DashboardPage } from "../page-objects/EventsHub_DashboardPage";
import { EventsPage } from "../page-objects/EventsHub_EventsPage";

// Generate a unique email address for test-user registration.
// Combining the current timestamp with a random number reduces
// the possibility of duplicate email addresses across test executions.
function emailGenerator() {
  return `testuser${Date.now()}${Math.floor(Math.random() * 100000)}@test.com`;
}

// Generate the username once at the module level.
// Both signup and login tests reuse the same credentials.
// This allows the second test to authenticate using the account
// registered during the first test.
const username = emailGenerator();

// Generate a unique event name to minimize conflicts with
// previously created events in the application.
function eventNameGenerator() {
  return `Test Event ${Date.now()}`;
}

// Generate the event name once so that the same value can be
// used throughout the event-creation test and its assertions.
const eventName = eventNameGenerator();

// Group related authentication and event-creation scenarios.
// Serial execution ensures that tests run in the declared order
// within this describe block for each Playwright worker/project.
//
// The workflow is dependent:
// 1. Register a new user.
// 2. Log in using the registered user's credentials.
// 3. Create an event using the authenticated session.
test.describe.serial("POM Demo: Events Hub Authentication", () => {

  // Test Scenario 1: User Registration
  // Verify that a new user can successfully register in the application.
  test("User Sign Up", async ({ page, testDataForEventCreation }) => {

    // Initialize the SignUpPage POM using the current test's page fixture.
    // The page object provides reusable navigation and signup methods.
    const signUpPage = new SignUpPage(page);

    // Navigate to the application's signup page.
    await signUpPage.goTo();

    // Complete the registration process using:
    // - Dynamically generated username.
    // - Password provided by the custom test-data fixture.
    //
    // The fixture keeps test configuration separate from test implementation.
    await signUpPage.validSignUp(
      username,
      testDataForEventCreation.password
    );
  });

  // Test Scenario 2: User Login and Event Creation
  // Verify that the registered user can log in and create a new event.
  test("User Login", async ({ page, testDataForEventCreation }) => {

    // Initialize the required Page Object Model classes.
    // Each POM receives the current test's page fixture and exposes
    // the locators and actions required for its respective application page.
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const eventsPage = new EventsPage(page, eventName);
    const createEventsPage = new CreateEventsPage(page);

    // Step 1: Navigate to the login page.
    await loginPage.goTo();

    // Step 2: Authenticate using the credentials created during signup.
    // The username is reused from module-level test data,
    // while the password is retrieved from the custom fixture.
    await loginPage.validLogin(
      username,
      testDataForEventCreation.password
    );

    // Step 3: Verify successful navigation to the dashboard
    // by checking the visibility of the Browse Events button.
    await expect(dashboardPage.browseEventsButton).toBeVisible();

    // Step 4: Navigate to the events listing page.
    await dashboardPage.browseEvents();

    // Verify that the Add New Event button is visible,
    // confirming that the event-creation functionality is accessible.
    await expect(eventsPage.addNewEventButton).toBeVisible();

    // Step 5: Open the event-creation form.
    await eventsPage.addNewEvent();

    // Step 6: Create a new event using:
    // - Dynamically generated event name.
    // - Static test data supplied through the custom fixture.
    //
    // Passing test data as method arguments keeps the test scenario
    // independent of the underlying test-data configuration.
    await createEventsPage.validEventCreation(
      eventName,
      testDataForEventCreation.category,
      testDataForEventCreation.city,
      testDataForEventCreation.venue,
      testDataForEventCreation.dateTime,
      testDataForEventCreation.price,
      testDataForEventCreation.totalSeats
    );

    // Step 7: Verify that the application displays the event-creation
    // success message, confirming that the creation operation succeeded.
    await expect(
      createEventsPage.eventCreationSuccessMessage
    ).toBeVisible();

    // Step 8: Verify that the newly created event is visible
    // in the events listing using the event-specific locator.
    //
    // This assertion assumes the application has returned to, or displayed,
    // the events listing after successful event creation.
    await expect(eventsPage.searchEventText).toBeVisible();

  });
});
