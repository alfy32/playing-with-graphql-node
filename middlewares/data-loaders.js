const DataLoader = require('dataloader');
const persons = require('./../libs/data-loaders/persons');

module.exports = (req, res, next) => {
  res.locals.dataLoaders = {
    persons: new DataLoader(persons(req, res))
  };

  next();
};