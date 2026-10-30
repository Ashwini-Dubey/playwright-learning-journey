import { test, expect } from "@playwright/test";

test("@Web Handling of Java/JS Alert Popups", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  page.once("dialog", (dialog) => dialog.accept());
  await page.locator("#alertbtn").click();

  page.once("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();

  page.once("dialog", (dialog) => dialog.dismiss());
  await page.locator("#confirmbtn").click();
});


