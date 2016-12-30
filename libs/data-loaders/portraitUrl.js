const fetchWrapper = require('./../fetch-wrapper');

const BROKEN_URL_PLACEHOLDER = 'broken';

module.exports = (req, res) => {
  return (personIds) => {
    const portraitUrls = [];
    for (let id of personIds) {
      portraitUrls.push(fetchPortraitUrl(req, res, id));
    }
    return Promise.all(portraitUrls);
  };
};

const fetchPortraitUrl = (req, res, personId) => {
  return fetchWrapper(req, res)
    .fetch(`${process.env.ARTIFACT_MANAGER_URI}/persons/personsByTreePersonId/${personId}/summary`, {
      method: "GET",
      headers: {
        Accept: 'application/json'
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((treePersonSummary) => {
      return treePersonSummary.thumbSquareUrl || BROKEN_URL_PLACEHOLDER;
    });
};