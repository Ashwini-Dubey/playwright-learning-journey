import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/EventsHub_LoginPage";
import { SignUpPage } from "../page-objects/EventsHub_SignUpPage";

function emailGenerator() {
  return `testuser${Date.now()}@test.com`;
}
const username = emailGenerator();
const password = "Password@123";

test.describe.serial("POM Demo : Events Hub Authentication", () => {
  test("User Sign Up", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.goTo();
    await signUpPage.validSignUp(username, password);
  });
  test("User Login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  });
});
