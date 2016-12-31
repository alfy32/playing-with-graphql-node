const fetchWrapper = require('./../fetch-wrapper');

module.exports = (req, res) => {
  return (names) => {
    return fetchPreferences(req, res, names);
  }
};

const fetchPreferences = (req, res, names) => {
  return fetchWrapper(req, res)
    .fetch(`${process.env.FS_USER}/users/${res.locals.user.id}/preferences` + buildNames(names), {
      method: "GET",
      headers: {
        Accept: 'application/json'
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((preferences) => {
      const values = [];

      for (let name of names) {
        values.push(preferences[name].value)
      }

      return values;
    });
};

const buildNames = (names) => {
  return !names ? "" : "?name=" + names.join('&name=');
};