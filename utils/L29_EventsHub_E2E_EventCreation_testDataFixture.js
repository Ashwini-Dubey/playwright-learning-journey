import { test as base, expect } from "@playwright/test";

// Extend Playwright's built-in test object to create custom fixtures.
// The base test object provides built-in fixtures such as page, browser and context.
const test = base.extend({
  // Define a custom fixture named testDataForEventCreation.
  // This fixture centralizes the static test data required for event creation.
  testDataForEventCreation: async ({}, use) => {
    // Arrange: Define the test data required by the event-creation workflow.
    // Keeping test data in a fixture avoids hardcoding values directly
    // inside individual test scenarios.
    const testData = {
      password: "Password@123",
      category: "Workshop",
      city: "Chandigarh",
      venue: "Chandigarh",
      dateTime: "2027-12-01T11:00",
      price: "1250",
      totalSeats: "150",
    };

    // Setup: Provide the test data to the test using Playwright's use() function.
    // Tests can access this fixture through destructuring:
    // async ({ testDataForEventCreation }) => { ... }
    //
    // Playwright waits for the test to finish before continuing
    // with the fixture teardown phase.
    await use(testData);

    // Teardown: Any cleanup logic related to this fixture can be added here.
    // No teardown action is currently required because this fixture
    // only provides static test data.
  },
});

// Export the extended test object and expect assertion library.
// Test files importing this module can use both built-in and custom fixtures.
export { test, expect };
