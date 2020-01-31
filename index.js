const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const trelloKey = core.getInput('trello-key');
const trelloToken = core.getInput('trello-token');

const trelloClient = axios.create({
  baseURL: 'https://api.trello.com',
});

const requestTrello = async (verb, url, body = null) => {
  return trelloClient.request(
      method: verb,
      url: url, {
      data: body || {}, 
      params: {
          key: trelloKey, 
          token: trelloToken
      }
  })
  .then((res) => {
    console.log(`status: ${res.status}.  data follows:`);
    console.dir(res.data)
    return res.data;
  })        
};

const getCardAttachments = async (cardId) => {
  return requestTrello('get', `/1/cards/${cardId}/attachments`);
};


const extractTrelloCardId = (prBody) =>   {
  console.log(`pr body: ${prBody}`);  
  
  //find 1st instance of trello card url - must be 1st thing in PR
  const matches = /^\s*https\:\/\/trello\.com\/c\/(\w+)/.exec(prBody);
  const cardId = matches && matches[1];
  console.log(`card id = ${cardId}`);

  return cardId;
}


(async () => {
  try {
    const cardId = extractTrelloCardId(github.context.payload.pull_request.body);
  
    //TOOD check if attachment already present?  if we allow this to run on edit, or even if just run and somebody already added on trello side, be graceful.
    // yeah, check https://api.trello.com/1/cards/CIqx54dG/attachments and if not empty it'll be an array of obj with 'name' of a github url
  
    if(cardId) {

      try {
        const attachments = await getCardAttachments(cardId);
      } catch(err) {
        console.log(`error fetching attachments: ${err}`);
        if(err.response) {
          //console.log(`status: ${err.status}.  error data follows:`);
          console.dir(err.response.data);
        }
        throw 'error fetching trello attachments';
      }




  

    }

  
    //console.log('');
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);

    //console.log('');
  
    // TODO add badge if it works?
  
    //TODO this should prolly respond to PR body edits too, if that's possible
  
  
    // `who-to-greet` input defined in action metadata file

    //core.setOutput("time", time);

  } catch (error) {
    //failure will stop PR from being mergeable if we have that setting on the repo.  there is not currently a neutral exit in actions v2.
    core.setFailed(error.message);
  }
})();