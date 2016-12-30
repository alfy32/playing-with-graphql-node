const fetch = require('node-fetch');
const requestLogger = require('./../logging/request-logger');

module.exports = (req, res) => {
  return (userIds) => {
    const persons = [];
    for (let id of userIds) {
      persons.push(fetchUser(req, res, id));
    }
    return Promise.all(persons);
  }
};

const fetchUser = (req, res, id) => {
  const start = Date.now();

  return fetch(`${process.env.FTUSER_URI}/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${res.locals.sessionId}`,
      Accept: 'application/json'
    }
  })
    .then((response) => {
      requestLogger(response, start, res.locals);

      if (response.status != 200) {
        throw "Failed to get user";
      }
      return response.json();
    });
};