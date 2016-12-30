const fetchWrapper = require('./../fetch-wrapper');

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
  return fetchWrapper(req, res)
    .fetch(`${process.env.WATCH_URI}/watches?resourceId=${personId}_p_fs-ft_production-primary`, {
      method: "HEAD",
      headers: {
        Authorization: `Bearer ${res.locals.sessionId}`,
        Accept: 'application/json'
      }
    })
    .then((response) => {
      return response.status == 200;
    })
};