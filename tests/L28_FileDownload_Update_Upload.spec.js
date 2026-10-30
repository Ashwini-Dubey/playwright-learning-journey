import { test, expect } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";
import exceljs from "exceljs";

async function writeExcel(searchText, replaceText, filePath) {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet("Sheet1");

  if (!worksheet) {
    throw new Error("Worksheet 'Sheet1' was not found.");
  }

  const output = await readExcel(worksheet, searchText);

  if (output.row === -1) {
    throw new Error(`"${searchText}" was not found in the worksheet.`);
  }

  worksheet.getCell(output.row, output.column).value = replaceText;

  await workbook.xlsx.writeFile(filePath);

  console.log("Cell data updated.");
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText && output.row === -1) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });

  return output;
}

test("@Web Upload Download Excel Validation", async ({ page }) => {
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html",
  );

  // Create a project-relative output directory.
  const downloadsFolder = path.join(process.cwd(), "test-results", "downloads");

  fs.mkdirSync(downloadsFolder, { recursive: true });

  // Wait for the download before clicking the button.
  const downloadPromise = page.waitForEvent("download");

  await page.getByRole("button", { name: "Download" }).click();

  const download = await downloadPromise;

  // Construct a cross-platform destination path.
  const filePath = path.join(downloadsFolder, download.suggestedFilename());

  // Save and validate the downloaded file.
  await download.saveAs(filePath);

  expect(fs.existsSync(filePath)).toBe(true);

  console.log("File saved at:", filePath);

  // Update the Excel workbook.
  await writeExcel("Banana", "Republic", filePath);

  const fileInput = page.locator("#fileinput");
  await fileInput.setInputFiles(filePath);

  await expect(page.getByText("updated excel data successfully")).toBeVisible();

  await expect(page.getByText("Republic")).toBeVisible();
});
