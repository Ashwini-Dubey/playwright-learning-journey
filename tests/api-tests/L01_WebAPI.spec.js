import { test, expect, request } from "@playwright/test";

const loginPayload = {
  userEmail: "testuser008@gmail.com",
  userPassword: "Password@123",
};

test("Login via Web API", async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    },
  );

  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  console.log(loginResponseJson);
  const token = loginResponseJson.token;
  console.log(token);
});
