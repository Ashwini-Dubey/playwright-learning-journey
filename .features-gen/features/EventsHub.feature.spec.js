// Generated from: features/EventsHub.feature
import { test } from "playwright-bdd";

test.describe('User Authentication', () => {

  test('Successful Login with valid credentials', async ({ Given, When, Then, And, page }) => { 
    await Given('the user is on the EventsHub login page', null, { page }); 
    await When('the user enters valid "testuser1792517543162@test.com" and "Password@123"', null, { page }); 
    await And('the user clicks the Sign In button', null, { page }); 
    await Then('the user should be logged in successfully', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/EventsHub.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":2,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":3,"keywordType":"Context","textWithKeyword":"Given the user is on the EventsHub login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":4,"keywordType":"Action","textWithKeyword":"When the user enters valid \"testuser1792517543162@test.com\" and \"Password@123\"","stepMatchArguments":[{"group":{"start":22,"value":"\"testuser1792517543162@test.com\"","children":[{"start":23,"value":"testuser1792517543162@test.com","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"Password@123\"","children":[{"start":60,"value":"Password@123","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"And the user clicks the Sign In button","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the user should be logged in successfully","stepMatchArguments":[]}]},
]; // bdd-data-end