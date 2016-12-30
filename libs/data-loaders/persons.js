const fetch = require('node-fetch');
const requestLogger = require('./../logging/request-logger');

module.exports = (req, res) => {
  return (personIds) => {
    return fetchPersons(req, res, personIds);
  }
};

const fetchPersons = (req, res, ids) => {
  const start = Date.now();

  return fetch(`${process.env.TF_URI}/person/summary` + buildIds(ids), {
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
    })
    .then((personSummaryMap) => {
      const persons = [];

      for (let id of ids) {
        persons.push(personSummaryMap[id].personCardSummary);
      }

      return persons;
    });
};

const buildIds = (ids) => {
  return !ids ? "" : "?id=" + ids.join('&id=');
};