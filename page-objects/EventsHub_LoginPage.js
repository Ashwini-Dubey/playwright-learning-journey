class LoginPage {
  constructor(page) {
    // Store the Playwright page instance for use throughout this Page Object.
    this.page = page;

    // Locate the email input field using its placeholder text.
    this.emailField = page.getByPlaceholder("you@email.com");

    // Locate the password input field using its unique ID.
    this.passwordField = page.locator("#password");

    // Locate the Sign In button using its unique ID.
    this.signInButton = page.locator("#login-btn");
  }

  // Navigate to the application's login page.
  async goTo() {
    await this.page.goto("https://eventhub.rahulshettyacademy.com/login");
  }

  // Perform login using the supplied username (email) and password.
  async validLogin(username, password) {
    // Enter the registered user's email address.
    await this.emailField.fill(username);

    // Enter the user's password.
    await this.passwordField.fill(password);

    // Submit the login form.
    await this.signInButton.click();
  }
}

// Export the LoginPage class so it can be imported into test files.
export { LoginPage };
