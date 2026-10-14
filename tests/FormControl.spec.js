import { test, expect } from "@playwright/test";

const BASE_URL = "https://playwrightlab.github.io/";

test("Test for Form Control", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.pause();
});
