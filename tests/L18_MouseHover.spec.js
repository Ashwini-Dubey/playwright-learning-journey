import { test, expect } from "@playwright/test";

test("Mousehover", async ({ page }) => {
  // Navigate to the Rahul Shetty Academy Automation Practice page.
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  // Hover over the Mouse Hover button to display its dropdown menu.
  // Select the "Top" option to navigate to the top of the page.
  await page.locator("#mousehover").hover();
  await page.getByText("Top").click();

  // Hover over the Mouse Hover button again to reopen the dropdown menu.
  // Select the "Reload" option to reload the current page.
  await page.locator("#mousehover").hover();
  await page.getByText("Reload").click();
});
