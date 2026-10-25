import { test, expect } from "@playwright/test";

test("Network Interception - Aborting the Network Requests", async ({
  page,
}) => {
  await page.route("**/*.css", async (route) => await route.abort());
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  
});
