import { test, expect } from "@playwright/test";

test("Screenshot Capture - Page & Element Level", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();

  //Partial Screenshot - Specific Element
  await page
    .locator("#displayed-text")
    .screenshot({ path: "element-level.png" });

  await page.locator("#hide-textbox").click();

  // Full Page Screenshot
  await page.screenshot({ path: "page-level.png" });

  await expect(page.locator("#displayed-text")).toBeHidden();
});

test("Visual Testing", async ({ page }) => {
  await page.goto("https://google.com/");
  expect(await page.screenshot()).toMatchSnapshot("landing.png");
});
