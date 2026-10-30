import { test, expect } from "@playwright/test";
import path from "path";

const BASE_URL = "https://playwrightlab.github.io/";

// Test area for uploading files through a file input.
test("@Web File Upload", async ({ page }) => {
  // Navigate to the practice website.
  await page.goto(BASE_URL);

  // Locate the file input element.
  const fileInput = page.locator("#fileInput");

  // Construct the path to the sample file.
  const filePath = path.join(process.cwd(), "fixtures", "sample.txt");

  // Upload the sample file.
  await fileInput.setInputFiles(filePath);

  // Verify that the file input contains the selected file.
  await expect(fileInput).toHaveValue(/sample\.txt$/);
});
