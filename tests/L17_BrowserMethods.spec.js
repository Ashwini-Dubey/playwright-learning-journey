import { test } from "@playwright/test";

test("@Web Browser Controls - Back/Forward", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("https://www.google.com/");
  await page.goBack();
  console.log("After goBack(): ", page.url());
  await page.goForward();
  console.log("After goForward(): ", page.url());
  await page.reload();
  console.log(await page.title());
});
