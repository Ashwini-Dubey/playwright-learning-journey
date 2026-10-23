/*
 * Test Objective:
 * Validate browser-context isolation by creating independent admin and customer
 * sessions and verifying that cookies remain isolated between them while being
 * shared across pages belonging to the same browser context.
 *
 * Test Steps:
 * 1. Create separate browser contexts for the admin and customer sessions.
 * 2. Open a page in each context and navigate both pages to the application.
 * 3. Add a test cookie to the admin context and verify that it exists in the
 *    admin session but is absent from the customer session.
 * 4. Create a second page in the admin context and verify that both admin pages
 *    belong to the same browser context and share its cookies.
 * 5. Add a separate cookie to the customer context and verify that it does not
 *    appear in the admin context, confirming isolation in both directions.
 * 6. Propagate any test errors to Playwright and close all successfully created
 *    browser contexts in the finally block to ensure reliable resource cleanup.
 *
 * Expected Result:
 * Cookies must remain isolated across independent browser contexts and be
 * accessible through the shared browser context, regardless of which page
 * within that context is used.
 */

import { test, expect } from "@playwright/test";

test("Multiple Context and  Isolation", async ({ browser }) => {
  let adminContext;
  let customerContext;

  try {
    adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();

    customerContext = await browser.newContext();
    const customerPage = await customerContext.newPage();
    await adminPage.goto("https://the-internet.herokuapp.com/");

    await customerPage.goto("https://the-internet.herokuapp.com/");

    await adminContext.addCookies([
      {
        name: "test",
        value: "test",
        url: "https://the-internet.herokuapp.com/",
      },
    ]);

    const adminCookies = await adminContext.cookies();
    const customerCookies = await customerContext.cookies();

    expect(adminCookies.some((cookie) => cookie.name === "test")).toBe(true);

    expect(customerCookies.some((cookie) => cookie.name === "test")).toBe(
      false,
    );

    const adminPage2 = await adminContext.newPage();

    expect(adminPage.context()).toBe(adminPage2.context());

    const adminCookies2 = await adminContext.cookies();

    expect(adminCookies2.some((cookie) => cookie.name === "test")).toBe(true);

    await customerContext.addCookies([
      {
        name: "test-customer",
        value: "test-customer",
        url: "https://the-internet.herokuapp.com/",
      },
    ]);

    const adminCookies3 = await adminContext.cookies();

    const customerCookies2 = await customerContext.cookies();

    expect(customerCookies2.some((cookie) => cookie.name === "test")).toBe(
      false,
    );

    expect(
      adminCookies3.some((cookie) => cookie.name === "test-customer"),
    ).toBe(false);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await adminContext?.close();
    await customerContext?.close();
  }
});
