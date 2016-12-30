const fetch = require('node-fetch');
const requestLogger = require('./../logging/request-logger');

module.exports = {
  getWatchingPromise: (parent, args, req) => {
    const locals = req.res.locals;
    const start = Date.now();

    return fetch(`https://familysearch.org/watch/watches?resourceId=${parent.id}_p_fs-ft_production-primary`, {
      method: "HEAD",
      headers: {
        Authorization: `Bearer ${locals.sessionId}`,
        Accept: 'application/json'
      }
    })
      .then((response) => {
        requestLogger(response, start, locals);
        return response.status == 200;
      })
  }
};