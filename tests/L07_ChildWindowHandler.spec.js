import { test, expect } from "@playwright/test";

test("@Web Child Window Handling", async ({ browser }) => {
  const BASE_URL = "https://rahulshettyacademy.com/loginpagePractise/";

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(BASE_URL);

  const documentRequestLink = page.getByText(
    "Free Access to InterviewQues/ResumeAssistance/Material",
  );

  // Wait for the child page while clicking the link.
  const [childPage] = await Promise.all([
    context.waitForEvent("page"),
    documentRequestLink.click(),
  ]);

  // Wait until the child page has loaded.
  await childPage.waitForLoadState();

  // Retrieve and print the text from the child page.
  const text = await childPage.locator(".red").textContent();

  console.log(text);

  // Close the browser context after the test.
  await context.close();
});
