import { test as base, expect } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com/";

function eventNameGenerator() {
  return `Test Event ${Date.now()}`;
}

const eventName = eventNameGenerator();

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto(BASE_URL);
    await page
      .getByPlaceholder("you@email.com")
      .fill("testuser1792517543162@test.com");
    await page.getByLabel("Password").fill("Password@123");
    await page.locator("#login-btn").click();
    await expect(page.getByText("Browse Events →")).toBeVisible();

    await use(page);
  },
  eventCreationPage: async ({ authenticatedPage }, use) => {
    await authenticatedPage.goto(`${BASE_URL}admin/events`);
    await authenticatedPage.locator("#event-title-input").fill(eventName);
    await authenticatedPage
      .locator("#admin-event-form textarea")
      .fill(eventName);
    await authenticatedPage.locator("#category").selectOption("Workshop");
    await authenticatedPage.getByLabel("City").fill("Chandigarh");
    await authenticatedPage.getByLabel("Venue").fill("DLF Phase 2");

    await authenticatedPage
      .getByRole("textbox", { name: "Event Date & Time*" })
      .fill("2027-12-01T11:00");

    await authenticatedPage.getByLabel("Price ($)").fill("250");
    await authenticatedPage.getByLabel("Total Seats").fill("50");
    await authenticatedPage.locator("#add-event-btn").click();
    await use(authenticatedPage);
  },
});

export { expect };
