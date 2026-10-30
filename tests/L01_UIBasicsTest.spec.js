/*
Concepts Covered:
1. Playwright test structure and browser/page fixtures
2. Manual browser context and page creation
3. Browser context isolation and cleanup
4. Page navigation using page.goto()
5. Retrieving page title and URL
6. Assertions: toHaveTitle() and toHaveURL()
7. Debugging using console.log()
8. Automatic vs. manual browser resource management
*/

import { test, expect } from "@playwright/test";

// Test 1: Create a browser context and page manually
test("@Web First Playwright Test", async ({ browser }) => {
  // Create a new browser context (an isolated browser session)
  const context = await browser.newContext();

  // Create a new page (tab) inside the context
  const page = await context.newPage();

  // Navigate to the login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await context.close();
});

// Test 2: Use the built-in page fixture provided by Playwright
test("@Web First Playwright Test1", async ({ page }) => {
  // Navigate to the login page using the automatically created page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  console.log(await page.url());
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/loginpagePractise/",
  );
  await page.close();
});
