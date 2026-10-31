import { createBdd, test } from "playwright-bdd";
import { expect } from "@playwright/test";

const { Given, When, Then } = createBdd(test);

function emailGenerator() {
  return `testuser${Date.now()}@test.com`;
}

Given("the user is on the EventsHub Sign Up page", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com/register");
});

When("the user enters valid details", async ({ page }) => {
  const email_id = emailGenerator();
  await page.locator("#register-email").fill(email_id);
  await page.locator("#register-password").fill("Password@123");
  await page.getByPlaceholder("Repeat your password").fill("Password@123");
});

When("the user clicks the Create Account button", async ({ page }) => {
  await page.getByRole("button", { name: "Create Account" }).click();
});

Then("the user should be onboarded successfully", async ({ page }) => {
  await expect(page.getByText("Browse Events →")).toBeVisible();
});
