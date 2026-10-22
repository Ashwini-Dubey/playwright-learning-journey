import { test, expect, request } from "@playwright/test";

function emailGenerator() {
  return `testuser${Date.now()}@test.com`;
}

const email_id = emailGenerator();

console.log(email_id);

const registrationPayload = {
  firstName: "Test",
  lastName: "User",
  userEmail: email_id,
  userRole: "customer",
  occupation: "Doctor",
  gender: "Male",
  userMobile: "9876543210",
  userPassword: "Password@123",
  confirmPassword: "Password@123",
  required: true,
};

test("User Registration", async () => {
  const apiContext = await request.newContext();

  const registrationResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/register",
    {
      data: registrationPayload,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  expect(registrationResponse.ok()).toBeTruthy();
  console.log("Status Code: ", registrationResponse.status());
  console.log("Response Header: ", registrationResponse.headers());

  const registrationResponseJson = await registrationResponse.json();
  console.log("Response (Json): ", registrationResponseJson);
  console.log("Response's Message: ", registrationResponseJson.message);
});
