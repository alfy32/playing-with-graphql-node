const fetch = require('node-fetch');
const requestLogger = require('./../logging/request-logger');

module.exports = (req, res) => {
  return loadPersons(req, res);
};

const loadPersons = (req, res) => {
  return (personIds) => {
    const persons = [];
    for (let id of personIds) {
      persons.push(fetchPerson(req, res, id));
    }
    return Promise.all(persons);
  }
};

const fetchPerson = (req, res, id) => {
  const start = Date.now();

  return fetch(`${process.env.TF_URI}/person/${id}/summary`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${res.locals.sessionId}`,
      Accept: 'application/json'
    }
  })
    .then((response) => {
      requestLogger(response, start, res.locals);

      if (response.status != 200) {
        throw "Failed to get person";
      }
      return response.json();
    });
};