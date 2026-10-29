class SignUpPage {
  constructor(page) {
    // Store the Playwright page instance so all methods can interact with this browser page.
    this.page = page;

    // Locate the email input field using its unique ID.
    this.emailField = page.locator("#register-email");

    // Locate the password input field using its unique ID.
    this.passwordField = page.locator("#register-password");

    // Locate the confirm-password field using its placeholder text.
    this.confirmPasswordField = page.getByPlaceholder("Repeat your password");

    // Locate the Create Account button using its unique ID.
    this.createAccountButton = page.locator("#register-btn");
  }

  // Navigate to the application's user registration page.
  async goTo() {
    await this.page.goto("https://eventhub.rahulshettyacademy.com/register");
  }

  // Register a user with the supplied username (email) and password.
  async validSignUp(username, password) {
    // Enter the user's email address.
    await this.emailField.fill(username);

    // Enter the password.
    await this.passwordField.fill(password);

    // Enter the same password in the confirmation field.
    await this.confirmPasswordField.fill(password);

    // Submit the registration form.
    await this.createAccountButton.click();
  }
}

// Export the class so test files can import and instantiate the SignUpPage.
export { SignUpPage };
