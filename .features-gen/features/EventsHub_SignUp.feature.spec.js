// Generated from: features/EventsHub_SignUp.feature
import { test } from "playwright-bdd";

test.describe('User Onboarding', () => {

  test('Successful sign up for new users', async ({ Given, When, Then, And, page }) => { 
    await Given('the user is on the EventsHub Sign Up page', null, { page }); 
    await When('the user enters valid details', null, { page }); 
    await And('the user clicks the Create Account button', null, { page }); 
    await Then('the user should be onboarded successfully', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/EventsHub_SignUp.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":2,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":3,"keywordType":"Context","textWithKeyword":"Given the user is on the EventsHub Sign Up page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":4,"keywordType":"Action","textWithKeyword":"When the user enters valid details","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"And the user clicks the Create Account button","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the user should be onboarded successfully","stepMatchArguments":[]}]},
]; // bdd-data-end