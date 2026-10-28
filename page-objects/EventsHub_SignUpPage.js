class SignUpPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator("#register-email");
    this.passwordField = page.locator("#register-password");
    this.confirmPasswordField = page.getByPlaceholder("Repeat your password");
    this.createAccountButton = page.locator("#register-btn");
  }

  async goTo() {
    await this.page.goto("https://eventhub.rahulshettyacademy.com/register");
  }

  async validSignUp(username, password) {
    await this.emailField.fill(username);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(password);
    await this.createAccountButton.click();
  }
}

export { SignUpPage };
