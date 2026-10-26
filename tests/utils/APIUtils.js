class APIUtils {
  constructor() {
    this.apiContext = apiContext;
  }
  async getToken() {
    const loginResponse = await apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: loginPayload,
      },
    );

    // Verify that the API request completed successfully.
    expect(loginResponse.ok()).toBeTruthy();

    // Parse the JSON response and extract the authentication token.
    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson);
    token = loginResponseJson.token;
    console.log(token);
    return token;
  }
}
