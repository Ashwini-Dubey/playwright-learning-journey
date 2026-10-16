import { test, expect } from "@playwright/test";

test("", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.locator(".text-center.text-white").textContent());
  await page.getByLabel("Username:").fill("rahulshettyacademy");
  console.log(await page.getByLabel("Username:").inputValue());
});
