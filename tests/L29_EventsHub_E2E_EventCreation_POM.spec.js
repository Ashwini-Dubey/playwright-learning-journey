import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/EventsHub_LoginPage";
import { SignUpPage } from "../page-objects/EventsHub_SignUpPage";
import { CreateEventsPage } from "../page-objects/EventsHub_CreateEventPage";
import { DashboardPage } from "../page-objects/EventsHub_DashboardPage";
import { EventsPage } from "../page-objects/EventsHub_EventsPage";

function emailGenerator() {
  return `testuser${Date.now()}@test.com`;
}
const username = emailGenerator();
const password = "Password@123";

//Event TestData
function eventNameGenerator() {
  return `Test Event ${Date.now()}`;
}

const eventName = eventNameGenerator();

const category = "Workshop";
const city = "Chandigarh";
const venue = "Sector 31D, Chandigarh";
const dateTime = "2027-12-01T11:00";
const price = "250";
const totalSeats = "50";

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
      category,
      city,
      venue,
      dateTime,
      price,
      totalSeats,
    );

    await expect(createEventsPage.eventCreationSuccessMessage).toBeVisible();
    await expect(eventsPage.searchEventText).toBeVisible();
  });
});
