const fetch = require('node-fetch');
const requestLogger = require('./../logging/request-logger');

module.exports = (req, res) => {
  return (personIds) => {
    const persons = [];
    for (let id of personIds) {
      persons.push(fetchWatching(req, res, id));
    }
    return Promise.all(persons);
  }
};

const fetchWatching = (req, res, personId) => {
  const start = Date.now();

  return fetch(`${process.env.WATCH_URI}/watches?resourceId=${personId}_p_fs-ft_production-primary`, {
    method: "HEAD",
    headers: {
      Authorization: `Bearer ${res.locals.sessionId}`,
      Accept: 'application/json'
    }
  })
    .then((response) => {
      requestLogger(response, start, res.locals);
      return response.status == 200;
    })
};