import { test, expect } from "@playwright/test";

test("Screenshots, Videos and Debugging - Page & Element Level", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();

  //Partial Screenshot - Specific Element
  await page.locator("#displayed-text").screenshot({
    path: `artifacts/element-level-${Date.now()}.png`,
  });

  await page.locator("#hide-textbox").click();

  // Full Page Screenshot
  await page.screenshot({
    fullPage: true,
    path: `artifacts/page-level-${Date.now()}.png`,
  });

  await expect(page.locator("#displayed-text")).toBeHidden();
});
