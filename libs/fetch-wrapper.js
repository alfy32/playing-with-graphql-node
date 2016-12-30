const fetch = require('node-fetch');
const requestLogger = require('./logging/request-logger');

const USER_AGENT = 'playing-with-graphql-node';

module.exports = (req, res) => {
  return {
    fetch: (url, opts) => {
      const start = Date.now();

      opts.headers['Accept-Encoding'] = prepend('gzip', opts.headers['Accept-Encoding']);
      opts.headers.Authorization = `Bearer ${res.locals.sessionId}`;
      opts.headers['User-Agent'] = USER_AGENT;
      opts.headers['FS-User-Agent-Chain'] = createFSUserAgentChain(USER_AGENT, req.header('FS-User-Agent-Chain'));

      return fetch(url, opts)
        .then((response) => {
          requestLogger(response, start, res.locals, opts);
          return new Promise((resolve) => resolve(response));
        });
    }
  }
};

const createFSUserAgentChain = (userAgent, incomingChain) => {
  let chain = userAgent;

  if (incomingChain) {
    chain += ', ' + incomingChain;
  }

  return chain;
};

const prepend = (toAppend, value) => {
  let newValue = toAppend;

  if (value) {
    newValue += ', ' + value;
  }

  return newValue;
};
