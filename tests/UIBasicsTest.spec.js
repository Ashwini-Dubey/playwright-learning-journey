import { test, expect } from "@playwright/test";

// Test 1: Create a browser context and page manually
test("First Playwright Test", async ({ browser }) => {
  // Create a new browser context (an isolated browser session)
  const context = await browser.newContext();

  // Create a new page (tab) inside the context
  const page = await context.newPage();

  // Navigate to the login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

// Test 2: Use the built-in page fixture provided by Playwright
test("First Playwright Test1", async ({ browser, page }) => {
  // Navigate to the login page using the automatically created page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
});
