const fetchWrapper = require('./../fetch-wrapper');

module.exports = {
  getSessionPromise: (req, res) => {
    return getSessionPromise(req, res);
  }
};

const getSessionPromise = (req, res) => {
  return fetchWrapper(req, res)
    .fetch(`${process.env.CIS_PUBLIC_API_URI}/v4/session/${res.locals.sessionId}`, {
      method: "GET",
      headers: {
        Accept: 'application/json'
      }
    })
    .then((response) => {
      if (response.status != 200) {
        throw "Invalid session";
      }

      return response.json();
    });
};