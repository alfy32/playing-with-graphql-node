const fetchWrapper = require('./../fetch-wrapper');

module.exports = (req, res) => {
  return (personIds) => {
    return fetchPersons(req, res, personIds);
  }
};

const fetchPersons = (req, res, ids) => {
  return fetchWrapper(req, res)
    .fetch(`${process.env.TF_URI}/person/summary` + buildIds(ids), {
      method: "GET",
      headers: {
        Accept: 'application/json'
      }
    })
    .then((response) => {
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