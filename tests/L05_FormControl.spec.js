/** @priority P1 @owner Ashwini Dubey @feature Form Elements */

import { test, expect } from "@playwright/test";

const BASE_URL = "https://playwrightlab.github.io/";

test.describe("Form Elements", () => {
  test("Registration Form", async ({ page }) => {
    await page.goto(BASE_URL);

    console.log("======Registration Form======");
  });
});
