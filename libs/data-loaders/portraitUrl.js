const fetch = require('node-fetch');
const requestLogger = require('./../logging/request-logger');

const BROKEN_URL_PLACEHOLDER = 'broken';

module.exports = (req, res) => {
  return (personIds) => {
    const portraitUrls = [];
    for (let id of personIds) {
      portraitUrls.push(fetchPortraitUrl(req, res, id));
    }
    return Promise.all(portraitUrls);
  };
};

const fetchPortraitUrl = (req, res, personId) => {
  const start = Date.now();

  return fetch(`${process.env.ARTIFACT_MANAGER_URI}/persons/personsByTreePersonId/${personId}/summary`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${res.locals.sessionId}`,
      Accept: 'application/json'
    }
  })
    .then((response) => {
      requestLogger(response, start, res.locals);
      return response.json();
    })
    .then((treePersonSummary) => {
      return treePersonSummary.thumbSquareUrl || BROKEN_URL_PLACEHOLDER;
    });
};