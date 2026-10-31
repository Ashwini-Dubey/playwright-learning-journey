Feature: User Onboarding
    Scenario: Successful sign up for new users
        Given the user is on the EventsHub Sign Up page
        When the user enters valid details
        And the user clicks the Create Account button
        Then the user should be onboarded successfully
        