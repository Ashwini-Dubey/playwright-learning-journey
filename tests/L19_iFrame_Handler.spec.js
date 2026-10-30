import { test, expect } from "@playwright/test";

test("@Web Handle iFrames & perform actions on iFrame", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  const framePage = await page.frameLocator("#courses-iframe");

  await framePage.getByRole("link", { name: "NEW All Access plan" }).click();

  const textCheck = await framePage.locator(".text h2").textContent();

  console.log(textCheck.split(" ")[1]);
});
