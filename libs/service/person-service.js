const fetch = require('node-fetch');
const requestLogger = require('./../logging/request-logger');

module.exports = {
  getPersonPromise: (parent, args, req) => {
    const locals = req.res.locals;
    return getPerson(locals, parent.id);
  }
};

const getPerson = (locals, id) => {
  const personCache = locals.personCache;
  const start = Date.now();

  if (!personCache[id]) {
    personCache[id] = fetch(`https://familysearch.org/tf/person/${id}/summary`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${locals.sessionId}`,
        Accept: 'application/json'
      }
    })
      .then((response) => {
        requestLogger(response, start, locals);

        if (response.status != 200) {
          throw "Failed to get person";
        }
        return response.json();
      });
  }

  return personCache[id];
};
