import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto("https://rahulshettyacademy.com/client/auth/login");
    await page
      .getByRole("textbox", { name: "email@example.com" })
      .fill("testuser008@gmail.com");

    // Enter the same password used during registration.
    await page.getByPlaceholder("enter your passsword").fill("Password@123");

    // Submit the login form.
    await page.getByRole("button").click();

    await use(page);
  },
});

export {expect};
