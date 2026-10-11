import "dotenv/config";
import { test, expect } from "@playwright/test";

const rs_username = process.env.RS_USERNAME;
const rs_password = process.env.RS_PASSWORD;

test("Login Test : ", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("input#username").fill(rs_username);
  await page.locator("input#password").fill(rs_password);
});

test("Login Test : Get By Role", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.getByLabel("Username").fill(rs_username);
  await page.getByLabel("Password").fill(rs_password);
});
