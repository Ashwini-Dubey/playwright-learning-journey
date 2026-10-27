/*
Task 1 — authenticatedPage fixture Build a fixture that logs into EventHub through the UI (fill email/password, click login) and yields a page object that's already past the login screen. Any test that asks for this fixture should be able to go straight to /events without writing a single login step
*/
import { test, expect } from "./utils/A05_Login_UI_EventCreation_UI_Fixture.js";

test("Build a Two-Fixture Test — Login Fixture + Event Creation Fixture", async ({
  eventCreationPage,
}) => {
  await expect(eventCreationPage.getByText("Event created!")).toBeVisible();
});
