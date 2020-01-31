const core = require('@actions/core');
const github = require('@actions/github');

try {
  //TOOD chcek if failure will stop the PR from being mergeable?  well it does mark the build failed.  if we have checks on that it could be a problem.

  const reggie = /^\s*https\:\/\/trello\.com\/c\/(\w+)/;
  
  console.log(`pr body: ${github.context.payload.pull_request.body}`);
  const body = github.context.payload.pull_request.body;
  
  
  //find 1st instance of trello card url - must be 1st thing in PR
  const matches = reggie.exec(body);
  console.log(`card id = ${matches && matches[1]}`);

  
  console.log('');
  
  
  console.dir(github.context);
  console.log('');
  
  // TODO add badge if it works?
  
  //TODO this should prolly respond to PR body edits too, if that's possible
  
  
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
