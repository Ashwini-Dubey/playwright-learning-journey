Feature: User Authentication
    Scenario: Successful Login with valid credentials
        Given the user is on the EventsHub login page
        When the user enters valid "testuser1792517543162@test.com" and "Password@123"
        And the user clicks the Sign In button
        Then the user should be logged in successfully