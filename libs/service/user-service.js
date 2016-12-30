const fetch = require('node-fetch');
const requestLogger = require('./../logging/request-logger');

module.exports = {
  getUserPromise: (parent, args, req) => {
    const locals = req.res.locals;
    return cachedUserGet(locals, parent.id);
  }
};

const cachedUserGet = (locals) => {
  if (!locals.userPromise) {
    locals.userPromise = getUser(locals);
  }
  return locals.userPromise;
};

const getUser = (locals) => {
  const start = Date.now();

  return fetch(`https://familysearch.org/ftuser/users/CURRENT`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${locals.sessionId}`,
      Accept: 'application/json'
    }
  })
    .then((response) => {
      requestLogger(response, start, locals);

      if (response.status != 200) {
        throw "Failed to get user";
      }

      return response.json();
    });
};
