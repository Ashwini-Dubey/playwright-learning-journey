import { test, expect } from "@playwright/test";

test("Playwright Class Locators - all()", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByRole("link", { name: "Shop" }).click();

  const checkAll = await page.locator("app-card").all();
  console.log(checkAll);
});

test("Playwright Class Locators - allInnerTexts()", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByRole("link", { name: "Shop" }).click();

  const checkAllInnerTexts = await page.locator("app-card").allInnerTexts();
  console.log(checkAllInnerTexts);
});

test("Playwright Class Locators - allTextContents()", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByRole("link", { name: "Shop" }).click();

  const checkAllTextContents = await page.locator("app-card").allTextContents();
  console.log(checkAllTextContents);
});
