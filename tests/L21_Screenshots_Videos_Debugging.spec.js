import { test, expect } from "@playwright/test";
import "dotenv/config";

// Read login credentials from the .env file
const rs_username = process.env.RS_USERNAME;
const rs_password = process.env.RS_PASSWORD;

test("@Web Screenshots, Videos and Debugging - Page & Element Level", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();

  //Partial Screenshot - Specific Element
  await page.locator("#displayed-text").screenshot({
    path: `artifacts/element-level-${Date.now()}.png`,
  });

  await page.locator("#hide-textbox").click();

  // Full Page Screenshot
  await page.screenshot({
    fullPage: true,
    path: `artifacts/page-level-${Date.now()}.png`,
  });

  await expect(page.locator("#displayed-text")).toBeHidden();
});

test("@Web Login form accepts credentials using CSS locators", async ({ page }) => {
  // Define the login page URL
  const BASE_URL = "https://rahulshettyacademy.com/loginpagePractise/";

  // Create reusable CSS locators for the username and password fields
  const username = page.locator("input#username");
  const password = page.locator("input#password");

  await page.screencast.start({
    path: "artifacts/login.mp4",
    size: {
      height: 800,
      width: 1280,
    },
    fps: 25,
    quality: 80,
  });

  // Navigate to the login page
  await page.goto(BASE_URL);

  // Enter the username and password using the reusable locators
  await username.fill(rs_username);
  await password.fill(rs_password);

  await page.screenshot({
    path: "artifacts/masked-password-element.jpeg",
    mask: [page.locator("input#password")],
    maskColor: "#000000",
    animations: "disabled",
    type: "jpeg",
    quality: 80,
    omitBackground: true,
  });

  await page.screencast.stop();
});
