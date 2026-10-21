import { test, expect } from "@playwright/test";

test("Element's Hidden/Displayed Mode with Expect Assertions", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  await page.locator("#show-textbox").click();
  await expect(page.locator("#displayed-text")).toBeVisible();
});
