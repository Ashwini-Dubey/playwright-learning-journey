import { createBdd, test } from "playwright-bdd";
import { expect } from "@playwright/test";

const { Given, When, Then } = createBdd(test);

// Navigate to EventsHub login page
Given("the user is on the EventsHub login page", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com/");
});

// Enter valid username and password
When(
  "the user enters valid {string} and {string}",
  async ({ page }, username, password) => {
    await page.getByLabel("Email").fill(username);
    await page.getByLabel("Password").fill(password);
  },
);

// Click Sign In button
When("the user clicks the Sign In button", async ({ page }) => {
  await page.getByRole("button", { name: "Sign In" }).click();
});

// Verify successful login
Then("the user should be logged in successfully", async ({ page }) => {
  await expect(page.getByText("Browse Events →")).toBeVisible();
});
