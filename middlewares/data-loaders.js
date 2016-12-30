const DataLoader = require('dataloader');
const persons = require('./../libs/data-loaders/persons');
const user = require('./../libs/data-loaders/user');
const portraitUrl = require('./../libs/data-loaders/portraitUrl');
const watching = require('./../libs/data-loaders/watching');

module.exports = (req, res, next) => {
  res.locals.dataLoaders = {
    persons: new DataLoader(persons(req, res), {maxBatchSize: 200}),
    user: new DataLoader(user(req, res)),
    portraitUrl: new DataLoader(portraitUrl(req, res)),
    watching: new DataLoader(watching(req, res))
  };

  next();
};