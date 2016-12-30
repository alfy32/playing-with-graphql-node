const fetch = require('node-fetch');
const requestLogger = require('./../logging/request-logger');

module.exports = {
  getSessionPromise: (req, res) => {
    return getSessionPromise(res.locals);
  }
};

const getSessionPromise = (locals) => {
  const start = Date.now();

  return fetch(`https://familysearch.org/cis-public-api/v4/session/${locals.sessionId}`, {
    method: "GET",
    headers: {
      Accept: 'application/json'
    }
  })
    .then((response) => {
      requestLogger(response, start, locals);

      if (response.status != 200) {
        throw "Invalid session";
      }

      return response.json();
    });
};