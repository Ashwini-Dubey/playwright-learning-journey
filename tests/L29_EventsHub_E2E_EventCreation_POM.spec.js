import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/EventsHub_LoginPage";
import { SignUpPage } from "../page-objects/EventsHub_SignUpPage";
import { CreateEventsPage } from "../page-objects/EventsHub_CreateEventPage";
import { DashboardPage } from "../page-objects/EventsHub_DashboardPage";
import { EventsPage } from "../page-objects/EventsHub_EventsPage";
import testData from "../utils/L29_EventsHub_E2E_EventCreation_testData.json" with { type: "json" };

function emailGenerator() {
  return `testuser${Date.now()}@test.com`;
}
const username = emailGenerator();
const password = testData.password;

//Event TestData
function eventNameGenerator() {
  return `Test Event ${Date.now()}`;
}

const eventName = eventNameGenerator();

test.describe.serial("POM Demo : Events Hub Authentication", () => {
  test("User Sign Up", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.goTo();
    await signUpPage.validSignUp(username, password);
  });
  test("User Login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const eventsPage = new EventsPage(page, eventName);
    const createEventsPage = new CreateEventsPage(page);

    await loginPage.goTo();
    await loginPage.validLogin(username, password);
    await expect(dashboardPage.browseEventsButton).toBeVisible();

    await dashboardPage.browseEvents();
    await expect(eventsPage.addNewEventButton).toBeVisible();

    await eventsPage.addNewEvent();

    await createEventsPage.validEventCreation(
      eventName,
      testData.category,
      testData.city,
      testData.venue,
      testData.dateTime,
      testData.price,
      testData.totalSeats,
    );

    await expect(createEventsPage.eventCreationSuccessMessage).toBeVisible();
    await expect(eventsPage.searchEventText).toBeVisible();
  });
});
