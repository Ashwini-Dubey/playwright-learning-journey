class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByPlaceholder("you@email.com");
    this.passwordField = page.locator("#password");
    this.SignInButton = page.locator("#login-btn");
  }

  async goTo() {
    await this.page.goto("https://eventhub.rahulshettyacademy.com/login");
  }
  async validLogin(username, password) {
    await this.emailField.fill(username);
    await this.passwordField.fill(password);
    await this.SignInButton.click();
  }
}

export { LoginPage };
