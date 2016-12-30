const DataLoader = require('dataloader');
const persons = require('./../libs/data-loaders/persons');
const user = require('./../libs/data-loaders/user');

module.exports = (req, res, next) => {
  res.locals.dataLoaders = {
    persons: new DataLoader(persons(req, res)),
    user: new DataLoader(user(req, res))
  };

  next();
};