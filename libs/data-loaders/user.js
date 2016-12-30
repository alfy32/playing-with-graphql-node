const fetchWrapper = require('./../fetch-wrapper');

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
  return fetchWrapper(req, res)
    .fetch(`${process.env.FTUSER_URI}/users/${id}`, {
      method: "GET",
      headers: {
        Accept: 'application/json'
      }
    })
    .then((response) => {
      if (response.status != 200) {
        throw "Failed to get user";
      }
      return response.json();
    });
};