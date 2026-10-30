//Parallel Execution of tests in same spec file
import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });
test("@Web Test 1 for Parallel Execution", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com/");
});

test("@Web Test 2 for Parallel Execution", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/locatorspractice/");
});
