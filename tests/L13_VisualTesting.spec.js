import { test, expect } from "@playwright/test";

test.skip("@Web Visual Testing", async ({ page }, testInfo) => {
  await page.goto("https://google.com/");

  const screenshotName = `landing-${testInfo.project.name}-${process.platform}.png`;

  // Allow minor visual differences of up to 2% of total pixels.
  expect(await page.screenshot()).toMatchSnapshot(screenshotName, {
    maxDiffPixelRatio: 0.02,
  });
});
