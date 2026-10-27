import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page
      .getByPlaceholder("you@email.com")
      .fill("testuser1792517543162@test.com");
    await page.getByLabel("Password").fill("Password@123");
    await page.locator("#login-btn").click();

    await use(page);
    await page.close();
  },
  eventCreationPage: async ({ page }, use) => {
    await page.goto(
      "https://eventhub.rahulshettyacademy.com/login/admin/events",
    );

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
    await use(page);
    await page.close();
  },
});
