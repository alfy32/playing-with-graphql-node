const fetch = require('node-fetch');
const requestLogger = require('./../logging/request-logger');

const BROKEN_URL_PLACEHOLDER = 'broken';

module.exports = {
  getPortraitUrlPromise: (parent, args, req) => {
    const locals = req.res.locals;
    const personId = parent.id;

    return getTreePersonSummaryPromise(locals, personId)
      .then((treePersonSummary) => {
        return treePersonSummary.thumbSquareUrl || BROKEN_URL_PLACEHOLDER;
      });
  }
};

const getTreePersonSummaryPromise = (locals, personId) => {
  const start = Date.now();

  return fetch(`https://familysearch.org/artifactmanager/persons/personsByTreePersonId/${personId}/summary`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${locals.sessionId}`,
      Accept: 'application/json'
    }
  })
    .then((response) => {
      requestLogger(response, start, locals);
      return response.json();
    });
};