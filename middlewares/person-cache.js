module.exports = (req, res, next) => {
  res.locals.personCache = {};

  next();
};